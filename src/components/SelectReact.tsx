import Select from 'react-select'
import { Options } from '@/interfaces/Common'
import { useState, useEffect } from 'react'

export default function SelectReact({opts, setValue, index}: 
                          {opts:Options[], setValue:Function, index:number}){
  
  const [selOpt, setSelOpt] = useState<Options>(index!== undefined? opts[index]: opts[opts.length-1]);
  const [selectComp, setSelectComp] = useState<JSX.Element>(<></>);
  
  // useEffect(() => {
  //   if(index > 0){
  //     console.log(opts[index]);
  //   }

  //   console.log('sel react index => ', index);
    
  //   if(index === undefined){
  //     console.log('no index => ', index, ' leng => ', opts.length);
  //   }

  //   setSelectComp(<></>);

  //   console.log('opt => ', selOpt);

  //   setTimeout(() => {
  //     setSelectComp(
  //       <Select
  //         value={selOpt}
  //         options={opts}
  //         onChange={(e:any) => {setSelOpt(e); setValue(e.value)}} 
  //         className="w-full text-lg mt-2 text-gray-900  rounded-lg 
  //           bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
  //       />)
  //   }, 500);
  // }, []);

  return(
    <Select
      value={selOpt}
      options={opts}
      onChange={(e:any) => {setSelOpt(e); setValue(e.value)}} 
      // className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
      //   bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2"
      className="w-full text-lg mt-2 text-gray-900  rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0"
    />
  )
}