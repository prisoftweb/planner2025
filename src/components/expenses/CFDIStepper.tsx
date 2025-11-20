import { useState, useRef, useEffect } from "react";
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessageError } from "../Alert";
import { CFDIValidation } from "@/interfaces/Expense";

export default function CFDIStepper({token, user} : {token: string, user:string}) {
  
  const {updateCDFI} = useNewExpense();
  const [file, setFile] = useState<File>();
  const [dataCFDI, setDataCFDI] = useState<CFDIValidation>();
  
  useEffect(() => {
    if(CFDI){
      setFile(CFDI);
    }
  }, []);
  
  const { updateIndexStepper, CFDI} = useNewExpense();
  
  const validationType = (f: File) => {
    if(!f.type.includes('xml') && !f.type.includes('XML')){
      showToastMessageError('Seleccione un archivo con la extension xml!!!');
      return 'Seleccione un archivo con la extension xml!!!';
    }else{
      return true;
    }
  }

  const handleCFDI = (value:CFDIValidation) => {
    setDataCFDI(value);
  }

  return (
    <div className="mt-2">
      <NavExpenseStepper index={2} />
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} 
          Validation={validationType} getData={handleCFDI} token={token} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" 
          onClick={() => {
            if(file && dataCFDI){
              updateCDFI(file, dataCFDI); 
            }
            updateIndexStepper(3);
          }}>Siguiente</Button>
      </div>
    </div>
  );
}
