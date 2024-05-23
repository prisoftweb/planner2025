import { useState, useEffect } from "react";
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveExpense from "@/app/functions/SaveExpense";
import { CreateCostWithFiles } from "@/app/api/routeCost";

export default function CFDIStepper({token} : {token: string}) {
  
  const {updateCDFI} = useNewExpense();
  const [file, setFile] = useState<File>();
  
  const { amount, category, condition, costCenter, date, description, discount, 
    folio, indexStepper, project, proveedor, responsible, taxFolio, typeCFDI, 
    typeExpense, vat, voucher, reset, updateRefresh, updateIndexStepper} = useNewExpense();
  
  const validationType = (f: File) => {
    if(!f.type.includes('xml') && !f.type.includes('XML')){
      showToastMessageError('Seleccione un archivo con la extension xml!!!');
      return 'Seleccione un archivo con la extension xml!!!';
    }else{
      return true;
    }
  }

  const SaveData = async () => {
    if(file || voucher){
      const formdata = new FormData();
      formdata.append('subtotal', amount);
      formdata.append('costcenter', costCenter);
      formdata.append('date', date);
      formdata.append('description', description);
      formdata.append('discount', discount);
      formdata.append('folio', folio);
      formdata.append('provider', proveedor);
      formdata.append('user', responsible);
      formdata.append('taxFolio', taxFolio);
      formdata.append('typeCFDI', typeCFDI);
      formdata.append('category', category);
      formdata.append('project', project);
      formdata.append('vat', vat);
      // formdata.append('condition', JSON.stringify({
      //     glossary:condition, user:responsible
      //   }))
      if(voucher){
        formdata.append('files', voucher);
        formdata.append('types', voucher.type);
      }
      if(file){
        updateCDFI(file);
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
            updateIndexStepper(0);
          }, 200);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }else{
      const data = {
        subtotal:amount, costcenter: costCenter, date:date, description, discount, folio, 
        provider: proveedor, user:responsible, taxFolio, typeCFDI, category, project, vat,
        condition: {
          glossary:condition, user:responsible
        }
      }
  
      try {
        const res = await SaveExpense(data, token);
        if(res===201) {
          reset();
          updateRefresh(true);
          showToastMessage('Costo creado satisfactoriamente!!!');
          setTimeout(() => {
            updateIndexStepper(0);
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
      <NavExpenseStepper index={2} />
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} Validation={validationType} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}
