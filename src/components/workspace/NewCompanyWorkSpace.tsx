'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import HeaderForm from "../HeaderForm"
import Button from '../Button';
import Label from '../Label';
import Input from '../Input';
import InputMask from 'react-input-mask';
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import { createWorkSpace } from '@/app/api/routeWorkspace';
import UploadImage from '../UploadImage';
import { CreateCompany, CreateCompanyLogo } from '@/app/api/routeCompany';

export default function NewCompanyWorkSpace({handleIndex}: {handleIndex:(value: number) => void}) {

  const refRequest = useRef(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [file, setFile] = useState<File>();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      lastname: '',
      contact: '',  
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      lastname: Yup.string()
                  .required('El nombre comercial es obligatorio'),
      email: Yup.string()
                  .required('El correo electrónico es obligatorio'),
      // contact: Yup.string()
      //             .required('El nombre de contacto es obligatorio'),
    }),

    onSubmit: async valores => { }
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

      if(file){
        if(phoneformat && phoneformat!==''){
          const {email, name, lastname } = formik.values;
          const formdata = new FormData();
          formdata.append('email', email);
          formdata.append('name', name);
          formdata.append('phoneNumber', phoneformat);
          formdata.append('tradename', lastname);
          formdata.append('logo', file);
          const res = await CreateCompanyLogo('', formdata);
          if(res===201){
            showToastMessage('Compania creada satisfactoriamente!!!');
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        }else{
          refRequest.current = true;
          showToastMessageError('El telefono es obligatorio!!');
        }
      }else{
        if(phoneformat && phoneformat!==''){
          const {email, name, lastname } = formik.values;
          const data = {
            name,
            tradename: lastname,
            email,              
            phoneNumber: phoneformat,
          }
          const res = await CreateCompany('', data);
          if(res===201){
            showToastMessage('Compania creada satisfactoriamente!!!');
            handleIndex(4);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
            handleIndex(4);
          }
        }else{
          refRequest.current = true;
          showToastMessageError('El telefono es obligatorio!!');
        }
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  return (
    <div className='w-full h-full flex'>
      <div className=' hidden sm:block justify-center items-center w-full bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/img/workspaces/2174.jpg')" }}
      >
        <p className='text-4xl w-96 text-white'>Datos de empresa</p>
        <p className='text-xl w-96 text-white'>Ingresa los datos de la compañia para gestionar sus ingresos y egresos.</p>
      </div>
      <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
        onSubmit={formik.handleSubmit}
      >
        <HeaderForm img="/img/glossary.svg" subtitle="Gestiona tus proyectos" 
          title="Planner"
        />

        <div className="ml-2">
          <p className="text-xl">Agregar datos de una compañia</p>
          <p className="text-gray-500 text-sm">Ingresa los datos basicos de una compañia.</p>
        </div>

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
          <Label htmlFor="lastname"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
          <Input name="lastname" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.lastname}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.lastname}</p>
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

        <div>
          <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Correo electrónico</p></Label>
          <Input name="email" 
            type='email'
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
          <Label htmlFor="logo"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Logotipo</p></Label>
          <UploadImage setFile={setFile} />
        </div>

        <div className="flex justify-center mt-2">
          <Button type="button" onClick={sendData}>Guardar</Button>
        </div>

      </form>
    </div>
  )
}
