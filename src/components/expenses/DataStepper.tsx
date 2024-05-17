"use client"
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NavExpenseStepper from "./NavExpenseStepper"
import { useNewExpense } from "@/app/store/newExpense"
import SaveExpense from "@/app/functions/SaveExpense"
import { showToastMessage, showToastMessageError } from "../Alert"

export default function DataStepper({token, user, optCostCenter, optProviders, 
                                      optResponsibles, optGlossaries, optProjects}: 
                                  {token:string, user:string, optCostCenter:Options[],
                                    optProviders:Options[], optResponsibles:Options[],
                                    optGlossaries:Options[], optProjects:Options[] }){
  
  const {updateIndexStepper, updateBasicData} = useNewExpense();

  const formik = useFormik({
    initialValues: {
      folio: '',
      taxFolio: '',
      description: '',
      discount: '',
      amount: '',
      vat: '0'
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
      folio: Yup.string()
                  .required('El folio es obligatorio'),
      taxFolio: Yup.string()
                  .required('El folio fiscal es obligatorio'),
      discount: Yup.string()
                  .required('El descuento es obligatorio'),
      amount: Yup.string()
                  .required('El importe es obligatorio!!!'),
      vat: Yup.string()
                  .required('El iba es obligatorio!!!')
    }),
    onSubmit: async (valores) => {            
      const {description, folio, taxFolio, discount, amount, vat} = valores;
      updateBasicData(costcenter, folio, description, amount, 
          startDate, taxFolio, vat, discount, provider, responsible, 
          typeCFDI, typeExpense, category, project, condition);
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
  const [typeExpense, setTypeExpense] = useState<string>(optCostCenter[0].value);
  const [typeCFDI, setTypeCFDI] = useState<string>(optCostCenter[0].value);
  const [provider, setProvider] = useState<string>(optProviders[0].value);
  const [responsible, setResponsible] = useState<string>(optResponsibles[0].value);
  // const [vat, setVat] = useState<string>(optResponsibles[0].value);
  //const [discount, setDiscount] = useState<string>(optResponsibles[0].value);
  const [category, setCategory] = useState<string>(optGlossaries[0].value);
  const [project, setProject] = useState<string>(optProjects[0].value);
  const [condition, setCondition] = useState<string>(optGlossaries[0].value);

  const SaveData = async() => {
    console.log('save data!!');
    const {description, folio, taxFolio, discount, amount, vat} = formik.values
    updateBasicData(costcenter, folio, description, amount, 
        startDate, taxFolio, vat, discount, provider, responsible, 
        typeCFDI, typeExpense, category, project, condition);
    
    const data = {
      subtotal:amount, costcenter, date:startDate, description, discount, folio, provider, 
      user:responsible, taxFolio, typeCFDI, category, project, vat,
      condition: {
        glossary:condition, user:user
      }
    }

    try {
      const res = await SaveExpense(data, token);
      if(res===201) showToastMessage('Costo creado satisfactoriamente!!!');
      else{
        showToastMessageError(res);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al guardar costo!!');
    }
  }

  return(
    <div className="w-full bg-white">
      <div className="mt-2">
        <NavExpenseStepper index={0} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
          <SelectReact index={0} opts={optCostCenter} setValue={setCostCenter} />
        </div>
        <div>
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
        <div>
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
        <div>
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
          {/* <SelectReact index={0} opts={optResponsibles} setValue={setVat} /> */}
        </div>
        <div>
          <Label htmlFor="discount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descuento</p></Label>
          <Input type="text" name="discount" 
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.discount && formik.errors.discount ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.discount}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
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
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <DatePicker
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            focus:border-slate-700 outline-0 outline-none" 
            //showIcon
            selected={new Date(startDate)} onChange={(date:Date) => {
                setStartDate(date.toDateString()) 
                console.log(date); console.log(date.toDateString())}} 
          />
        </div>
        <div>
          <Label htmlFor="typeExpense"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de gasto</p></Label>
          <SelectReact index={0} opts={optGlossaries} setValue={setTypeExpense} />
        </div>
        <div>
          <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
          <SelectReact index={0} opts={optGlossaries} setValue={setTypeCFDI} />
        </div>
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectReact index={0} opts={optGlossaries} setValue={setCategory} />
        </div>
        <div>
          <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
          <SelectReact index={0} opts={optProviders} setValue={setProvider} />
        </div>
        <div>
          <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
          <SelectReact index={0} opts={optProjects} setValue={setProject} />
        </div>
        <div>
          <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
          <SelectReact index={0} opts={optResponsibles} setValue={setResponsible} />
        </div>
        <div>
          <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estatus</p></Label>
          <SelectReact index={0} opts={optGlossaries} setValue={setCondition} />
        </div>
        <div>
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
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