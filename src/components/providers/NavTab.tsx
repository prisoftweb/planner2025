'use client'

import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";

export default function NavTab({tab, idProv}: {tab:string, idProv:string}){
  
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

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  let tabProv = <></>;
  if(width < 710){
    tabProv = <div className="flex justify-between mt-3 border-b border-blue-300">
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Perfil'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`}
                          onClick={() => window.location.replace(`/providers/${idProv}/profile`)} />
                      </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Pendientes'>
                          <DocumentChartBarIcon
                            className={`w-6 h-6 text-slate-600 cursor-pointer 
                            ${tab==='2'? 'bg-green-500 rounded-lg': ''}`}
                            onClick={() => window.location.replace(`/providers/${idProv}/pendinginvoices`)} />
                      </Tooltip>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Historial'>
                          <DocumentChartBarIcon
                            className={`w-6 h-6 text-slate-600 cursor-pointer 
                            ${tab==='3'? 'bg-green-500 rounded-lg': ''}`}
                            onClick={() => window.location.replace(`/providers/${idProv}/invoiceHistory`)} />
                      </Tooltip>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Anticipos'>
                        <CurrencyDollarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='4'? 'bg-green-500 rounded-lg': ''}`}
                          onClick={() => window.location.replace(`/providers/${idProv}/advances`)} />
                      </Tooltip>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Pagos'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='5'? 'bg-green-500 rounded-lg': ''}`}
                          onClick={() => window.location.replace(`/providers/${idProv}/payments`)} />
                      </Tooltip>
                  </div>                             
  }else{
    tabProv = (
      <div className="flex mt-5 py-1 border-b border-blue-300">
          <div className={`w-50 px-5 cursor-pointer ${tab==='1'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/profile`)}>
            <p className="text-blue-600">Perfil proveedor</p>
          </div>

          <div className={`w-50 px-5 cursor-pointer ${tab==='2'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/pendinginvoices`)}>
            <p className="text-blue-600">Facturas pendientes</p>
          </div>
        
          <div className={`w-50 px-5 cursor-pointer ${tab==='3'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/invoiceHistory`)}>
            <p className="text-blue-600">Historial de facturas</p>
          </div>
        
          <div className={`w-50 px-5 cursor-pointer ${tab==='4'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/advances`)}>
            <p className="text-blue-600">Anticipos</p>
          </div>
        
          <div className={`w-50 px-5 cursor-pointer ${tab==='5'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/payments`)}>
            <p className="text-blue-600">Pagos</p>
          </div>
      </div>
    )
  }
  
  return(
    <>
      {tabProv}
    </>
  )
}