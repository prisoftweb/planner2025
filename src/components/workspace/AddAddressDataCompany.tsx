'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import HeaderForm from "../HeaderForm"
import Button from '../Button';
import Label from '../Label';
import Input from '../Input';
import TextArea from '../TextArea';
import { updateCompany } from '@/app/api/routeCompany';
import { Company } from '@/interfaces/Companies';
import { setCookie } from 'cookies-next';
import { UsrBack } from '@/interfaces/User';

export default function AddAddressDataCompany({handleIndex, company, user}: 
  {handleIndex:(value: number) => void, company:Company, user:UsrBack}) {

  const refRequest = useRef(true);
  
  const formik = useFormik({
    initialValues: {
      street: '',
      cp: '',
      community: '',
      municipy: '',
      state: '',
      country: '',
      notes: '',
    }, 
    validationSchema: Yup.object({
      street: Yup.string()
                  .required('La calle es obligatoria'),
      cp: Yup.string()
                  .required('El codigo postal es obligatorio'),
      community: Yup.string()
                  .required('La colonia es obligatoria'),
      municipy: Yup.string()
                  .required('El municipio es obligatorio'),
      state: Yup.string()
                  .required('El estado es obligatorio'),
      country: Yup.string()
                  .required('El pais es obligatorio'),
      notes: Yup.string()
                  .required('Las notas son obligatorias'),
    }),

    onSubmit: async valores => {
      sendData();
    }
  });

  const sendData = async () => {
    if(refRequest.current){
      const {community, country, cp, municipy, state, street, notes} = formik.values;
      const data = {
        location: {
          stret:street,
          cp,
          community,
          municipy,
          state,
          country,
          addressref: notes
        },
      }
      const res = await updateCompany(' ', data, company._id);
      if(res===200){
        showToastMessage('Compania actualizada satisfactoriamente!!!');
        setCookie('user', user);
        window.location.replace('/workspace')
      }else{
        refRequest.current = true;
        showToastMessageError(res);
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  return (
    <div className='w-full h-full flex justify-center'>
      <div className=' hidden sm:flex justify-center items-center min-h-full flex-1 bg-cover bg-center bg-no-repeat'
        // style={{ backgroundImage: "url('/img/workspaces/2174.jpg')" }}
        style={{backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/workspaces/2149764150.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
      >
        <div>
          <p className='text-5xl w-[600px] text-white'>Direccion de empresa</p>
          <p className='text-4xl w-[600px] text-white'>Ingresa la ubicación y domicilio de la compañia</p>
        </div>
      </div>
      <form className="z-10 w-full max-w-lg h-full min-h-screen bg-white space-y-5 py-3 md:py-5 px-3 md:px-12 right-0"
        onSubmit={formik.handleSubmit}
      >

        <div className="border border-slate-400 p-2 rounded-md" style={{backgroundColor:'#F8FAFC'}}>
          <p className="text-xl">Agregar dirección de compañia</p>
          <p className="text-gray-500 text-sm">Ingresa la dirección y ubicación de una compañia.</p>
        </div>

        <div>
          <Label htmlFor="street"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Calle y numero</p></Label>
          <Input name="street" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.street}
          />
          {formik.touched.street && formik.errors.street ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.street}</p>
            </div>
          ) : null}
        </div>

        <div className='grid grid-cols-2 gap-x-3'>
          <div>
            <Label htmlFor="community"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Colonia / Localidad</p></Label>
            <Input name="community" 
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.community}
            />
            {formik.touched.community && formik.errors.community ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.community}</p>
              </div>
            ) : null}
          </div>

          <div>
            <Label htmlFor="cp"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Código Postal</p></Label>
            <Input name="cp" 
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.cp}
            />
            {formik.touched.cp && formik.errors.cp ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.cp}</p>
              </div>
            ) : null}
          </div>

          <div>
            <Label htmlFor="municipy"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Municipio / Delegacion</p></Label>
            <Input name="municipy" 
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.municipy}
            />
            {formik.touched.municipy && formik.errors.municipy ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.municipy}</p>
              </div>
            ) : null}
          </div>

          <div>
            <Label htmlFor="state"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estado</p></Label>
            <Input name="state" 
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.state}</p>
              </div>
            ) : null}
          </div>

          <div>
            <Label htmlFor="country"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pais</p></Label>
            <Input name="country" 
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.country}</p>
              </div>
            ) : null}
          </div>

        </div>

        <div>
          <Label htmlFor="notes"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Referencias / Notas</p></Label>
          <TextArea name="notes" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.notes}
          />
          {formik.touched.notes && formik.errors.notes ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.notes}</p>
            </div>
          ) : null}
        </div>

        <div className="flex justify-center mt-2">
          {/* <Button type="button" onClick={sendData}>Guardar</Button> */}
          <Button type="submit" >Guardar</Button>
        </div>

      </form>
    </div>
  )
}
