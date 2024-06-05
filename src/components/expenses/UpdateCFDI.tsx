import Button from "../Button";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState, useEffect } from "react";
import { Expense } from "@/interfaces/Expenses";
import { showToastMessageError, showToastMessage } from "../Alert";
import { ADDNewFILE, DeleteFILE } from "@/app/api/routeCost";

export default function UpdateCFDI({id, token, expense}: 
                  {token: string, id:string, expense:Expense}){
  
  const [file, setFile] = useState<File | null>();
  const [urlFile, setUrlFile] = useState<string>();
  const [idFile, setIdFile] = useState<string>('');

  useEffect(() => {
    //console.log('expense', expense);
    expense.files.map((f) => {
      if(f.types.includes('xml') || f.types.includes('XML')){
          //console.log('aqui entro => ', f);
          
          setIdFile(f._id);
          setUrlFile(f.file);
      }
    });
  }, []);

  const sendFile = async () => {
    if(file){
      try {
        const data = new FormData();
        //console.log('send file => ', file);
        data.append('file', file);
        data.append('types', file.type);
        //console.log('append => ', data.get('file'));
        const res = await ADDNewFILE(token, id, data);
        if(res === 200){
          showToastMessage('Archivo agregado satisfactoriamente');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al ingresar archivo!!');
      }
    }else{
      showToastMessageError('Seleccione un archivo primero!!');
    }
  }
  
  const SaveData = async () => {
    if(!urlFile){
      sendFile();
    }else{
      try {
        const res = await DeleteFILE(token, id, idFile);
        if(res === 204){
          sendFile();
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al eliminar el archivo anterior!!');
      }
    }
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
          className="w-full h-96"
        ></iframe>
      )}
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} Validation={validationType} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}