'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useRef } from "react"
import Button from '../Button';
import Label from '../Label';
import Input from '../Input';
import { findCODEVALIDATION } from '@/app/api/routeWorkspace';

export default function CodeWorkSpaceValidation({handleIndex, emailUser}: 
  {handleIndex:(value: number) => void, emailUser:string}) {

  const refRequest = useRef(true);
  
  const formik = useFormik({
    initialValues: {
      email: emailUser,
      code: '',
    }, 
    validationSchema: Yup.object({
      code: Yup.string()
                  .required('El codigo es obligatorio'),
      email: Yup.string()
                  .required('El correo electrónico es obligatorio'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        refRequest.current = false;
        const {code, email} = valores;
        
        const res = await findCODEVALIDATION(code, email);
        if(typeof(res)==='string'){
          refRequest.current = true;
          showToastMessageError(res);
        }else{
          if(res===200){
            refRequest.current = true;
            showToastMessage('Codigo validado exitosamente!!!');
            handleIndex(3);
          }else{
            refRequest.current = true;
            showToastMessageError('Codigo no valido, intente de nuevo!!!');
          }
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    }
  });

  return (
    <div className='w-full h-screen flex'>
      <div className=' hidden sm:flex justify-center items-center min-h-full flex-1 bg-cover bg-center bg-no-repeat'
        // style={{ backgroundImage: "url('/img/workspaces/61380.jpg')" }}
        style={{backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/workspaces/61380.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
      >
        <div>
          <p className='text-2xl w-96 text-white'>Verifica tu identidad</p>
          <p className='text-lg w-96 text-white'>Hemos enviado un correo electrónico con tu código a: {" "+emailUser}</p>
        </div>
      </div>
      <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
        onSubmit={formik.handleSubmit}
      >
        <div className="ml-2">
          <p className="text-xl">Ingresar codigo</p>
          <span className="text-gray-500 text-sm">Revisa tu correo electronico </span>
          <span className="text-gray-700 text-sm"> {emailUser} </span>
          <span className="text-gray-500 text-sm"> e ingresa el codigo recibido </span>
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
          <div className='flex justify-between items-center'>
            <p className='text-xs text-slate-500'>No he recibido codigo?</p>
            <p className='text-xs text-blue-600 cursor-pointer'>Reenviar codigo</p>
          </div>
          <Label htmlFor="code"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Codigo</p></Label>
          <Input name="code" 
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.code}
            autoFocus
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.code}</p>
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
