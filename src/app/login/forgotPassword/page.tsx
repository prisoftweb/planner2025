"use client"

import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '@/app/api/routeUser';
import Alert, {showToastMessage,showToastMessageError} from "@/components/Alert"
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

export default function Forgot(){
  
	const formik = useFormik({
    initialValues: {
      email:''                        
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                  .required('Favor de ingresar su correo electronico')
                  .email('El email no es valido')            
    }),    
    onSubmit: async (valores, {resetForm}) => {                        
      
			const { email } = valores;
				
			let res = await forgotPassword(email);
			resetForm();            
			if(res != undefined)
				if(res === 201) {
					showToastMessage('Varifica tu correo para reestablecer el password');                
				} else {
					showToastMessageError(res);
				}                            
    }
  });

  return (
    <div className='p-2 sm:p-3 md-p-5 lg:p-10 mt-10 flex flex-col items-center space-y-10'>
      <Alert></Alert>            
      <form className=" w-11/12 sm:w-2/3  md:w-1/2 lg:w-1/3  bg-white rounded shadow-md px-3 sm:px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}>                 
        <div className='flex rounded-full'>
					<div>
						<EnvelopeOpenIcon
						 className="h-18 w-12 text-gray-400"
						/>
					</div>
					<div>
						<h2 className="justify-center text-xl text-black-900 font-display font-light lg:text-left xl:text-2xl xl:text-normal">Olvidaste tu contraseña?</h2>
						<h2 className="justify-center text-sm text-gray-600 font-display font-thin lg:text-left xl:text-md xl:text-ligth pb-5">Recuperacion de contraseña (valido por 10 mins)</h2>
					</div>
				</div>
        <div className="md:flex mb-4">
          <div className="md:flex-1 md:pr-3 md:w-2/3">
            <label className="block text-gray-500 text-base  mb-2 font-sans " htmlFor="email">
              Correo electronico
            </label>
            <div className="flex justify-start items-center relative">
              <input 
                className="shadow appearance-none border lowercase rounded w-full py-2 px-3 
                          text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 
                          focus:ring-blue-600 outline-0 outline-none"
                id="email"
                type="email"
                value={formik.values.email}
                placeholder="Email cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}>
              </input>
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-10">
          <Button type='submit'>Enviar</Button>
        </div>    
        <p className='text-xs font-sans font-thin mt-5'>INGRESE LA DIRECCIÓN DE CORREO ELECTRÓNICO QUE UTILIZA
					PARA INICIAR SESION, SE VERIFICARA SU CUENTA DE USUARIO Y
					LE ENVIAREMOS UN ENLACE PARA RESTABLECER LA
					CONTRASEÑA VALIDO DURANTE 10 MINUTOS
				</p>
        
        <div className='flex flex-1 flex-wrap items-end space-x-8 justify-between'>
          <p className='text-sm font-sans  mt-5'>¿Ya tienes una cuenta?</p>
          <Link className='flex mx-0 order-last flex-row-reverse mr-1 text-emerald-400 font-bold text-base tracking-wide truncate align-middle' href="/login">
            Iniciar sesion
          </Link>
        </div>

      </form>
    </div>         
  )
}