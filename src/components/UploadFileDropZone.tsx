'use client'
import { useState, useEffect } from "react";
import { useCallback } from 'react';
import { useDropzone} from 'react-dropzone';
import Label from "./Label";
import { showToastMessageError } from "./Alert";

export default function UploadFileDropZone({label, setFile, Validation}: 
            {label:string, setFile:Function, Validation:Function}) {
  
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  useEffect(() => {
    if ( typeof acceptedFiles[0] !== 'undefined' ){
      const res: (boolean | string) = Validation(acceptedFiles[0]);
      if(typeof(res) === 'boolean'){
        setFile(acceptedFiles[0]);
        setPre(acceptedFiles[0]);
      }else{
        setFile(undefined);
        setPre(undefined);
      }
    }
  }, [acceptedFiles]);

  const [pre, setPre] = useState<(File | undefined)>();
  return (
    <>
      <div className="mt-4">
        <Label>{label}</Label>
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
      {pre && <iframe className="w-full h-80 mt-4" src={URL.createObjectURL(pre)} />}
      {/* {pre && <iframe className="w-full h-auto mt-4" src={URL.createObjectURL(pre)} />} */}
    </>
  );
}
