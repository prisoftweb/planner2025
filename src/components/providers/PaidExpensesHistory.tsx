import Label from "../Label"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Button from "../Button";
import CurrencyInput from "react-currency-input-field";
import Input from "../Input";
import TextArea from "../TextArea";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState, useEffect, useCallback } from "react";
import { useDropzone} from 'react-dropzone';

export default function PaidExpensesHistory({token}: {token:string}) {

  const [amount, setAmount] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [comments, setComments] = useState<string>('');

  const [amountLabel, setAmountLabel] = useState<string>('');
  const [referenceLabel, setReferenceLabel] = useState<string>('');
  const [dateLabel, setDateLabel] = useState<string>('');
  const [commentsLabel, setCommentsLabel] = useState<string>('');

  const validationData = () => {
    let band = true;

    setAmountLabel('');
    setReferenceLabel('');
    setDateLabel('');
    setCommentsLabel('');

    if(!amount || amount===''){
      band=false;
      setAmountLabel('El monto es obligatorio!!!');
    }

    if(!date || date===''){
      band=false;
      setDateLabel('La fecha es obligatoria!!!');
    }

    if(!comments || comments===''){
      band=false;
      setCommentsLabel('Los comentarios son obligatorios!!!');
    }

    if(!reference || reference===''){
      band=false;
      setReferenceLabel('La referencia es obligatoria!!!');
    }

    if(band){
      console.log('guardar');
    }
  }

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  useEffect(() => {
    console.log(acceptedFiles);
  },[acceptedFiles]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <div>
          <Label htmlFor="creditlimit">Monto</Label>
          <CurrencyInput
            id="creditlimit"
            name="creditlimit"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
              focus:border-slate-700 outline-0"
            onChange={(e) => setAmount(e.target.value.replace(/[$]/g, ""))}
            //defaultValue={creditlimitI || 0}
            decimalsLimit={2}
            prefix="$"
          />
          <p className="text-red-500" >{amountLabel}</p>
        </div>
        <div>
          <Label htmlFor="ref">Referencia</Label>
          <Input type="text" name="ref" 
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <p className="text-red-500" >{referenceLabel}</p>
        </div>
        <div>
          <Label htmlFor="date">Fecha </Label>
          <Input type="date" onChange={(e) => setDate(e.target.value)} />
          <p className="text-red-500" >{dateLabel}</p>
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Notas </Label>
        <TextArea value={comments} onChange={(e) => setComments(e.target.value)} />
        <p className="text-red-500" >{commentsLabel}</p>
      </div>
      <div className="mt-4">
        <Label>Subir voucher (PDF o imagen)</Label>
        <div {...getRootProps()} className="flex flex-col items-center justify-center w-full p-4 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <input {...getInputProps()} className="w-full h-8 p-6" />
          {
            isDragActive ?
              <p>Suelte sus archivos aqui ...</p> :
              <p>Arrastra los archivos, o click para seleccionar archivos</p>
          }
        </div>
      </div>
      <div className="flex justify-center space-x-5 mt-8">
        <Button 
          onClick={validationData} 
          type="button">Guardar</Button>
      </div>
    </>
  )
}