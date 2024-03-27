'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { createRoute } from "@/app/api/routeRoles"

export default function NewSubPath({showForm, token}: 
                    {showForm:Function, token:string}){
  
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      title: '',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
      title: Yup.string()
                  .required('El titulo es obligatorio!!'),
    }),

    onSubmit: async valores => {
      try {
        const res = await createRoute(token, valores);
        if(res===201){
          showForm(false);
          showToastMessage('Ruta creada exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        showToastMessageError('Error al crear Ruta!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Agregar nueva ruta de hoja de segmento" 
            title="Agregar nueva ruta"
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
        <Label htmlFor="title"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Titulo</p></Label>
        <Input type="text" name="title" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.title}</p>
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
          <Button type="submit" >Guardar</Button>
        </div>
      </form>
    </>
  )
}