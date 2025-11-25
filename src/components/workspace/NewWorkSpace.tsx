'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import HeaderForm from "../HeaderForm"
import Button from '../Button';
import Label from '../Label';
import Input from '../Input';

export default function NewWorkSpace() {

  const refRequest = useRef(true);

  const formik = useFormik({
    initialValues: {
      description: '',
      name: '',
      location: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria'),
      location: Yup.string()
                  .required('La descripcion es obligatoria'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        refRequest.current = false;
        const {description} = valores;
        // const data = {
        //   description,
        // }
        // const res = await createRelation(token, data);
        // if(res === 201){
        //   refRequest.current = true;
        //   showToastMessage('Relacion creada satisfactoriamente!!');
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 500);
        // }else{
        //   refRequest.current = true;
        //   showToastMessageError(res);
        // }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    }
  });

  return (
    <div className='w-screen h-screen flex'>
      <div className=' hidden md:flex justify-center items-center w-full bg-purple-600'>
        <p className='text-white text-lg'>Controla y gestiona tus proyectos con las variables financieras adecuadas, cajas chicas, cobranza, facturacion</p>
      </div>
      <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
        onSubmit={formik.handleSubmit}
      >
        <HeaderForm img="/img/glossary.svg" subtitle="Gestiona tus proyectos" 
          title="Planner"
        />

        <div className="ml-2">
          <p className="text-xl">Crear nueva cuenta</p>
          <p className="text-gray-500 text-sm">Utiliza tu correo electrónico para crear una nueva cuenta.</p>
        </div>

        <div>
          <Label htmlFor="location"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Ubicación</p></Label>
          <Input name="location" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.location}</p>
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description" 
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                focus:border-slate-700 outline-0 overflow-hidden resize-none"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.description}</p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>

      </form>
    </div>
  )
}
