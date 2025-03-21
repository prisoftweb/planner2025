'use client'
import { useState, useRef } from "react";
// import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "@/components/UploadFileDropZone";
import Button from "@/components/Button";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
// import { useNewExpense } from "@/app/store/newExpense";
// import { showToastMessage, showToastMessageError } from "../Alert";
// import SaveExpense from "@/app/functions/SaveExpense";
import { CreateCostWithFiles } from "@/app/api/routeCost";
import { getSupplierCreditProv } from "@/app/functions/CostsFunctions";

export default function VoucherStepper({token, user, NextStep, setVoucher}: 
  {token:string, user:string, NextStep:Function, setVoucher:Function}) {

  const [file, setFile] = useState<File>();
  const refRequest = useRef(true);
  
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
      // updateVoucher(file);
      setVoucher(file);
    }
    NextStep(2);
  }

  const handle = () => {}

  return (
    <div className="mt-2">
      {/* <NavExpenseStepper index={2} /> */}
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} 
          Validation={validationType} getData={handle} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" 
          onClick={() => {
            NextStep(0); 
            // if(refRequest.current){
            //   SaveData();
            // }
            // else{
            //   showToastMessageError('Ya hay una peticion en proceso..!');
            // }
          }}>Atras</Button>
        <button type="button"
          onClick={Next}
          className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 
            border-slate-900 rounded-xl hover:bg-slate-200"
        >
          Siguiente
        </button>         
      </div>
    </div>
  );
}
