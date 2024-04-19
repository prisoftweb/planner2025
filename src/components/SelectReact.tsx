import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState } from 'react'

export default function SelectReact({opts, setValue, index}: 
                          {opts:Options[], setValue:Function, index:number}){
  const [selOpt, setSelOpt] = useState<Options>(opts[index]);

  return(
    <Select
      value={selOpt}
      options={opts}
      onChange={(e:any) => {setSelOpt(e); setValue(e.value)}} 
      className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2"
    />
  )
}