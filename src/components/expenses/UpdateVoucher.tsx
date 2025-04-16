import Button from "../Button";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState, useRef } from "react";
import { OneExpense } from "@/interfaces/Expenses";
import { showToastMessage, showToastMessageError } from "../Alert";
import { ADDNewFILE, DeleteFILE } from "@/app/api/routeCost";
import { useNewExpense } from "@/app/store/newExpense";

export default function UpdateVoucher({id, token, expense, isHistory}: 
    {token: string, id:string, expense:OneExpense, isHistory:boolean}){
  
  const [file, setFile] = useState<File | null>();
  const refRequest = useRef(true);
  const {currentExpense, updateCurrentExpense} = useNewExpense();

  let idFile = '';
  let urlFile = '';
  if(currentExpense){
    currentExpense.files.map((f) => {
      if(f.types === 'application/pdf' || f.types.includes('jpg') || f.types.includes('JPG')
        || f.types.includes('jpeg') || f.types.includes('JPEG') || f.types.includes('png')
        || f.types.includes('PNG') || f.types.includes('pdf')){
          idFile = f._id;
          urlFile = f.file;
      }
    });
  }

  const sendFile = async () => {
    if(refRequest.current){
      refRequest.current = false;
      try {
        if(file){
          const data = new FormData();
          data.append('file', file);
          data.append('types', file.type);
          const res = await ADDNewFILE(token, id, data);
          if(typeof(res) !== 'string'){
            refRequest.current = true;
            showToastMessage('Archivo agregado satisfactoriamente');
            updateCurrentExpense(res);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        }else{
          refRequest.current = true;
          showToastMessageError('Seleccione un archivo primero!!');
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Ocurrio un error al ingresar archivo!!');
      }
    }else{
      showToastMessageError('Ya hay una peticion en proceso!!!');
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
  const handleFile = (value: File) => {
    setFile(value);
  }

  return (
    <div className="mt-2">
      {urlFile && (
        <iframe src={urlFile} 
          className="w-full h-96"
        ></iframe>
      )}
      {isHistory? <></> : (
        <>
          <UploadFileDropZone label="Subir PDF o imagen" setFile={handleFile} 
              Validation={validationType} getData={handle} />
          <div className="flex justify-center mt-8 space-x-5">
            <Button type="button" onClick={SaveData}>Guardar</Button>
          </div>
        </>
      )}
    </div>
  );
}