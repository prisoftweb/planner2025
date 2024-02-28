"use client"
import { useState } from "react"
import { PlusCircleIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
//import Input from "../Input";
import Select from "../Select";
import InputMask from 'react-input-mask';
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";

export default function PhoneContact({pushPhone, valuePhone, bandPlus, deletePhone, 
                          index, updateCount}: {pushPhone:Function, valuePhone:string, 
                          bandPlus:boolean, deletePhone:Function, index:number, 
                          updateCount: Function}){
  
  const [phone, setPhone] = useState<string>(valuePhone);
  const [typePhone, setTypePhone] = useState<string>('Movil');
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const [ok, setOk] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const onPlus = () =>{
    if(phone !== '' && saved){
      setAdd(true);
      updateCount();
    }else{
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const save = () => {
    if(phone !== ''){
      setSaved(true);
      pushPhone(phone, typePhone);
    }else{
      setMessage('* El campo no debe estar vacio');
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const deletePhon = () => {
    deletePhone(index);
  }

  return(
    <>
      <div className="flex items-center mt-2">
        <div className="w-full flex  justify-start items-center relative">
          {/* <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} 
              className="shadow appearance-none border rounded w-full py-4 px-3 text-base
               text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
            /> */}
          {/* <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
            <InputMask mask='(+52) 999 999 9999'
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 pl-9 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
              type="phone" 
              placeholder="(+52) 444 429 7227"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <DevicePhoneMobileIcon className="h-6 w-6 text-amber-400 hover:text-amber-500 absolute ml-1" />
        </div>
        <Select value={typePhone} onChange={(e) => setTypePhone(e.target.value)}>
          <option value="Movil">Movil</option>
          <option value="Escuela">Escuela</option>
          <option value="Casa">Casa</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Otro">Otro</option>
        </Select>
        {/* <Input type="tel" /> */}
        <CheckCircleIcon width={40} height={40} className={`text-red-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        <PlusCircleIcon width={40} height={40} className={`text-green-500 cursor-pointer ${add? 'invisible': ''} ${bandPlus? '': 'invisible'}`} onClick={onPlus} />
        <TrashIcon width={40} height={40} onClick={deletePhon} className={`text-red-500 cursor-pointer ${saved? '': 'invisible'}`} />
      </div>
      {!ok? (
            <p className="text-red-500">{message}</p>
          ): ''}
    </>
  )
}