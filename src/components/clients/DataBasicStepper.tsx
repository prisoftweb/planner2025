import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { useRegFormContext } from "./StepperClientProvider";
import SaveProvider from "@/app/functions/SaveProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import NavClientsStepper from "./NavClientsStepper";
import { Options } from '@/interfaces/Common'
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import Select from 'react-select';
import InputMask from 'react-input-mask';

export default function DataBasicStepper({token, id}: {token:string, id:string}){
  
  const [state, dispatch] = useRegFormContext();

  let tradenameI = '';
  let nameI = '';
  let rfcI = '';
  let supplier = false;
  let emailI= '';

  if(state.databasic){
    tradenameI = state.databasic.tradename;
    nameI = state.databasic.name;
    rfcI = state.databasic.rfc;
    emailI = state.databasic.email? state.databasic.email : '';
    supplier = state.databasic.suppliercredit;
  }

  const [suppliercredit, setSuppliercredit] = useState<boolean>(supplier);

  const formik = useFormik({
    initialValues: {
      tradename:tradenameI,
      name:nameI,
      rfc: rfcI,
      email: emailI,
    }, 
    validationSchema: Yup.object({
      tradename: Yup.string()
                  .required('El nombre comercial no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc no puede ir vacio'),
      email: Yup.string(),
    }),
    onSubmit: async (valores) => {            
      const {name, tradename, rfc} = valores;
      const data= {
        name, 
        tradename,
        rfc,
        "suppliercredit": suppliercredit
      }

      dispatch({ type: 'SET_BASIC_DATA', data: data });
      if(suppliercredit){
        dispatch({type: 'INDEX_STEPPER', data: 1})
      }else{
        dispatch({type: 'INDEX_STEPPER', data: 2})
      }
    },       
  });
  
  const onClickSave = async () => {
    const {name, rfc, tradename} = formik.values;
    
    let tradeline = {};

    if(suppliercredit && state.creditline){
      const {creditdays, creditlimit, currentbalance, percentoverduedebt} = state.creditline;
      tradeline = {
        creditdays: parseInt(creditdays),
        creditlimit: parseInt(creditlimit),
        currentbalance: parseInt(currentbalance),
        percentoverduedebt: parseInt(percentoverduedebt)
      }
    }
    
    let contact = [];
    if(state.contacts){
      contact = state.contacts;
    }

    if(name && rfc && tradename){
      
      const data: any = {
        name,
        rfc,
        tradename,
        suppliercredit,
        user: id,
        tradeline,
        contact,
      }
      const res = await SaveProvider(data, token);
      if(res.status){
        showToastMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res.message);
      }
    }else{
      showToastMessageError('Todos los campos son obligatorios');
    }
  }

  const options:Options[] = [
    {
      value: 'Movil',
      label: 'Movil'
    },
    {
      value: 'Escuela',
      label: 'Escuela'
    },
    {
      value: 'Casa',
      label: 'Casa'
    },
    {
      value: 'Trabajo',
      label: 'Trabajo'
    },
    {
      value: 'Otro',
      label: 'Otro'
    },
  ]
  
  const [phone, setPhone] = useState<string>('');
  const [typePhone, setTypePhone] = useState<string>(options[0].value);
  const [optionsType, setOptionsType] = useState(options[0]);
  const [regime, setRegime] = useState<string>('Fisico');

  return(
    <div className="w-full">
      <div className="my-5">
        <NavClientsStepper index={0} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="">
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
          </div>
          <div>
            <Label htmlFor="tradename"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
            <Input type="text" name="tradename" 
              value={formik.values.tradename}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.tradename && formik.errors.tradename ? (
                <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                    <p>{formik.errors.tradename}</p>
                </div>
            ) : null}
          </div>
          
          <div>
            <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">RFC</p></Label>
            <Input type="text" name="rfc" 
              value={formik.values.rfc}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.rfc && formik.errors.rfc ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.rfc}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Origen</p></Label>
            <Select
              className='w-full' 
              options={options}
              maxMenuHeight={200}
              value={optionsType}
              onChange={(value:any) => {setTypePhone(value.value); setOptionsType(value)}}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex items-center mt-2 flex-wrap gap-y-1">
              <div className="w-48 flex  justify-start items-center relative">
                <InputMask mask='(+52) 999 999 9999'
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 pl-9 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                  type="phone" 
                  placeholder="(+52) 444 429 7227"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <DevicePhoneMobileIcon className="h-6 w-6 text-amber-400 hover:text-amber-500 absolute ml-1" />
              </div>
              <Select
                className='w-40' 
                options={options}
                maxMenuHeight={200}
                value={optionsType}
                onChange={(value:any) => {setTypePhone(value.value); setOptionsType(value)}}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Persona</p></Label>
            <div className="inline-flex rounded-md shadow-sm mx-2">
              <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                        ${regime==='Fisico'? 'bg-green-500 text-white': ''}`}
                onClick={() => setRegime('Fisico')}
              >
                Fisico
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                        ${regime==='Moral'? 'bg-red-500 text-white': ''}`}
                onClick={() => setRegime('Moral')}
              >
                Moral
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Etiquetas</p></Label>
            <Select
              className='w-full'
              isMulti={true} 
              options={options}
              maxMenuHeight={200}
              value={optionsType}
              onChange={(value:any) => {setTypePhone(value.value); setOptionsType(value)}}
            />
          </div>

        </div>
        
        <div className="flex justify-center mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button>
        </div>
      </form>  
    </div>
  )
}