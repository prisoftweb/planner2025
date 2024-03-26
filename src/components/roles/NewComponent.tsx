'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { createComponent } from "@/app/api/routeRoles"
// import { useRouter } from "next/navigation"
// import Select from 'react-select'
// import { Options } from "@/interfaces/Common"

export default function NewComponent({showForm, token}: 
                    {showForm:Function, token:string}){
  
  // const router = useRouter();

  // const optionsRoute= [
  //   {
  //     value: '/clients',
  //     label: '/clients',
  //   },
  //   {
  //     value: '/users',
  //     label: '/users',
  //   }
  // ]  

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
    }),

    onSubmit: async valores => {
      try {
        const res = await createComponent(token, valores);
        if(res===201){
          showForm(false);
          showToastMessage('Componente creado exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        showToastMessageError('Error al crear Componente!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos para guardar un nuevo componente" 
            title="Agregar nuevo componente"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        {/* <Label htmlFor="route"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Ruta</p></Label>
        <Select
          className='w-full max-w-md' 
          options={optionsRoute}
          maxMenuHeight={250}
          placeholder='Buscar ...'
          //onChange={(value:any) => onChange(value.value)}
        />

        <Label htmlFor="subpath"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Subruta</p></Label>
        <Select
          className='w-full max-w-md' 
          options={optionsRoute}
          maxMenuHeight={250}
          placeholder='Buscar ...'
          //onChange={(value:any) => onChange(value.value)}
        /> */}

        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <Input type="text" name="name" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
        <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripci&oacute;n</p></Label>
        <Input type="description" name="description" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.description}</p>
          </div>
        ) : null}
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}