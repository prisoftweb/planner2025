import { Options } from '@/interfaces/Common'
import { useState } from 'react'
import { PlusCircleIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import Label from '../Label';
import Input from '../Input';
import CurrencyInput from 'react-currency-input-field';

export default function AddConcept({bandPlus, DeleteElement, index, 
                                  pushElement, updateCount}: 
                              { pushElement:Function, bandPlus:boolean, 
                                DeleteElement:Function, index:number, 
                                updateCount: Function}){
  
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const [ok, setOk] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [concept, setConcept] = useState<string>('');
  const [account, setAccount] = useState<string>('');

  const onChangeConcept = (value:string) => {
    setConcept(value);
  }

  const onChangeAccount = (value:string) => {
    setAccount(value.replace(/[$,]/g, ""));
  }
  
  const onPlus = () =>{
    if(concept !== '' && account !== '' && saved){
      setAdd(true);
      updateCount();
    }else{
      setMessage('* Guarde el concepto primero!!');
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const save = () => {
    if(concept !== '' && account !== ''){
      setSaved(true);
      pushElement(concept, account);
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
        <div>
          <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Concepto</p></Label>
          <Input type='text' name='concept' 
            onChange={(e) => onChangeConcept(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="account"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <Input type='text' name='account' 
            onChange={(e) => onChangeAccount(e.target.value)}
          />
          {/* <CurrencyInput
            id="account" name="account"
            // className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
            //   focus:border-slate-700 outline-0"
            className='w-full border border-slate-300 rounded-md px-2 py-1 my-2 
              bg-slate-100  focus:border-slate-700 outline-0'
            defaultValue={0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              onChangeAccount(parseFloat(value || '0').toString());
            } catch (error) {
              onChangeAccount('0');
            }}}
          /> */}
        </div>
        <div>
          <Label htmlFor=""><p>&nbsp;</p></Label>
          <CheckCircleIcon width={30} height={30} className={`text-red-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        </div>
        <div>
          <Label htmlFor=""><p>&nbsp;</p></Label>
          <PlusCircleIcon width={30} height={30} className={`text-green-500 cursor-pointer ${add? 'invisible': ''} ${bandPlus? '': 'invisible'}`} onClick={onPlus} />
        </div>
        <div>
          <Label htmlFor=""><p>&nbsp;</p></Label>
          <TrashIcon width={30} height={30} onClick={deleteElement} className={`text-red-500 cursor-pointer ${saved? '': 'invisible'}`} />
        </div>
      </div>
      { !ok && (<p className='text-red-500 text-xs'>{message}</p>)  }
    </>
  )
}