'use client'

import Button from '@/components/Button';
import Label from '@/components/Label';
import UploadImage from '@/components/UploadImage';
import { Company } from '@/interfaces/Companies';
import { useState } from 'react';
import { updateLogoCompany, updateIsoLogoCompany } from '@/app/api/routeCompany';
import { showToastMessageError } from '@/components/Alert';

export default function LogosProfileCompany({company, fetchCompany, token}: 
  {company: Company, fetchCompany: () => Promise<void>, token:string}) {

  const previewLogo= company.logo ?? '';
  const previewIsologo= company.isologo ?? '';

  const [file, setFile]= useState<File | null>(null);
  const [fileIsologo, setFileIsologo]= useState<File | null>(null);
  
  const handleFile = (value:File | null) => {
    setFile(value);
  }
  const handleFileIsologo = (value:File | null) => {
    setFileIsologo(value);
  }

  const sendData = async () => {
    // handleIndex(2);
    if(file && fileIsologo){
      const formlogo=new FormData();
      formlogo.append('logo', file);

      const formisologo=new FormData();
      formisologo.append('isologo', fileIsologo);

      const [res, res2] = await Promise.all([
        updateLogoCompany(token, formlogo, company._id),
        updateIsoLogoCompany(token, formisologo, company._id)
      ]);

      if(typeof(res)==='string'){
        showToastMessageError(res);
      }

      if(typeof(res2)==='string'){
        showToastMessageError(res2);
      }

      await fetchCompany();
    }else{
      if(file){
        const formlogo=new FormData();
        formlogo.append('logo', file);

        const res = await updateLogoCompany(token, formlogo, company._id);

        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          await fetchCompany();
        }
      }else{
        if(fileIsologo){
          const formisologo=new FormData();
          formisologo.append('isologo', fileIsologo);

          const res = await updateIsoLogoCompany(token, formisologo, company._id);

          if(typeof(res)==='string'){
            showToastMessageError(res);
            await fetchCompany();
          }
        }else{
          showToastMessageError('Debe seleccionar un archivo primero!!!!');
        }
      }
    }
  }

  return (
    <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0">

      <div className='flex justify-between gap-x-3 items-center'>
        <div>
          <Label>Logotipo</Label>
          {file && (<img src={URL.createObjectURL(file)} alt="Logo Company" className="w-20 h-20 object-contain mb-2"/> )}
          {previewLogo && !file && (<img src={previewLogo} alt="Logo Company" className="w-20 h-20 object-contain mb-2"/> )}
          <UploadImage setFile={handleFile} />
        </div>
        <div>
          <Label>Isologo</Label>
          {fileIsologo && (<img src={URL.createObjectURL(fileIsologo)} alt="IsoLogo Company" className="w-20 h-20 object-contain mb-2"/> )}
          {previewIsologo && !fileIsologo && (<img src={previewIsologo} alt="IsoLogo Company" className="w-20 h-20 object-contain mb-2"/> )}
          <UploadImage setFile={handleFileIsologo} />
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <Button type="button" onClick={sendData}>Guardar</Button>
      </div>

    </form>
  )
}
