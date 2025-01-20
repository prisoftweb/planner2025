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
import { useState, useEffect } from "react"
import CurrencyInput from "react-currency-input-field"
import { createEstimate } from "@/app/api/routeEstimates"
import { showToastMessage, showToastMessageError } from "@/components/Alert"

export default function AddNewEstimateProject({showForm, project, updateEstimates, user, token}: 
  {showForm:Function, project: OneProjectMin, updateEstimates:Function, user:string, token:string}) {
  // const refRequest = useRef(true);

  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [order, setOrder] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [amortization, setAmortization] = useState<number>(0);
  const [guarantee, setGuarantee] = useState<number>(0);
  const [amountPay, setAmountPay] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const [bandName, setBandName] = useState<boolean>(false);
  const [bandOrder, setBandOrder] = useState<boolean>(false);
  const [bandAmount, setBandAmount] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandDescription, setBandDescription] = useState<boolean>(false);
  const [lengthOrder, setLengthOrder] = useState<string>('');

  const [heightPage, setHeightPage] = useState<number>(900);
  // const refRequest = useRef(true);

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
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

  const colorsRandom = ['#E4D831', '#71B2F2', '#617178', '#FFA145', '#8579F0', '#ff5252', '#69f0ae', '#7D9F2D', '#289399', '#f08080']
  const getRandomArbi = (min: any, max: any) => {
    const res = parseInt(Math.random() * (max - min) + min);   
    return res;
  }

  const c1 = getRandomArbi(0, 9);

  const updateValues = (val: number) => {
    let amor: number = 0;
    if(project.amountChargeOff){
      amor = (val * project.amountChargeOff.porcentaje) / 100;
    }
    let guaran: number = 0;
    if(project.guaranteefund){
      guaran = (val * Number(project.guaranteefund?.porcentage || '0')) / 100;
    }
    const total = val - amor - guaran;

    setAmortization(amor);
    setGuarantee(guaran);
    setAmountPay(total);
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
    if(!amount || amount===0){
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
        date: startDate,        
        condition: [
            {
                glossary: "676359f2a4077026b9c37660",
                user
            }
        ],
        company: "65d3813c74045152c0c4377e",
        project: project._id,
        user
      }

      const res = await createEstimate(token, data);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        updateEstimates();
        showForm(false);
      }
    }
  }
  
  return(
    <>
      <form className="z-10 absolute top-16 w-full max-w-lg bg-white space-y-5 p-3 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/projects/default.svg" subtitle="Agrega los datos para la nueva estimacion" 
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
            <ProgressBarComponent label={''} progress={79} 
              widthBar="w-full" color={colorsRandom[2]} hei="h-5" />
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
                setAmount(Number(value?.replace(/[$,]/g, "") || '0'));
                updateValues(Number(value?.replace(/[$,]/g, "") || '0'))
              } catch (error) {
                setAmount(0);
                updateValues(0);
              }}}
            />
            {bandAmount && (
              <p className="text-red-500">El monto es obligatorio!!!</p>
            )}
          </div>

          <div>
            <Label htmlFor="amortization"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Amortizacion</p></Label>
            <CurrencyInput
              id="amortization"
              name="amortization"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              // onChange={(e) => setAmount(Number(e.target.value.replace(/[$,]/g, "")))}
              // value={formik.values.amount.replace(/[$,]/g, "")}
              value={amortization}
              decimalsLimit={2}
              prefix="$"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="guarantee"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fondo de garantia</p></Label>
            <CurrencyInput
              id="guarantee"
              name="guarantee"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={guarantee}
              decimalsLimit={2}
              prefix="$"
              disabled
            />
          </div>
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