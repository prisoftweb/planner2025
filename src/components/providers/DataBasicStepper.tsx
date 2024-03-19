import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { useRegFormContext } from "./StepperProvider";
import SaveProvider from "@/app/functions/SaveProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import BasicBarStepper from "./BasicBarStepper";

export default function DataBasicStepper({token, id}: {token:string, id:string}){
  
  const [state, dispatch] = useRegFormContext();

  let tradenameI = '';
  let nameI = '';
  let rfcI = '';
  let supplier = false;

  if(state.databasic){
    tradenameI = state.databasic.tradename;
    nameI = state.databasic.name;
    rfcI = state.databasic.rfc;
    supplier = state.databasic.suppliercredit;
  }

  const [suppliercredit, setSuppliercredit] = useState<boolean>(supplier);

  const formik = useFormik({
    initialValues: {
      tradename:tradenameI,
      name:nameI,
      rfc: rfcI,
    }, 
    validationSchema: Yup.object({
      tradename: Yup.string()
                  .required('El nombre comercial no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc no puede ir vacio'),
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

  return(
    <div className="w-full">
      {/* <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      /> */}
      <div className="my-5">
        <BasicBarStepper index={0} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
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
        <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
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
        <div className="inline-flex items-center">
          {/* <p className="mr-3">Linea de credito</p> */}
          <Label>Linea de credito</Label>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={suppliercredit} 
              onClick={() => setSuppliercredit(!suppliercredit)} id="switch-3" type="checkbox"
              onChange={() => console.log('')}
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
        <div className="flex justify-end mt-8 space-x-5">
          {/* <button type="button" 
            onClick={onClickSave}
            className="border w-40 h-10 bg-black text-white border-slate-900 rounded-full 
                hover:bg-slate-600"
          >
            Guardar
          </button> */}
          <Button onClick={onClickSave} type="button">Guardar</Button>
          <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button>
          {/* <Button type="submit">Siguiente</Button> */}
        </div>
      </form>  
    </div>
  )
}