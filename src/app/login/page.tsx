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
import { Resource2, Tree } from '@/interfaces/Roles';
import { getTree } from '../api/routeRoles';

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
          const dataToStore = { numRows: '10'};
          localStorage.setItem('myData', JSON.stringify(dataToStore));
          
          //console.log('res login => ', res);

          //const resPermission = getTree(res.token, res.data.user.tree._id);
          try {
            let tree: Tree = await getTree(res.token, '66bbc98153827ab3d270987a');
            
            console.log('res tree => ', tree);
            if(typeof(tree)==='string'){
              showToastMessage(tree);
            }else{
              showToastMessage(`Ha iniciado sesion exitosamente ${email}!`);            
              setCookie('token', res.token);
              setCookie('user', res.data.user);
              const {_id } = res.data.user;
              setCookie('id', _id);
              tree.resources.map((reso) => {
              console.log(reso.resource.name, ' => ', JSON.stringify(reso).length);
              setCookie(reso.resource.name, reso);
              });

              const clientCook = {
                "permission": {
                    "create": false,
                    "read": false,
                    "update": false,
                    "delete": false,
                    "export": false,
                    "print": false,
                    "select": false,
                    "filter": false,
                    "searchfull": false,
                    "readfull": true,
                    "search": false
                },
                "resource": {
                    "_id": "6601ee5997c47d2dafaa517d",
                    "name": "clients",
                    "description": "Ruta de clientes",
                    "title": "Clientes",
                    "id": "6601ee5997c47d2dafaa517d"
                },
                "status": true,
                "routes": [
                    {
                        "route": {
                            "_id": "6601ed1c97c47d2dafaa517a",
                            "name": "profile",
                            "description": "Perfil del cliente a detalle",
                            "title": "Perfil",
                            "id": "6601ed1c97c47d2dafaa517a"
                        },
                        "status": true,
                        "components": [
                            {
                                "component": {
                                    "_id": "6601efd66429d0a86b0cf10c",
                                    "name": "basicdata",
                                    "description": "Captura los datos basicos de un cliente",
                                    "title": "Datos basicos",
                                    "id": "6601efd66429d0a86b0cf10c"
                                },
                                "status": true,
                                "_id": "660ef850f7bd2d031cae71d9",
                                "id": "660ef850f7bd2d031cae71d9"
                            },
                            {
                                "component": {
                                    "_id": "6601effa6429d0a86b0cf110",
                                    "name": "address",
                                    "description": "Captura la direccion de un cliente",
                                    "title": "Direccion",
                                    "id": "6601effa6429d0a86b0cf110"
                                },
                                "status": true,
                                "_id": "660ef850f7bd2d031cae71da",
                                "id": "660ef850f7bd2d031cae71da"
                            },
                            {
                                "component": {
                                    "_id": "6601eb9c97c47d2dafaa5175",
                                    "name": "resume",
                                    "description": "Ver resumen completo de clientes",
                                    "title": "Resumen",
                                    "id": "6601eb9c97c47d2dafaa5175"
                                },
                                "status": true,
                                "_id": "660ef850f7bd2d031cae71dc",
                                "id": "660ef850f7bd2d031cae71dc"
                            },
                            {
                                "component": {
                                    "_id": "6601f0076429d0a86b0cf112",
                                    "name": "contact",
                                    "description": "Mouestra y manipula los contactos de un cliente",
                                    "title": "Contactos",
                                    "id": "6601f0076429d0a86b0cf112"
                                },
                                "status": true,
                                "_id": "66ba9e360600ee65ccc0841d",
                                "id": "66ba9e360600ee65ccc0841d"
                            },
                            {
                                "component": {
                                    "_id": "6601efea6429d0a86b0cf10e",
                                    "name": "aditionaldata",
                                    "description": "Captura los datos adicionales de un cliente",
                                    "title": "Datos adicionales",
                                    "id": "6601efea6429d0a86b0cf10e"
                                },
                                "status": true,
                                "_id": "66ba9e7e0600ee65ccc085f6",
                                "id": "66ba9e7e0600ee65ccc085f6"
                            },
                        ],
                        "_id": "660ef649f7bd2d031cae7116",
                        "id": "660ef649f7bd2d031cae7116"
                    },
                ],
                "_id": "660ef649f7bd2d031cae7115",
                "id": "660ef649f7bd2d031cae7115"
            }

              console.log('cleints cook => ', JSON.stringify(clientCook));
              setCookie('clients', clientCook);

              setTimeout(() => {                
                router.push(
                  '/'
                );
              }, 300);
            }
          } catch (error) {
            showToastMessage(`Ha ocurrido un problema al obtener permisos de usuario!!!`);
          }
        } else {
          showToastMessageError(res);
        }
      }
  });
  
  return (        
    <div className='p-2 sm:p-3 md-p-5 lg:p-0'>      
      <div className="flex justify-center mt-0">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-3 sm:px-8 pt-2 pb-8 mb-4"
            onSubmit={formik.handleSubmit}>
            <a className='py-2 w-full flex justify-center'
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            >
              <img src='/img/Palaciosconstrucciones horizontal.svg' alt='Logo' 
                className='h-60' />         
            </a>
            <label htmlFor="email" className="relative block mt-0 pb-0 border-b-2 border-gray-400">
              <EnvelopeIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-1 text-gray-400" />
              <input 
                type="email" 
                name="email" 
                id="email" 
                autoFocus
                placeholder="tucorreo@gmail.com" 
                className="form-input w-full pl-10 text-xs py-1 sm:text-base outline-none outline-0 mt-2 border-0"
                onChange={formik.handleChange}
                onBlur={formik.handleChange} 
              />
            </label>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
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
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
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
