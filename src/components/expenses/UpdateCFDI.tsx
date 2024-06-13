import Button from "../Button";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState, useEffect } from "react";
import { Expense } from "@/interfaces/Expenses";
import { showToastMessageError, showToastMessage } from "../Alert";
import { ADDNewFILE, DeleteFILE } from "@/app/api/routeCost";
import { CFDIValidation } from "@/interfaces/Expense";
import { Provider } from "@/interfaces/Providers";
import { getProvider } from "@/app/api/routeProviders";

export default function UpdateCFDI({id, token, expense}: 
                  {token: string, id:string, expense:Expense}){
  
  const [file, setFile] = useState<File | null>();
  const [urlFile, setUrlFile] = useState<string>();
  const [idFile, setIdFile] = useState<string>('');
  const [dataCFDI, setDataCFDI] = useState<CFDIValidation>();

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
        if(dataCFDIValidation()){
          //showToastMessage('validado!!')
          const res = await ADDNewFILE(token, id, data);
          if(res === 200){
            showToastMessage('Archivo agregado satisfactoriamente');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        }
        //showToastMessageError('No validado!!');
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

  const handleCFDI = (value:CFDIValidation) => {
    console.log('handle cfdi ', value);
    setDataCFDI(value);
  }

  const dataCFDIValidation = () => {
    // console.log('expense', expense.subtotal);
    // console.log('expense', expense.date.substring(0, 10));
    // console.log('expense', expense.taxfolio);
    // console.log('expense', expense.provider.rfc);
    // console.log('data dfdi ', dataCFDI);
    if(expense.subtotal.toString() !== dataCFDI?.amount){
      showToastMessageError('El importe ingresado no coincide con el del CFDI!!');
      return false;
    }
    if(expense.date.substring(0, 10) !== dataCFDI?.date.substring(0, 10)){
      showToastMessageError('La fecha ingresada no coincide con la del CFDI!!');
      return false;
    }
    if(expense.taxfolio !== dataCFDI?.taxFolio){
      showToastMessageError('El folio fiscal ingresado no coincide con el del CFDI!!');
      return false;
    }
    if(expense.provider.rfc !== dataCFDI.RFCProvider){
      showToastMessageError('El rfc del proveedor no coincide con el del CFDI!!');
      return false;
    }
    return true;
  }

  return (
    <div className="mt-2">
      {urlFile && (
        <iframe src={urlFile} 
          className="w-full h-96"
        ></iframe>
      )}
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} 
          Validation={validationType} getData={handleCFDI} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}