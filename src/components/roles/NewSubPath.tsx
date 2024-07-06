'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { createRoute, updateRoute } from "@/app/api/routeRoles"
import { Resource } from "@/interfaces/Roles"
//import TextArea from "../TextArea"
import { useRef } from "react"

export default function NewSubPath({showForm, token, route}: 
                    {showForm:Function, token:string, route:Resource}){

  const refRequest = useRef(true);
  const formik = useFormik({
    initialValues: {
      name: route.name,
      description: route.description,
      title: route.title,
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
      if(refRequest.current){
        refRequest.current = false;
        if(route.id === ''){
          try {
            const res = await createRoute(token, valores);
            if(res===201){
              refRequest.current = true;
              showForm(false);
              showToastMessage('Ruta creada exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              refRequest.current = true;
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Error al crear Ruta!!');
          }
        }else{
          try {
            const res = await updateRoute(token, route.id, valores);
            if(res===200){
              refRequest.current = true;
              showForm(false);
              showToastMessage('Ruta actualizada exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              refRequest.current = true;
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Error al actualizar Ruta!!');
          }
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!')
      }
    }
  });

  return(
    <>
      <form className="z-10 top-16 fixed bg-white space-y-5 p-3 right-0 h-full"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/route.svg" subtitle="Agregar nueva ruta de hoja de segmento" 
            title="Agregar nueva ruta"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name" 
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
        <div>
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
        </div>
        <div>
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripci&oacute;n</p></Label>
          <textarea 
            name="description"
            className="border border-gray-200 rounded-lg w-full px-0 text-sm text-gray-900 bg-white dark:bg-gray-800 
              focus:ring-0 dark:text-white dark:placeholder-gray-400 my-2"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.description}
            rows={4}
          />
          {/* <TextArea name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.description}
          /> */}
          {/* <Input type="description" name="description" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.description}
          /> */}
          {formik.touched.description && formik.errors.description ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.description}</p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit" >Guardar</Button>
        </div>
      </form>
    </>
  )
}