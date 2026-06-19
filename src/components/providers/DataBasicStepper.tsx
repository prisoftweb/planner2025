import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useRef, useEffect } from "react";
import { useRegFormContext } from "./StepperProvider";
import SaveProvider from "@/app/functions/SaveProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import BasicBarStepper from "./BasicBarStepper";
import { useProviderStore } from "@/app/store/providerStore";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { getCatalogsByNameAndType, getCatalogsByNameAndCondition, getCatalogsByNameAndCategory } from "@/app/api/routeCatalogs";

export default function DataBasicStepper({token, id, user, company}: 
  {token:string, id:string, user: string, company:string}){
  
  const [state, dispatch] = useRegFormContext();
  const refRequest = useRef(true);

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

  const {providerStore, updateProviderStore, updateHaveNewProvider} = useProviderStore();

  const [type, setType]=useState<Options>();
  const [optTypes, setOptTypes] = useState<Options[]>([]);

  // const [category, setCategory]=useState<Options>();
  // const [optCategories, setOptCategories] = useState<Options[]>([]);

  // const [category, setCategory]=useState<Options>();
  // const [optCategories, setOptCategories] = useState<Options[]>([]);

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
        "suppliercredit": suppliercredit,
        type
      }

      dispatch({ type: 'SET_BASIC_DATA', data: data });
      if(suppliercredit){
        dispatch({type: 'INDEX_STEPPER', data: 1})
      }else{
        dispatch({type: 'INDEX_STEPPER', data: 2})
      }
    },       
  });

  useEffect(() => {
    const fetch = async () => {
      const [res] = await Promise.all([
        getCatalogsByNameAndType(token, 'Providers'),
        // // getCatalogsByNameAndCondition(token, 'Providers')
        // getCatalogsByNameAndCategory(token, 'Providers'),
      ]) 
      
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        if(Array.isArray(res) && res.length>0){
          setOptTypes(res);
          if(Array.isArray(res) && res.length>0){
            setType(res[0].value);
          }
        }
      }

      // if(typeof(resc)==='string'){
      //   showToastMessageError(resc);
      // }else{
      //   setOptCategories(resc);
      //   setCategory(resc[0].value);
      // }
    }
    fetch();
  }, [])
  
  const onClickSave = async () => {
    if(refRequest.current){
      refRequest.current = false;
      const {name, rfc, tradename} = formik.values;
    
      let tradeline = {};

      let cat;

      if(suppliercredit && state.creditline){
        const {creditdays, creditlimit, currentbalance, percentoverduedebt, category} = state.creditline;
        cat=category;
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
          user: user,
          company,
          tradeline,
          contact,
          type,
          category:cat,
          condition: [{
            glossary: '663d2fe61d1c43ae98d77bc3',
            user
          }, 
            ...(suppliercredit
                ? [{
                    glossary: "6746442a734d5ab78ab98ddd",
                    user
                  }]
                : [])],
        }
        
        const res = await SaveProvider(data, token);
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          updateProviderStore([...providerStore, res.prov]);
          updateHaveNewProvider(true);
          dispatch({ type: 'SET_BASIC_DATA', data: null });
          dispatch({ type: 'SET_CREDIT_DATA', data: null });
          dispatch({ type: 'SET_CONTACTS', data: [] });
          dispatch({type: 'INDEX_STEPPER', data: 0})
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      }else{
        refRequest.current = true;
        showToastMessageError('Todos los campos son obligatorios');
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  const handleType=(value:Options) => {
    setType(value);
  }

  // const handleCategory=(value:Options) => {
  //   setCategory(value);
  // }

  useEffect(() => {
    console.log('suppliercredit:', suppliercredit);
  }, [suppliercredit]);

  return(
    <div className="w-full">
      <div className="my-5">
        <BasicBarStepper index={0} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
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
          <Label>Tipo</Label>
          {optTypes.length>0 && (
            <SelectReact index={0} opts={optTypes} setValue={handleType} />
          )}
        </div>
        {/* <div>
          <Label>Categoria</Label>
          {optCategories.length>0 && (
            <SelectReact index={0} opts={optCategories} setValue={handleCategory} />
          )}
        </div> */}

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            Línea de crédito
          </span>

          <div
            onClick={() => setSuppliercredit(!suppliercredit)}
            className={`
              relative w-10 h-6 rounded-full cursor-pointer transition-colors
              ${suppliercredit ? 'bg-green-500' : 'bg-gray-300'}
            `}
          >
            <div
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
                transition-transform
                ${suppliercredit ? 'translate-x-4' : ''}
              `}
            />
          </div>

        </div>

        <div className="flex justify-end mt-8 space-x-5">
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