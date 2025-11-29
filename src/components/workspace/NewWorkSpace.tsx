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
import { createUser } from '@/app/api/routeUser';

export default function NewWorkSpace() {

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
      // phone: '',
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
      // phone: Yup.string()
      //             .required('El teléfono es obligatorio'),
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
          console.log('phoneNumber vacio => ', phoneNumber);
          refRequest.current = true;
          setErrorPhoneNumber("El teléfono es obligatorio.");
          return;
        }

        if (password !== confirmPassword) {
          refRequest.current = true;
          console.log('passwords no coinciden');
          setErrorPassword("La contraseña y la confirmación deben coincidir.");
          return;
        }

        console.log('phone => ', phoneNumber);

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
          // "validFrom":"2025-12-01 12:00",
          condition: [
              {glossary:"6924da4f0d8d3a873b0dc47f"}
          ]
        }
        const res = await createWorkSpace(data);
        if(typeof(res)==='string'){
          refRequest.current = true;
          showToastMessageError(res);
        }else{
          console.log('res => new ws', res);
          refRequest.current = true;
          showToastMessage('Espacio de trabajo creado satisfactoriamente!!');

          const userData={
            name, 
            email, 
            password, 
            confirmpassword: confirmPassword, 
            rol:"66147eacaac7bddd90d24ee1"
          }

          const resUser = await createUser(userData, '');
          if(typeof(resUser)==='string'){
            refRequest.current = true;
            showToastMessageError(resUser);
          }else{
            refRequest.current = true;
            showToastMessage('Usuario creado exitosamente!!!');
          }
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    }
  });

  return (
    <div className='w-full h-full flex'>
      <div className=' hidden sm:flex justify-center items-center w-full bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/img/workspaces/2174.jpg')" }}
      >
        <p className='text-2xl w-96'>Controla y gestiona tus proyectos con las variables financieras adecuadas, cajas chicas, cobranza, facturacion</p>
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

        <div className='grid grid-cols-3 gap-x-3'>
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

        {/* <div>
          <Label htmlFor="phone"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Telefono</p></Label>
          <Input name="phone" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.phone}</p>
            </div>
          ) : null}
        </div> */}

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
            He leido y aceptado los <a href="/terminos" target="_blank">términos y condiciones</a>
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
