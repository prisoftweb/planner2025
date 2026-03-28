'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, 
  DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

export default function NavTabProject({tab, idPro, isHistory}: {tab:string, idPro:string, isHistory?: boolean}){

  const [width, setWidth] = useState<number>(0);
  
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  const query=isHistory? '?history=1':'';
  
  let tabCli = <></>;
  if(width < 1010){
    // tabCli = <div className="flex justify-between mt-3">
    //                 <Link href={isHistory ? `/projects/history/${idPro}` : `/projects/${idPro}/profile`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Resumen'>
    //                     <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>  
    //                 <Link href={`/projects/${idPro}/analysis`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Analisis'>
    //                     <DocumentChartBarIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='2'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/projects/${idPro}/budgets${query}`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Presupuesto'>
    //                     <CurrencyDollarIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/projects/${idPro}/costs`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Costo'>
    //                     <CreditCardIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/projects/estimates/${idPro}?page=projects`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Estimaciones'>
    //                     <CreditCardIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='5'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/projects/estimates/${idPro}/invoice?page=projects`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Facturacion'>
    //                     <CreditCardIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='6'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/projects/estimates/${idPro}/collections?page=projects`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Cobranza'>
    //                     <CreditCardIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='7'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //                 <Link href={`/projects/${idPro}/guaranteefunds${query}`}>
    //                   <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                     placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Fondo garantia'>
    //                     <CreditCardIcon
    //                       className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                       ${tab==='8'? 'bg-green-500 rounded-lg': ''}`} />
    //                   </Tooltip>
    //                 </Link>
    //               </div>

    tabCli = <div className="grid grid-cols-4 sm:grid-cols-8 mt-3 border-t pt-2 gap-y-2">
                <Link href={isHistory ? `/projects/history/${idPro}` : `/projects/${idPro}/profile`} className="flex flex-col items-center" >
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Resumen'>
                    <UserCircleIcon 
                      className={`w-6 h-6 cursor-pointer ${tab==='1' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Resumen</span> */}
                </Link>
  
                <Link href={`/projects/${idPro}/analysis${query}`} className="flex flex-col items-center">
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Analisis'>
                    <DocumentChartBarIcon
                      className={`w-6 h-6 cursor-pointer ${tab==='2' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Modificar</span> */}
                </Link>
  
                <Link href={`/projects/${idPro}/budgets${query}`} className="flex flex-col items-center">
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Presupuesto'>
                    <CurrencyDollarIcon
                      className={`w-6 h-6 cursor-pointer ${tab==='3' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Formatos</span> */}
                </Link>
  
                <Link href={`/projects/${idPro}/costs${query}`} className="flex flex-col items-center">
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Costo'>
                    <CreditCardIcon
                      className={`w-6 h-6 cursor-pointer ${tab==='4' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Facturas</span> */}
                </Link>

                <Link href={`/projects/estimates/${idPro}?page=projects`} className="flex flex-col items-center">
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Estimaciones'>
                    <CreditCardIcon
                      className={`w-6 h-6 cursor-pointer ${tab==='5' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Facturas</span> */}
                </Link>

                <Link href={`/projects/estimates/${idPro}/invoice?page=projects`} className="flex flex-col items-center">
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Facturacion'>
                    <CreditCardIcon
                      className={`w-6 h-6 cursor-pointer ${tab==='6' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Facturas</span> */}
                </Link>

                <Link href={`/projects/estimates/${idPro}/collections?page=projects`} className="flex flex-col items-center">
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Cobranza'>
                    <CreditCardIcon
                      className={`w-6 h-6 cursor-pointer ${tab==='7' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Facturas</span> */}
                </Link>

                <Link href={`/projects/${idPro}/guaranteefunds${query}`} className="flex flex-col items-center">
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Fondo garantia'>
                    <CreditCardIcon
                      className={`w-6 h-6 cursor-pointer ${tab==='8' ? 'text-green-500' : 'text-slate-500'}`}
                    />
                  </Tooltip>
                  {/* <span className="text-xs">Facturas</span> */}
                </Link>
              </div>
  }else{
    tabCli=(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <Link href={isHistory ? `/projects/history/${idPro}` : `/projects/${idPro}/profile`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Resumen</p>
          </div>
        </Link>
        <Link href={`/projects/${idPro}/analysis${query}`}>
          <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Analisis</p>
          </div>
        </Link>
        <Link href={`/projects/${idPro}/budgets${query}`}>
          <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Presupuesto</p>
          </div>
        </Link>
        <Link href={`/projects/${idPro}/costs${query}`}>
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
        <Link href={`/projects/${idPro}/guaranteefunds${query}`}>
          <div className={`w-50 px-5 ${tab==='8'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Fondo garantia</p>
          </div>
        </Link>
      </div>
    )
  }
  
  return(
    <>
      {tabCli}
      {/* <div className="hidden md:block">
        {tabCli}
      </div>
      <div>

      </div> */}
    </>
  )
}