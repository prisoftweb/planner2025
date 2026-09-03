'use client'
import { useState, useRef, useEffect } from "react";
import NavExpenseNoDeductibleStepper from "./NavExpenseNoDeductibleStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessageError } from "../Alert";

export default function VoucherNoDeductibleStepper({token, user, idVat}: 
                                    {token:string, user:string, idVat:string}) {
  
  const {updateIndexStepper, updateVoucher, voucher} = useNewExpense();

  const [file, setFile] = useState<File>();
  
  useEffect(() => {
    if(voucher){ setFile(voucher); }
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

  const handle = () => {}

  return (
    <div className="mt-2 flex flex-col h-full">
      <NavExpenseNoDeductibleStepper index={1} />
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile}
         Validation={validationType} getData={handle} fileParam={voucher? voucher: undefined} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" 
          onClick={() => {
            if(file){
              updateVoucher(file);
            }
            updateIndexStepper(2);
          }}>Siguiente</Button>
      </div>
    </div>
  );
}
