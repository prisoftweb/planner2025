'use client'
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Input from "../Input"
import CurrencyInput from "react-currency-input-field"
import SelectReact from "../SelectReact"
import TextArea from "../TextArea"
import Button from "../Button"
import { useState, useEffect, useRef } from "react"
import { Options } from "@/interfaces/Common"
import { showToastMessage, showToastMessageError } from "../Alert"
import { createQuotation, getContactsClientLV } from "@/app/api/routeQuotations"
import RatingComponent from "./RatingComponent"
import Select from 'react-select'

import { getCatalogsByNameAndCategory, getCatalogsByNameAndType } from "@/app/api/routeCatalogs"
import { GetVatsLV } from "@/app/api/routeCost"
import { getUsersLV } from "@/app/api/routeUser"
import { getClientsLV } from "@/app/api/routeClients"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
  const [optVats, setOptVats]=useState<Options[]>([]);
  const [idVat, setIdVat]=useState<string>('');
  const [message, setMessage] = useState<number>(0);
  const [selOpt, setSelOpt] = useState<Options>();
  const [heightPage, setHeightPage] = useState<number>(900);
  const [location, setLocation]=useState<string>('LOCAL');

  // const refArea=useRef();

  const [type, setType]=useState<string>('');
  const [optTypes, setOptTypes]=useState<Options[]>([]);

  const [category, setCategory]=useState<string>('');
  const [optCategories, setOptCategory]=useState<Options[]>([]);

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
          setSelOpt(conts[0]);
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

      const opVat: Options[] = await GetVatsLV(token);
      if(typeof(opVat)==='string'){
        showToastMessageError(opVat);
      }else{
        setOptVats(opVat);
        setIdVat(opVat[0].value);
      }

      const opCats: Options[] = await getCatalogsByNameAndCategory(token, 'Quotations');
      if(typeof(opCats)==='string'){
        showToastMessageError(opCats);
      }else{
        setOptCategory(opCats);
        setCategory(opCats[0].value);
      }
      
      const opTyps: Options[] = await getCatalogsByNameAndType(token, 'Quotations');
      if(typeof(opTyps)==='string'){
        showToastMessageError(opTyps);
      }else{
        setOptTypes(opTyps);
        setType(opTyps[0].value);
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

  const handleType = (value: string) => {
    setType(value);
  }

  const handleCategories = (value: string) => {
    setCategory(value);
  }

  // const handleContact = (value: string) => {
  //   setContact(value);
  // }

  const handleScore = (value:number) => {
    setScore(value);
  }

  const updateOptionsContacts = async (idCli:string) => {
    const conts = await fetchContacts(token, idCli);
    if(conts){
      setoptContacts(conts);
      setContact(conts[0].value);
      setSelOpt(conts[0]);
    }
  }

  const validation = () => {
    let val = true;
    let m = 0;
    if(title.trim()==='' || title.length < 5){
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
          total: Number(total),
          discount:Number(discount)
        },
        score,
        condition: [
          {
            glossary: "67b910014643d85abda93cc0",
            user
          }
        ],
        location,
        type,
        category,
        client,
        applicant: contact,
        user 
      }

      console.log('data create => ', JSON.stringify(data));

      const create = await createQuotation(token, data);
      if(typeof(create)==='string'){
        showToastMessageError(create);
      }else{
        showToastMessage('Cotizacion creada satisfactoriamente!!!');
        updateQuotations();
        showForm(false);
      }
    }
  }

  const updateIva = (idValue: string, discountValue: string, amountValue:string) => {
    try {
      const foundVat = optVats.find((vat) => vat.value === idValue);
      const vatvalue = foundVat?.label || '0';
      let operation;
      let t = 0;
      if(haveDiscount){
        operation = (Number(amountValue.replace(/[$,]/g, "")) - 
                      Number(discountValue.replace(/[$,]/g, ""))) * 
                        Number(vatvalue) / 100;

        t = Number(amountValue.replace(/[$,]/g, "")) -
              Number(discountValue.replace(/[$,]/g, "")) +
              operation;
      }else{
        operation = (Number(amountValue.replace(/[$,]/g, ""))) * 
                      Number(vatvalue) / 100;
            
        t = Number(amountValue.replace(/[$,]/g, "")) + operation;
      }
      
      setVat(operation.toFixed(2).toString());
      setTotal(t.toFixed(2).toString())
    } catch (error) {
      setVat('0');
    }
  }

  const updateTotal = (valueIva: string) => {
    try {
      let t = 0;
      if(haveDiscount){
        t = Number(amount.replace(/[$,]/g, "")) -
              Number(discount.replace(/[$,]/g, "")) +
              Number(valueIva.replace(/[$,]/g, ""));
      }else{
        t = Number(amount.replace(/[$,]/g, "")) +
              Number(valueIva.replace(/[$,]/g, ""));
      }
      setTotal(t.toFixed(2).toString());
    } catch (error) {
      setTotal('0');
    }
  }

  const indexUser = optUsers.findIndex((u) => u.value===usr);

  const handleIdVat = (value:string) => {
    updateIva(value, discount, amount);
    setIdVat(value);
  }

  console.log('location => ', location);

  return(
    <>
      <form className="z-10 absolute top-16 w-full max-w-md bg-white space-y-5 p-3 right-0" 
          style={{height: `${heightPage}px`}}>
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
            <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
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
              onValueChange={(value) => {
                setAmount(value || '0'); 
                updateIva(idVat, discount, (value || '0'));
              }}
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
                  updateIva(idVat, value?.replace(/[$,]/g, "") || '0', amount);
                } catch (error) {
                  setDiscount('0');
                  updateIva(idVat, '0', amount);
                }}}
              />
            </div>
          )}
          <div className="col-span-2">
            <Label>IVA</Label>
            <div className="flex gap-x-3">
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
                onValueChange={(value) => {
                  updateTotal(value || '0');
                  setVat(value || '0');
                }}
              />
              {optVats.length > 0 && <SelectReact index={0} opts={optVats} setValue={handleIdVat} />}
            </div>
            {/* {message===3 && (
              <p className=" text-red-500">El iva es obligatorio</p>
            )} */}
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
              // <SelectReact index={0} opts={optContacts} setValue={handleContact} />
              <Select
                value={selOpt}
                options={optContacts}
                onChange={(e:any) => { 
                  console.log('value select => ', e);
                  setContact(e.value);
                  setSelOpt(e);
                }} 
                className="w-full text-lg mt-2 text-gray-900  rounded-lg 
                  bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    height: '5px',
                  }),
                }}
              />
            )}
          </div>
          <div className=" col-span-2">
            <Label>Realiza cotizacion</Label>
            {optUsers.length > 0 && (
              <SelectReact index={indexUser} opts={optUsers} setValue={handleUser} />
            )}
          </div>

          <div className="">
            <Label>Plazo</Label>
            {optCategories.length > 0 && (
              <SelectReact index={0} opts={optCategories} setValue={handleCategories} />
            )}
          </div>

          <div className="">
            <Label>Tipo cotizacion</Label>
            {optTypes.length > 0 && (
              <SelectReact index={0} opts={optTypes} setValue={handleType} />
            )}
          </div>

          <div className=" col-span-2">
            <Label>Puntuacion (0 al 5)</Label>
            <RatingComponent setValue={handleScore} value={score} />
          </div>

          <div className=" col-span-2">
            {/* <Label></Label> */}
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Ubicacion geografica</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="LOCAL"
                name="radio-buttons-group"
                className="flex gap-x-2"
              >
                <FormControlLabel value="LOCAL" onFocus={() => setLocation('LOCAL')} control={<Radio />} label="LOCAL" />
                <FormControlLabel value="NACIONAL" onFocus={() => setLocation('NACIONAL')} control={<Radio />} label="NACIONAL" />
                <FormControlLabel value="INTERNACIONAL" onFocus={() => setLocation('INTERNACIONAL')} control={<Radio />} label="INTERNACIONAL" />
              </RadioGroup>
            </FormControl>
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