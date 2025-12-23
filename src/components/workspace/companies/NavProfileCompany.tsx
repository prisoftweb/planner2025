'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

export default function NavProfileCompany({tab, handleIndex}: {tab:number, handleIndex: (value: number) => void}){

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  let tabcomp: JSX.Element = <></>;
  if(width < 710){
    tabcomp = <div className="flex justify-between mt-3">
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Datos Basicos'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab===1? 'bg-green-500 rounded-lg': ''}`}
                          onClick={() => handleIndex(1)} />
                    </Tooltip>  
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Logos'>
                      <DocumentChartBarIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===2? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => handleIndex(2)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Ubicacion'>
                      <CurrencyDollarIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===3? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => handleIndex(3)} />
                    </Tooltip>
                  </div>                             
  }else{
    tabcomp =(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <div className={`w-50 px-5 ${tab===1? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600 cursor-pointer" onClick={() => handleIndex(1)}>Datos basicos</p>
        </div>
        <div className={`w-50 px-5 ${tab===2? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600 cursor-pointer" onClick={() => handleIndex(2)}>Logos</p>
        </div>
        <div className={`w-50 px-5 ${tab===3? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600 cursor-pointer" onClick={() => handleIndex(3)}>Ubicacion</p>
        </div>
      </div>
    )
  }
  
  return(
    <>
      {tabcomp}
    </>
  )
}