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

export default function DataBasicProfileCompany({company, token, fetchCompany}: 
  { company:Company, token:string, fetchCompany: () => Promise<void>}) {

  const refRequest = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(company.phoneNumber?? '');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');

  // useEffect(() => {
  //   if (openSideNav && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [openSideNav]);

  console.log('company data => ', company);
  console.log('company json data => ', JSON.stringify(company));
  
  const formik = useFormik({
    initialValues: {
      name: company.name?? '',
      email: company.email?? '',
      contact: company.contact?? '',
      tradename: company.tradename?? ''
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      tradename: Yup.string()
                  .required('El nombre comercial es obligatorio'),
      email: Yup.string()
                  .required('El correo electrónico es obligatorio'),
      contact: Yup.string()
                  .required('El nombre de contacto es obligatorio'),
    }),

    onSubmit: async valores => {
      sendData();
     }
  });

  const sendData = async () => {
    if(refRequest.current){
      refRequest.current = false;
      if (!phoneNumber || phoneNumber.trim() === '') {
        refRequest.current = true;
        setErrorPhoneNumber("El teléfono es obligatorio.");
        return;
      }

      setErrorPhoneNumber("");
      let phoneformat = phoneNumber.trim();
      phoneformat = phoneformat.replace(/\s+/g, '');
      phoneformat = phoneformat.replace('(+52)', '');

      const { name, email, contact, tradename } = formik.values;
      const data = {
        name: name.trim(),
        email: email.trim(),
        contact: contact.trim(),
        tradename: tradename.trim(),
        phoneNumber: phoneformat
      };

      const res = await updateCompany(token, data, company._id);
      if(typeof(res) === 'string'){
        showToastMessageError(res);
        refRequest.current = true;
      }else{
        showToastMessage('Los datos se han actualizado correctamente.');
        refRequest.current = true;
        fetchCompany();
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  return (
    <form className="z-10 w-full h-full bg-white space-y-5 p-3 right-0"
      onSubmit={formik.handleSubmit}
    >

      <div >
        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Razon social/Nombre</p></Label>
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
        <Label htmlFor="tradename"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
        <Input name="tradename" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.tradename}
        />
        {formik.touched.tradename && formik.errors.tradename ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.tradename}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="contact"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Contacto principal</p></Label>
        <Input name="contact" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.contact}
        />
        {formik.touched.contact && formik.errors.contact ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.contact}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Correo electrónico</p></Label>
        <Input name="email" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.email}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="phone"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Telefono</p></Label>
        <div className="w-48 flex  justify-start items-center relative">
          <InputMask mask='(+52) 999 999 9999'
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 pl-9 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
            type="phone" 
            placeholder="(+52) 444 429 7227"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <DevicePhoneMobileIcon className="h-6 w-6 text-amber-400 hover:text-amber-500 absolute ml-1" />
        </div>
        {errorPhoneNumber ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{errorPhoneNumber}</p>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center mt-2">
        <Button type="submit">Guardar</Button>
      </div>

    </form>
  )
}
