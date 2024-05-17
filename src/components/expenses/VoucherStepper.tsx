'use client'
import { useState, useEffect } from "react";
import { useCallback } from 'react';
import { useDropzone} from 'react-dropzone';
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";

export default function VoucherStepper() {
  
  // const onDrop = useCallback((acceptedFiles: Array<File>) => {
  //   const file = new FileReader;
  //   file.readAsDataURL(acceptedFiles[0])
  // }, [])

  // const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop
  // });

  // useEffect(() => {
  //   if ( typeof acceptedFiles[0] !== 'undefined' ){
  //     setPre(acceptedFiles[0]);
  //   }
  // }, [acceptedFiles]);

  // const [pre, setPre] = useState<(File | undefined)>();

  const {updateIndexStepper, updateVoucher} = useNewExpense();

  const [file, setFile] = useState<File>();

  useEffect(() => {
    console.log('file usefect => ', file);
  }, [file]);
  
  const SaveData = () => {
    console.log('save data!!');
    if(file){
      updateVoucher(file);
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
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} />
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
