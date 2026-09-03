'use client'
import { useState, useRef, useEffect } from "react";
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessageError } from "../Alert";

export default function VoucherStepper({token, user}: {token:string, user:string}) {
  
  const {updateIndexStepper, updateVoucher, category, voucher} = useNewExpense();

  const [file, setFile] = useState<File>();

  useEffect(() => {
    if(voucher){
      setFile(voucher);
    }
  }, []);
  
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

  const Next = () => {
    if(file){
      updateVoucher(file);
    }
    if(category=="661eae4ef642112488c85fb4" || category=="66624d61db42d11d46b97ec1"){
      updateIndexStepper(2);
    }else{
      updateIndexStepper(3);
    }
  }

  const handle = () => {}

  return (
    <div className="mt-2 flex flex-col h-full">
      <NavExpenseStepper index={1} />
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} 
          Validation={validationType} getData={handle} fileParam={voucher? voucher: undefined} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={Next}>Siguiente</Button>
      </div>
    </div>
  );
}
