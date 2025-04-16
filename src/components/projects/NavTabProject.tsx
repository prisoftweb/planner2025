'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, 
  DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";

export default function NavTabProject({tab, idPro}: {tab:string, idPro:string}){
  
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
  
  let tabCli = <></>;
  if(width < 710){
    tabCli = <div className="flex justify-between mt-3">
                    <Link href={`/projects/${idPro}/profile`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Resumen'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>  
                    <Link href={`/projects/${idPro}/analysis`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Analisis'>
                        <DocumentChartBarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='2'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                    <Link href={`/projects/${idPro}/estimates`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Presupuesto'>
                        <CurrencyDollarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                    <Link href={`/projects/${idPro}/costs`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Costo'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                    <Link href={`/projects/estimates/${idPro}?page=projects`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Estimaciones'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='5'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                    <Link href={`/projects/estimates/${idPro}/invoice?page=projects`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Facturacion'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='6'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                    <Link href={`/projects/estimates/${idPro}/collections?page=projects`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Cobranza'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='7'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                  </div>                             
  }else{
    tabCli=(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <Link href={`/projects/${idPro}/profile`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Resumen</p>
          </div>
        </Link>
        <Link href={`/projects/${idPro}/analysis`}>
          <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Analisis</p>
          </div>
        </Link>
        <Link href={`/projects/${idPro}/`}>
          <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Presupuesto</p>
          </div>
        </Link>
        <Link href={`/projects/${idPro}/costs`}>
          <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Costo</p>
          </div>
        </Link>
        <Link href={`/projects/estimates/${idPro}?page=projects`}>
          <div className={`w-50 px-5 ${tab==='5'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Estimaciones</p>
          </div>
        </Link>
        <Link href={`/projects/estimates/${idPro}/invoice?page=projects`}>
          <div className={`w-50 px-5 ${tab==='6'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Facturacion</p>
          </div>
        </Link>
        <Link href={`/projects/estimates/${idPro}/collections?page=projects`}>
          <div className={`w-50 px-5 ${tab==='7'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Cobranza</p>
          </div>
        </Link>
      </div>
    )
  }
  
  return(
    <>
      {tabCli}
    </>
  )
}