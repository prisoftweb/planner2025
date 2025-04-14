import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState } from 'react'

export default function SelectReact({opts, setValue, index, disabled=false}: 
                          {opts:Options[], setValue:Function, index:number, disabled?:boolean}){
  
  const [selOpt, setSelOpt] = useState<Options>(index!== undefined? opts[index]: opts[opts.length-1]);
  
  return(
    <Select
      value={selOpt}
      options={opts}
      onChange={(e:any) => {setSelOpt(e); setValue(e.value)}} 
      className="w-full text-lg mt-2 text-gray-900  rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: '5px',
        }),
      }}
      isDisabled={disabled}
    />
  )
}