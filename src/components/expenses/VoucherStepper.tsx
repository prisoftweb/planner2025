'use client'
import { useState, useRef } from "react";
// import { useCallback } from 'react';
// import { useDropzone} from 'react-dropzone';
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveExpense from "@/app/functions/SaveExpense";
import { CreateCostWithFiles } from "@/app/api/routeCost";
import { getSupplierCreditProv } from "@/app/functions/CostsFunctions";

export default function VoucherStepper({token, user}: {token:string, user:string}) {
  
  const {updateIndexStepper, updateVoucher, amount, costCenter, 
    date, description, discount, folio, project, proveedor, report, 
    responsible, taxFolio, typeCFDI, vat, CFDI, condition, category, 
    idVat, isCard, type, concept, taxExempt, reset, updateRefresh, total, reportObject} = useNewExpense();

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
    let supplierCredit: boolean;
    try {
      supplierCredit = await getSupplierCreditProv(token, proveedor);
    } catch (error) {
      supplierCredit = false;
    }

    const costcenter = {
      category: costCenter,
      concept
    }

    if(!description || description===''){
      refRequest.current = true;
      showToastMessageError("El gasto no tiene una descripcion!!!");
    }else{
      if(file || CFDI){
        const formdata = new FormData();
        //formdata.append('subtotal', amount);
        formdata.append('costocenter', JSON.stringify(costcenter));
        formdata.append('date', date);
        formdata.append('description', description);
        //formdata.append('discount', discount);
        formdata.append('folio', folio);
        formdata.append('provider', proveedor);
        formdata.append('user', responsible);
        formdata.append('taxfolio', taxFolio);
        formdata.append('typeCFDI', typeCFDI);
        formdata.append('project', project);
        //formdata.append('vat', vat);
        formdata.append('report', report);
        formdata.append('category', category);
        formdata.append('isticket', JSON.stringify(false));
        formdata.append('ispaid', JSON.stringify(supplierCredit));
        formdata.append('iscard', JSON.stringify(isCard));
        formdata.append('type', type);
        formdata.append('condition', JSON.stringify([{
          glossary: condition,
          user
        }]));
        formdata.append('conditionprovider', JSON.stringify([{
          glossary: '674643dd734d5ab78ab98ddb',
          user
        }]));
        formdata.append('cost', JSON.stringify({
          discount: discount.replace(/[$,]/g, ""),
          subtotal:amount.replace(/[$,]/g, ""),
          iva:vat,
          vat: idVat,
          exempttax: taxExempt.replace(/[$,]/g, ""),
          total: total.replace(/[$,]/g, ""),
          // vatvalue: number no se usa 
          // total: number no se usa 
        }));
        if(file){
          updateVoucher(file);
          formdata.append('files', file);
          formdata.append('types', file.type);
        }
        if(CFDI){
          formdata.append('files', CFDI);
          formdata.append('types', CFDI.type);
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
                  updateIndexStepper(4);
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
                updateIndexStepper(4);
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
          costocenter: costcenter, date:date, description, folio, 
          cost: {
            discount,
            subtotal:amount.replace(/[$,]/g, ""),
            iva:vat,
            vat: idVat,
            exempttax: taxExempt.replace(/[$,]/g, ""),
            total: total.replace(/[$,]/g, ""),
          },
          provider: proveedor, user:responsible, taxfolio:taxFolio, typeCFDI, project,
          report, isticket:false, category, ispaid:supplierCredit, condition: [{
            glossary: condition,
            user
          }], 
          conditionprovider: [{
            glossary: '674643dd734d5ab78ab98ddb',
            user
          }], iscard:isCard, type,
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
                  updateIndexStepper(4);
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
                updateIndexStepper(4);
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

  const Next = () => {
    if(file){
      updateVoucher(file);
    }
    updateIndexStepper(3);
  }

  const handle = () => {}

  return (
    <div className="mt-2">
      <NavExpenseStepper index={2} />
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
