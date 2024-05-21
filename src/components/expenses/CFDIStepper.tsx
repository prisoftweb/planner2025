import { useState, useEffect } from "react";
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveExpense from "@/app/functions/SaveExpense";

export default function CFDIStepper({token} : {token: string}) {
  
  const {updateCDFI} = useNewExpense();
  const [file, setFile] = useState<File>();

  const {updateIndexStepper, updateVoucher, amount, category, condition, 
    costCenter, date, description, discount, folio, indexStepper, project, proveedor, 
    responsible, taxFolio, typeCFDI, typeExpense, vat, voucher} = useNewExpense();
  
  // useEffect(() => {
  //   console.log('file usefect => ', file);
  // }, [file]);
  
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
      formdata.append('condition', JSON.stringify({
          glossary:condition, user:responsible
        }))
      if(voucher){
        formdata.append('voucher', voucher);
      }
      if(file){
        updateCDFI(file);
        formdata.append('CFDI', file);
      }
      console.log('guardar Voucher!!');
      console.log(formdata.get('voucher'));
      console.log('guardar CFDI!!');
      console.log(formdata.get('CFDI'));
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
        if(res===201) showToastMessage('Costo creado satisfactoriamente!!!');
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
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}
