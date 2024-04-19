import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { Project } from "@/interfaces/Projects";
import { UpdateProject } from "@/app/api/routeProjects";

export default function DataBasic({token, id, project}: 
                                  {token:string, id:string, project:Project}){
  
  const formik = useFormik({
    initialValues: {
      name: project.title,
      keyProject: project.code,
      description: project.description,
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      keyProject: Yup.string()
                  .required('La clave es obligatoria'),
    }),
    onSubmit: async (valores) => {            
      const {name, description, keyProject} = valores;
      const data= {
        title: name, 
        description,
        code: keyProject,
      }
      try {
        const res = await UpdateProject(token, id, data);
        if(res===200){
          showToastMessage('El proyecto ha sido actulizado satisfactoriamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar proyecto!!');
      }
    },       
  });

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.jpg" subtitle="Ingresa datos del proyecto" 
        title="Modificar proyecto"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <Input type="text" name="name" autoFocus 
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
        <Label htmlFor="keyProject"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Clave</p></Label>
        <Input type="text" name="keyProject" 
          value={formik.values.keyProject}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.keyProject && formik.errors.keyProject ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.keyProject}</p>
            </div>
        ) : null}
        <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
        <textarea name="description"
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
           focus:border-slate-700 outline-0 overflow-hidden resize-none"
           rows={4} 
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.description}</p>
          </div>
        ) : null}
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>         
        </div>
      </form>  
    </div>
  )
}