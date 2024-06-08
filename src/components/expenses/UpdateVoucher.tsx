import Button from "../Button";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState, useEffect, useRef } from "react";
import { Expense } from "@/interfaces/Expenses";
import { showToastMessage, showToastMessageError } from "../Alert";
import { ADDNewFILE, DeleteFILE } from "@/app/api/routeCost";

export default function UpdateVoucher({id, token, expense}: 
    {token: string, id:string, expense:Expense}){
  
  const [file, setFile] = useState<File | null>();
  const [urlFile, setUrlFile] = useState<string>();
  const [idFile, setIdFile] = useState<string>('');

  useEffect(() => {
    //console.log('expense', expense);
    expense.files.map((f) => {
      if(f.types === 'application/pdf' || f.types.includes('jpg') || f.types.includes('JPG')
        || f.types.includes('jpeg') || f.types.includes('JPEG') || f.types.includes('png')
        || f.types.includes('PNG')){
          //console.log('aqui entro => ', f);
          setIdFile(f._id);
          setUrlFile(f.file);
      }
    });
  }, []);

  const sendFile = async () => {
    try {
      if(file){
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
      }else{
        showToastMessageError('Seleccione un archivo primero!!');
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al ingresar archivo!!');
    }
  }

  const SaveData = async() => {
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
      //showToastMessageError('ya existe un archivo!!');
    }
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

  const handle = () => {}

  return (
    <div className="mt-2">
      {urlFile && (
        <iframe src={urlFile} 
          //className="w-full h-80"
          className="w-full h-96"
        ></iframe>
      )}
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} 
          Validation={validationType} getData={handle} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}