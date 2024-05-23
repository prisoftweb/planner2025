import Button from "../Button";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState, useEffect } from "react";
import { Expense } from "@/interfaces/Expenses";
import { showToastMessageError } from "../Alert";

export default function UpdateVoucher({id, token, expense}: 
    {token: string, id:string, expense:Expense}){
  
  const [file, setFile] = useState();
  const [urlFile, setUrlFile] = useState<string>();

  useEffect(() => {
    console.log('expense', expense);
    expense.files.map((f) => {
      if(f.types === 'application/pdf' || f.types.includes('jpg') || f.types.includes('JPG')
        || f.types.includes('jpeg') || f.types.includes('JPEG') || f.types.includes('png')
        || f.types.includes('PNG')){
          console.log('aqui entro => ', f);
          setUrlFile(f.file);
      }
    });
  }, []);

  const SaveData = () => {

  }

  const validationType = (f: File) => {
    if((f.type !== 'application/pdf') && (!f.type.includes('jpg')
        && !f.type.includes('JPG') && !f.type.includes('jpeg') && 
        !f.type.includes('JPEG') && !f.type.includes('png') && !f.type.includes('PNG'))){
      showToastMessageError('Seleccione un archivo pdf o una imagen con la extension jpg o png!!!');
      return 'Seleccione un archivo pdf o una imagen con la extension jpg o png!!!';
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
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} Validation={validationType} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}