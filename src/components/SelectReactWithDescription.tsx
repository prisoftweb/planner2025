import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState, useEffect } from 'react'

export default function SelectReactWithDescription({opts, setValue, index, descriptions}: 
                          {opts:Options[], setValue:Function, 
                            index:number, descriptions:Options[]}){
  
  const [selOpt, setSelOpt] = useState<Options>(index!== undefined? opts[index]: opts[opts.length-1]);
  const [description, setDescription] = useState<string>('');
  
  useEffect(() => {
    setDescription(descriptions.find((desc) => desc.value === selOpt.value)?.label || '');
  }, [selOpt]);
  
  return(
    <>
      <Select
        value={selOpt}
        options={opts}
        onChange={(e:any) => {setSelOpt(e); setValue(e.value)}} 
        // className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
        //   bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2"
        className="w-full text-lg mt-2 text-gray-900  rounded-lg 
          bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
      />
      <p className='text-red-500 text-xs mt-1'>{description}</p>
    </>
  )
}