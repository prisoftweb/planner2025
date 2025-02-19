'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, 
  DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";

export default function NavTabEstimates({tab, id_p}: {tab:number, id_p:string}){
  
  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

  // const [tabCli, setTabCli] = useState<JSX.Element>(<></>);
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
    tabCli = <div className="flex justify-between mt-3">
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      placement="bottom" className="bg-white text-blue-500" content='Estimaciones'>
                      <UserCircleIcon data-tooltip-target="tooltip-dark"
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===0? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => window.location.replace(`/projects/estimates/${id_p}`)} />
                    </Tooltip>  
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      placement="bottom" className="bg-white text-blue-500" content='Facturas'>
                      <DocumentChartBarIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===1? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => window.location.replace(`/projects/estimates/${id_p}/invoice`)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      placement="bottom" className="bg-white text-blue-500" content='Abonos'>
                      <CurrencyDollarIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===2? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => window.location.replace(`/projects/estimates/${id_p}/bonus`)} />
                    </Tooltip>
                  </div>                             
  }else{
    tabCli=(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <div className={`w-50 px-5 cursor-pointer ${tab===0? 'border-b-4 border-blue-600':''}`}
          onClick={() => window.location.replace(`/projects/estimates/${id_p}`)}
        >
          {/* <p className="text-blue-600">Estimaciones</p> */}
          <p className="text-black font-semibold">Estimaciones</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===1? 'border-b-4 border-blue-600':''}`}
          onClick={() => window.location.replace(`/projects/estimates/${id_p}/invoice`)}
        >
          <p className="text-black font-semibold">Facturas</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===2? 'border-b-4 border-blue-600':''}`}
          onClick={() => window.location.replace(`/projects/estimates/${id_p}/bonus`)}
        >
          <p className="text-black font-semibold">Abonos</p>
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