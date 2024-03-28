import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState } from 'react'
import { PlusCircleIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function AddElements({opts, descriptions, bandPlus, DeleteElement, index, 
                                  pushElement, updateCount}: 
                              {opts:Options[], descriptions:Options[]
                                pushElement:Function, bandPlus:boolean, 
                                DeleteElement:Function, index:number, 
                                updateCount: Function}){
  
  const [desc, setDesc] = useState<string>(descriptions[0].label);
  const [valueE, setValueE] = useState(opts[0]);
  
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const [ok, setOk] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [element, setElement] = useState<string>(opts[0].value);

  const onChange = (value:any) => {
    setValueE(value);
    setElement(value.value);
    descriptions.map((description) => {
      if(description.value === value.value)
        setDesc(description.label);
    })
  }
  
  const onPlus = () =>{
    if(element !== '' && saved){
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
    if(element !== ''){
      setSaved(true);
      pushElement(element);
    }else{
      setMessage('* Todos los campos son obligatorios!!');
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const deleteElement = () => {
    DeleteElement(index);
  }

  return(
    <>
      <div className='flex items-center mt-2 flex-wrap gap-x-1 gap-y-1'>
        <Select options={opts} value={valueE}
          className='w-60'
          maxMenuHeight={200}
          onChange={(e) => onChange(e)} />
        <CheckCircleIcon width={30} height={30} className={`text-red-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        <PlusCircleIcon width={30} height={30} className={`text-green-500 cursor-pointer ${add? 'invisible': ''} ${bandPlus? '': 'invisible'}`} onClick={onPlus} />
        <TrashIcon width={30} height={30} onClick={deleteElement} className={`text-red-500 cursor-pointer ${saved? '': 'invisible'}`} />
      </div>
      <p className='text-xs text-slate-400 m-0'>{desc}</p>
    </>
  )
}