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
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GuaranteeProject({token, id, project}:
                              {token:string, id:string, project:Project}){
  
  const [startDate, setStartDate] = useState(project.guaranteefund?.date.substring(0,10) || '');

  const formik = useFormik({
    initialValues: {
      percentage: project.guaranteefund?.porcentage || '',
      amount: project.guaranteefund?.amount || '',
    }, 
    validationSchema: Yup.object({
      percentage: Yup.string()
                  .required('El porcentaje de avance es obligatorio'),
      amount: Yup.string()
                  .required('El monto es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      const {percentage, amount} = valores;
      const amo = amount.toString().replace(/[$,]/g, "");
      const data = {
        guaranteefund: {
          porcentage: percentage,
          date: startDate,
          amount: amo
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
        <div>
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
        </div>
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto de fondo</p></Label>
          <CurrencyInput
            id="amount"
            name="amount"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            //value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            placeholder="Please enter a number"
            defaultValue={project.guaranteefund?.amount || 0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) =>formik.values.amount=value || ''}
            // onValueChange={(value, name, values) => {console.log(value, name, values); formik.values.amount=value || ''}}
          />
          {formik.touched.amount && formik.errors.amount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.amount}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <DatePicker
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0" 
            //showIcon
            selected={new Date(startDate)} onChange={(date:Date) => {
                setStartDate(date.toDateString())}} 
          />
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>  
    </div>
  )
}