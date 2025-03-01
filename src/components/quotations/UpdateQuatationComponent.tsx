import HeaderForm from "../HeaderForm"
import Button from "../Button"
import TextArea from "../TextArea"
import CurrencyInput from "react-currency-input-field"
import Label from "../Label"
import { IOneQuotationMin } from "@/interfaces/Quotations"
import { useState, useEffect } from "react"
import { showToastMessageError } from "../Alert"
import { getClientsLV } from "@/app/api/routeClients"
import { getUsersLV } from "@/app/api/routeUser"
import { Options } from "@/interfaces/Common"
import Input from "../Input"
import SelectReact from "../SelectReact"

export default function UpdateQuatationComponent({token, id, quatation, usr}: 
  {token:string, id: string, quatation:IOneQuotationMin, usr:string}){

  const [optClients, setOptClients] = useState<Options[]>([]);
  const [optUsers, setOptUsers] = useState<Options[]>([]);
  const [user, setUser]=useState<string>('');
  const [client, setClient] = useState<string>('');
  const [notes , setNotes] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [total, setTotal] = useState<string>('0');
  const [vat, setVat] = useState<string>('0');
  const [datesol, setDatesol]=useState<string>('');
  const [dateven, setDateven]=useState<string>('');

  const [message, setMessage] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const opCli:Options[] = await getClientsLV(token);
      if(typeof(opCli)==='string'){
        showToastMessageError(opCli);
      }else{
        setOptClients(opCli);
        setClient(opCli[0].value);
      }

      const opUs: Options[] = await getUsersLV(token);
      if(typeof(opUs)==='string'){
        showToastMessageError(opUs);
      }else{
        setOptUsers(opUs);
        const i = opUs.findIndex((o) => o.value===usr);
        setUser(opUs[i].value);
      }
    }
    fetch();
  }, []);

  const handleUser = (value:string) => {
    setUser(value);
  }

  const handleClient = (value: string) => {
    setClient(value);
  }

  const indexUser = optUsers.findIndex((u) => u.value===usr);
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Ingresa datos de la cotizacion a modificar" 
        title="Modificar cotizacion"
      />
      <div className="grid grid-cols-3 gap-x-2 gap-y-2">
        <div className=" col-span-3">
          <Label>Titulo</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          {message===1 && (
            <p className=" text-red-500">El titulo es obligatorio y minimo 10 caracteres</p>
          )}
        </div>
        <div className="">
          <Label>Subtotal</Label>
          <CurrencyInput 
            id="amount"
            name="amount"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            value={amount}
            // onChange={setTotal}
            //placeholder="Please enter a number"
            defaultValue={0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => setAmount(value || '0')}
          />
          {message===2 && (
            <p className=" text-red-500">El subtotal es obligatorio</p>
          )}
        </div>
        <div className="">
          <Label>IVA</Label>
          <CurrencyInput
            id="vat"
            name="vat"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            value={vat}
            // onChange={setTotal}
            //placeholder="Please enter a number"
            defaultValue={0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => setVat(value || '0')}
          />
          {message===3 && (
            <p className=" text-red-500">El iva es obligatorio</p>
          )}
        </div>
        <div className="">
          <Label>Total</Label>
          <CurrencyInput
            id="total"
            name="total"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            value={total}
            // onChange={setTotal}
            //placeholder="Please enter a number"
            defaultValue={'0'}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => setTotal(value || '0')}
          />
          {message===4 && (
            <p className=" text-red-500">El total es obligatorio</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        <div className="">
          <Label>Fecha de solicitud</Label>
          <Input type="date" onChange={(e) => setDatesol(e.target.value)} />
          {message===5 && (
            <p className=" text-red-500">La fecha de solicitud es obligatoria</p>
          )}
        </div>
        <div className="">
          <Label>Fecha de vencimiento</Label>
          <Input type="date" onChange={(e) => setDateven(e.target.value)} />
          {message===6 && (
            <p className=" text-red-500">La fecha de vencimiento es obligatoria</p>
          )}
        </div>
        <div className="">
          <Label>Cliente</Label>
          {optClients.length > 0 && (
            <SelectReact index={0} opts={optClients} setValue={handleClient} />
          )}
        </div>
        <div className="">
          <Label>Solicita cotizacion</Label>
          {optUsers.length > 0 && (
            <SelectReact index={0} opts={optUsers} setValue={handleUser} />
          )}
        </div>
        <div className=" col-span-2">
          <Label>Realiza cotizacion</Label>
          {optUsers.length > 0 && (
            <SelectReact index={indexUser} opts={optUsers} setValue={handleUser} />
          )}
        </div>
        <div className=" col-span-2">
          <Label>Puntuacion (0 al 5)</Label>
        </div>
        <div className=" col-span-2">
          <Label>Descripcion</Label>
          <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} />
          {message===8 && (
            <p className=" text-red-500">Las notas son obligatorias</p>
          )}
        </div>
        <div className=" col-span-2 flex justify-center">
          <Button type="button" >Guardar cambios</Button>
        </div>
      </div>  
    </div>
  )
}