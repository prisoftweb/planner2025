'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, 
  DocumentChartBarIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

export default function NavTabExpense({tab, idExp, pending, idProv, idProj}: {tab:string, 
  idExp:string, pending: 0|1, idProv: string, idProj:string}){

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  const previos = pending===1? '?status=pending': '?';
  const prevProject = idProj && idProj != ''? `&&project=${idProj}`: '';
  const prevProvider = idProv && idProv != ''? `&&prov=${idProv}`: '';
  
  const previosFull = previos + prevProject + prevProvider;

  let tabCli: JSX.Element;
  if(width < 710){
    tabCli = <div className="flex justify-between mt-3">
                    <Link href={`/expenses/${idExp}/profile${previosFull}`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Perfil'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>  
                    <Link href={`/expenses/${idExp}/status${previosFull}`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Estatus'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='5'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                  </div>                             
  }else{
    tabCli = (
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <Link href={`/expenses/${idExp}/profile${previosFull}`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Resumen</p>
          </div>
        </Link>
        <Link href={`/expenses/${idExp}/status${previosFull}`}>
          <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Estatus</p>
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