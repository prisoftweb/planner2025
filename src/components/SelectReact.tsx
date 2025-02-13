import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState } from 'react'

export default function SelectReact({opts, setValue, index, disabled=false}: 
                          {opts:Options[], setValue:Function, index:number, disabled?:boolean}){
  
  const [selOpt, setSelOpt] = useState<Options>(index!== undefined? opts[index]: opts[opts.length-1]);
  //console.log('sel opt => ', selOpt);

  return(
    <Select
      value={selOpt}
      options={opts}
      onChange={(e:any) => {setSelOpt(e); setValue(e.value)}} 
      // className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
      //   bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2"
      className="w-full text-lg mt-2 text-gray-900  rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: '5px',
          //padding: '0px'
          //borderColor: state.isFocused ? 'grey' : 'red',
        }),
      }}
      isDisabled={disabled}
    />
  )
}