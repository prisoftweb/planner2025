'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect } from "react"
import InputMask from 'react-input-mask';
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import UploadImage from "../UploadImage"
import { CreateCompany, CreateCompanyLogo } from "@/app/api/routeCompany"

export default function NewCompany({showForm, token}: 
                    {showForm:Function, token:string}){

  const [file, setFile] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [heightPage, setHeightPage] = useState<number>(900);
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    // console.log('useefect');
    // console.log(heightPage, '   ', window.outerHeight );
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      email: '',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      address: Yup.string()
                  .required('La direccion es obligatoria'),
      email: Yup.string()
                  .required('El email es obligatorio'),
    }),

    onSubmit: async valores => {
      try {
        if(file){
          if(phoneNumber && phoneNumber!==''){
            const {address, email, name} = valores;
            const formdata = new FormData();
            formdata.append('address', address);
            formdata.append('email', email);
            formdata.append('name', name);
            formdata.append('phoneNumber', phoneNumber);
            formdata.append('logo', file);
            const res = await CreateCompanyLogo(token, formdata);
            if(res===201){
              showForm(false);
              showToastMessage('Compañia creada exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              showToastMessageError(res);
            }
          }else{
            showToastMessageError('El telefono es obligatorio!!');
          }
        }else{
          if(phoneNumber && phoneNumber!==''){
            const {address, email, name} = valores;
            const data = {
              address,
              email,
              name,
              phoneNumber
            }
            const res = await CreateCompany(token, data);
            if(res===201){
              showForm(false);
              showToastMessage('Compañia creada exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              showToastMessageError(res);
            }
          }else{
            showToastMessageError('El telefono es obligatorio!!');
          }
        }
      } catch (error) {
        showToastMessageError('Error al crear Compañia!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/company.svg" subtitle="Ingresa los datos de la nueva empresa" 
            title="Nueva compañia"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name" 
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
          <Label htmlFor="address"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Dirección</p></Label>
          <Input type="text" name="address" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.address}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</p></Label>
          <Input type="email" name="email" 
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
          <Label htmlFor="phoneNumber"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Telefono</p></Label>
          <div className="w-full flex  justify-start items-center relative">
            <InputMask mask='9999999999'
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 pl-9 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
              type="phone" 
              placeholder="444 429 7227"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <DevicePhoneMobileIcon className="h-6 w-6 text-amber-400 hover:text-amber-500 absolute ml-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="logo"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Logotipo</p></Label>
          <UploadImage setFile={setFile} />
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}