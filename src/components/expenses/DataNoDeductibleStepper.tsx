"use client"
//import HeaderForm from "../HeaderForm"
import Label from "../Label"
//import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { use, useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NavExpenseNoDeductibleStepper from "./NavExpenseNoDeductibleStepper";
import { useNewExpense } from "@/app/store/newExpense"
import SaveExpense from "@/app/functions/SaveExpense"
import { showToastMessage, showToastMessageError } from "../Alert"
import { CreateCostWithFiles } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';
import Input from "../Input";

export default function DataNoDeductibleStepper({token, user, optCostCenter, optResponsibles,
                                                 idLabour, idTicket }: 
                                  {token:string, user:string, optCostCenter:Options[],
                                    optResponsibles:Options[], idLabour:string, idTicket:string}){
  
  const {updateIndexStepper, updateBasicData, voucher, amount, report,
    costCenter, date, description, responsible, project, condition, category, 
    reset, updateRefresh, updateCategory} = useNewExpense();

  const [categoryS, setCategoryS] = useState<string>(category===''? idLabour: category);

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
          '', '', categoryS);
      updateIndexStepper(2);
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
  const [responsibleS, setResponsibleS] = useState<string>(optResponsibles[0].value);
  const [resetBand, setResetBand] = useState<boolean>(false);
  const [view, setView] = useState<JSX.Element>(<></>);
  const [viewCC, setViewCC] = useState<JSX.Element>(<></>);
  const [clearAmount, setClearAmount] = useState<boolean>(false);
  const [viewAmount, setViewAmount] = useState<JSX.Element>(
                                          <CurrencyInput
                                            id="amount"
                                            name="amount"
                                            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                                              focus:border-slate-700 outline-0"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleChange}
                                            //defaultValue={0}
                                            defaultValue={amount}
                                            decimalsLimit={2}
                                            prefix="$"
                                            onValueChange={(value) => {try {
                                              formik.values.amount=value || '0';
                                            } catch (error) {
                                              formik.values.amount='0';
                                            }}}
                                          />);
  
  const SaveData = async() => {
    const {description, amount} = formik.values
    updateBasicData(costcenter, '', description, amount.replace(/[$,]/g, ""), 
        startDate, '', '', '', '', '', '', '', categoryS);
    
    if(voucher){
      const formdata = new FormData();
      formdata.append('subtotal', amount.replace(/[$,]/g, ""));
      formdata.append('costcenter', costcenter);
      formdata.append('date', startDate);
      formdata.append('description', description);
      formdata.append('user', responsibleS);
      formdata.append('report', report);
      formdata.append('isticket', JSON.stringify(true));
      formdata.append('project', project);
      formdata.append('category', categoryS);
      formdata.append('condition', JSON.stringify([{
        glossary: condition,
        user
      }]));
      if(voucher){
        formdata.append('files', voucher);
        formdata.append('types', voucher.type);
      }
      try {
        const res = await CreateCostWithFiles(token, formdata);
        if(res === 201){
          setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          showToastMessage('Costo creado satisfactoriamente!!!');
          setClearAmount(true);
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
        subtotal:amount.replace(/[$,]/g, ""), costcenter, date:startDate, description, 
        user:responsibleS, report, isticket:true, project, category:categoryS, condition: [{
          glossary: condition,
          user
        }]
      }
  
      try {
        const res = await SaveExpense(data, token);
        if(res===201){
          setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          showToastMessage('Costo creado satisfactoriamente!!!');
          setClearAmount(true);
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

  useEffect(() => {
    if(clearAmount){
      setViewAmount(<></>);
      setTimeout(() => {
        setViewAmount(
          <CurrencyInput
            id="amount"
            name="amount"
            // className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            //   focus:border-slate-700 outline-0"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            //defaultValue={0}
            defaultValue={amount}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.amount=value || '0';
            } catch (error) {
              formik.values.amount='0';
            }}}
          />
        )
      }, 100);
      setClearAmount(false);
    }
  }, [clearAmount]);

  const handleCostCenter = (value:string) => {
    setCostCenter(value);
    const cc = optCostCenter.find((costC) => costC.value === value);
    if(cc){
      if(cc.label.toLowerCase().includes('mano de obra')){
        console.log('idlabour ');
        setCategoryS(idLabour);
        updateCategory(idLabour);
      }else{
        console.log('id ticket ');
        setCategoryS(idTicket);
        updateCategory(idTicket);
      }
    }
  }

  useEffect(() => {
    let indexCC = 0;
    if(costCenter !== ''){
      optCostCenter.map((opt, index:number) => {
        if(opt.value === costCenter){
          indexCC = index;
        }
      });      
    }
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

    setView(<>
      <div className="col-span-1 sm:col-span-2">
        <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
        <SelectReact index={indexResp} opts={optResponsibles} setValue={setResponsibleS} />
      </div>
    </>)

    setViewCC(<div className="col-span-1 sm:col-span-2">
          <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
          <SelectReact index={indexCC} opts={optCostCenter} setValue={handleCostCenter} />
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
      
      setView(<>
        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
          <SelectReact index={indexResp} opts={optResponsibles} setValue={setResponsibleS} />
        </div>
      </>)

      setViewCC(<div className="col-span-1 sm:col-span-2">
              <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
              <SelectReact index={indexCC} opts={optCostCenter} setValue={handleCostCenter} />
            </div>)
      setResetBand(false);
    }
  }, [resetBand]);

  return(
    <div className="w-full bg-white">
      <div className="mt-2">
        <NavExpenseNoDeductibleStepper index={1} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-3xl rounded-lg space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
          {viewCC}
          <div>
            <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
            {viewAmount}
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