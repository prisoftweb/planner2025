import { useState, useEffect } from "react";
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveExpense from "@/app/functions/SaveExpense";
import { CreateCostWithFiles } from "@/app/api/routeCost";
import { CFDIValidation } from "@/interfaces/Expense";
import { getProvider } from "@/app/api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { getSupplierCreditProv } from "@/app/functions/CostsFunctions";

export default function CFDIStepper({token, user} : {token: string, user:string}) {
  
  const {updateCDFI} = useNewExpense();
  const [file, setFile] = useState<File>();
  const [dataCFDI, setDataCFDI] = useState<CFDIValidation>();
  
  const { amount, costCenter, date, description, discount, report, 
    folio, project, proveedor, responsible, taxFolio, typeCFDI, 
    vat, voucher, condition, category, idVat, isCard,
    reset, updateRefresh, updateIndexStepper, type} = useNewExpense();
  
  const validationType = (f: File) => {
    if(!f.type.includes('xml') && !f.type.includes('XML')){
      showToastMessageError('Seleccione un archivo con la extension xml!!!');
      return 'Seleccione un archivo con la extension xml!!!';
    }else{
      return true;
    }
  }

  const SaveData = async () => {
    let supplierCredit: boolean;
    try {
      supplierCredit = await getSupplierCreditProv(token, proveedor);
    } catch (error) {
      supplierCredit = false;
    }
    
    if(file || voucher){
      const formdata = new FormData();
      //formdata.append('subtotal', amount);
      formdata.append('costcenter', costCenter);
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
      formdata.append('cost', JSON.stringify({
        discount: discount.replace(/[$,]/g, ""),
        subtotal:amount.replace(/[$,]/g, ""),
        iva:vat,
        vat: idVat
        // vatvalue: number no se usa 
        // total: number no se usa 
      }));
      if(voucher){
        formdata.append('files', voucher);
        formdata.append('types', voucher.type);
      }
      if(file){
        updateCDFI(file);

        formdata.append('files', file);
        formdata.append('types', file.type);
      }
      if(await dataCFDIValidation()){
        //showToastMessage('todo coincide !!');
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
      }
    }else{
      const data = {
        costcenter: costCenter, date:date, description, folio, 
        cost: {
          discount,
          subtotal:amount.replace(/[$,]/g, ""),
          iva:vat,
          vat: idVat 
          // vatvalue: number no se usa 
          // total: number no se usa 
        },
        provider: proveedor, user:responsible, taxfolio:taxFolio, typeCFDI, project,
        report, isticket:false, category, ispaid:supplierCredit, condition: [{
          glossary: condition,
          user
        }], iscard:isCard, type
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

  const handleCFDI = (value:CFDIValidation) => {
    console.log('handle cfdi ', value);
    setDataCFDI(value);
  }

  const dataCFDIValidation = async() => {
    console.log('amount ', amount, ' = subtotal cfdi ', dataCFDI?.amount);
    console.log('date ', date.substring(0, 10), ' = date cfdi ', dataCFDI?.date.substring(0, 10));
    console.log('folio fis ', taxFolio, ' = folio fis cfdi ', dataCFDI?.taxFolio);
    if(amount !== dataCFDI?.amount){
      showToastMessageError('El importe ingresado no coincide con el del CFDI!!');
      return false;
    }
    if(date.substring(0, 10) !== dataCFDI.date.substring(0, 10)){
      showToastMessageError('La fecha ingresada no coincide con la del CFDI!!');
      return false;
    }
    if(taxFolio !== dataCFDI.taxFolio){
      showToastMessageError('El folio fiscal ingresado no coincide con el del CFDI!!');
      return false;
    }
    try {
      const res:Provider = await getProvider(proveedor, token);
      if(typeof(res)==='string'){
        showToastMessageError('Error al validar proveedor!!');
        return false
      }
      console.log('rfc pro ', res.rfc, ' = subtotal cfdi ', dataCFDI?.RFCProvider);
      if(res.rfc !== dataCFDI.RFCProvider){
        showToastMessageError('El rfc del proveedor no coincide con el del CFDI!!');
        return false;
      }
    } catch (error) {
      showToastMessageError('Error al validar proveedor!!');
      return false
    }
    return true;
  }

  return (
    <div className="mt-2">
      <NavExpenseStepper index={3} />
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} 
          Validation={validationType} getData={handleCFDI} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}
