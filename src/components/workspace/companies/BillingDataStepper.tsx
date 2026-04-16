'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect, useRef } from "react"
import InputMask from 'react-input-mask';
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import { updateCompany } from '@/app/api/routeCompany';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/Input';
import { showToastMessage, showToastMessageError } from '@/components/Alert';
import { Company } from '@/interfaces/Companies';
// import UploadFileDropZone from '@/components/UploadFileDropZone';
// import UploadImage from '@/components/UploadImage';
import { ChangeEvent } from "react";

export default function BillingDataStepper({capitalregime, filecer, handleFileccer, name, 
  password, rfc, taxregime, handleFilekey, filekey, handleCapReg, handleName, handlePassword, handleRfc,
  handleTaxReg, saveCompany}: 
  { name:string, taxregime:string, capitalregime:string, rfc:string, password:string, 
    filecer:File|undefined, handleFileccer: (f: File) => void, handleFilekey: (f: File) => void, 
    filekey:File|undefined, handleName: (value: string) => void, handleTaxReg: (value: string) => void, 
    handleCapReg: (value: string) => void, handleRfc: (value: string) => void, handlePassword: (value: string) => void, 
    saveCompany: () => Promise<void>, }) {

  const refRequest = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const [filecer, setFilecer]=useState<File>();
  
  // useEffect(() => {
  //   if (openSideNav && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [openSideNav]);
  
  const formik = useFormik({
    initialValues: {
      name: name?? '',
      taxregime: taxregime?? '',
      capitalregime: capitalregime?? '',
      rfc: rfc?? '',
      password: password?? ''
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc es obligatorio'),
      taxregime: Yup.string()
                  .required('El regimen fiscal es obligatorio'),
      password: Yup.string()
                  .required('La contraseña es obligatoria'),
    }),

    onSubmit: async valores => {
      await sendData();
     }
  });

  const sendData = async () => {
    if(refRequest.current){
      refRequest.current = false;

      const { name, taxregime, capitalregime, rfc, password } = formik.values;

      handleCapReg(capitalregime);
      handleName(name);
      // handleFileccer()
      handlePassword(password);
      handleRfc(rfc);
      handleTaxReg(taxregime);

      await saveCompany();

      // if(filecer){
      //   const formdata=new FormData();
      //   formdata.append('name', name.trim());
      //   formdata.append('rfc', rfc.trim());
      //   formdata.append('taxregime', taxregime.trim());
      //   formdata.append('capitalregime', capitalregime.trim());
      //   formdata.append('cp', company.location?.cp?? '');
      //   formdata.append('password', password.trim());
      //   formdata.append('file', filecer, filecer.name);
        
      //   // const data={
      //   //   taxdata: {
      //   //     name: name.trim(),
      //   //     rfc: rfc.trim(),
      //   //     taxregime: taxregime.trim(),
      //   //     capitalregime: capitalregime.trim(),
      //   //     cp: company.location?.cp,
      //   //     password: password,
      //   //     files: 
      //   //     [{
      //   //       file: {
      //   //           type: String,
      //   //           default: '/img/projects/default.cer'
      //   //       },  
      //   //       types: {
      //   //           type: String,
      //   //           required: [false, 'Tipo de archivo obligatorio'],
      //   //           maxlength: [160, 'Nombre debe tener maximo 160 caracteres'],
      //   //           minlength: [0, 'Nombre debe tener minimo 0 caracteres'],            
      //   //       },                
      //   //     }],  
      //   //   },
      //   // }

      //   // const res = await updateCompany(token, data, company._id);
      //   // if(typeof(res) === 'string'){
      //   //   showToastMessageError(res);
      //   //   refRequest.current = true;
      //   // }else{
      //   //   showToastMessage('Los datos se han actualizado correctamente.');
      //   //   refRequest.current = true;
      //   //   fetchCompany();
      //   // }
      // }else{
      //   showToastMessageError('Llene todos los campos por favor!!!');
      // }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  // const handleFileccer= (f:File) => {
  //   setFilecer(f);
  // }

  return (
    <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
      onSubmit={formik.handleSubmit}
    >

      <div >
        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <input 
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
            focus:border-slate-700 outline-0" 
          name="name" 
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.name}
          autoFocus
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="rfc"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">RFC</p></Label>
        <Input name="rfc" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.rfc}
        />
        {formik.touched.rfc && formik.errors.rfc ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.rfc}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="taxregime"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Regimen fiscal</p></Label>
        <Input name="taxregime" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.taxregime}
        />
        {formik.touched.taxregime && formik.errors.taxregime ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.taxregime}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="capitalregime"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Regimen capital</p></Label>
        <Input name="capitalregime" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.capitalregime}
        />
        {formik.touched.capitalregime && formik.errors.capitalregime ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.capitalregime}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="password"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">C.P.</p></Label>
        <Input name="password" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.password}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="cer"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Archivo cer</p></Label>
        <UploadFile setFile={handleFileccer} filename={filecer? filecer.name: ''} extension='.cer' />
      </div>

      <div>
        <Label htmlFor="cer"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Archivo key</p></Label>
        <UploadFile setFile={handleFilekey} filename={filekey? filekey.name: ''} extension='.key' />
      </div>

      <div className="flex justify-center mt-2">
        <Button type="submit">Guardar</Button>
      </div>

    </form>
  )
}

export function UploadFile({setFile, extension, filename}: {setFile: Function, extension:string, filename:string}){
  
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    if(e.target.files && e.target.files.length > 0) {
      
      const file = e.target.files[0];
      
      // Validar extensión
      if (!file.name.endsWith(extension)) {
        showToastMessageError("El archivo debe ser un certificado ("+extension+")");
        e.target.value = ""; // reset input
        return;
      }else{
        setFileName(e.target.files[0].name);
        setFile(file);
      }
    }
  }

  const [fileName, setFileName] = useState(filename);

  return (
    <>
      <div className='border-2 border-dashed rounded-md border-gray-200 
        relative py-3 md:px-2 w-full cursor-pointer'>
        <input
          type="file" 
          id={"file"+extension} 
          name={"file"+extension}
          accept={extension}
          onChange={onFileChange}
          className="opacity-0 absolute inset-0 w-full cursor-pointer">                                            
        </input>
        {/* <p className='text-center cursor-pointer'>Subir Archivo</p> */}
        <p className="text-center cursor-pointer">
          {fileName ? fileName : "Subir Archivo"}
        </p>
      </div>
    </>
  )
}