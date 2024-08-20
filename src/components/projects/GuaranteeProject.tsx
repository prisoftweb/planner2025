import HeaderForm from "../HeaderForm"
import Label from "../Label"
//import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useRef } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { OneProjectMin } from "@/interfaces/Projects";
import { UpdateProject } from "@/app/api/routeProjects";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useOneProjectsStore } from "@/app/store/projectsStore";
import { ParseProjectToOneProjectMin } from "@/app/functions/SaveProject";

export default function GuaranteeProject({token, id, project}:
                              {token:string, id:string, project:OneProjectMin}){
  
  const {oneProjectStore, updateOneProjectStore} = useOneProjectsStore();
  
  const [startDate, setStartDate] = useState(oneProjectStore?.guaranteefund?.date.substring(0, 10) || 
                      project.guaranteefund?.date.substring(0,10) || '');
  const refRequest = useRef(true);

  const formik = useFormik({
    initialValues: {
      percentage: oneProjectStore?.guaranteefund?.porcentage || project.guaranteefund?.porcentage || '',
      amount: oneProjectStore?.guaranteefund?.amount || project.guaranteefund?.amount || '',
    }, 
    validationSchema: Yup.object({
      percentage: Yup.string()
                  .required('El porcentaje de avance es obligatorio'),
      amount: Yup.string()
                  .required('El monto es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      if(refRequest.current){
        refRequest.current = false;
        const {percentage, amount} = valores;
        const amo = amount.toString().replace(/[$,%]/g, "");
        const data = {
          guaranteefund: {
            porcentage: percentage.replace(/[$,%,]/g, ""),
            date: startDate,
            amount: amo
          }
        }
        try {
          const res = await UpdateProject(token, id, data);
          if(typeof(res)!=='string'){
            refRequest.current = true;
            const r = ParseProjectToOneProjectMin(res);
            updateOneProjectStore(r);
            showToastMessage('Proyecto actualizado satisfactoriamente!!');
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un problema al actualizar el proyecto!!');
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso..!!!');
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
          <CurrencyInput
            id="percentage"
            name="percentage"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            //value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            //placeholder="Please enter a number"
            // defaultValue={0}
            defaultValue={formik.values.percentage}
            decimalsLimit={2}
            //prefix="%"
            suffix="%"
            onValueChange={(value) =>formik.values.percentage=value || ''}
            // onValueChange={(value, name, values) => {console.log(value, name, values); formik.values.amount=value || ''}}
          />
          {/* <Input type="text" name="percentage" 
            value={formik.values.percentage}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          /> */}
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