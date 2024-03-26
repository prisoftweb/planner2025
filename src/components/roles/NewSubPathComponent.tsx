"use client"
import { useState } from "react"
import { PlusCircleIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import Select from 'react-select'
import { Options } from '@/interfaces/Common'

export default function NewSubPathComponent({pushSubPath, bandPlus, deleteSubPath,
                          index, updateCount}: {pushSubPath:Function,
                          bandPlus:boolean, deleteSubPath:Function, index:number, 
                          updateCount: Function}){
  
  const options:Options[] = [
    {
      value: 'Profile',
      label: 'Profile'
    },
    {
      value: 'Resume',
      label: 'Resume'
    },
    {
      value: 'Contacts',
      label: 'Contacts'
    },
    {
      value: 'Otro',
      label: 'Otro'
    },
  ]
  
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const [ok, setOk] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [subpath, setSubpath] = useState<string>(options[0].value);
  const [description, setDescription] = useState<string>('');
  

  const onPlus = () =>{
    //setAdd(true);
    if(subpath !== '' && description !== '' && saved){
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
    if(subpath !== '' && description !== ''){
      setSaved(true);
      pushSubPath(subpath, description);
    }else{
      setMessage('* Todos los campos son obligatorios!!');
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const deleteSubPat = () => {
    deleteSubPath(index);
  }

  const [optionsType, setOptionsType] = useState(options[0]);

  return(
    <>
      <div className="flex items-center mt-2 flex-wrap gap-x-1 gap-y-1">
        <Select
          className='w-40' 
          options={options}
          maxMenuHeight={200}
          //placeholder='Buscar ...'
          value={optionsType}
          onChange={(value:any) => {setSubpath(value.value); setOptionsType(value)}}
        />
        <textarea className="border border-slate-300 resize-none outline-1 outline-blue-500" 
          rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        
        <CheckCircleIcon width={30} height={30} className={`text-red-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        <PlusCircleIcon width={30} height={30} className={`text-green-500 cursor-pointer ${add? 'invisible': ''} ${bandPlus? '': 'invisible'}`} onClick={onPlus} />
        <TrashIcon width={30} height={30} onClick={deleteSubPat} className={`text-red-500 cursor-pointer ${saved? '': 'invisible'}`} />
      </div>
      {!ok? (
            <p className="text-red-500">{message}</p>
          ): ''}
    </>
  )
}