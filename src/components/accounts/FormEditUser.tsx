"use client"

import Image from 'next/image'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert, {showToastMessage, showToastMessageError} from "@/components/Alert";
import { updateMeUser } from '@/app/api/routeUser';
import { useState } from "react";
import { useRouter } from 'next/navigation';
//import { setCookie } from 'cookies-next';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';

export default function FormEditUser({usr, token} : {usr:any, token: string}){
  const photo:string = usr.photo;
  const nameU:string = usr.name;
  const emailU:string = usr.email;
  const _id = usr._id;
  const [file, setFile] : any = useState();
  
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email:emailU,
      name:nameU,
      photo:'',      
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      //const {email, name, photo } = valores;                        
      const {email, name} = valores;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', file);      
      
      let res = await updateMeUser(_id, formData, token);
      //console.log('res =>', res)
      if(typeof(res) === 'string'){
        showToastMessageError(res);
      }else{
        if(res.status === 200) {
          showToastMessage(`Usuario ${name} modificado exitosamente!`);            
          //setCookie('user', res.data.data.user);
          setTimeout(() => {
            //setBandUpdate(true);
            router.refresh();
            router.push('/');
          }, 1000)
        } else {
          showToastMessageError('Error al modificar usuario..');
        }
      }
    },       
  });
  const onFileChange = (e: any) => {

      if(e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if(file.type.includes("image")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          setFile(file);
        } else {
          showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
        }
      }
  }

  return (
    <>
      <Alert />
      <form className="bg-white rounded shadow-md px-8 pt-6 pb-3" encType="multipart/form-data" onSubmit={formik.handleSubmit}>                            
        <div className="mb-4">
          <Label htmlFor='name'>Nombre</Label>
          <Input 
            id="name" type="text"                                
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
        <div className="mb-4 text-gray-700">
          <Label htmlFor='email'>Usuario/Email</Label>
          <Input 
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.email}</p>
            </div>
        ) : null}
        <div className="space-y-1 justify-center">
          <div className="shrink-0 self-center">
              <Label htmlFor='photo'>Foto</Label>
              <div className='flex'>
                <Image    
                    className="rounded-full"                      
                    src={photo}
                    alt={nameU}
                    width={56}
                    height={56}                                    
                    priority={true}                                    
                />
                <div className='border rounded-md border-gray-200 relative p-4 w-5/6'>
                  <input 
                    type="file" 
                    id="photo" 
                    name="photo" 
                    onChange={onFileChange}
                    onBlur={formik.handleChange}
                    className="opacity-0 absolute inset-0	">                                            
                  </input>
                  <p className='text-center	'>Cambiar Foto</p>
                </div>  
              </div>
          </div>
        </div>
        <div className='flex justify-center mt-2'>
          <Button type='submit'>Guardar</Button>
        </div>
      </form>
    </>      
  );
}
