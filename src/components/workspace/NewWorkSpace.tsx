'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
// import HeaderForm from "../HeaderForm"
import Button from '../Button';
import Label from '../Label';
import Input from '../Input';
import InputMask from 'react-input-mask';
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import { createWorkSpace } from '@/app/api/routeWorkspace';
import { createUser } from '@/app/api/routeUser';
import { IWorkSpace } from '@/interfaces/WorkSpaces';
import { UsrBack } from '@/interfaces/User';

export default function NewWorkSpace({handleIndex, handleEmail, handleWorkSpace, handleUser}: 
  {handleIndex:(value: number) => void, handleEmail:(value: string) => void, 
    handleWorkSpace:(value: IWorkSpace) => void, handleUser:(value: UsrBack) => void}) {

  const refRequest = useRef(true);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      location: '',
      email: '',
      password: '',
      confirmPassword: '',
    }, 
    validationSchema: Yup.object({
      location: Yup.string()
                  .required('La ubicación es obligatoria'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      lastname: Yup.string()
                  .required('Los apellidos son obligatorios'),
      password: Yup.string()
                  .required('La contraseña es obligatoria'),
      confirmPassword: Yup.string()
                  .required('La confirmacion es obligatoria'),
      email: Yup.string()
                  .required('El correo electrónico es obligatorio'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        refRequest.current = false;
        const {confirmPassword, email, lastname, 
          location, name, password} = valores;

        if (!aceptaTerminos) {
          refRequest.current = true;
          setError("Debes aceptar los términos y condiciones.");
          return;
        }

        if (!phoneNumber || phoneNumber.trim() === '') {
          refRequest.current = true;
          setErrorPhoneNumber("El teléfono es obligatorio.");
          return;
        }

        if (password !== confirmPassword) {
          refRequest.current = true;
          setErrorPassword("La contraseña y la confirmación deben coincidir.");
          return;
        }

        setError("");
        setErrorPhoneNumber("");
        setErrorPassword("");
        let phoneformat = phoneNumber.trim();
        phoneformat = phoneformat.replace(/\s+/g, '');
        phoneformat = phoneformat.replace('(+52)', '');

        const data = {
          name,
          surname:lastname,
          email,
          phoneNumber: phoneformat,
          location,
          isverificatedBankAccount:false,
          isverificatedPhone:false,
          isverificatedEmail:false,
          accepTermsAndConditions:aceptaTerminos,
          bankAccountStatus:"NO VALIDADO",    
          // "validTo":"2025-11-01 12:00",
          validFrom:new Date().toISOString(),
          condition: [
              {glossary:"6924da4f0d8d3a873b0dc47f"}
          ]
        }
        const res = await createWorkSpace(data);
        if(typeof(res)==='string'){
          refRequest.current = true;
          showToastMessageError(res);
        }else{
          refRequest.current = true;
          handleWorkSpace(res);
          showToastMessage('Espacio de trabajo creado satisfactoriamente!!');

          const userData={
            name: name+" "+lastname, 
            email, 
            password, 
            confirmpassword: confirmPassword, 
            rol:"660efa21f7bd2d031cae721c"
          }

          const resUser = await createUser(userData, '');
          if(typeof(resUser)==='string'){
            refRequest.current = true;
            // handleEmail(email);
            showToastMessageError("Error usuario " +resUser);
            handleIndex(2);
          }else{
            handleUser(resUser);
            handleEmail(email);
            refRequest.current = true;
            showToastMessage('Usuario creado exitosamente!!!');
            handleIndex(2);
          }
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    }
  });

  return (
    <div className='w-full h-full flex'>
      <div className=' hidden sm:flex justify-center items-center min-h-full flex-1 bg-cover bg-center bg-no-repeat'
        // style={{ backgroundImage: "url('/img/workspaces/2174.jpg')" }}
        style={{backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/img/workspaces/2174.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
      >
        <p className='text-5xl w-[600px] text-white'>Controla y gestiona tus proyectos con las variables financieras adecuadas, cajas chicas, cobranza, facturacion</p>
      </div>
      <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
        onSubmit={formik.handleSubmit}
      >

        <div className="border border-slate-400 p-2 rounded-md" style={{backgroundColor:'#F8FAFC'}}>
          <p className="text-xl">Crear nueva cuenta</p>
          <p className="text-gray-500 text-sm">Utiliza tu correo electrónico para crear una nueva cuenta.</p>
        </div>

        <div className='grid grid-cols-3 gap-x-3'>
          <div >
            <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
            <Input name="name" 
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

          <div className=' col-span-2'>
            <Label htmlFor="lastname"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Apellidos</p></Label>
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
        </div>

        <div>
          <Label htmlFor="location"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Ubicación</p></Label>
          <Input name="location" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.location}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.location}</p>
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
          <Label htmlFor="password"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Contraseña</p></Label>
          <Input name="password" 
            type='password'
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
          <Label htmlFor="confirmPassword"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Confirmar contraseña</p></Label>
          <Input name="confirmPassword" 
            type='password'
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.confirmPassword}</p>
            </div>
          ) : null}
          {errorPassword ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{errorPassword}</p>
            </div>
          ) : null}
        </div>

        <div className='mt-3 flex gap-x-1 items-center'>
          <div className="w-4 ml-2">
            <Input
              type="checkbox"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
            />
          </div>
          <Label>
            He leido y aceptado los <a href="/terminos" target="_blank" className='ml-1'> términos y condiciones</a>
          </Label>
        </div>
        {error ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{error}</p>
            </div>
          ) : null}

        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>

      </form>
    </div>
  )
}
