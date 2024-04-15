'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState } from "react"
import { HexColorPicker } from "react-colorful";
import { CreateGlossary, UpdateGlossary } from "@/app/api/routeGlossary"
import { GlossaryTable } from "@/interfaces/Glossary"

export default function NewGlossary({showForm, token, glossary}: 
                    {showForm:Function, token:string, glossary: (GlossaryTable | string)}){
  
  const [color, setColor] = useState(typeof(glossary)==='string'? "#b32aa9": glossary.color);

  const formik = useFormik({
    initialValues: {
      name: (typeof(glossary)==='string')? '': glossary.name,
      description: (typeof(glossary)==='string')? '': glossary.description,
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      description: Yup.string()
                  .required('La descripcion es obligatoria'),
    }),

    onSubmit: async valores => {
      try {
        const {description, name} = valores;
        const data = {
          description,
          name,
          color
        }
        if(typeof(glossary)==='string'){
          const res = await CreateGlossary(token, data);
          if(res===201){
            showToastMessage('Glosario agregado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        }else{
          const res = await UpdateGlossary(token, glossary.id, data);
          if(res===200){
            showToastMessage('Glosario actualizado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        }
      } catch (error) {
        showToastMessageError('Error al crear glosario!!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Agregar nuevos status, categorys, types" 
            title="Agregar nuevo glosario"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
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
        <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
        <textarea name="description" 
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0 overflow-hidden resize-none"
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.description}
          rows={2}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.description}</p>
          </div>
        ) : null}
        <Label htmlFor="color"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Color</p></Label>
        <div className="flex gap-x-1" >
          <HexColorPicker color={color} onChange={setColor} />
          <div className="w-12 h-12" style={{backgroundColor:color}}></div>
        </div>
        {/* <div className="flex items-center gap-x-1" >
          <div className="w-12 h-12" style={{backgroundColor:color}}></div>
          Color seleccionado {color}
        </div> */}
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}