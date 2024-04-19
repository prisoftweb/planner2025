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

export default function GuaranteeProject({token, id, project}:
                              {token:string, id:string, project:Project}){
  
  const [startDate, setStartDate] = useState(project.guaranteefund?.date || '');

  const formik = useFormik({
    initialValues: {
      percentage: project.guaranteefund?.porcentage || '',
    }, 
    validationSchema: Yup.object({
      percentage: Yup.string()
                  .required('El porcentaje de avance es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      const {percentage} = valores;
      const data = {
        guaranteefund: {
          porcentaje: percentage,
          date: startDate
        }
      }
      try {
        const res = await UpdateProject(token, id, data);
        if(res===200){
          showToastMessage('Proyecto actualizado satisfactoriamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar el proyecto!!');
      }
    },       
  });

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.jpg" subtitle="Ingresa datos del proyecto" 
        title="Modificar proyecto"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <Label htmlFor="percentage"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentaje</p></Label>
        <Input type="text" name="percentage" 
          value={formik.values.percentage}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.percentage && formik.errors.percentage ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.percentage}</p>
            </div>
        ) : null}
        <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
        <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}}  
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                focus:border-slate-700 outline-0"
        />
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>  
    </div>
  )
}