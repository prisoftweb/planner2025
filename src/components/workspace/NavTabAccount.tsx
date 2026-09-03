'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

export default function NavTabAccount({tab, idWS}: {tab:string, idWS:string}){

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  let tabws: JSX.Element = <></>;
  if(width < 710){
    // tabws = <div className="flex justify-between mt-3">
    //                 <Link href={`/workspace`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Mi Perfil'>
    //                       <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                         className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                         ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>  
    //                 <Link href={`/workspace/companies`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Compañias'>
    //                     <DocumentChartBarIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='2'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/workspace/billing`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Facturacion'>
    //                     <CurrencyDollarIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/workspace/config`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Configuracion'>
    //                     <CreditCardIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //               </div>
    tabws = <div className="grid grid-cols-4 mt-3 border-t pt-2">
              <Link href="/workspace" className="flex flex-col items-center">
                <UserCircleIcon className={`w-6 h-6 ${tab==='1' ? 'text-green-500' : 'text-slate-500'}`} />
                <span className="text-xs">Perfil</span>
              </Link>

              <Link href="/workspace/companies" className="flex flex-col items-center">
                <DocumentChartBarIcon className={`w-6 h-6 ${tab==='2' ? 'text-green-500' : 'text-slate-500'}`} />
                <span className="text-xs">Compañías</span>
              </Link>

              <Link href="/workspace/billing" className="flex flex-col items-center">
                <CurrencyDollarIcon className={`w-6 h-6 ${tab==='3' ? 'text-green-500' : 'text-slate-500'}`} />
                <span className="text-xs">Facturación</span>
              </Link>

              <Link href="/workspace/config" className="flex flex-col items-center">
                <CreditCardIcon className={`w-6 h-6 ${tab==='4' ? 'text-green-500' : 'text-slate-500'}`} />
                <span className="text-xs">Config</span>
              </Link>
            </div>                             
  }else{
    tabws =(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <Link href={`/workspace`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Mi Perfil</p>
          </div>
        </Link>
        <Link href={`/workspace/companies`}>
          <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Compañias</p>
          </div>
        </Link>
        <Link href={`/workspace/billing`}>
          <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Facturacion</p>
          </div>
        </Link>
        <Link href={`/workspace/config`}>
          <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Configuracion</p>
          </div>
        </Link>
      </div>
    )
  }
  
  return(
    <>
      {tabws}
    </>
  )
}