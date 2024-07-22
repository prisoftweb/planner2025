import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useRef } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import SaveProject from "@/app/functions/SaveProject";
import { showToastMessage, showToastMessageError } from "../Alert";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import NavProjectStepper from "./NavProjectStepper";
import { useNewProject } from "@/app/store/newProject";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ExtraDataStepper({token, optClients, optCategories, 
                          optTypes, user, optCompanies, condition}:
                        {token:string, optClients:Options[], optCategories:Options[], 
                          optTypes:Options[], user:string, optCompanies: Options[]
                          condition: string}){
  
  const [state, dispatch] = useRegFormContext();
  const refRequest = useRef(true);
  
  const {updateExtraData, amount, code, community, country, cp, date, description, hasguaranteefund,
    municipy, stateA, street, title, amountG, percentage, dateG} = useNewProject();


  const [client, setClient] = useState<string>(optClients[0].value);
  const [type, setType] = useState<string>(optTypes[0].value);
  const [category, setCategory] = useState<string>(optCategories[0].value);
  const [company, setCompany] = useState<string>(optCompanies[0].value);
  const [guarantee, setGuarantee] = useState<boolean>(false);
  const [haveAddress, setHaveAddress] = useState<boolean>(false);

  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  let day = new Date().getDate().toString();
  if(month.length ===1) month = '0'+month;
  if(day.length ===1) day = '0'+day;

  const d = (date === '')? year+'-'+month+'-'+day: date;

  const [startDate, setStartDate] = useState<string>(d);

  const [dateM, setDateM] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      amount:amount,
    }, 
    validationSchema: Yup.object({
      amount: Yup.string()
                  .required('El monto es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      const {amount} = valores;
      
      updateExtraData(amount.replace(/[$,]/g, ""), startDate, category, type, client, user, haveAddress, company, guarantee)

      if(haveAddress){
        dispatch({type: 'INDEX_STEPPER', data: 2})
      }else{
        if(guarantee){
          dispatch({type: 'INDEX_STEPPER', data: 3})
        }
      }
    },       
  });
  
  const onClickSave = async () => {
    if(refRequest.current){
      refRequest.current = false;
      const {amount} = formik.values;
    
      const location = {
        community, country, cp, municipy, 
        state: stateA, 
        stret: street
      }
      let data;
      const guaranteeData = {
        amount:amountG,
        date: dateG,
        porcentage:percentage
      };

      if(haveAddress && hasguaranteefund){
        data = {
          amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date: startDate, description, 
          hasguaranteefund, title, types:type, user,
          location,
          guaranteefund: guaranteeData, condition: [{glossary: condition, user}]
        }
      }else{
        if(haveAddress){
          data = {
            amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
            hasguaranteefund, title, types:type, user,
            location, condition: [{glossary: condition, user}]
          }
        }else{
          if(hasguaranteefund){
            data = {
              amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
              hasguaranteefund, title, types:type, user,
              guaranteefund: guaranteeData, condition: [{glossary: condition, user}]
            }
          }else{
            data = {
              amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
              hasguaranteefund, title, types:type, user, condition: [{glossary: condition, user}],
            }
          }
        }
      }
      
      try {
        const res = await SaveProject(data, token);
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Ocurrio un problema al crear proyecto!!');
      }
    }else{
      showToastMessageError('ya hay una peticion en proceso..!!!');
    }
  }

  return(
    <div className="w-full">
      <div className="my-5">
        <NavProjectStepper index={1} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-lg rounded-lg space-y-5">
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectReact opts={optCategories} setValue={setCategory} index={0} />
        </div>
        <div>
          <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
          <SelectReact opts={optClients} setValue={setClient} index={0} />
        </div>
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
          <CurrencyInput
            id="amount"
            name="amount"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            defaultValue={0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.amount=value || '0';
            } catch (error) {
              formik.values.amount='0';
            }}}
          />
          {formik.touched.amount && formik.errors.amount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.amount}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <SelectReact opts={optTypes} setValue={setType} index={0} />
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <DatePicker
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0" 
            //showIcon
            selected={new Date(startDate)} onChange={(date:Date) => {setDateM(date);
                setStartDate(date.toDateString()) 
                console.log(date); console.log(date.toDateString())}} 
          />
        </div>
        <div className=" flex gap-x-3">
          <div>
            <Label htmlFor="guarantee"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fondo de garantia</p></Label>
            <div className="inline-flex rounded-md shadow-sm mx-2">
              <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                        ${guarantee? 'bg-green-500 text-white': ''}`}
                onClick={() => setGuarantee(true)}
              >
                Si
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                        ${!guarantee? 'bg-red-500 text-white': ''}`}
                onClick={() => setGuarantee(false)}
              >
                No
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="haveAddress"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tiene direccion?</p></Label>
            <div className="inline-flex rounded-md shadow-sm mx-2">
              <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                        ${haveAddress? 'bg-green-500 text-white': ''}`}
                onClick={() => setHaveAddress(true)}
              >
                Si
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                        ${!haveAddress? 'bg-red-500 text-white': ''}`}
                onClick={() => setHaveAddress(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          {(guarantee || haveAddress) && (<button type="submit"
                className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
                hover:bg-slate-200"
              >
                Siguiente
              </button>)
          }
        </div>
      </form>
    </div>
  )
}