'use client'

import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

export default function NavTabEstimates({tab, id_p, pageQuery}: 
  {tab:number, id_p:string, pageQuery:string | undefined}){

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  

  let tabCli = <></>;
  if(width < 710){
    // tabCli = <div className="flex justify-between mt-3">
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Estimaciones'>
    //                   <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===0? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}?page=projects`: `/projects/estimates/${id_p}`)} />
    //                 </Tooltip>  
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Facturas'>
    //                   <DocumentChartBarIcon
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===1? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}/invoice?page=projects`: `/projects/estimates/${id_p}/invoice`)} />
    //                 </Tooltip>
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Cobros'>
    //                   <CurrencyDollarIcon
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===2? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}/collections?page=projects`: `/projects/estimates/${id_p}/collections`)} />
    //                 </Tooltip>
    //               </div>
        
   tabCli=<div className="grid grid-cols-3 mt-3 border-t pt-2">
            <div className="flex flex-col items-center">
              <UserCircleIcon 
                className={`w-6 h-6 cursor-pointer ${tab===0 ? 'text-green-500' : 'text-slate-500'}`}
                onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}?page=projects`: `/projects/estimates/${id_p}`)} />
              <span className="text-xs">Estimaciones</span>
            </div>

            <div className="flex flex-col items-center">
              <DocumentChartBarIcon 
                className={`w-6 h-6 cursor-pointer ${tab===1 ? 'text-green-500' : 'text-slate-500'}`}
                onClick={() => () => window.location.replace(pageQuery? `/projects/estimates/${id_p}/invoice?page=projects`: `/projects/estimates/${id_p}/invoice`)} />
              <span className="text-xs">Facturas</span>
            </div>

            <div className="flex flex-col items-center">
              <CurrencyDollarIcon
                className={`w-6 h-6 cursor-pointer ${tab===2 ? 'text-green-500' : 'text-slate-500'}`}
                onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}/collections?page=projects`: `/projects/estimates/${id_p}/collections`)} />
              <span className="text-xs">Cobros</span>
            </div>

          </div>
  }else{
    tabCli=(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <div className={`w-50 px-5 cursor-pointer ${tab===0? 'border-b-4 border-blue-600':''}`}
          onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}?page=projects`: 
                            `/projects/estimates/${id_p}`)}
        >
          <p className="text-black font-semibold">Estimaciones</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===1? 'border-b-4 border-blue-600':''}`}
          onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}/invoice?page=projects`: 
                            `/projects/estimates/${id_p}/invoice`)}
        >
          <p className="text-black font-semibold">Facturas</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===2? 'border-b-4 border-blue-600':''}`}
          onClick={() => window.location.replace(pageQuery? `/projects/estimates/${id_p}/collections?page=projects`: 
                            `/projects/estimates/${id_p}/collections`)}
        >
          <p className="text-black font-semibold">Cobros</p>
        </div>
      </div>
    )
  }
  
  return(
    <>
      {tabCli}
    </>
  )
}