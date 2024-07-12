"use client"
//import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import NavExpenseStepper from "./NavExpenseStepper"
import { useNewExpense } from "@/app/store/newExpense"
import SaveExpense from "@/app/functions/SaveExpense"
import { showToastMessage, showToastMessageError } from "../Alert"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import AddProvider from "./AddProvider"
import { CreateCostWithFiles } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';
import { getSupplierCreditProv } from "@/app/functions/CostsFunctions"

export default function DataStepper({token, user, optCostCenter, optProviders, 
                                      optResponsibles, optCategories, optTypes, optVats
                                    }: 
                                  {token:string, user:string, optCostCenter:Options[],
                                    optProviders:Options[], optResponsibles:Options[],
                                    optCategories:Options[], optTypes:Options[], 
                                    optVats:Options[] }){
  
  const {updateIndexStepper, updateBasicData, CFDI, voucher, amount, 
    costCenter, date, description, discount, 
    folio, project, proveedor, responsible, taxFolio, 
    typeCFDI, vat, reset, updateRefresh, isCard, 
    report, condition, category, isPettyCash, concept,
    updateIsCard, updateCostCenter} = useNewExpense();

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
      updateBasicData(folio, description, amount.replace(/[$,]/g, ""), 
          startDate, taxFolio, vat.replace(/[$,]/g, ""), discount.replace(/[$,]/g, ""), provider, responsibleS, 
          typeCFDIS, '', categoryS, idVat, 'PROVEEDOR');
      updateIndexStepper(2);
    },
  });

  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  let day = new Date().getDate().toString();
  if(month.length ===1) month = '0'+month;
  if(day.length ===1) day = '0'+day;

  const d = year+'-'+month+'-'+day;
  
  //const [costcenter, setCostCenter] = useState<string>(optCostCenter[0].value);
  const [startDate, setStartDate] = useState<string>(date!== ''? date: d);
  //const [typeExpenseS, setTypeExpenseS] = useState<string>(optTypes[0].value);
  const [typeCFDIS, setTypeCFDIS] = useState<string>(optTypes[0].value);
  const [provider, setProvider] = useState<string>(proveedor!==''? proveedor: optProviders[0].value);
  const [responsibleS, setResponsibleS] = useState<string>(responsible!==''? responsible: optResponsibles[0].value);
  const [categoryS, setCategoryS] = useState<string>(optCategories[0].value);
  
  const [showProvider, setShowProvider] = useState<boolean>(false);
  const refRequest = useRef(true);
  //const [resetBand, setResetBand] = useState<boolean>(false);
  //const [view, setView] = useState<JSX.Element>(<></>);
  //const [viewCC, setViewCC] = useState<JSX.Element>(<></>);
  //const [viewResponsible, setViewResponsible] = useState<JSX.Element>(<></>);
  
  //actualizacion juntar estos 2 estados en un objeto
  const [idVat, setIdVat] = useState<string>(optVats[0].value);
  //const [vatValue, setVatValue] = useState<string>('0');
  
  let vatValue = '0';
  try {
    const foundVat = optVats.find((vat) => vat.value === idVat);
    const vatvalue = foundVat?.label || '0';
    const operation = 
      (Number(formik.values.amount.replace(/[$,]/g, "")) - 
        Number(formik.values.discount.replace(/[$,]/g, ""))) * Number(vatvalue) / 100;
    formik.values.vat = operation.toFixed(2).toString();
    vatValue = operation.toFixed(2).toString();
    //setVatValue(operation.toFixed(2).toString());
  } catch (error) {
    vatValue = '0';
    formik.values.vat = '0';
  }

  //console.log('formik amount => ', Number(formik.values.amount.replace(/[$,]/g, "")));
  let viewAmount: JSX.Element = <></>;
  viewAmount = (
    <CurrencyInput
      id="amount"
      name="amount"
      className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
        focus:border-slate-700 outline-0"
      onChange={formik.handleChange}
      onBlur={formik.handleChange}
      //defaultValue={Number(formik.values.amount.replace(/[$,]/g, ""))}
      // value={Number(formik.values.amount.replace(/[$,]/g, ""))}
      value={formik.values.amount.replace(/[$,]/g, "")}
      decimalsLimit={2}
      prefix="$"
      onValueChange={(value) => {try {
        console.log('value amount data stepper => ', value);
        formik.values.amount=value || '0';
      } catch (error) {
        formik.values.amount='0';
      }}}
    />
  )

  useEffect(() => {
    handleConstCenter(optCostCenter[0].value);
  }, []);

  console.log('costcenter contex => ', costCenter);
  console.log('concept context => ', concept);
  const SaveData = async() => {
    refRequest.current = false;
    const {description, folio, taxFolio, discount, amount, vat} = formik.values
    updateBasicData(folio, description, amount.replace(/[$,]/g, ""), 
        startDate, taxFolio, vat, discount.replace(/[$,]/g, ""), provider, responsibleS, 
        typeCFDIS, '', categoryS, idVat.replace(/[$,]/g, ""), 'PROVEEDOR');
    
    let supplierCredit: boolean;
    try {
      supplierCredit = await getSupplierCreditProv(token, provider);
    } catch (error) {
      supplierCredit = false;
    }
    
    const costcenter = {
      category: costCenter,
      concept
    }

    if(voucher || CFDI){
      const formdata = new FormData();
      //formdata.append('subtotal', amount.replace(/[$,]/g, ""));
      formdata.append('costocenter', JSON.stringify(costcenter));
      formdata.append('date', startDate);
      formdata.append('description', description);
      //formdata.append('discount', discount.replace(/[$,]/g, ""));
      formdata.append('folio', folio);
      formdata.append('provider', provider);
      formdata.append('user', responsibleS);
      formdata.append('taxfolio', taxFolio);
      formdata.append('typeCFDI', typeCFDIS);
      formdata.append('category', categoryS);
      formdata.append('project', project);
      //formdata.append('vat', vat);
      formdata.append('report', report);
      formdata.append('isticket', JSON.stringify(false));
      formdata.append('iscard', JSON.stringify(isCard));
      formdata.append('type', 'PROVEEDOR');
      formdata.append('condition', JSON.stringify([{
        glossary: condition,
        user
      }]));
      formdata.append('cost', JSON.stringify({
        discount: discount.replace(/[$,]/g, ""),
        subtotal:amount.replace(/[$,]/g, ""),
        iva:vat.replace(/[$,]/g, ""),
        vat: idVat, 
      }));
      if(voucher){
        formdata.append('files', voucher);
        formdata.append('types', voucher.type);
      }
      if(CFDI){
        formdata.append('files', CFDI);
        formdata.append('types', CFDI.type);
      }
      try {
        formdata.append('ispaid', JSON.stringify(supplierCredit));
        const res = await CreateCostWithFiles(token, formdata);
        if(res === 201){
          //setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          formik.values.discount = '';
          formik.values.folio = '';
          formik.values.taxFolio = '';
          formik.values.vat = '';
          //setClearAmount(true);
          showToastMessage('Costo creado satisfactoriamente!!!');
          updateRefresh(true);
          // setTimeout(() => {
          //   setResetBand(true);
          // }, 300);
          refRequest.current = true;
        }else{
          refRequest.current = true;
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }else{
      const data = {
        costocenter:costcenter, date:startDate, description, 
        cost: {
          discount: discount.replace(/[$,]/g, ""),
          subtotal:amount.replace(/[$,]/g, ""),
          iva:vat.replace(/[$,]/g, ""),
          vat: idVat, isCard
        },
        folio, provider, user:responsibleS, 
        taxfolio:taxFolio, typeCFDI: typeCFDIS, project, ispaid:supplierCredit,
        report, isticket:false, category:categoryS, condition: [{
          glossary: condition,
          user
        }], iscard:isCard, type:'PROVEEDOR',
      }
  
      try {
        const res = await SaveExpense(data, token);
        if(res===201){
          //setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          formik.values.discount = '';
          formik.values.folio = '';
          formik.values.taxFolio = '';
          formik.values.vat = '';
          showToastMessage('Costo creado satisfactoriamente!!!');
          //setClearAmount(true);
          updateRefresh(true);
          // setTimeout(() => {
          //   setResetBand(true);
          // }, 300);
          refRequest.current = true;
        }
        else{
          showToastMessageError(res);
          refRequest.current = true;
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
    //setIndexProv(optProviders.length - 1);
  }

  let indexProvider = 0;
  if(provider !== ''){
    optProviders.map((opt, index:number) => {
      if(opt.value === proveedor){
        indexProvider = index;
      }
    });      
  }

  const handleProvider = (value : string) => {
    setProvider(value);
  }

  const selectProvider = (
    <div>
        <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
        <div className="flex gap-x-2 items-center">
          <SelectReact index={indexProvider} opts={optProviders} setValue={handleProvider} />
          <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
          onClick={() => setShowProvider(true)} />
      </div>
    </div>
  )

  let indexCate = 0;
  if(categoryS !== ''){
    optCategories.map((opt, index:number) => {
      if(opt.value === category){
        indexCate = index;
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

  const handleCategory = (value: string) => {
    setCategoryS(value);
  }

  const handleTypeCfdi = (value: string) => {
    handleTypeCategoryCFDI(value);
    console.log('value type cfdi => ', value);
    setTypeCFDIS(value);
  }

  const view = (
    <>
      <div>
        <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
        <SelectReact index={indexCate} opts={optCategories} setValue={handleCategory} />
      </div>
      <div>
        <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
        <SelectReact index={indexTypeCFDI} opts={optTypes} setValue={handleTypeCfdi} />
      </div>
    </>
  );

  let indexCC = 0;
  if(costCenter !== ''){
    optCostCenter.map((opt, index:number) => {
      if(opt.value === costCenter){
        indexCC = index;
      }
    });      
  }

  const handleConstCenter = (value : string) => {
    console.log('value costoc => ', value);
    const indexCaracter = value.indexOf('/');
    const c1 = value.substring(0, indexCaracter);
    const c2 = value.substring(indexCaracter + 1);
    console.log('cad 1 => ', c1);
    console.log('cad 2 => ', c2);
    updateCostCenter(c1, c2);
    //setCostCenter(value);
  }

  const viewCC = (
    <div className=" col-span-1 md:col-span-3">
      <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
      <SelectReact index={indexCC} opts={optCostCenter} setValue={handleConstCenter} />
    </div>
  );

  let indexResp = 0;
  if(responsibleS !== ''){
    optResponsibles.map((opt, index:number) => {
      if(opt.value === responsibleS){
        indexResp = index;
      }
    });      
  }

  let viewResponsible = (
    <div>
      <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
      <SelectReact index={indexResp} opts={optResponsibles} setValue={setResponsibleS} />
    </div>
  );

  const handleTypeCategoryCFDI = (catType: string) => {
    if(catType !== ''){
      const found = optTypes.find((type) => type.value === catType);
      if(found){
        if(found.label.toLowerCase().includes('egreso')){
          let num = Number(formik.values.amount.replace(/[$,]/g, ""));
          if(num > 0){
            num = num * -1;
            formik.values.amount = num.toString();
          }
        }else{
          let num = Number(formik.values.amount.replace(/[$,]/g, ""));
          if(num < 0){
            num = Math.abs(num) ;
            formik.values.amount = num.toString();
          }    
        }
      }
    }
  }

  const handleIdVat = (value: string) => {
    setIdVat(value);
  };

  // const vatCalculated = () => {
  //   try {
  //     const foundVat = optVats.find((vat) => vat.value === idVat);
  //     const vatvalue = foundVat?.label || '0';
  //     const operation = 
  //       (Number(formik.values.amount.replace(/[$,]/g, "")) - 
  //         Number(formik.values.discount.replace(/[$,]/g, ""))) * Number(vatvalue) / 100;
  //     formik.values.vat = operation.toFixed(2).toString();
  //     //setVatValue(operation.toFixed(2).toString());
  //   } catch (error) {
  //     formik.values.vat = '0';
  //   }
  // }

  return(
    <div className="w-full bg-white">
      <div className="mt-2">
        <NavExpenseStepper index={1} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-3xl rounded-lg">
        {isPettyCash && (
          <div className="flex justify-end my-5 pr-3">
            <div className="inline-flex items-center">
              <Label>Tarjeta</Label>  
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input checked={isCard} 
                  onClick={() => updateIsCard(!isCard)} id="switch-3" type="checkbox"
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
          </div>
        )}
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
            <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
            {viewAmount}
            {formik.touched.amount && formik.errors.amount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.amount}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="discount">Descuento / Iva excento</Label>
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
            {formik.touched.discount && formik.errors.discount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.discount}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="vat">Iva</Label>
            <div className="flex gap-x-3">
              <CurrencyInput
                id="vat"
                name="vat"
                className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                  focus:border-slate-700 outline-0"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
                decimalsLimit={2}
                value={vatValue}
                prefix="$"
                onValueChange={(value) => {try {
                  formik.values.vat=value || '0';
                } catch (error) {
                  formik.values.vat='0';
                }}}
              />
              {formik.touched.vat && formik.errors.vat ? (
                  <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                      <p>{formik.errors.vat}</p>
                  </div>
              ) : null}
              <SelectReact index={0} opts={optVats} setValue={handleIdVat} />
            </div>
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
          <div className=" col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            {selectProvider}
            {viewResponsible}
          </div>
          
        </div>

        <div className="mt-5">
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description"
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
          <Button type="button" onClick={() => {
            if(refRequest.current){
              SaveData();
            }
            else{
              showToastMessageError('Ya hay una peticion en proceso..!');
            }
          }}>Guardar</Button>
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