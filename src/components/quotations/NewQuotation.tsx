'use client'
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Input from "../Input"
import CurrencyInput from "react-currency-input-field"
import SelectReact from "../SelectReact"
import TextArea from "../TextArea"
import Button from "../Button"
import { useState, useEffect } from "react"
import { getClientsLV } from "@/app/api/routeClients"
import { Options } from "@/interfaces/Common"
import { showToastMessageError } from "../Alert"
import { getUsersLV } from "@/app/api/routeUser"
import { createQuotation, getContactsClientLV } from "@/app/api/routeQuotations"
import RatingComponent from "./RatingComponent"
import Select from 'react-select'

export default function NewQuotation({showForm, token, usr, updateQuotations}: 
  {showForm:Function, token:string, usr:string, updateQuotations: Function}){

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
  const [score, setScore]=useState<number>(3);
  const [haveDiscount, setHaveDiscount]=useState<boolean>(false);
  const [discount, setDiscount]=useState<string>('0');
  const [optContacts, setoptContacts]=useState<Options[]>([]);
  const [contact, setContact]=useState<string>('');

  const [message, setMessage] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const opCli:Options[] = await getClientsLV(token);
      if(typeof(opCli)==='string'){
        showToastMessageError(opCli);
      }else{
        setOptClients(opCli);
        setClient(opCli[0].value);
        const conts = await fetchContacts(token, opCli[0].value);
        if(conts){
          setoptContacts(conts);
          setContact(conts[0].value);
        }
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
    updateOptionsContacts(value);
  }

  const handleContact = (value: string) => {
    setContact(value);
  }

  const handleScore = (value:number) => {
    setScore(value);
  }

  const updateOptionsContacts = async (idCli:string) => {
    const conts = await fetchContacts(token, idCli);
    if(conts){
      setoptContacts(conts);
      setContact(conts[0].value);
    }
  }

  const validation = () => {
    let val = true;
    let m = 0;
    if(title.trim()==='' || title.length < 10){
      val=false;
      m=1;
    }else{
      if(amount.trim()==='' || amount==='0'){
        val=false;
        m=2;
      }else{
        if(vat.trim()==='' || vat==='0'){
          val=false;
          m=3;
        }else{
          if(total.trim()==='' || total==='0'){
            val=false;
            m=4;
          }else{
            if(datesol.trim()===''){
              val=false;
              m=5;
            }else{
              if(dateven.trim()===''){
                val=false;
                m=6;
              }else{
                if(notes.trim()===''){
                  val=false;
                  m=8;
                }
              }
            }
          }
        }
      }
    }
    console.log('m val => ', m);
    setMessage(m);
    return val;
  }

  const createNewQuotation = async () => {
    console.log('create new quotation => ');
    const val = validation();
    console.log('validation => ', val);
    if(val){
      const data = {
        title,
        description:notes,
        applicationdate:datesol,
        expirationdate:dateven,
        cost: {
          subtotal: Number(amount),
          iva: Number(vat),
          total: Number(total)
        },
        score,
        condition: [
          {
            glossary: "67b910014643d85abda93cc0",
            user
          }
        ],
        client,
        applicant: contact,
        user 
      }

      const create = await createQuotation(token, data);
      if(typeof(create)==='string'){
        showToastMessageError(create);
      }else{
        updateQuotations();
        showForm(false);
      }
    }
  }

  const updateIva = (amountVal: string, discounVal: string) => {
    try {
      // const foundVat = vats.find((vat) => vat.value === idValue);
      // const vatvalue = foundVat?.label || '0';
      const vatvalue = '16';
      let operation;
      let t = 0;
      if(haveDiscount){
        operation = (Number(amountVal.replace(/[$,]/g, "")) - 
                      Number(discounVal.replace(/[$,]/g, ""))) * 
                        Number(vatvalue) / 100;

        t = Number(amountVal.replace(/[$,]/g, "")) -
              Number(discounVal.replace(/[$,]/g, "")) +
              operation;
      }else{
        operation = (Number(amount.replace(/[$,]/g, ""))) * 
                      Number(vatvalue) / 100;
            
        t = Number(amountVal.replace(/[$,]/g, "")) + operation;
      }
      // if(haveDiscount && haveTaxExempt){
      //   operation = (Number(amount.replace(/[$,]/g, "")) - 
      //                   Number(discount.replace(/[$,]/g, "")) -
      //                   Number('0')) * 
      //                     Number(vatvalue) / 100;
        
      //   t = Number(amount.replace(/[$,]/g, "")) -
      //         Number(discount.replace(/[$,]/g, "")) +
      //         operation;
      // }else{
      //   if(haveDiscount){
      //     operation = (Number(amount.replace(/[$,]/g, "")) - 
      //                   Number(discount.replace(/[$,]/g, ""))) * 
      //                     Number(vatvalue) / 100;

      //     t = Number(amount.replace(/[$,]/g, "")) -
      //           Number(discount.replace(/[$,]/g, "")) +
      //           operation;
      //   }else{
      //     if(haveTaxExempt){
      //       operation = (Number(amount.replace(/[$,]/g, "")) - 
      //                   Number('0')) * 
      //                     Number(vatvalue) / 100;

      //       t = Number(amount.replace(/[$,]/g, "")) + operation;              
      //     }else{
      //       operation = (Number(amount.replace(/[$,]/g, ""))) * 
      //                     Number(vatvalue) / 100;
                
      //       t = Number(amount.replace(/[$,]/g, "")) + operation;
      //     }
      //   }
      // }
      setVat(operation.toFixed(2).toString());
      setTotal(t.toFixed(2).toString())
    } catch (error) {
      setVat('0');
    }
  }

  const indexUser = optUsers.findIndex((u) => u.value===usr);

  return(
    <>
      <form className="z-10 absolute top-16 w-full max-w-md bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          <div className="flex mt-2 items-center">
            <img src={"/img/role.svg"} alt="logo" className="rounded-full w-8 h-auto" />
            {/* <GiSettingsKnobs className="w-8 h-8 text-slate-600" /> */}
            <div className="ml-3">
              <p className="text-xl">Nueva cotizacion</p>
              <p className="text-gray-500 text-sm">Ingresa datos de la nueva cotizacion</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        <div className="flex gap-x-5 justify-end my-5 pr-3">
          <div className="inline-flex items-center">
            <Label>Descuento</Label>  
            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
              <input checked={haveDiscount} 
                onClick={() => setHaveDiscount(!haveDiscount)} id="discount" type="checkbox"
                // onChange={() => console.log('')}
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

        </div>

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
              className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
                focus:border-slate-700 outline-0"
              value={amount}
              // onChange={setTotal}
              //placeholder="Please enter a number"
              defaultValue={0}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {setAmount(value || '0'); updateIva((value || '0'), discount)}}
            />
            {message===2 && (
              <p className=" text-red-500">El subtotal es obligatorio</p>
            )}
          </div>
          {haveDiscount && (
            <div>
              <Label htmlFor="discount">Descuento</Label>
              <CurrencyInput
                id="discount"
                name="discount"
                className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                  focus:border-slate-700 outline-0"
                value={discount.replace(/[$,]/g, "") || 0}
                decimalsLimit={2}
                prefix="$"
                onValueChange={(value) => {try {
                  setDiscount(value?.replace(/[$,]/g, "") || '0');
                  // handleIdVat(idVat);
                  updateIva(amount, value?.replace(/[$,]/g, "") || '0');
                } catch (error) {
                  setDiscount('0');
                  // handleIdVat(idVat);
                }}}
              />
            </div>
          )}
          <div className="">
            <Label>IVA</Label>
            <CurrencyInput
              id="vat"
              name="vat"
              className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
                focus:border-slate-700 outline-0"
              value={vat}
              // onChange={setTotal}
              //placeholder="Please enter a number"
              defaultValue={0}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => setVat(value || '0')}
              disabled
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
              className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
                focus:border-slate-700 outline-0"
              value={total}
              // onChange={setTotal}
              //placeholder="Please enter a number"
              defaultValue={'0'}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => setTotal(value || '0')}
              disabled
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
              <SelectReact index={0} opts={optContacts} setValue={handleContact} />
              // <Select
              //   // value={selOpt}
              //   options={optContacts}
              //   onChange={(e:any) => { setContact(e.value)}} 
              //   className="w-full text-lg mt-2 text-gray-900  rounded-lg 
              //     bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
              //   styles={{
              //     control: (baseStyles, state) => ({
              //       ...baseStyles,
              //       height: '5px',
              //     }),
              //   }}
              // />
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
            <RatingComponent setValue={handleScore} value={score} />
          </div>
          <div className=" col-span-2">
            <Label>Descripcion</Label>
            <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} />
            {message===8 && (
              <p className=" text-red-500">Las notas son obligatorias</p>
            )}
          </div>
          <div className=" col-span-2 flex justify-center">
            <Button type="button" onClick={() => createNewQuotation() } >Guardar</Button>
          </div>
        </div>
      </form>
    </>
  )
}

const fetchContacts = async (token:string, id:string) => {
  const res: Options[] = await getContactsClientLV(token, id);
  if(typeof(res)==='string'){
    showToastMessageError(res);
    return [];
  }else{
    return res;
  }
}