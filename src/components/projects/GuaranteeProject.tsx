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
  const [hasCharge, setHasCharge] = useState<boolean>(oneProjectStore?.hasamountChargeOff || project.hasamountChargeOff || false);

  const formik = useFormik({
    initialValues: {
      percentage: oneProjectStore?.guaranteefund?.porcentage || project.guaranteefund?.porcentage || '',
      amount: oneProjectStore?.guaranteefund?.amount || project.guaranteefund?.amount || '',
      percentajeCharge: oneProjectStore?.amountChargeOff?.porcentage?.toString() || project.amountChargeOff?.porcentage?.toString() || '',
      amountCharge: oneProjectStore?.amountChargeOff?.amount?.toString() || project.amountChargeOff?.amount?.toString() || '',
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
        const {percentage, amount, amountCharge, percentajeCharge} = valores;
        const amo = amount.toString().replace(/[$,%]/g, "");
        if(hasCharge){
          // console.log('has charge => ', percentage, ' => ', amountCharge, ' => ', percentajeCharge);
          const data = {
            guaranteefund: {
              porcentage: typeof(percentage)==='string'? percentage.replace(/[$,%,]/g, ""): percentage,
              date: startDate,
              amount: Number(amo)
            },
            hasamountChargeOff: hasCharge,
            amountChargeOff: {
              amount: typeof(amountCharge)==='string'? Number(amountCharge.replace(/[$,%,]/g, "")): amountCharge,
              porcentage: typeof(percentajeCharge)==='string'? Number(percentajeCharge.replace(/[$,%,]/g, "")): percentajeCharge
            }
          }
          console.log('update amortizacion => ', JSON.stringify(data));
          try {
            const res = await UpdateProject(token, id, data);
            if(typeof(res)!=='string'){
              refRequest.current = true;
              console.log('res => ', res);
              const r = ParseProjectToOneProjectMin(res);
              if(typeof(r)==='string'){
                showToastMessageError(r);
              }else{
                updateOneProjectStore(r);
                showToastMessage('Proyecto actualizado satisfactoriamente!!');
              }
            }else{
              refRequest.current = true;
              showToastMessageError(res);
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Ocurrio un problema al actualizar el proyecto!!');
          }
        }else{
          const data = {
            guaranteefund: {
              porcentage: typeof(percentage)==='string'? percentage.replace(/[$,%,]/g, ""): percentage,
              date: startDate,
              amount: Number(amo)
            }
          }
          try {
            const res = await UpdateProject(token, id, data);
            if(typeof(res)!=='string'){
              refRequest.current = true;
              const r = ParseProjectToOneProjectMin(res);
              if(typeof(r)==='string'){
                showToastMessageError(r);
              }else{
                updateOneProjectStore(r);
                showToastMessage('Proyecto actualizado satisfactoriamente!!');
              }
            }else{
              refRequest.current = true;
              showToastMessageError(res);
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Ocurrio un problema al actualizar el proyecto!!');
          }
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
        <div className="inline-flex items-center">
          <Label>Amortizacion</Label>  
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={hasCharge} 
              onClick={() => setHasCharge(!hasCharge)} id="switch-3" type="checkbox"
              // onChange={() => console.log('')}
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor="switch-3"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
        <div>
          <Label htmlFor="percentage"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentaje</p></Label>
          <CurrencyInput
            id="percentage"
            name="percentage"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            defaultValue={formik.values.percentage}
            decimalsLimit={2}
            //prefix="%"
            suffix="%"
            onValueChange={(value) =>formik.values.percentage=value || ''}
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

        {hasCharge && (
          <>
            <div>
              <Label htmlFor="percentageCahrge"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentaje amortizacion</p></Label>
              <CurrencyInput
                id="percentajeCharge"
                name="percentajeCharge"
                className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
                  focus:border-slate-700 outline-0"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
                defaultValue={formik.values.percentajeCharge}
                decimalsLimit={2}
                suffix="%"
                onValueChange={(value) =>formik.values.percentajeCharge=value || ''}
              />
              {formik.touched.percentage && formik.errors.percentage ? (
                  <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                      <p>{formik.errors.percentajeCharge}</p>
                  </div>
              ) : null}
            </div>
            <div>
              <Label htmlFor="amountCharge"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto de amortizacion</p></Label>
              <CurrencyInput
                id="amountCharge"
                name="amountCharge"
                className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                  focus:border-slate-700 outline-0"
                //value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
                placeholder="Please enter a number"
                defaultValue={project.amountChargeOff?.amount || 0}
                decimalsLimit={2}
                prefix="$"
                onValueChange={(value) =>formik.values.amountCharge=value || ''}
              />
              {formik.touched.amount && formik.errors.amountCharge ? (
                  <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                      <p>{formik.errors.amountCharge}</p>
                  </div>
              ) : null}
            </div>
          </>
        )}
        
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>  
    </div>
  )
}