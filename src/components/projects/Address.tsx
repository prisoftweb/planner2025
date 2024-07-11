import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
//import { useState } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { OneProjectMin } from "@/interfaces/Projects";
import { UpdateProject } from "@/app/api/routeProjects";
import { useRef } from "react";

export default function Address({token, id, project}: 
        {token:string, id:string, project:OneProjectMin}){

  const refRequest = useRef(true);
  const formik = useFormik({
    initialValues: {
      stret: project.location?.stret || '',
      community: project.location?.community || '',
      cp: project.location?.cp?.toString() || '',
      municipy: project.location?.municipy,
      stateA: project.location?.state,
      country: project.location?.country,
    }, 
    validationSchema: Yup.object({
      // stret: Yup.string()
      //             .required('La calle y numero son obligatorios!!'),
      // community: Yup.string()
      //             .required('El colonia es obligatoria'),
      // cp: Yup.string()
      //             .required('El codigo postal es obligatorio'),
      municipy: Yup.string()
                  .required('El municipio es obligatorio'),
      stateA: Yup.string()
                  .required('El estado es obligatorio'),
    }),
    onSubmit: async (valores) => {         
      if(refRequest.current){
        refRequest.current = false;
        const {community, country, cp, municipy, stateA, stret} = valores;
        const data = {
          location: {
            community, 
            country, 
            cp,
            municipy, 
            state: stateA,
            stret
          }
        }
        try {
          const res = await UpdateProject(token, id, data);
          if(res===200){
            refRequest.current = true;
            showToastMessage('Proyecto actualizado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un problema al actualizar el proyecto!!');
        }
      }else{
        showToastMessageError('Ya hay una peticion en proceso..!!!');
      }
    },       
  });
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.jpg" subtitle="Ingresa datos del proyecto" 
        title="Modificar proyecto"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="stret"><p className="">Calle y numero</p></Label>
          <Input type="text" name="stret" autoFocus 
            value={formik.values.stret}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.stret && formik.errors.stret ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.stret}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="community"><p className="">Colonia</p></Label>
          <Input type="text" name="community" 
            value={formik.values.community}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.community && formik.errors.community ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.community}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="cp"><p className="">CP</p></Label>
          <Input type="text" name="cp" 
            value={formik.values.cp}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.cp && formik.errors.cp ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.cp}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="municipy"><p className="">Municipio</p></Label>
          <Input type="text" name="municipy" 
            value={formik.values.municipy}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.municipy && formik.errors.municipy ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.municipy}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="stateA"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estado</p></Label>
          <Input type="text" name="stateA" 
            value={formik.values.stateA}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.stateA && formik.errors.stateA ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.stateA}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="country"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pais</p></Label>
          <Input type="text" name="country" 
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.country && formik.errors.country ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.country}</p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>  
    </div>
  )
}