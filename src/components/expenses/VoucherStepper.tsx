'use client'
import { useState, useEffect } from "react";
// import { useCallback } from 'react';
// import { useDropzone} from 'react-dropzone';
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveExpense from "@/app/functions/SaveExpense";
import { CreateCostWithFiles } from "@/app/api/routeCost";

export default function VoucherStepper({token}: {token:string}) {
  
  const {updateIndexStepper, updateVoucher, amount, category, condition, 
    costCenter, date, description, discount, folio, indexStepper, project, proveedor, 
    responsible, taxFolio, typeCFDI, typeExpense, vat, CFDI, reset, updateRefresh} = useNewExpense();

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
    if(file || CFDI){
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
      if(file){
        updateVoucher(file);
        formdata.append('files', file);
        formdata.append('types', file.type);
      }
      if(CFDI){
        formdata.append('files', CFDI);
        formdata.append('types', CFDI.type);
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

  const Next = () => {
    if(file){
      updateVoucher(file);
    }
    updateIndexStepper(2);
  }

  return (
    <div className="mt-2">
      <NavExpenseStepper index={1} />
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} Validation={validationType} />
      {/* <div className="mt-4">
        <Label>Subir PDF o imagen</Label>
        <div {...getRootProps()} className="flex flex-col items-center justify-center w-full p-4 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <input {...getInputProps()} className="w-full h-8 p-6" />
          {
            isDragActive ?
              <p>Suelte su archivo aqui ...</p> :
              <p>Arrastra el archivo, o click para seleccionar archivo</p>
          }
        </div>
      </div>
      {pre && <iframe className="w-full h-auto mt-4" src={URL.createObjectURL(pre)} />} */}
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
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
