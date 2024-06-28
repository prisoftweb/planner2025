'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect } from "react"
//import { GlossaryTable } from "@/interfaces/Glossary"
import { Workflow } from "@/interfaces/Workflows"
import { createWorkFlow } from "@/app/api/routeWorkflows"

export default function NewWorkFlow({showForm, token, workFlow}: 
                    {showForm:Function, token:string, workFlow: (Workflow | string)}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  const formik = useFormik({
    initialValues: {
      title: (typeof(workFlow)==='string')? '': workFlow.title,
      description: (typeof(workFlow)==='string')? '': workFlow.description,
    }, 
    validationSchema: Yup.object({
      title: Yup.string()
                  .required('El titulo es obligatorio'),
      description: Yup.string()
                  .required('La descripcion es obligatoria'),
    }),

    onSubmit: async valores => {
      try {
        const {description, title} = valores;
        const data = {
          description,
          title,
        }
        const res = await createWorkFlow(token, data);
        if(res === 201){
          showToastMessage('WorkFlow creado satisfactoriamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Error al crear workflow!!!');
      }
    }
  });

  return(
    <>
      <form className="z-10 w-full max-w-md top-16 absolute bg-white space-y-5 p-3 right-0"
        onSubmit={formik.handleSubmit}
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/glossary.svg" subtitle="Agregar nuevo workflow" 
            title="Agregar nuevo workflow"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="title"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Title</p></Label>
          <Input type="text" name="title" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.title}
            autoFocus
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.title}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description" 
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                focus:border-slate-700 outline-0 overflow-hidden resize-none"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.description}
            rows={4}
          />
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