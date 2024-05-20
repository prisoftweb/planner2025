import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState } from 'react'

export default function SelectMultipleReact({opts, setValue, index}: 
                          {opts:Options[], setValue:Function, index:number}){
  //const [selOpt, setSelOpt] = useState<Options[]>([opts[index]]);
  const [selOpt, setSelOpt] = useState<Options[]>([opts[index]]);

  return(
    <Select
      value={selOpt}
      options={opts}
      isMulti
      //onChange={(e:any) => console.log(e)}
      onChange={(e:any) => 
        {
          setSelOpt(e); 
          let arr: string[] = [];
          e.map((val:Options) => {
            arr.push(val.value);
          })
          setValue(arr);
          console.log(e);
        }} 
      // className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
      //   bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2"
      className="w-full text-lg mt-2 text-gray-900  rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
    />
  )
}