import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState } from 'react'
import { PlusCircleIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function AddRoutes({opts, descRoutes, bandPlus, DeleteRoute, index, 
                                  pushRoute, updateCount}: 
                              {opts:Options[], descRoutes:Options[]
                                pushRoute:Function, bandPlus:boolean, 
                                DeleteRoute:Function, index:number, 
                                updateCount: Function}){
  
  const [desc, setDesc] = useState<string>(descRoutes[0].label);
  const [valueR, setValueR] = useState(opts[0]);
  
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const [ok, setOk] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [route, setRoute] = useState<string>(opts[0].value);

  const onChange = (value:any) => {
    setValueR(value);
    setRoute(value.value);
    descRoutes.map((descRoute) => {
      if(descRoute.value === value.value)
        setDesc(descRoute.label);
    })
  }
  
  const onPlus = () =>{
    if(route !== '' && saved){
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
    if(route !== ''){
      setSaved(true);
      pushRoute(route);
    }else{
      setMessage('* Todos los campos son obligatorios!!');
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const deleteRoute = () => {
    DeleteRoute(index);
  }

  return(
    <>
      <div className='flex items-center mt-2 flex-wrap gap-x-1 gap-y-1'>
        <Select options={opts} value={valueR}
          className='w-60'
          maxMenuHeight={200}
          onChange={(e) => onChange(e)} />
        <CheckCircleIcon width={30} height={30} className={`text-red-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        <PlusCircleIcon width={30} height={30} className={`text-green-500 cursor-pointer ${add? 'invisible': ''} ${bandPlus? '': 'invisible'}`} onClick={onPlus} />
        <TrashIcon width={30} height={30} onClick={deleteRoute} className={`text-red-500 cursor-pointer ${saved? '': 'invisible'}`} />
      </div>
      <p className='text-xs text-slate-400 m-0'>{desc}</p>
    </>
  )
}