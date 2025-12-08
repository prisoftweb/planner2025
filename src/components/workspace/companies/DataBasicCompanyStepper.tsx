'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect, useRef } from "react"
import InputMask from 'react-input-mask';
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import { createWorkSpace } from '@/app/api/routeWorkspace';
import { CreateCompany, CreateCompanyLogo } from '@/app/api/routeCompany';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/Input';
import { showToastMessage, showToastMessageError } from '@/components/Alert';

export default function DataBasicCompanyStepper({handleIndex, contactCompany, emailCompany, nameCompany, 
    phoneCompany, tradeNameCompany, handleContactCompany,handleEmailCompany, handleNameCompany, handlePhoneCompany,
    handleTradeNameCompany}: 
  {handleIndex:(value: number) => void, nameCompany:string, emailCompany:string, contactCompany:string, 
    phoneCompany:string, tradeNameCompany:string, handleNameCompany:(value:string) => void,
    handleEmailCompany:(value:string) => void, handleTradeNameCompany:(value:string) => void,
    handleContactCompany:(value:string) => void,
    handlePhoneCompany:(value:string) => void,
  }) {

  const refRequest = useRef(true);
  const [phoneNumber, setPhoneNumber] = useState(phoneCompany);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  
  const formik = useFormik({
    initialValues: {
      name: nameCompany,
      email: emailCompany,
      contact: contactCompany,
      tradename: tradeNameCompany
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

  const sendData = () => {
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
      handleNameCompany(name);
      handleEmailCompany(email);
      handlePhoneCompany(phoneformat);
      handleContactCompany(contact);
      handleTradeNameCompany(tradename),
      handleIndex(1);

    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  return (
    <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
      onSubmit={formik.handleSubmit}
    >

      <div >
        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <Input name="name" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.name}
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
        <Button type="submit">Siguiente</Button>
      </div>

    </form>
  )
}
