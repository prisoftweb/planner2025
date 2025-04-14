import Select from 'react-select'
import { Options } from '@/interfaces/Common'
// import { useState } from 'react'

export default function MultiSelectReact({opts, setValue}: {opts:Options[], setValue:Function}){
  // const [selOpt, setSelOpt] = useState<Options>(opts[0]);

  return(
    <Select
      isMulti
      onChange={(e:any) => setValue(e.value)} 
      className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2"
    />
  )
}