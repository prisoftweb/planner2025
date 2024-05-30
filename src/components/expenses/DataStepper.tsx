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
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NavExpenseStepper from "./NavExpenseStepper"
import { useNewExpense } from "@/app/store/newExpense"
import SaveExpense from "@/app/functions/SaveExpense"
import { showToastMessage, showToastMessageError } from "../Alert"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import AddProvider from "./AddProvider"
import { CreateCostWithFiles } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';

export default function DataStepper({token, user, optCostCenter, optProviders, 
                                      optResponsibles, optGlossaries, optProjects, 
                                      optCategories, optConditions, optTypes
                                    }: 
                                  {token:string, user:string, optCostCenter:Options[],
                                    optProviders:Options[], optResponsibles:Options[],
                                    optGlossaries:Options[], optProjects:Options[], 
                                    optCategories:Options[], optTypes:Options[], 
                                    optConditions:Options[] }){
  
  const {updateIndexStepper, updateBasicData, CFDI, voucher, amount, 
    category, costCenter, date, description, discount, 
    folio, project, proveedor, responsible, taxFolio, 
    typeCFDI, typeExpense, vat, reset, updateRefresh} = useNewExpense();

  const formik = useFormik({
    initialValues: {
      folio: folio,
      taxFolio: taxFolio,
      description: description,
      discount: discount,
      amount: amount,
      vat: vat
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
      folio: Yup.string()
                  .required('El folio es obligatorio'),
      taxFolio: Yup.string()
                  .required('El folio fiscal es obligatorio'),
      discount: Yup.string(),
                  //.required('El descuento es obligatorio'),
      amount: Yup.string()
                  .required('El importe es obligatorio!!!'),
      vat: Yup.string()
                  //.required('El iva es obligatorio!!!')
    }),
    onSubmit: async (valores) => {            
      const {description, folio, taxFolio, discount, amount, vat} = valores;
      updateBasicData(costcenter, folio, description, amount.replace(/[$,]/g, ""), 
          startDate, taxFolio, vat, discount.replace(/[$,]/g, ""), provider, responsibleS, 
          typeCFDIS, typeExpenseS, categoryS);
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
  const [typeExpenseS, setTypeExpenseS] = useState<string>(optTypes[0].value);
  const [typeCFDIS, setTypeCFDIS] = useState<string>(optTypes[0].value);
  const [provider, setProvider] = useState<string>(optProviders[0].value);
  const [responsibleS, setResponsibleS] = useState<string>(optResponsibles[0].value);
  const [categoryS, setCategoryS] = useState<string>(optCategories[0].value);
  
  const [showProvider, setShowProvider] = useState<boolean>(false);
  const [resetBand, setResetBand] = useState<boolean>(false);
  const [view, setView] = useState<JSX.Element>(<></>);
  const [viewCC, setViewCC] = useState<JSX.Element>(<></>);
  const [viewResponsible, setViewResponsible] = useState<JSX.Element>(<></>);
  
  const [viewAmount, setViewAmount] = useState<JSX.Element>(<CurrencyInput
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
  />)

  const SaveData = async() => {
    const {description, folio, taxFolio, discount, amount, vat} = formik.values
    updateBasicData(costcenter, folio, description, amount.replace(/[$,]/g, ""), 
        startDate, taxFolio, vat, discount.replace(/[$,]/g, ""), provider, responsibleS, 
        typeCFDIS, typeExpenseS, categoryS);
    
    if(voucher || CFDI){
      const formdata = new FormData();
      formdata.append('subtotal', amount.replace(/[$,]/g, ""));
      formdata.append('costcenter', costcenter);
      formdata.append('date', startDate);
      formdata.append('description', description);
      formdata.append('discount', discount.replace(/[$,]/g, ""));
      formdata.append('folio', folio);
      formdata.append('provider', provider);
      formdata.append('user', responsibleS);
      formdata.append('taxfolio', taxFolio);
      formdata.append('typeCFDI', typeCFDIS);
      formdata.append('category', categoryS);
      formdata.append('project', project);
      formdata.append('vat', vat);
      if(voucher){
        formdata.append('files', voucher);
        formdata.append('types', voucher.type);
      }
      if(CFDI){
        formdata.append('files', CFDI);
        formdata.append('types', CFDI.type);
      }
      try {
        const res = await CreateCostWithFiles(token, formdata);
        if(res === 201){
          setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          formik.values.discount = '';
          formik.values.folio = '';
          formik.values.taxFolio = '';
          formik.values.vat = '';
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
        subtotal:amount.replace(/[$,]/g, ""), costcenter, date:startDate, description, discount: discount.replace(/[$,]/g, ""), folio, provider, 
        user:responsibleS, taxfolio:taxFolio, typeCFDI: typeCFDIS, category: categoryS, project, vat,
      }
  
      try {
        const res = await SaveExpense(data, token);
        if(res===201){
          setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          formik.values.discount = '';
          formik.values.folio = '';
          formik.values.taxFolio = '';
          formik.values.vat = '';
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

  const addProvider = (newProvider:Options) => {
    optProviders.push(newProvider);
    //console.log('optProviders => ', optProviders);
    setProvider(newProvider.value);
    //console.log('prov length => ', optProviders.length)
    setIndexProv(optProviders.length - 1);
  }

  const [selectProvider, setSelectProviders] = useState<JSX.Element>(
              <SelectReact index={0} opts={optProviders} setValue={setProvider} />)
  const [indexProv, setIndexProv] = useState<number>(0);

  useEffect(() => {
    setSelectProviders(<></>);
    setTimeout(() => {
      setSelectProviders(
        <div>
          <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
          <div className="flex gap-x-2 items-center">
            <SelectReact index={indexProv} opts={optProviders} setValue={setProvider} />
            <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
              onClick={() => setShowProvider(true)} />
          </div>
        </div>
      )
    }, 1000);
  }, [indexProv]);
  
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

    let indexTypeExpense = 0;
    if(typeExpenseS !== ''){
      optTypes.map((opt, index:number) => {
        if(opt.value === typeExpense){
          indexTypeExpense = index;
        }
      });      
    }

    let indexTypeCFDI = 0;
    if(typeCFDIS !== ''){
      optTypes.map((opt, index:number) => {
        if(opt.value === typeCFDI){
          indexTypeCFDI = index;
        }
      });      
    }
    
    let indexResp = 0;
    if(responsibleS !== ''){
      optResponsibles.map((opt, index:number) => {
        if(opt.value === responsible){
          indexResp = index;
        }
      });      
    }

    let indexCate = 0;
    if(categoryS !== ''){
      optCategories.map((opt, index:number) => {
        if(opt.value === category){
          indexCate = index;
        }
      });      
    }

    setViewCC(<div className=" col-span-1 md:col-span-3">
          <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
          <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
        </div>)
    
    setView(<>
      <div>
        <Label htmlFor="typeExpense"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de gasto</p></Label>
        <SelectReact index={indexTypeExpense} opts={optTypes} setValue={setTypeExpenseS} />
      </div>
      <div>
        <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
        <SelectReact index={indexTypeCFDI} opts={optTypes} setValue={setTypeCFDIS} />
      </div>
      <div>
        <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
        <SelectReact index={indexCate} opts={optCategories} setValue={setCategoryS} />
      </div>
    </>)

    setViewResponsible(<div>
              <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
              <SelectReact index={indexResp} opts={optResponsibles} setValue={setResponsibleS} />
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
      
      let indexTypeExpense = 0;
      if(typeExpenseS !== ''){
        optTypes.map((opt, index:number) => {
          if(opt.value === typeExpense){
            indexTypeExpense = index;
          }
        });      
      }
      
      let indexTypeCFDI = 0;
      if(typeCFDIS !== ''){
        optTypes.map((opt, index:number) => {
          if(opt.value === typeCFDI){
            indexTypeCFDI = index;
          }
        });      
      }
      
      let indexProvider = 0;
      if(proveedor !== ''){
        optProviders.map((opt, index:number) => {
          if(opt.value === proveedor){
            indexProvider = index;
          }
        });      
      }
      
      let indexResp = 0;
      if(responsibleS !== ''){
        optResponsibles.map((opt, index:number) => {
          if(opt.value === responsible){
            indexResp = index;
          }
        });      
      }
      
      let indexCate = 0;
      if(categoryS !== ''){
        optCategories.map((opt, index:number) => {
          if(opt.value === category){
            indexCate = index;
          }
        });      
      }
      
      setViewCC(<div className=" col-span-1 md:col-span-3">
              <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
              <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
            </div>)

      setView(<>
        <div>
          <Label htmlFor="typeExpense"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de gasto</p></Label>
          <SelectReact index={indexTypeExpense} opts={optTypes} setValue={setTypeExpenseS} />
        </div>
        <div>
          <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
          <SelectReact index={indexTypeCFDI} opts={optTypes} setValue={setTypeCFDIS} />
        </div>
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectReact index={indexCate} opts={optCategories} setValue={setCategoryS} />
        </div>
      </>)
      setViewResponsible(<div>
              <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
              <SelectReact index={indexResp} opts={optResponsibles} setValue={setResponsibleS} />
            </div>)
      setResetBand(false);
    }
  }, [resetBand]);

  useEffect(() => {
    //console.log('CFDI ', typeCFDIS);
    if(typeCFDIS !== ''){
      const found = optTypes.find((type) => type.value === typeCFDIS);
      if(found){
        //console.log({found});
        if(found.label.toLowerCase().includes('egreso')){
          setViewAmount(<></>);
          setTimeout(() => {
            let num = Number(formik.values.amount.replace(/[$,]/g, ""));
            if(num > 0){
              num = num * -1;
              formik.values.amount = num.toString();
            }
            
            setViewAmount(<CurrencyInput
              id="amount"
              name="amount"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              defaultValue={num}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {try {
                formik.values.amount=value || '0';
              } catch (error) {
                formik.values.amount='0';
              }}}
            />)
          }, 30);
        }
      }
    }
  }, [typeCFDIS]);

  return(
    <div className="w-full bg-white">
      <div className="mt-2">
        <NavExpenseStepper index={1} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-3xl rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-5">
          {viewCC}
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
          <div className=" col-span-1 sm:col-span-2">
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
            <Label htmlFor="vat">Iva</Label>
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
            <Label htmlFor="discount">Descuento</Label>
            <CurrencyInput
              id="discount"
              name="discount"
              // className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              //   focus:border-slate-700 outline-0"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                focus:border-slate-700 outline-0"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              //defaultValue={0}
              defaultValue={discount}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {try {
                formik.values.discount=value || '0';
              } catch (error) {
                formik.values.discount='0';
              }}}
            />
            {/* <Input type="text" name="discount" 
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            /> */}
            {formik.touched.discount && formik.errors.discount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.discount}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
            {viewAmount}
            {/* <CurrencyInput
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
            /> */}
            {/* <Input type="text" name="amount" 
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            /> */}
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
            {/* <input 
              className="w-full h-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                focus:border-slate-700 outline-0"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            /> */}
          </div>
          {view}
          <div className=" col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            {selectProvider}
            {viewResponsible}
          </div>
          
        </div>

        <div className="mt-5">
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
      {showProvider && <AddProvider token={token} setShowForm={setShowProvider} 
                            addProv={addProvider}  />} 
    </div>
  )
}