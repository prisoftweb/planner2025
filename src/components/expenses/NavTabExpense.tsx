'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function NavTabExpense({tab, idExp, pending, idProv, idProj, isHistory=false}: {tab:string, 
  idExp:string, pending: 0|1, idProv: string, idProj:string, isHistory?: boolean}){

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

  const pathExp= isHistory? '/history': '';

  let tabCli: JSX.Element;
  if(width < 710){
    tabCli = <div className="flex justify-around mt-3">
                    {/* <Link href={`/expenses${pathExp}/${idExp}/profile${previosFull}`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Perfil'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>   */}
                    <Link href={`/expenses${pathExp}/${idExp}/profile${previosFull}`} className="flex flex-col items-center">
                      <UserCircleIcon 
                        className={`w-6 h-6 cursor-pointer ${tab==='1' ? 'text-green-500' : 'text-slate-500'}`} />
                      <span className="text-xs">Resumen</span>
                    </Link>
                    {/* <Link href={`/expenses${pathExp}/${idExp}/status${previosFull}`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Estatus'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='5'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link> */}
                    <Link href={`/expenses${pathExp}/${idExp}/status${previosFull}`} className="flex flex-col items-center">
                      <UserCircleIcon 
                        className={`w-6 h-6 cursor-pointer ${tab==='5' ? 'text-green-500' : 'text-slate-500'}`} />
                      <span className="text-xs">Estatus</span>
                    </Link>
                  </div>                             
  }else{
    tabCli = (
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <Link href={`/expenses${pathExp}/${idExp}/profile${previosFull}`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Resumen</p>
          </div>
        </Link>
        <Link href={`/expenses${pathExp}/${idExp}/status${previosFull}`}>
          <div className={`w-50 px-5 ${tab==='5'? 'border-b-4 border-blue-600':''}`}>
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