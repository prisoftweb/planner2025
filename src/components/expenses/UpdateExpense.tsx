"use client"
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useState, useRef, useEffect } from "react";
//import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { OneExpense } from "@/interfaces/Expenses"
import { UpdateCost, GetVatsLV } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';
import { showToastMessage, showToastMessageError } from "../Alert"
import { useNewExpense } from "@/app/store/newExpense"
import { CostoCenterLV } from "@/interfaces/CostCenter";
import { getCostoCentersLV } from "@/app/api/routeCostCenter";

export default function UpdateExpense({token, id, expense, isticket, isHistory}: 
                                  {token:string, id:string, expense:OneExpense, 
                                    isticket:boolean, isHistory: boolean}){

  const {currentExpense, updateCurrentExpense} = useNewExpense();
  const [costcenter, setCostCenter] = 
          useState<string>(currentExpense? 
                              typeof(currentExpense.costocenter)==='string'? currentExpense.costocenter : currentExpense.costocenter?._id || ''
                              : typeof(expense.costocenter)==='string'? expense.costocenter : expense.costocenter?._id || '');
  //console.log('expense date => ', expense.date);
  //console.log('expense ?? => ', expense);
  const [startDate, setStartDate] = 
          useState<string>(currentExpense? currentExpense.date.substring(0, 10): expense.date.substring(0, 10));
  //const [viewCC, setViewCC] = useState<JSX.Element>(<></>);
  const [concept, setConcept] = useState<string>(currentExpense? 
                    typeof(currentExpense.costocenter)==='string'? currentExpense.costocenter : currentExpense.costocenter?.concept?._id || ''
                    : typeof(expense.costocenter)==='string'? expense.costocenter : expense.costocenter?.concept._id || '');
  const [isCard, setIsCard] = useState<boolean>(currentExpense? currentExpense.iscard: expense.iscard);
  const refRequest = useRef(true);

  const [optCostCenter, setOptCostCenter] = useState<Options[]>([]);
  const [optVats, setOptVats] = useState<Options[]>([]);
  const [idVat, setIdVat] = useState<string>('');
  const [vatValue, setVatValue] = useState(currentExpense? currentExpense.cost.iva.toString(): expense.cost.iva.toString());
  const [totalExpense, setTotalExpense] = useState<string>(currentExpense? currentExpense.cost?.total?.toString() || '0': expense.cost?.total?.toString() || '0');
  // const [haveTaxExempt, setHaveTaxExempt] = useState<boolean>(false);
  const [haveTaxExempt, setHaveTaxExempt] = useState<boolean>(currentExpense? currentExpense.cost?.exempttax? true: false :
                                                expense.cost?.exempttax? true: false);
  const [haveDiscount, setHaveDiscount] = useState<boolean>(currentExpense? currentExpense.cost?.discount? true: false :
                                                      expense.cost?.discount? true: false)

  useEffect(() => {
    const fetchCostCenters = async () => {
      let costcenters: CostoCenterLV[];
      try {
        costcenters = await getCostoCentersLV(token);
        if(typeof(costcenters)==='string'){
          return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
      }
      
      let optVatts: Options[];
      try {
        optVatts = await GetVatsLV(token);
        if(typeof(optVatts)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optVatts}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los ivas!!</h1>
      }

      const optCC:Options[]= [];
      costcenters.map((costcenter) => {
        optCC.push({
          label: costcenter.label || 'sin categoria',
          value: costcenter.categoryid + '/' + costcenter.value
        });
      });
      
      // let indexVat = 0;
      // if(currentExpense){
      //   indexVat = optVatts.findIndex((ivat) => currentExpense.cost?.iva === Number(ivat.label));
      //   // console.log('current expense => ', currentExpense.cost.iva);
      //   // console.log('opt vats => ', optVatts);
      // }else{
      //   indexVat = optVatts.findIndex((ivat) => expense.cost?.iva == Number(ivat.label));
      //   // console.log('expense => ', expense.cost.iva);
      //   // console.log('opt vats => ', optVatts);
      // }

      setOptCostCenter(optCC);
      setOptVats(optVatts);
      setIdVat(optVatts[0].value);
    }
    fetchCostCenters();
  }, []);

  //const indexCC = optCostCenter.findIndex((cc) => cc.value === costcenter);
  // console.log('cost center ue => ', costcenter);
  // console.log('options cc ue => ', optCostCenter);
  // console.log('index cc ue => ', optCostCenter.findIndex((cc) => cc.value === costcenter+'/'+concept));
  const indexCC = optCostCenter.findIndex((cc) => cc.value === costcenter+'/'+concept);

  const handleCostCenter = (value: string) => {
    console.log('value costoc => ', value);
    const indexCaracter = value.indexOf('/');
    const c1 = value.substring(0, indexCaracter);
    const c2 = value.substring(indexCaracter + 1);
    //console.log('cad 1 => ', c1);
    //console.log('cad 2 => ', c2);
    //updateCostCenter(c1, c2);
    setCostCenter(c1);
    setConcept(c2);
  }

  const viewCC = optCostCenter.length > 0? (
    <div className=" col-span-1 sm:col-span-2">
      <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
      <SelectReact index={indexCC} opts={optCostCenter} setValue={handleCostCenter} />
    </div>
  ): (
    <></>
  )

  const formik = useFormik({
    initialValues: {
      folio: currentExpense? currentExpense.folio: expense.folio,
      taxFolio: currentExpense? currentExpense.taxfolio: expense.taxfolio,
      vat: '0',
      discount: currentExpense? currentExpense.cost.discount? currentExpense.cost.discount.toString(): '0': 
                expense.cost.discount? expense.cost.discount.toString(): '0',
      amount: currentExpense? currentExpense.cost.subtotal.toString(): expense.cost.subtotal.toString(),
      description: currentExpense?  currentExpense.description: expense.description,
      taxExempt: currentExpense? currentExpense.cost?.exempttax?.toString() || '0' : expense.cost?.exempttax?.toString() || '0',
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
      if(refRequest.current){
        refRequest.current = false;
        const {amount, description, discount, folio, taxFolio, vat, taxExempt} = valores;
        const costocenter = {
          category: costcenter,
          concept
        }
        const data = { description, 
            folio, taxfolio:taxFolio, costocenter, date:startDate, iscard:isCard, 
            cost: {
              discount: discount.toString().replace(/[$,]/g, ""),
              subtotal:amount.replace(/[$,]/g, ""),
              iva:vat.replace(/[$,]/g, ""),
              vat: optVats.find((vat) => vat.value === idVat)?.value || '',
              exempttax: taxExempt.replace(/[$,]/g, ""),
              total: totalExpense.replace(/[$,]/g, ""),
            }}
            //console.log('send data => ', JSON.stringify(data));
            //console.log('id vat => ', idVat);
        try {
          console.log('update expense => ', JSON.stringify(data));
          const res = await UpdateCost(token, id, data);
          if(typeof(res) !== 'string'){
            refRequest.current = true;
            showToastMessage('Costo actualizado exitosamente!!!');
            updateCurrentExpense(res);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un problema al actualizar costo!!')
        }
      }else{
        showToastMessageError('Ya hay una peticion en proceso..!!!');
      }
    },       
  });

  // useEffect(() => {
  //   let indexCC = 0;
  //   if(expense.costcenter){
  //     //console.log('expense cc ', expense.costcenter);
  //     optCostCenter.map((optCC, index:number) => {
  //       if(typeof(expense.costcenter)==='string'){
  //         if(optCC.value===expense.costcenter){
  //           //alert('aquiii');
  //           setCostCenter(optCostCenter[index].value);
  //           indexCC = index;
  //         }
  //       }else{
  //         if(optCC.value===expense.costcenter.categorys[0]._id){
  //           //alert('aquiii');
  //           setCostCenter(optCostCenter[index].value);
  //           indexCC = index;
  //         }
  //       }
  //     });
  //   }
  //   setViewCC(<></>);
  //   setTimeout(() => {
  //     setViewCC(<div className=" col-span-1 sm:col-span-2">
  //               <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
  //               <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
  //             </div>);
  //   }, 50);
  //   setCostCenter(optCostCenter[indexCC].value);
  // }, []);

  // useEffect(() => {
  //   if(currentExpense){
  //     formik.values.amount = currentExpense.cost.subtotal.toString(),
  //     formik.values.folio = currentExpense.folio;
  //     formik.values.taxFolio= currentExpense.taxfolio,
  //     formik.values.vat= currentExpense.cost.iva.toString(),
  //     formik.values.discount= currentExpense.cost.discount? currentExpense.cost.discount.toString(): '0' ;
  //     formik.values.description= currentExpense.description;
  //     setCostCenter(typeof(currentExpense.costocenter)==='string'? currentExpense.costocenter : currentExpense.costocenter?.category._id || ''); 
  //     setStartDate(currentExpense.date.substring(0, 10));
  //     setConcept(typeof(currentExpense.costocenter)==='string'? currentExpense.costocenter : currentExpense.costocenter?.concept?._id)
  //     setIsCard(currentExpense.iscard);
  //   }
  // }, [currentExpense]);

  const handleIdVat = (value: string) => {
    updateIva(value);
    setIdVat(value);
  };

  // let vatValue = '0';
  // try {
  //   const foundVat = optVats.find((vat) => vat.value === idVat);
  //   const vatvalue = foundVat?.label || '0';
  //   const operation = 
  //     (Number(formik.values.amount.replace(/[$,]/g, "")) - 
  //       Number(formik.values.discount.replace(/[$,]/g, ""))) * Number(vatvalue) / 100;
  //   formik.values.vat = operation.toFixed(2).toString();
  //   vatValue = operation.toFixed(2).toString();
  //   //setVatValue(operation.toFixed(2).toString());
  // } catch (error) {
  //   vatValue = '0';
  //   formik.values.vat = '0';
  // }

  // const updateIva = (idvat: string) => {
  //   try {
  //     const foundVat = optVats.find((vat) => vat.value === idvat);
  //     const vatvalue = foundVat?.label || '0';
  //     const operation = 
  //       (Number(formik.values.amount.replace(/[$,]/g, "")) - 
  //         Number(formik.values.discount.replace(/[$,]/g, ""))) * Number(vatvalue) / 100;
  //     formik.values.vat = operation.toFixed(2).toString();
  //     //vatValue = operation.toFixed(2).toString();
  //     setVatValue(operation.toFixed(2).toString());
  //     //setCurrentVat(operation);
  //     //setVatValue(operation.toFixed(2).toString());
  //   } catch (error) {
  //     //vatValue = '0';
  //     setVatValue('0');
  //     formik.values.vat = '0';
  //   }
  // }

  const updateIva = (idvat: string) => {
    try {
      const foundVat = optVats.find((vat) => vat.value === idvat);
      const vatvalue = foundVat?.label || '0';
      let operation;
      let t = 0;
      if(haveDiscount && haveTaxExempt){
        operation = (Number(formik.values.amount.replace(/[$,]/g, "")) - 
                        Number(formik.values.discount.replace(/[$,]/g, "")) -
                        Number(formik.values.taxExempt.replace(/[$,]/g, ""))) * 
                          Number(vatvalue) / 100;
        
        t = Number(formik.values.amount.replace(/[$,]/g, "")) -
              Number(formik.values.discount.replace(/[$,]/g, "")) -
              Number(formik.values.taxExempt.replace(/[$,]/g, "")) +
              operation;
      }else{
        if(haveDiscount){
          operation = (Number(formik.values.amount.replace(/[$,]/g, "")) - 
                        Number(formik.values.discount.replace(/[$,]/g, ""))) * 
                          Number(vatvalue) / 100;

          t = Number(formik.values.amount.replace(/[$,]/g, "")) -
                Number(formik.values.discount.replace(/[$,]/g, "")) +
                operation;
        }else{
          if(haveTaxExempt){
            operation = (Number(formik.values.amount.replace(/[$,]/g, "")) - 
                        Number(formik.values.taxExempt.replace(/[$,]/g, ""))) * 
                          Number(vatvalue) / 100;

            t = Number(formik.values.amount.replace(/[$,]/g, "")) -
                  Number(formik.values.taxExempt.replace(/[$,]/g, "")) +
                  operation;              
          }else{
            operation = (Number(formik.values.amount.replace(/[$,]/g, ""))) * 
                          Number(vatvalue) / 100;
                
            t = Number(formik.values.amount.replace(/[$,]/g, "")) + operation;
          }
        }
      }
      
      formik.values.vat = operation.toFixed(2).toString();
      setVatValue(operation.toFixed(2).toString());
      setTotalExpense(t.toFixed(2).toString())
    } catch (error) {
      setVatValue('0');
      formik.values.vat = '0';
    }
  }

  const updateTotal = (valueIva: string) => {
    try {
      let t = 0;
      if(haveDiscount && haveTaxExempt){
        t = Number(formik.values.amount.replace(/[$,]/g, "")) -
              Number(formik.values.discount.replace(/[$,]/g, "")) -
              Number(formik.values.taxExempt.replace(/[$,]/g, "")) +
              Number(valueIva.replace(/[$,]/g, ""));
      }else{
        if(haveDiscount){
          t = Number(formik.values.amount.replace(/[$,]/g, "")) -
                Number(formik.values.discount.replace(/[$,]/g, "")) +
                Number(valueIva.replace(/[$,]/g, ""));
        }else{
          if(haveTaxExempt){
            t = Number(formik.values.amount.replace(/[$,]/g, "")) -
                  Number(formik.values.taxExempt.replace(/[$,]/g, "")) +
                  Number(valueIva.replace(/[$,]/g, ""));
          }else{
            t = Number(formik.values.amount.replace(/[$,]/g, "")) + 
                  Number(valueIva.replace(/[$,]/g, ""));
          }
        }
      }
      //console.log('update total => ', t.toFixed(2).toString());
      setTotalExpense(t.toFixed(2).toString());
    } catch (error) {
      setTotalExpense('0');
    }
  }

  //console.log('total render => ', totalExpense);

  let viewTotal: JSX.Element = <></>;
  viewTotal = (
    <CurrencyInput
      id="total"
      name="total"
      className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
        focus:border-slate-700 outline-0"
      //onChange={formik.handleChange}
      //onBlur={formik.handleChange}
      //value={formik.values.amount.replace(/[$,]/g, "")}
      value={totalExpense.replace(/[$,]/g, "")}
      decimalsLimit={2}
      prefix="$"
      disabled={isHistory}
      onValueChange={(value) => {try {
        //console.log('value amount data stepper => ', value);
        //formik.values.amount=value || '0';
        setTotalExpense(value || '0');
      } catch (error) {
        //formik.values.amount='0';
        setTotalExpense('0');
      }}}
    />
  )

  return(
    <div className="w-full">
      <HeaderForm img="/img/costs/costs.svg" subtitle="Modifica los datos basicos de un gasto" 
        title="Modificar gasto"
      />
      <div className="flex gap-x-5 justify-end my-5 pr-3">
        <div className="inline-flex items-center">
          <Label>Descuento</Label>  
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={haveDiscount} 
              onClick={() => setHaveDiscount(!haveDiscount)} id="discount" type="checkbox"
              onChange={() => console.log('')}
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor="discount"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>

        <div className="inline-flex items-center">
          <Label>Iva exento</Label>  
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={haveTaxExempt} 
              onClick={() => setHaveTaxExempt(!haveTaxExempt)} id="exemptTax" type="checkbox"
              onChange={() => console.log('')}
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor="exemptTax"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>

        <div className="inline-flex items-center">
          <Label>Tarjeta</Label>  
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={isCard} 
              onClick={() => setIsCard(!isCard)} id="switch-3" type="checkbox"
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
      <form onSubmit={formik.handleSubmit} 
        className="mt-4 w-full rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-5">
        {viewCC}
        <div className="mt-0">
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <input 
            className="w-full h-10 border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0"
            type="date"
            disabled={isHistory}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={`${isticket? 'hidden': ''}`}>
          <Label htmlFor="folio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio</p></Label>
          <Input type="text" name="folio" autoFocus 
            value={formik.values.folio}
            disabled={isHistory}
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
            disabled={isHistory}
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
            disabled={isHistory}
            //placeholder="Please enter a number"
            defaultValue={currentExpense?.cost.subtotal || expense?.cost.subtotal || 0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.amount=(value || '0');
              handleIdVat(idVat);
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
        {haveDiscount && (
          <div className={`${isticket? 'hidden': ''}`}>
            <Label htmlFor="discount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descuento</p></Label>
            <CurrencyInput
              id="discount"
              name="discount"
              // className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              //   focus:border-slate-700 outline-0"
              className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
                focus:border-slate-700 outline-0"
              //value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              //placeholder="Please enter a number"
              //defaultValue={currentExpense?.cost.discount || 0}
              defaultValue={currentExpense?.cost.discount || expense?.cost.discount || 0}
              decimalsLimit={2}
              disabled={isHistory}
              prefix="$"
              onValueChange={(value) => {try {
                //console.log('value input => ', value);
                //console.log('formik value => ', formik.values.discount);
                //updateIva(idVat);
                handleIdVat(idVat);
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
          </div>
        )}
        {haveTaxExempt && (
          <div>
            <Label htmlFor="taxExemptt">Iva exento</Label>
            <CurrencyInput
              id="taxExemptt"
              name="taxExemptt"
              // className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              //   focus:border-slate-700 outline-0"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                focus:border-slate-700 outline-0"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              //defaultValue={0}
              //defaultValue={discount}
              value={formik.values.taxExempt.replace(/[$,]/g, "") || 0}
              decimalsLimit={2}
              prefix="$"
              disabled={isHistory}
              onValueChange={(value) => {try {
                formik.values.taxExempt=value || '0';
              } catch (error) {
                formik.values.taxExempt='0';
              }}}
            />
            {formik.touched.taxExempt && formik.errors.taxExempt ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.taxExempt}</p>
              </div>
            ) : null}
          </div>
        )}
        <div className={`${isticket? 'hidden': ''}`}>
          <div className="flex justify-between">
            <Label htmlFor="vat"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Iva</p></Label>
            <Label htmlFor="vatt"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Impuestos</p></Label>
          </div>
          <div className="flex gap-x-1">
            <CurrencyInput
              id="vat"
              name="vat"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                focus:border-slate-700 outline-0"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              decimalsLimit={2}
              disabled={isHistory}
              value={vatValue}
              //defaultValue={currentExpense?.cost.iva || expense?.cost.iva || 0}
              prefix="$"
              onValueChange={(value) => {try {
                formik.values.vat=value || '0';
                updateTotal(value || '0');
                setVatValue(value || '0');
              } catch (error) {
                setVatValue('0');
                formik.values.vat='0';
              }}}
            />
            {formik.touched.vat && formik.errors.vat ? (
                <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                    <p>{formik.errors.vat}</p>
                </div>
            ) : null}
            {optVats.length > 0 && (
              // <SelectReact index={Number(idVat)} opts={optVats} setValue={handleIdVat} />
              <SelectReact index={0} opts={optVats} setValue={handleIdVat} />
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="total"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Total</p></Label>
          {viewTotal}
        </div>
        <div className=" col-span-1 sm:col-span-3">
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description"
            // className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            // focus:border-slate-700 outline-0 overflow-hidden resize-none"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0 overflow-hidden resize-none"
            rows={4}
            disabled={isHistory} 
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
        {isHistory? <></>: (
          <div className="flex justify-center mt-8 space-x-5">
            <Button type="submit">Guardar</Button>         
          </div>
        )}
      </form>  
    </div>
  )
}