'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { createComponent, updateComponent } from "@/app/api/routeRoles"
import { Resource } from "@/interfaces/Roles"
import TextArea from "../TextArea"

export default function NewComponent({showForm, token, component}: 
                    {showForm:Function, token:string, component:Resource}){

  const formik = useFormik({
    initialValues: {
      name: component.name,
      description: component.description,
      title: component.title,
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
      if(component.id === ''){
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
      }else{
        try {
          const res = await updateComponent(token, component.id, valores);
          if(res===200){
            showForm(false);
            showToastMessage('Componente actualizado exitosamente!!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        } catch (error) {
          showToastMessageError('Error al actualizar Componente!!');
        }
      }
    }
  });

  return(
    <>
      <form className="z-10 top-16 fixed bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/component.svg" subtitle="Datos para guardar un nuevo componente" 
            title="Agregar nuevo componente"
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
          <TextArea name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.description}
          />
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
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}