"use client"

import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setLogin } from '../api/routeUser';
import {showToastMessage, showToastMessageError} from "@/components/Alert";
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';

export default function Login({}) {
  const router = useRouter();
  const formik = useFormik({
      initialValues: {
        email:'',
        password:''
      }, 
      validationSchema: Yup.object({
        email: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
        password: Yup.string()
                    .required('El password es obligatorio')
      }),
  
      onSubmit: async valores => {
        const { email, password } = valores;
        let res = await setLogin(email, password);
        if(res.status === 'success') {
          showToastMessage(`Ha iniciado sesion exitosamente ${email}!`);            
          setCookie('token', res.token);
          setCookie('user', res.data.user);
          const {_id } = res.data.user;
          setCookie('id', _id);
          setCookie('config', {numRows:3})
          setTimeout(() => {                
            router.push(
              '/'
            );
          }, 1000);
        } else {
          showToastMessageError(res);
        }
      }
  });
  
  return (        
    <div>      
      {/* <Alert></Alert> */}
      <div className="flex justify-center mt-12">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-3 sm:px-8 pt-2 pb-8 mb-4"
            onSubmit={formik.handleSubmit}>
            <a className='py-2 w-full flex justify-center'
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            >
              <img src='/logoActualizado.jpg' alt='Logo' className='' />         
            </a>
            <label htmlFor="email" className="relative block mt-10 pb-2 border-b-2 border-gray-400">
              <EnvelopeIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-1 text-gray-400" />
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="tucorreo@gmail.com" 
                className="form-input w-full pl-10 text-xs py-1 sm:text-base outline-none outline-0 mt-2 border-0"
                onChange={formik.handleChange}
                onBlur={formik.handleChange} 
              />
            </label>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <div className="relative mt-4 mb-8 pb-2 border-b-2 border-emerald-400">
              <LockClosedIcon className="pointer-events-none mt-2 w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-1 text-emerald-400" />
              <input 
                type="password" 
                id="password" 
                placeholder="*****" 
                className="form-input w-full pl-10 text-xs sm:text-base border-0 outline-none outline-0 mt-6"
                onChange={formik.handleChange}
                onBlur={formik.handleChange} 
              />
            </div>
            <div className="mb-4">
              <div className='flex flex-wrap justify-center'>
                <Link className='flex mt-4 mx-0 order-last flex-row-reverse mr-1 text-emerald-400 text-sm tracking-wide truncate align-middle' href="/login/forgotPassword">
                  Olvido password ?
                </Link>                                    
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <div className="mt-10 flex justify-center">
              <Button type='submit'>Entrar</Button>
              {/* <button className="flex w-40 sm:w-full ease-in-out duration-300 rounded-lg justify-around bg-blue-950 sm:px-5 py-2 text-sm text-white transition-colors hover:bg-blue-500" type="submit">
                <LockClosedIcon className="h-8 sm:h-14 w-10 text-white"  />
                <p className='sm:mt-4 text-2xl font-bold mr-5 sm:mr-20'>Entrar</p>
              </button> */}
            </div>                            
          </form>
        </div>
      
      </div>  
    </div>
  );
}