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
    isCard, type, concept, total, reportObject} = useNewExpense();

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
    const costcenter = {
      category: costCenter,
      concept
    }
    if(!description || description===''){
      refRequest.current = true;
      showToastMessageError("El gasto no tiene una descripcion!!!");
    }else{
      if(file){
        const formdata = new FormData();
        formdata.append('costocenter', JSON.stringify(costcenter));
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
          total: total.replace(/[$,]/g, ""),
        }));
        formdata.append('condition', JSON.stringify([{
          glossary: condition,
          user
        }]));
        formdata.append('conditionprovider', JSON.stringify([{
          glossary: '674643dd734d5ab78ab98ddb',
          user
        }]));
        if(file){
          updateVoucher(file);
          formdata.append('files', file);
          formdata.append('types', file.type);
        }
        if(reportObject && reportObject.ispettycash){
          const fechaGasto = new Date(date);
          const fechaReport = new Date(reportObject.date);
          const currentDate = new Date();
          const expiration = new Date(reportObject.expirationdate);
          if( (fechaGasto > fechaReport || fechaGasto.getTime() >= fechaReport.getTime())  && 
                (currentDate < expiration || currentDate.getTime() <= currentDate.getTime())){
            try {
              const res = await CreateCostWithFiles(token, formdata);
              if(res === 201){
                reset();
                updateRefresh(true);
                showToastMessage('Costo creado satisfactoriamente!!!');
                setTimeout(() => {
                  updateIndexStepper(3);
                }, 200);
                refRequest.current = true;
              }else{
                showToastMessageError(res);
                refRequest.current = true;
              }
            } catch (error) {
              refRequest.current = true;
              showToastMessageError('Ocurrio un error al guardar costo!!');
            }
          }else{
            showToastMessageError('Error al ingresar, la fecha del gasto no cumple con las politicas de la empresa!!!');
            refRequest.current = true;
          }
        }else{
          try {
            const res = await CreateCostWithFiles(token, formdata);
            if(res === 201){
              reset();
              updateRefresh(true);
              showToastMessage('Costo creado satisfactoriamente!!!');
              setTimeout(() => {
                updateIndexStepper(3);
              }, 200);
              refRequest.current = true;
            }else{
              showToastMessageError(res);
              refRequest.current = true;
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Ocurrio un error al guardar costo!!');
          }
        }
      }else{
        const data = {
          costocenter: costcenter, date:date, description, 
          cost: {
            discount: 0,
            subtotal:amount.replace(/[$,]/g, ""),
            iva: 0,
            total: total.replace(/[$,]/g, ""),
          },
          user:responsible, report, isticket:true, project, category, condition: {
            glossary: condition,
            user
          }, 
          conditionprovider: [{
            glossary: '674643dd734d5ab78ab98ddb',
            user
          }], iscard:isCard, type
        }
    
        if(reportObject && reportObject.ispettycash){
          const fechaGasto = new Date(date);
          const fechaReport = new Date(reportObject.date);
          const currentDate = new Date();
          const expiration = new Date(reportObject.expirationdate);
          if( (fechaGasto > fechaReport || fechaGasto.getTime() >= fechaReport.getTime())  && 
                (currentDate < expiration || currentDate.getTime() <= currentDate.getTime())){
            try {
              const res = await SaveExpense(data, token);
              if(res===201) {
                reset();
                updateRefresh(true);
                showToastMessage('Costo creado satisfactoriamente!!!');
                setTimeout(() => {
                  updateIndexStepper(3);
                }, 200);
                refRequest.current = true;
              }
              else{
                showToastMessageError(res);
                refRequest.current = true;
              }
            } catch (error) {
              refRequest.current = true;
              showToastMessageError('Ocurrio un error al guardar costo!!');
            }
          }else{
            showToastMessageError('Error al ingresar, la fecha del gasto no cumple con las politicas de la empresa!!!');
            refRequest.current = true;
          }
        }else{
          try {
            const res = await SaveExpense(data, token);
            if(res===201) {
              reset();
              updateRefresh(true);
              showToastMessage('Costo creado satisfactoriamente!!!');
              setTimeout(() => {
                updateIndexStepper(3);
              }, 200);
              refRequest.current = true;
            }
            else{
              showToastMessageError(res);
              refRequest.current = true;
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Ocurrio un error al guardar costo!!');
          }
        }
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
