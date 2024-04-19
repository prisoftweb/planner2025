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

export default function Guarantee({token, user}:{token:string, user:string}){
  
  const [state, dispatch] = useRegFormContext();

  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  let day = new Date().getDate().toString();
  if(month.length ===1) month = '0'+month;
  if(day.length ===1) day = '0'+day;

  const [startDate, setStartDate] = useState<string>(year+'-'+month+'-'+day);

  let percentageI = '';
  
  if(state.guarantee){
    percentageI = state.guarantee.percentage;
    //setGuarantee(state.guarantee.guarantee);
  }

  const formik = useFormik({
    initialValues: {
      percentage:percentageI,
    }, 
    validationSchema: Yup.object({
      percentage: Yup.string()
                  .required('El porcentaje de avance es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      const {percentage} = valores;
      const data= {
        percentage,
        date: startDate
      }

      dispatch({ type: 'SET_GUARANTEE', data: data });
      //dispatch({type: 'INDEX_STEPPER', data: 4})
    },       
  });
  
  const onClickSave = async () => {
    if(state.extradata && state.databasic){
      
      let amount, dateExtra, category, type, client, company;

      amount = state.extradata.amount;
      dateExtra = state.extradata.date;
      category = state.extradata.category;
      type = state.extradata.type;
      client = state.extradata.client;
      company = state.extradata.company;

      let street = '';
      let community = '';
      let cp = '';
      let municipy = '';
      let stateA = '';
      let country = '';
      if(state.address){
        street = state.address.street;
        community = state.address.community;
        cp = state.address.cp;
        municipy = state.address.municipy;
        stateA = state.address.state;
        country = state.address.country;
      }
      const {percentage} = formik.values;
      let title, description, code;
      title = state.databasic.title;
      description = state.databasic.description;
      code = state.databasic.code;  
      const data= {
        amount: parseFloat(amount),
        date: dateExtra,
        category,
        type,
        client,
        user,
        title,
        description,
        code,
        company,
        location: {
          street,
          community,
          cp,
          municipy,
          state : stateA,
          country
        },
        guaranteefund: {
          porcentage: percentage,
          date: startDate,
        }
        // condition: [
        //   {glossary:"661964a1ca3bfa35200c1628", user}
        // ],
      }
      const res = await SaveProject(data, token);
      if(res.status){
        showToastMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res.message);
      }
    }else{
      showToastMessageError('No hay informacion extra!!'); 
    }
  }

  return(
    <div className="w-full">
      {/* <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      /> */}
      <div className="my-5">
        <NavProjectStepper index={3} />
      </div>
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
        <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha de pago</p></Label>
        <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value); console.log('new fecha ', e.target.value)}}  
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                focus:border-slate-700 outline-0"
        />
        {/* <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} /> */}
        <div className="flex justify-end mt-8 space-x-5">
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