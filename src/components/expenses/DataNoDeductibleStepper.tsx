"use client"
//import HeaderForm from "../HeaderForm"
import Label from "../Label"
//import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useEffect, useState, useRef } from "react";
//import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NavExpenseNoDeductibleStepper from "./NavExpenseNoDeductibleStepper";
import { useNewExpense } from "@/app/store/newExpense"
import SaveExpense from "@/app/functions/SaveExpense"
import { showToastMessage, showToastMessageError } from "../Alert"
import { CreateCostWithFiles } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';
import Input from "../Input";
import { useOptionsExpense } from "@/app/store/newExpense";

export default function DataNoDeductibleStepper({token, user, idLabour, idTicket, idVat }: 
                                  {token:string, user:string, idLabour:string, 
                                    idTicket:string, idVat:string}){
  
  const {updateIndexStepper, updateBasicData, voucher, amount, report,
    costCenter, date, description, responsible, project, condition, category, 
    reset, updateRefresh, updateCategory, isCard, isPettyCash, concept, 
    updateIsCard, updateCostCenter, total} = useNewExpense();

  const {costCenterOpt, responsibles} = useOptionsExpense();
  
  const [categoryS, setCategoryS] = useState<string>(category===''? idLabour: category);
  //const [categoryCostCenter, setCategoryCostCenter] = useState<string>(costCenter===''?  )
  //const [totalExpense, setTotalExpense] = useState<string>(total);

  const handleCostCenter = (value:string) => {
    //setCostCenter(value);
    console.log('value costoc => ', value);
    const indexCaracter = value.indexOf('/');
    const c1 = value.substring(0, indexCaracter);
    const c2 = value.substring(indexCaracter + 1);
    //console.log('cad 1 => ', c1);
    //console.log('cad 2 => ', c2);
    updateCostCenter(c1, c2);
    const cc = costCenterOpt.find((costC) => costC.value === value);
    if(cc){
      if(cc.label.toLowerCase().includes('mano de obra')){
        //console.log('idlabour ');
        setCategoryS(idLabour);
        updateCategory(idLabour);
      }else{
        //console.log('id ticket ');
        setCategoryS(idTicket);
        updateCategory(idTicket);
      }
    }
  }
  
  if(concept==='' || costCenter === ''){
    handleCostCenter(costCenterOpt[0].value);
  }

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
      let type = 'OTROS';
      const cc = costCenterOpt.find((costc) => costc.value === (costCenter + '/' + concept));
      if(cc?.label.toLowerCase().includes('mano de obra')){
        type = 'MANO DE OBRA';
      }
      console.log('cc => ', cc);
      console.log('type no deductible => ', type);
      updateBasicData('', description, amount.replace(/[$,]/g, ""), 
          startDate, '', '', '', '', responsibleS, 
          '', '', categoryS, '', type, '', amount.replace(/[$,]/g, ""));
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
  const [startDate, setStartDate] = useState<string>(d);
  const [responsibleS, setResponsibleS] = useState<string>(responsibles[0].value);
  const [resetBand, setResetBand] = useState<boolean>(false);
  const [view, setView] = useState<JSX.Element>(<></>);
  //const [viewCC, setViewCC] = useState<JSX.Element>(<></>);
  const [clearAmount, setClearAmount] = useState<boolean>(false);
  const refRequest = useRef(true);
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
                                            autoFocus
                                            onValueChange={(value) => {try {
                                              formik.values.amount=value || '0';
                                            } catch (error) {
                                              formik.values.amount='0';
                                            }}}
                                          />);
  
  const SaveData = async() => {
    refRequest.current = false;
    let type = 'OTROS';
    //console.log('cost center a buscar => ', costcenter);
    const cc = costCenterOpt.find((costc) => costc.value === (costCenter + '/' + concept));
    //console.log('cc find save', cc);
    if(cc?.label.toLowerCase().includes('mano de obra')){
      //console.log('entro aqui => ', cc?.label.toLowerCase());
      type = 'MANO DE OBRA';
    }
    const {description, amount} = formik.values
    updateBasicData('', description, amount.replace(/[$,]/g, ""), 
        startDate, '', '', '', '', '', '', '', categoryS, '', type, '', amount.replace(/[$,]/g, ""));

    const costcenter = {
      category: costCenter,
      concept
    }
    console.log('cost center no deductible => ', JSON.stringify(costcenter));
    if(voucher){
      const formdata = new FormData();
      //formdata.append('subtotal', amount.replace(/[$,]/g, ""));
      formdata.append('costocenter', JSON.stringify(costcenter));
      formdata.append('date', startDate);
      formdata.append('description', description);
      formdata.append('user', responsibleS);
      formdata.append('report', report);
      formdata.append('isticket', JSON.stringify(true));
      formdata.append('project', project);
      formdata.append('category', categoryS);
      formdata.append('iscard', JSON.stringify(isCard));
      formdata.append('type', type);
      formdata.append('cost', JSON.stringify({
        discount: 0,
        subtotal:amount.replace(/[$,]/g, ""),
        iva: 0,
        total: amount.replace(/[$,]/g, ""),
        //vat: idVat, 
        // vatvalue: number no se usa 
        // total: number no se usa 
      }));
      formdata.append('condition', JSON.stringify([{
        glossary: condition,
        user
      }]));
      if(voucher){
        formdata.append('files', voucher);
        formdata.append('types', voucher.type);
      }

      reset();
      setClearAmount(true);
      updateRefresh(true);
      setTimeout(() => {
        setResetBand(true);
      }, 300);
      refRequest.current = true;
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
          refRequest.current = true;
        }else{
          showToastMessageError(res);
          refRequest.current = true;
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Ocurrio un error al guardar costo!!');
      }
    }else{
      const data = {
        costocenter:costcenter, date:startDate, description, 
        cost: {
          discount: 0,
          subtotal:amount.replace(/[$,]/g, ""),
          iva: 0,
          total: amount.replace(/[$,]/g, ""),
          //vat: idVat,
          // vatvalue: number no se usa 
          // total: number no se usa 
        },
        user:responsibleS, report, isticket:true, project, category:categoryS, condition: [{
          glossary: condition,
          user
        }], iscard:isCard, type
      }
  
      try {
        const res = await SaveExpense(data, token);
        //console.log('save cost no deductible', JSON.stringify(data));
        if(res===201){
          setView(<></>);
          reset();
          formik.values.amount = '';
          formik.values.description = '';
          showToastMessage('Costo creado satisfactoriamente!!!');
          setClearAmount(true);
          updateRefresh(true);
          updateIndexStepper(3);
          setTimeout(() => {
            setResetBand(true);
          }, 300);
          refRequest.current = true;
        }
        else{
          showToastMessageError(res);
          refRequest.current = true;
        }
      } catch (error) {
        refRequest.current = true;
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
            autoFocus
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


  useEffect(() => {
    handleCostCenter(costCenterOpt[0].value);
    // let indexCC = 0;
    // if(costCenter !== ''){
    //   optCostCenter.map((opt, index:number) => {
    //     if(opt.value === costCenter){
    //       indexCC = index;
    //     }
    //   });      
    // }
    if(date !== ''){
      setStartDate(date);
    }
    
    let indexResp = 0;
    if(responsibleS !== ''){
      responsibles.map((opt, index:number) => {
        if(opt.value === responsible){
          indexResp = index;
        }
      });      
    }

    setView(<>
      <div className="col-span-1 sm:col-span-2">
        <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
        <SelectReact index={indexResp} opts={responsibles} setValue={setResponsibleS} />
      </div>
    </>)

    // setViewCC(<div className="col-span-1 sm:col-span-2">
    //       <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
    //       <SelectReact index={indexCC} opts={optCostCenter} setValue={handleCostCenter} />
    //     </div>)

  }, []);

  useEffect(() => {
    if(resetBand){
      // let indexCC = 0;
      // if(costCenter !== ''){
      //   optCostCenter.map((opt, index:number) => {
      //     if(opt.value === costCenter){
      //       indexCC = index;
      //     }
      //   });      
      // }
      if(date !== ''){
        setStartDate(date);
      }
      
      let indexResp = 0;
      if(responsibleS !== ''){
        responsibles.map((opt, index:number) => {
          if(opt.value === responsible){
            indexResp = index;
          }
        });      
      }
      
      setView(<>
        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
          <SelectReact index={indexResp} opts={responsibles} setValue={setResponsibleS} />
        </div>
      </>)

      // setViewCC(<div className="col-span-1 sm:col-span-2">
      //         <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
      //         <SelectReact index={indexCC} opts={optCostCenter} setValue={handleCostCenter} />
      //       </div>)
      setResetBand(false);
    }
  }, [resetBand]);

  let viewCC = <></>;
  let indexCC = 0;
  if(costCenter !== ''){
    costCenterOpt.map((opt, index:number) => {
      if(opt.value === (costCenter + '/' + concept)){
        indexCC = index;
      }
    });      
  }
  viewCC = (
    <div className=" col-span-1 md:col-span-3">
      <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
      <SelectReact index={indexCC} opts={costCenterOpt} setValue={handleCostCenter} />
    </div>
  );

  // let viewTotal: JSX.Element = <></>;
  // viewTotal = (
  //   <CurrencyInput
  //     id="total"
  //     name="total"
  //     className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
  //       focus:border-slate-700 outline-0"
  //     //onChange={formik.handleChange}
  //     //onBlur={formik.handleChange}
  //     //value={formik.values.amount.replace(/[$,]/g, "")}
  //     value={totalExpense.replace(/[$,]/g, "")}
  //     decimalsLimit={2}
  //     prefix="$"
  //     onValueChange={(value) => {try {
  //       //console.log('value amount data stepper => ', value);
  //       //formik.values.amount=value || '0';
  //       setTotalExpense(value || '0');
  //     } catch (error) {
  //       //formik.values.amount='0';
  //       setTotalExpense('0');
  //     }}}
  //   />
  // )

  return(
    <div className="w-full bg-white">
      <div className="mt-2">
        <NavExpenseNoDeductibleStepper index={1} />
      </div>
      {isPettyCash && (
        <div className="flex justify-end my-5 pr-3">
          <div className="inline-flex items-center justify-end">
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
          {/* <div>
            <Label htmlFor="total"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Total</p></Label>
            {viewTotal}
          </div> */}
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
    </div>
  )
}