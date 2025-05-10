import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState } from 'react'

export default function SelectMultipleReact({opts, setValue, index, disabledSelect=false}: 
  {opts:Options[], setValue:Function, index:number, disabledSelect?: boolean}){

  const [selOpt, setSelOpt] = useState<Options[]>([opts[index]]);

  return(
    <Select
      value={selOpt}
      options={opts}
      isMulti
      isDisabled={disabledSelect}
      onChange={(e:any) => 
        {
          setSelOpt(e); 
          let arr: string[] = [];
          e.map((val:Options) => {
            arr.push(val.value);
          })
          setValue(arr);
        }} 
      className="w-full text-lg mt-2 text-gray-900  rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
    />
  )
}