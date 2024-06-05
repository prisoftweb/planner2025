"use client"
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useEffect, useState } from "react";
//import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Expense } from "@/interfaces/Expenses"
import { UpdateCost } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';
import { showToastMessage, showToastMessageError } from "../Alert"

export default function UpdateExpense({token, id, user, optCostCenter, 
                                      expense, isticket}: 
                                  {token:string, id:string, user:string, 
                                    optCostCenter:Options[], expense:Expense, 
                                    isticket:boolean}){
  
  const [costcenter, setCostCenter] = useState<string>(optCostCenter[0].value);
  const [startDate, setStartDate] = useState<string>(expense.date.substring(0, 10));
  const [viewCC, setViewCC] = useState<JSX.Element>(<></>);

  const formik = useFormik({
    initialValues: {
      folio: expense.folio,
      taxFolio: expense.taxfolio,
      vat: '0',
      discount: expense.discount? expense.discount.toString(): '0',
      amount: expense.subtotal.toString(),
      description: expense.description
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
      vat: Yup.string()
                  .required('El iva es obligatorio'),
      discount: Yup.string()
                  .required('El descuento es obligatorio'),
      amount: Yup.string()
                  .required('El importe es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      const {amount, description, discount, folio, taxFolio, vat} = valores;
      const data = { subtotal:amount.replace(/[$,]/g, ""), description, discount: discount.toString().replace(/[$,]/g, ""), 
          folio, taxfolio:taxFolio, vat, costcenter, date:startDate}
      try {
        const res = await UpdateCost(token, id, data);
        if(res === 200){
          showToastMessage('Costo actualizado exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar costo!!')
      }
    },       
  });

  // let year = new Date().getFullYear().toString();
  // let month = (new Date().getMonth() + 1).toString();
  // let day = new Date().getDate().toString();
  // if(month.length ===1) month = '0'+month;
  // if(day.length ===1) day = '0'+day;

  // const d = year+'-'+month+'-'+day;

  useEffect(() => {
    let indexCC = 0;
    if(expense.costcenter){
      optCostCenter.map((optCC, index:number) => {
        if(optCC.value===expense.costcenter){
          //alert('aquiii');
          setCostCenter(optCostCenter[index].value);
          indexCC = index;
        }
      });
    }
    //alert('index '+ indexCC);
    setViewCC(<></>);
    setTimeout(() => {
      setViewCC(<div className=" col-span-1 sm:col-span-2">
                <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
                <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
              </div>);
    }, 50);
    setCostCenter(optCostCenter[indexCC].value);
  }, []);

  return(
    <div className="w-full">
      <HeaderForm img="/img/costs/costs.svg" subtitle="Modifica los datos basicos de un gasto" 
        title="Modificar gasto"
      />
      <form onSubmit={formik.handleSubmit} 
        className="mt-4 w-full rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-5">
        {/* <div>
          <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
          <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
        </div> */}
        {viewCC}
        <div className="mt-0">
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          {/* <Input 
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          /> */}
          <input 
            className="w-full h-10 border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {/* <DatePicker
            className="w-full h-10 border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            focus:border-slate-700 outline-0 outline-none" 
            //showIcon
            selected={new Date(startDate)} onChange={(date:Date) => {
                setStartDate(date.toDateString()) 
                console.log(date); console.log(date.toDateString())}} 
          /> */}
        </div>
        <div className={`${isticket? 'hidden': ''}`}>
          <Label htmlFor="folio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio</p></Label>
          <Input type="text" name="folio" autoFocus 
            value={formik.values.folio}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.folio && formik.errors.folio ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.folio}</p>
            </div>
          ) : null}
        </div>
        <div className={`${isticket? 'hidden': ''} col-span-1 sm:col-span-2`}>
          <Label htmlFor="taxFolio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio Fiscal</p></Label>
          <Input type="text" name="taxFolio" 
            value={formik.values.taxFolio}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.taxFolio && formik.errors.taxFolio ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.taxFolio}</p>
              </div>
          ) : null}
        </div>
        <div className={`${isticket? 'hidden': ''}`}>
          <Label htmlFor="vat"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Iva</p></Label>
          <Input type="text" name="vat" 
            value={formik.values.vat}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.vat && formik.errors.vat ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.vat}</p>
              </div>
          ) : null}
        </div>
        <div className={`${isticket? 'hidden': ''}`}>
          <Label htmlFor="discount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descuento</p></Label>
          <CurrencyInput
            id="discount"
            name="discount"
            // className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
            //   focus:border-slate-700 outline-0"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
              focus:border-slate-700 outline-0"
            //value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            //placeholder="Please enter a number"
            defaultValue={expense.discount || 0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.discount=(value || '0');
            } catch (error) {
              formik.values.discount='0';
            }}}
            // onValueChange={(value, name, values) => {console.log(value, name, values); formik.values.amount=value || ''}}
          />
          {formik.touched.discount && formik.errors.discount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.discount}</p>
              </div>
          ) : null}
          {/* <Input type="text" name="discount" 
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.discount && formik.errors.discount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.discount}</p>
              </div>
          ) : null} */}
        </div>
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
          {/* <Input type="text" name="amount" 
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          /> */}
          <CurrencyInput
            id="amount"
            name="amount"
            // className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
            //   focus:border-slate-700 outline-0"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
              focus:border-slate-700 outline-0"
            //value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            //placeholder="Please enter a number"
            defaultValue={expense.subtotal || 0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.amount=(value || '0');
            } catch (error) {
              formik.values.amount='0';
            }}}
            // onValueChange={(value, name, values) => {console.log(value, name, values); formik.values.amount=value || ''}}
          />
          {formik.touched.amount && formik.errors.amount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.amount}</p>
              </div>
          ) : null}
        </div>
        <div className=" col-span-1 sm:col-span-3">
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
          <Button type="submit">Guardar</Button>         
        </div>
      </form>  
    </div>
  )
}