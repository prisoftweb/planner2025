'use client'
import { useState } from "react";
import NavExpenseNoDeductibleStepper from "./NavExpenseNoDeductibleStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveExpense from "@/app/functions/SaveExpense";
import { CreateCostWithFiles } from "@/app/api/routeCost";

export default function VoucherNoDeductibleStepper({token}: {token:string}) {
  
  const {updateIndexStepper, updateVoucher, amount, costCenter, date, description, 
    responsible, reset, updateRefresh} = useNewExpense();

  const [file, setFile] = useState<File>();
  
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

  const SaveData = async () => {
    if(file){
      const formdata = new FormData();
      formdata.append('subtotal', amount);
      formdata.append('costcenter', costCenter);
      formdata.append('date', date);
      formdata.append('description', description);
      formdata.append('user', responsible);
      if(file){
        updateVoucher(file);
        formdata.append('files', file);
        formdata.append('types', file.type);
      }
      try {
        const res = await CreateCostWithFiles(token, formdata);
        if(res === 201){
          reset();
          updateRefresh(true);
          showToastMessage('Costo creado satisfactoriamente!!!');
          setTimeout(() => {
            updateIndexStepper(1);
          }, 200);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }else{
      const data = {
        subtotal:amount, costcenter: costCenter, date:date, description, user:responsible,
      }
  
      try {
        const res = await SaveExpense(data, token);
        if(res===201) {
          reset();
          updateRefresh(true);
          showToastMessage('Costo creado satisfactoriamente!!!');
          setTimeout(() => {
            updateIndexStepper(1);
          }, 200);
        }
        else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }
  }

  return (
    <div className="mt-2">
      <NavExpenseNoDeductibleStepper index={2} />
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} Validation={validationType} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}
