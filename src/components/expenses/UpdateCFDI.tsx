import Button from "../Button";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState, useEffect } from "react";
import { Expense } from "@/interfaces/Expenses";
import { showToastMessageError } from "../Alert";

export default function UpdateCFDI({id, token, expense}: 
                  {token: string, id:string, expense:Expense}){
  
  const [file, setFile] = useState();
  const [urlFile, setUrlFile] = useState<string>();

  useEffect(() => {
    console.log('expense', expense);
    expense.files.map((f) => {
      if(f.types.includes('xml') || f.types.includes('XML')){
          console.log('aqui entro => ', f);
          setUrlFile(f.file);
      }
    });
  }, []);

  const SaveData = () => {

  }

  const validationType = (f: File) => {
    if(!f.type.includes('xml') && !f.type.includes('XML')){
      showToastMessageError('Seleccione un archivo con la extension xml!!!');
      return 'Seleccione un archivo con la extension xml!!!';
    }else{
      return true;
    }
  }

  return (
    <div className="mt-2">
      {urlFile && (
        <iframe src={urlFile} 
          className="w-full"
        ></iframe>
      )}
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} Validation={validationType} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}