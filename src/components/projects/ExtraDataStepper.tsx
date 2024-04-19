import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useEffect } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import SaveProject from "@/app/functions/SaveProject";
import { showToastMessage, showToastMessageError } from "../Alert";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import NavProjectStepper from "./NavProjectStepper";

export default function ExtraDataStepper({token, optClients, optCategories, 
                          optTypes, user, optCompanies}:
                        {token:string, optClients:Options[], optCategories:Options[], 
                          optTypes:Options[], user:string, optCompanies: Options[]}){
  
  const [state, dispatch] = useRegFormContext();
  
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
  //if(day.length ===1) day = '0'+day;

  const [startDate, setStartDate] = useState<string>(year+'-'+month+'-'+day);

  let amountI = '';
  
  if(state.extradata){
    amountI = state.extradata.amount;
    setStartDate(state.extradata.date);
    setGuarantee(state.extradata.guarantee);
  }
  
  const formik = useFormik({
    initialValues: {
      amount:amountI,
    }, 
    validationSchema: Yup.object({
      amount: Yup.string()
                  .required('El monto es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      const {amount} = valores;
      const data= {
        amount,
        date: startDate,
        category,
        type,
        client,
        user,
        haveAddress,
        company
      }

      dispatch({ type: 'SET_EXTRA_DATA', data: data });
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
    let title, description, code;
    if(state.databasic){
      title = state.databasic.title;
      description = state.databasic.description;
      code = state.databasic.code;     
      const {amount} = formik.values;
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
      
      let percentage, dateGuarantee;

      if(state.guarantee){
        percentage = state.guarantee.percentage;
        dateGuarantee = state.guarantee.date;
      }
      
      const data= {
        amount: parseFloat(amount),
        date: startDate,
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
          date: dateGuarantee,
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
      showToastMessageError('No hay informacion basica!!'); 
    }
  }

  return(
    <div className="w-full">
      {/* <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      /> */}
      <div className="my-5">
        <NavProjectStepper index={1} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
        <SelectReact opts={optCategories} setValue={setCategory} />
        <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
        <SelectReact opts={optClients} setValue={setClient} />
        <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
        <Input type="text" name="amount" 
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.amount && formik.errors.amount ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.amount}</p>
            </div>
        ) : null}
        <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
        <SelectReact opts={optTypes} setValue={setType} />
        <Label htmlFor="company"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Compañia</p></Label>
        <SelectReact opts={optCompanies} setValue={setCompany} />
        <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
        <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value); console.log('new fecha ', e.target.value)}}  
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                focus:border-slate-700 outline-0"
        />
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
        {/* <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} 
          className=" z-auto relative"
        /> */}
        <div className="flex justify-end mt-8 space-x-5">
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