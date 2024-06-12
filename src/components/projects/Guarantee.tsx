import DatePicker from "react-datepicker";
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import NavProjectStepper from "./NavProjectStepper";
import SaveProject from "@/app/functions/SaveProject";
import { useNewProject } from "@/app/store/newProject";
import CurrencyInput from 'react-currency-input-field';
import "react-datepicker/dist/react-datepicker.css";

export default function Guarantee({token}:{token:string}){
  
  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  let day = new Date().getDate().toString();
  if(month.length ===1) month = '0'+month;
  if(day.length ===1) day = '0'+day;

  const [startDate, setStartDate] = useState<string>(year+'-'+month+'-'+day);

  const formik = useFormik({
    initialValues: {
      percentage:'',
      amountG: ''
    }, 
    validationSchema: Yup.object({
      percentage: Yup.string()
                  .required('El porcentaje es obligatorio'),
      amountG: Yup.string()
                  .required('El monto es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      // const {percentage, amountG} = valores;
      // const data= {
      //   percentage,
      //   date: startDate,
      //   amountG
      // }

      //dispatch({ type: 'SET_GUARANTEE', data: data });
      //dispatch({type: 'INDEX_STEPPER', data: 4})
    },       
  });
  
  const {amount, category, client, code, community, company, country, cp, date, description, hasguaranteefund,
    haveAddress, municipy, stateA, street, title, type, user
  } = useNewProject();
  const onClickSave = async () => {
    const {amountG, percentage} = formik.values;
    let data;
    const location = {
      community, country, cp, municipy, 
      state: stateA, 
      stret: street
    }
    const guaranteeData = {
      amount:amountG.replace(/[$,%,]/g, ""),
      date: startDate,
      porcentage:percentage.replace(/[$,%,]/g, ""),
    };

    if(haveAddress && hasguaranteefund){
      data = {
        amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
        hasguaranteefund, title, types:type, user,
        location,
        guaranteefund: guaranteeData
      }
    }else{
      if(haveAddress){
        data = {
          amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
          hasguaranteefund, title, types:type, user,
          location
        }
      }else{
        if(hasguaranteefund){
          data = {
            amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
            hasguaranteefund, title, types:type, user,
            guaranteefund: guaranteeData
          }
        }else{
          data = {
            amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
            hasguaranteefund, title, types:type, user,
          }
        }
      }
    }
    try {
      const res = await SaveProject(data, token);
      if(res.status){
        showToastMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res.message);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un problema al crear proyecto!!');
    }
  }

  return(
    <div className="w-full">
      <div className="my-5">
        <NavProjectStepper index={3} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-lg rounded-lg space-y-5">
        <div>
          <Label htmlFor="percentage"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentaje de fondo</p></Label>
          <CurrencyInput
            id="percentage"
            name="percentage"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            //value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            //placeholder="Please enter a number"
            defaultValue={0}
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
            autoFocus
          /> */}
          {formik.touched.percentage && formik.errors.percentage ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.percentage}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="amountG"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto de fondo</p></Label>
          <CurrencyInput
            id="amountG"
            name="amountG"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            //value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            //placeholder="Please enter a number"
            defaultValue={0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) =>formik.values.amountG=value || ''}
            // onValueChange={(value, name, values) => {console.log(value, name, values); formik.values.amount=value || ''}}
          />
          {formik.touched.amountG && formik.errors.amountG ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.amountG}</p>
              </div>
          ) : null}
        </div>
        {/* <Input type="text" name="amountG" 
          value={formik.values.amountG}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />*/}
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <DatePicker
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0" 
            //showIcon
            selected={new Date(startDate)} onChange={(date:Date) => {
                setStartDate(date.toDateString()) 
                console.log(date); console.log(date.toDateString())}} 
          />
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          {/* <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button> */}
        </div>
      </form>  
    </div>
  )
}