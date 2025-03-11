'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Label from "@/components/Label"
import TextArea from "@/components/TextArea"
import HeaderForm from "@/components/HeaderForm"
import Chip from "@/components/providers/Chip"
import { OneProjectMin } from "@/interfaces/Projects"
import { CurrencyFormatter } from "@/app/functions/Globals"
import { ProgressBarComponent } from "../dashboard/ProgressBarComponent"
import { useState, useEffect, useRef } from "react"
import CurrencyInput from "react-currency-input-field"
import { createEstimate } from "@/app/api/routeEstimates"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { BsPencil } from "react-icons/bs"
import { Options } from "@/interfaces/Common"
import { getCatalogsByNameAndType } from "@/app/api/routeCatalogs"
import SelectReact from "@/components/SelectReact"

export default function AddNewEstimateProject({showForm, project, updateEstimates, user, token, overflow, 
  porcentajeAdvange, advange}: 
  {showForm:Function, project: OneProjectMin, updateEstimates:Function, user:string, token:string, 
    overflow:boolean, porcentajeAdvange: number, advange: number}) {
  // const refRequest = useRef(true);
  // const refAmortization = useRef(false);

  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [order, setOrder] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [amortization, setAmortization] = useState<string>('0');
  const [guarantee, setGuarantee] = useState<string>('0');
  const [amountPay, setAmountPay] = useState<string>('0');
  const [description, setDescription] = useState<string>('');
  const [amountPayableVAT, setAmountPayableVAT] = useState<string>('');

  const [bandName, setBandName] = useState<boolean>(false);
  const [bandOrder, setBandOrder] = useState<boolean>(false);
  const [bandAmount, setBandAmount] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandDescription, setBandDescription] = useState<boolean>(false);
  const [lengthOrder, setLengthOrder] = useState<string>('');

  const [heightPage, setHeightPage] = useState<number>(900);
  const [advance, setAdvance]= useState<boolean>(false);
  const [isdisabled, setIsDisabled]= useState<boolean>(true);
  const [isdisabledGuarantee, setIsDisabledGuarantee]= useState<boolean>(true);
  // const refRequest = useRef(true);
  const [optTypes, setOptTypes]=useState<Options[]>([]);
  const [typeEstimate, setTypeEstimate]=useState<string>('');

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  const handleAdvance = (value: boolean) => {
    if(value){
      const a = (project.amount * 30) / 100;
      setAmount(a.toFixed(2));
      setAmountPay(a.toFixed(2));
      setAmortization('0');
      setGuarantee('0');
    }
    setAdvance(value);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCatalogsByNameAndType(token, 'estimates');
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setOptTypes(res);
        setTypeEstimate(res[0].value);
      }
    }
    fetch();
  }, []);

  const colorsRandom = ['#E4D831', '#71B2F2', '#617178', '#FFA145', '#8579F0', '#ff5252', '#69f0ae', '#7D9F2D', '#289399', '#f08080']
  const getRandomArbi = (min: any, max: any) => {
    const res = parseInt(Math.random() * (max - min) + min);   
    return res;
  }

  const c1 = getRandomArbi(0, 9);

  const updateValues = (val: string) => {
    let amor: number = 0;
    // console.log('project => ', project);
    if(project.amountChargeOff && !overflow){
      amor = (Number(val.replace(/[$,]/g, "")) * project.amountChargeOff.porcentage) / 100;
    }
    let guaran: number = 0;
    if(project.guaranteefund){
      guaran = (Number(val.replace(/[$,]/g, "")) * Number(project.guaranteefund?.porcentage || '0')) / 100;
    }
    // console.log('val => ', val);
    // console.log('amor => ', amor);
    // console.log('guaran => ', guaran);

    if(advance){
      amor=0;
      guaran=0;
    }

    const total = Number(val.replace(/[$,]/g, "")) - amor - guaran;
    const totalPayable = total * 1.16;
    // console.log('total => ', total);

    setAmortization(amor.toFixed(2));
    setGuarantee(guaran.toFixed(2));
    setAmountPay(total.toFixed(2));
    setAmountPayableVAT(totalPayable.toFixed(2));
  }

  const updateAmortization = (val: string) => {
    // const pay = Number(amount.replace(/[$,]/g, ""));
    // const am = Number(val.replace(/[$,]/g, ""));
    // const gu = Number(guarantee.replace(/[$,]/g, ""));

    // console.log('pay => ', pay, ' am => ', am, ' gu => ', gu);
    const total = Number(amount.replace(/[$,]/g, "")) - Number(val.replace(/[$,]/g, "")) - Number(guarantee.replace(/[$,]/g, ""));
    const totalPayable = total * 1.16;
    // console.log('total => ', total);
    
    setAmortization(val.replace(/[$,]/g, ""));
    setAmountPay(total.toFixed(2));
    setAmountPayableVAT(totalPayable.toFixed(2));
  }

  const updateGuarantee = (val: string) => {
    // const pay = Number(amount.replace(/[$,]/g, ""));
    // const am = Number(val.replace(/[$,]/g, ""));
    // const gu = Number(guarantee.replace(/[$,]/g, ""));

    // console.log('pay => ', pay, ' am => ', am, ' gu => ', gu);
    const total = Number(amount.replace(/[$,]/g, "")) - Number(amortization.replace(/[$,]/g, "")) - Number(val.replace(/[$,]/g, ""));
    const totalPayable = total * 1.16;
    // console.log('total => ', total);
    
    // setAmortization(val.replace(/[$,]/g, ""));
    setGuarantee(val.replace(/[$,]/g, ""));
    setAmountPay(total.toFixed(2));
    setAmountPayableVAT(totalPayable.toFixed(2));
  }

  const validationData = () =>{
    let validation = true;
    if(!name || name===''){
      setBandName(true);
      validation = false;
    }else{
      setBandName(false);
    }
    if(!startDate || startDate===''){
      setBandDate(true);
      validation = false;
    }else{
      setBandDate(false);
    }
    if(!order || order.trim()===''){
      setBandOrder(true);
      validation = false;
      setLengthOrder('La orden es obligatoria!!!');
    }else{
      if(order.length < 3){
        setBandOrder(true);
        validation = false;
        setLengthOrder('La orden debe ser de al menos 3 caracteres!!!');
      }else{
        setBandOrder(false);
      }
    }
    if(!amount || amount==='0'){
      setBandAmount(true);
      validation = false;
    }else{
      setBandAmount(false);
    }
    if(!description || description===''){
      setBandDescription(true);
      validation = false;
    }else{
      setBandDescription(false);
    }
    return validation;
  }

  const saveEstimate = async () => {
    const val = validationData();

    if(val){
      const data = {
        name,
        description,
        purschaseOrder:order,
        amount,
        amountGuaranteeFund:guarantee,
        amountChargeOff: amortization,
        amountPayable: amountPay,
        amountPayableVAT,
        date: startDate,
        ismoneyadvance: advance,
        condition: [
            {
                glossary: "676359f2a4077026b9c37660",
                user
            }
        ],
        company: "65d3813c74045152c0c4377e",
        project: project._id,
        user,
        type:typeEstimate
      }

      // console.log('new estimate => ', JSON.stringify(data));
      const res = await createEstimate(token, data);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        updateEstimates();
        showForm(false);
      }
    }
  }

  const handleType = (value:string) => {
    setTypeEstimate(value);
  }

  return(
    <>
      <form className="z-10 absolute top-16 w-full max-w-lg bg-white space-y-5 p-3 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/estimates/estimates.svg" subtitle="Agrega los datos para la nueva estimacion" 
            title="Nueva estimacion"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        <div className="bg-white p-3">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex gap-x-1">
              <div className="flex items-end">
                <div className={`w-3 h-3 ${project.status? 'bg-green-500': 'bg-red-500'}`}></div>
                <img src={project.photo} alt={project.title} className="rounded-full w-14 h-14" />
              </div>
              <div>
                <p className="text-blue-500">{project.title}</p>
                <p className="text-slate-600">{project.account}</p>
              </div>
            </div>
            <div>
              <p className="text-blue-500">{project.title}</p>
              <p className="text-blue-300">{CurrencyFormatter({
                currency: 'MXN',
                value: project.amount
              })}</p>
              <Chip label={project.category.name} color={project.category.color} />
            </div>
          </div>
          <div>
            <p className=" text-sm">Estimacion total</p>
            <ProgressBarComponent label={''} progress={porcentajeAdvange} 
              widthBar="w-full" color={colorsRandom[2]} hei="h-5" />
          </div>
        </div>

        <div className="inline-flex items-center">
          <Label>Anticipo</Label>  
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={advance} 
              onClick={() => handleAdvance(!advance)} id="switch-3" type="checkbox"
              // onChange={() => console.log('')}
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
        
        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <Input type="text" name="name" autoFocus 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {bandName && (
          <p className="text-red-500">El nombre es obligatorio!!!</p>
        )}

        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
            <Input 
              type="date"
              defaultValue={new Date().toISOString()}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {bandDate && (
              <p className="text-red-500">La fecha es obligatoria!!!</p>
            )}
          </div>
          <div>
            <Label htmlFor="order"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Orden de compra</p></Label>
            <Input type="text" name="order" 
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
            {bandOrder && (
              <p className="text-red-500">{lengthOrder}</p>
            )}
          </div>

          <div>
            <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
            <CurrencyInput
              id="amount"
              name="amount"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              // onChange={(e) => setAmount(Number(e.target.value.replace(/[$,]/g, "")))}
              // value={formik.values.amount.replace(/[$,]/g, "")}
              value={amount}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {try {
                setAmount(value?.replace(/[$,]/g, "") || '0');
                updateValues(value?.replace(/[$,]/g, "") || '0')
              } catch (error) {
                setAmount('0');
                updateValues('0');
              }}}
            />
            {bandAmount && (
              <p className="text-red-500">El monto es obligatorio!!!</p>
            )}
          </div>

          {!advance && (
            <>
              <div>
                <div className="flex justify-between items-center pr-4">
                  <Label htmlFor="amortization"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Amortizacion</p></Label>
                  <div className="flex items-center gap-x-2">
                    {/* <Label htmlFor="modification"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Modificar</p></Label> */}
                    <BsPencil className="w-4 h-4 text-slate-500" />
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input checked={!isdisabled} 
                        onClick={() => setIsDisabled(!isdisabled)} id="disabledAmor" type="checkbox"
                        // onChange={() => console.log('')}
                        className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                          appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                          peer-checked:border-green-500 peer-checked:before:bg-green-500
                          border border-slate-300" />
                      <label htmlFor="disabledAmor"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                          data-ripple-dark="true"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <CurrencyInput
                  id="amortization"
                  name="amortization"
                  className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                    focus:border-slate-700 outline-0"
                  // onChange={(e) => setAmount(Number(e.target.value.replace(/[$,]/g, "")))}
                  // value={formik.values.amount.replace(/[$,]/g, "")}
                  value={amortization}
                  onValueChange={(value) => {try {
                    // setAmortization(value?.replace(/[$,]/g, "") || '0');
                    // updateValues(value?.replace(/[$,]/g, "") || '0')
                    if(overflow){
                      // refAmortization.current=true;
                      updateAmortization('0');
                    }else{
                      updateAmortization(value?.replace(/[$,]/g, "") || '0');
                    }
                  } catch (error) {
                    // setAmortization('0');
                    updateAmortization('0');
                    // updateValues('0');
                  }}}
                  decimalsLimit={2}
                  prefix="$"
                  disabled={isdisabled}
                />
                {!isdisabled && (
                  <p className="text-red-500 text-xs">No se puede agregar Amortizacion porque supero el anticipo de {CurrencyFormatter({
                    currency: 'MXN',
                    value: advange
                  })} !!!</p>
                )}
              </div>
              <div>                
                <div className="flex justify-between items-center pr-4">
                <Label htmlFor="guarantee"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fondo de garantia</p></Label>
                  <div className="flex items-center gap-x-2">
                    {/* <Label htmlFor="modification Guaran"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Modificar</p></Label> */}
                    <BsPencil className="w-4 h-4 text-slate-500" />
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input checked={!isdisabledGuarantee} 
                        onClick={() => setIsDisabledGuarantee(!isdisabledGuarantee)} id="disabledGuaran" type="checkbox"
                        // onChange={() => console.log('')}
                        className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                          appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                          peer-checked:border-green-500 peer-checked:before:bg-green-500
                          border border-slate-300" />
                      <label htmlFor="disabledGuaran"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                          data-ripple-dark="true"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <CurrencyInput
                  id="guarantee"
                  name="guarantee"
                  className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                    focus:border-slate-700 outline-0"
                  value={guarantee}
                  onValueChange={(value) => {try {
                    updateGuarantee(value?.replace(/[$,]/g, "") || '0');
                  } catch (error) {
                    updateGuarantee('0');
                  }}}
                  decimalsLimit={2}
                  prefix="$"
                  disabled={isdisabledGuarantee}
                />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="amountPay"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto a pagar</p></Label>
            <CurrencyInput
              id="amountPay"
              name="amountPay"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={amountPay}
              decimalsLimit={2}
              prefix="$"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="amountPayable"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto a pagar total</p></Label>
            <CurrencyInput
              id="amountPayable"
              name="amountPayable"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={amountPayableVAT}
              decimalsLimit={2}
              prefix="$"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
            {optTypes.length > 0 && (
              <SelectReact index={0} opts={optTypes} setValue={handleType} />
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="descripcion"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)}></TextArea>
          {bandDescription && (
            <p className="text-red-500">La descripcion es obligatoria!!!</p>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <Button type="button" onClick={saveEstimate}>Guardar</Button>
        </div>
      </form>
    </>
  )
}