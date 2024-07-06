'use client'
import { useState, useRef } from "react";
import NavExpenseNoDeductibleStepper from "./NavExpenseNoDeductibleStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveExpense from "@/app/functions/SaveExpense";
import { CreateCostWithFiles } from "@/app/api/routeCost";

export default function VoucherNoDeductibleStepper({token, user, idVat}: 
                                    {token:string, user:string, idVat:string}) {
  
  const {updateIndexStepper, updateVoucher, amount, costCenter, date, description, 
    responsible, report, project, condition, category, reset, updateRefresh, 
    isCard, type} = useNewExpense();

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

  const SaveData = async () => {
    refRequest.current = false;
    if(file){
      const formdata = new FormData();
      //formdata.append('subtotal', amount);
      formdata.append('costcenter', costCenter);
      formdata.append('date', date);
      formdata.append('description', description);
      formdata.append('user', responsible);
      formdata.append('report', report);
      formdata.append('isticket', JSON.stringify(true));
      formdata.append('project', project);
      formdata.append('category', category);
      formdata.append('iscard', JSON.stringify(isCard));
      formdata.append('type', type);
      formdata.append('cost', JSON.stringify({
        discount: 0,
        subtotal:amount.replace(/[$,]/g, ""),
        iva: 0,
        //vat: idVat, 
        // vatvalue: number no se usa 
        // total: number no se usa 
      }));
      formdata.append('condition', JSON.stringify([{
        glossary: condition,
        user
      }]))
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
          refRequest.current = true;
        }else{
          showToastMessageError(res);
          refRequest.current = true;
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }else{
      const data = {
        costcenter: costCenter, date:date, description, 
        cost: {
          discount: 0,
          subtotal:amount.replace(/[$,]/g, ""),
          iva: 0,
          //vat: idVat,
          // vatvalue: number no se usa 
          // total: number no se usa 
        },
        user:responsible, report, isticket:true, project, category, condition: {
          glossary: condition,
          user
        }, iscard:isCard, type
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
          refRequest.current = true;
        }
        else{
          showToastMessageError(res);
          refRequest.current = true;
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }
  }

  const handle = () => {}

  return (
    <div className="mt-2">
      <NavExpenseNoDeductibleStepper index={2} />
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile}
         Validation={validationType} getData={handle} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" 
          onClick={() => { 
            if(refRequest.current){
              SaveData();
            }
            else{
              showToastMessageError('Ya hay una peticion en proceso..!');
            }
          }}>Guardar</Button>
      </div>
    </div>
  );
}
