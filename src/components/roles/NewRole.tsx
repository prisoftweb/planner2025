'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useRouter } from "next/navigation"
import { createRole } from "@/app/api/routeRoles"
import { useState, useEffect } from "react"
import { getTrees } from "@/app/api/routeRoles"
import TextArea from "../TextArea"

export default function NewRole({showForm, token}: 
                    {showForm:Function, token:string}){
  
  const router = useRouter();

  const [idTree, setIdTree] = useState<string>('');
  useEffect(() => {
    const getTree = async() => {
      const res = await getTrees(token);
      if(typeof(res)==='string'){
        return <h1 className="text-red-500 text-center text-lg">{res}</h1>
      }
      setIdTree(res[0]._id);
    }
    getTree();
  }, [])

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
        const res = await createRole(token, valores, idTree);
        if(res===201){
          showForm(false);
          showToastMessage('Rol creado exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        showToastMessageError('Error al crear Rol!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Ingresa nuevo rol para usuarios" 
            title="Nuevo rol"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
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
        <TextArea name="description"
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