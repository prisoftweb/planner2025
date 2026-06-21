'use client'

import Button from '@/components/Button';
import Label from '@/components/Label';
import UploadImage from '@/components/UploadImage';

export default function LogoCompanyStepper({handleIndex, file, fileIsologo, handleFile, handleFileIsologo, saveCompany}: 
  {handleIndex:(value: number) => void, file:File | null, fileIsologo:File | null,
    handleFile:(value:File | null) => void,
    handleFileIsologo:(value:File | null) => void,
    saveCompany: (data: Object| number) => Promise<void>
  }) {

  const sendData = () => {
    handleIndex(2);
  }

  return (
    <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0">

      <div className='flex justify-between gap-x-3 items-center'>
        <div className='w-1/2'>
          <Label>Logotipo</Label>
          {/* {file && (<img src={URL.createObjectURL(file)} alt="Logo Company" className="w-20 h-20 object-contain mb-2"/> )} */}
          {file && (<img src={URL.createObjectURL(file)} alt="Logo Company" className="w-auto h-auto object-contain mb-2"/> )}
          <UploadImage setFile={handleFile} />
        </div>
        <div className='w-1/2'>
          <Label>Isologo</Label>
          {/* {fileIsologo && (<img src={URL.createObjectURL(fileIsologo)} alt="IsoLogo Company" className="w-20 h-20 object-contain mb-2"/> )} */}
          {fileIsologo && (<img src={URL.createObjectURL(fileIsologo)} alt="IsoLogo Company" className="w-auto h-auto object-contain mb-2"/> )}
          <UploadImage setFile={handleFileIsologo} />
        </div>
      </div>

      <div className="flex justify-center gap-x-3 mt-2">
        <button
          className="text-black border-1 border-black font-normal text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-300 print:hidden"
          type="button"
          onClick={() => saveCompany(1)}
        >
          Guardar
        </button>
        <Button type="button" onClick={sendData}>Siguiente</Button>
      </div>

    </form>
  )
}
