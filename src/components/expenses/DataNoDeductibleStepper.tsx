"use client"
//import HeaderForm from "../HeaderForm"
import Label from "../Label"
//import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NavExpenseNoDeductibleStepper from "./NavExpenseNoDeductibleStepper";
import { useNewExpense } from "@/app/store/newExpense"
import SaveExpense from "@/app/functions/SaveExpense"
import { showToastMessage, showToastMessageError } from "../Alert"
import { CreateCostWithFiles } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';
import Input from "../Input";

export default function DataNoDeductibleStepper({token, user, optCostCenter, optResponsibles}: 
                                  {token:string, user:string, optCostCenter:Options[],
                                    optResponsibles:Options[]}){
  
  const {updateIndexStepper, updateBasicData, voucher, amount, 
    costCenter, date, description, responsible, reset, updateRefresh} = useNewExpense();

  const formik = useFormik({
    initialValues: {
      description: description,
      amount: amount,
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
      amount: Yup.string()
                  .required('El importe es obligatorio!!!'),
    }),
    onSubmit: async (valores) => {            
      const {description, amount} = valores;
      updateBasicData(costcenter, '', description, amount.replace(/[$,]/g, ""), 
          startDate, '', '', '', '', responsibleS, 
          '', '', '', '', '');
      updateIndexStepper(1);
    },       
  });

  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  let day = new Date().getDate().toString();
  if(month.length ===1) month = '0'+month;
  if(day.length ===1) day = '0'+day;

  const d = year+'-'+month+'-'+day;

  const [costcenter, setCostCenter] = useState<string>(optCostCenter[0].value);
  const [startDate, setStartDate] = useState<string>(d);
  //const [typeExpenseS, setTypeExpenseS] = useState<string>(optCostCenter[0].value);
  //const [typeCFDIS, setTypeCFDIS] = useState<string>(optCostCenter[0].value);
  //const [provider, setProvider] = useState<string>(optProviders[0].value);
  const [responsibleS, setResponsibleS] = useState<string>(optResponsibles[0].value);
  // const [vat, setVat] = useState<string>(optResponsibles[0].value);
  //const [discount, setDiscount] = useState<string>(optResponsibles[0].value);
  //const [categoryS, setCategoryS] = useState<string>(optGlossaries[0].value);
  //const [projectS, setProjectS] = useState<string>(optProjects[0].value);
  //const [conditionS, setConditionS] = useState<string>(optGlossaries[0].value);

  //const [showProvider, setShowProvider] = useState<boolean>(false);
  const [resetBand, setResetBand] = useState<boolean>(false);
  const [view, setView] = useState<JSX.Element>(<></>);
  const [viewCC, setViewCC] = useState<JSX.Element>(<></>);

  
  const SaveData = async() => {
    const {description, amount} = formik.values
    updateBasicData(costcenter, '', description, amount.replace(/[$,]/g, ""), 
        startDate, '', '', '', '', '', '', '', '', '', '');
    
    if(voucher){
      const formdata = new FormData();
      formdata.append('subtotal', amount.replace(/[$,]/g, ""));
      formdata.append('costcenter', costcenter);
      formdata.append('date', startDate);
      formdata.append('description', description);
      formdata.append('user', responsibleS);
      if(voucher){
        formdata.append('files', voucher);
        formdata.append('types', voucher.type);
      }
      try {
        const res = await CreateCostWithFiles(token, formdata);
        if(res === 201){
          // showToastMessage('Costo creado satisfactoriamente!!!');
          // updateRefresh(true);
          setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          showToastMessage('Costo creado satisfactoriamente!!!');
          updateRefresh(true);
          setTimeout(() => {
            setResetBand(true);
          }, 300);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }else{
      const data = {
        subtotal:amount.replace(/[$,]/g, ""), costcenter, date:startDate, description, user:responsibleS,
      }
  
      try {
        const res = await SaveExpense(data, token);
        if(res===201){
          setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          showToastMessage('Costo creado satisfactoriamente!!!');
          updateRefresh(true);
          setTimeout(() => {
            setResetBand(true);
          }, 300);
        }
        else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }
  }

  // const addProvider = (newProvider:Options) => {
  //   optProviders.push(newProvider);
  //   console.log('optProviders => ', optProviders);
  //   setProvider(newProvider.value);
  //   console.log('prov length => ', optProviders.length)
  //   setIndexProv(optProviders.length - 1);
  // }

  // const [selectProvider, setSelectProviders] = useState<JSX.Element>(
  //             <SelectReact index={0} opts={optProviders} setValue={setProvider} />)
  //const [indexProv, setIndexProv] = useState<number>(0);
  
  useEffect(() => {
    let indexCC = 0;
    if(costCenter !== ''){
      optCostCenter.map((opt, index:number) => {
        if(opt.value === costCenter){
          indexCC = index;
        }
      });      
    }
    //console.log('const cc => ', costCenter);
    if(date !== ''){
      setStartDate(date);
    }
    
    let indexResp = 0;
    if(responsibleS !== ''){
      optResponsibles.map((opt, index:number) => {
        if(opt.value === responsible){
          indexResp = index;
        }
      });      
    }
    //console.log('const resp => ', responsible);
    
    setView(<>
      <div className="col-span-1 sm:col-span-2">
        <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
        <SelectReact index={indexResp} opts={optResponsibles} setValue={setResponsibleS} />
      </div>
    </>)

    setViewCC(<div className="col-span-1 sm:col-span-2">
          <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
          <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
        </div>)

  }, []);

  useEffect(() => {
    if(resetBand){
      let indexCC = 0;
      if(costCenter !== ''){
        optCostCenter.map((opt, index:number) => {
          if(opt.value === costCenter){
            indexCC = index;
          }
        });      
      }
      //console.log('const cc => ', costCenter);
      if(date !== ''){
        setStartDate(date);
      }
      
      let indexResp = 0;
      if(responsibleS !== ''){
        optResponsibles.map((opt, index:number) => {
          if(opt.value === responsible){
            indexResp = index;
          }
        });      
      }
      //console.log('const resp => ', responsible);
      
      setView(<>
        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
          <SelectReact index={indexResp} opts={optResponsibles} setValue={setResponsibleS} />
        </div>
      </>)

      setViewCC(<div className="col-span-1 sm:col-span-2">
              <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
              <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
            </div>)
      setResetBand(false);
    }
  }, [resetBand]);

  return(
    <div className="w-full bg-white">
      <div className="mt-2">
        <NavExpenseNoDeductibleStepper index={0} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-3xl rounded-lg space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
          {viewCC}
          <div>
            <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
            <CurrencyInput
              id="amount"
              name="amount"
              // className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              //   focus:border-slate-700 outline-0"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
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
            <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
            <Input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {/* <DatePicker
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0 outline-none" 
              //showIcon
              selected={new Date(startDate)} onChange={(date:Date) => {
                  setStartDate(date.toDateString()) 
                  console.log(date); console.log(date.toDateString())}} 
            /> */}
          </div>
          {view}
        </div>

        <div>
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description"
            // className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            // focus:border-slate-700 outline-0 overflow-hidden resize-none"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0 overflow-hidden resize-none"
            rows={4} 
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.description}</p>
            </div>
          ) : null}
        </div>

        <div className="flex justify-center mt-8 space-x-5">
          <Button type="button" onClick={SaveData}>Guardar</Button>
          <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 
              border-slate-900 rounded-xl hover:bg-slate-200"
          >
            Siguiente
          </button>         
        </div>
      </form> 
    </div>
  )
}