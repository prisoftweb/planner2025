import { useState, useEffect } from "react";
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";

export default function CFDIStepper() {
  
  const {updateCDFI} = useNewExpense();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    console.log('file usefect => ', file);
  }, [file]);
  
  const SaveData = () => {
    if(file){
      updateCDFI(file);
    }
    console.log('save data!!');
  }

  return (
    <div className="mt-2">
      <NavExpenseStepper index={2} />
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}
