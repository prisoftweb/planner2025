'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid"

export default function NavTab({tab, idCli}: {tab:string, idCli:string}){
  
  const [tabCli, setTabCli] = useState<JSX.Element>(<></>);
  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
  }, [])
  
  useEffect(() => {
    if(width < 710){
      const icon = <div className="flex justify-between mt-3">
                      <Link href={`/clients/${idCli}/profile`}>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>  
                      <Link href={`/clients/${idCli}/projects`}>
                        <DocumentChartBarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='2'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>
                      <Link href={`/clients/${idCli}/estimates`}>
                        <CurrencyDollarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>
                      <Link href={`/clients/${idCli}/wallet`}>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>
                    </div>                             
      setTabCli(icon)
    }else{
      setTabCli(
        <div className="flex mt-5 bg-white py-1">
          <Link href={`/clients/${idCli}/profile`}>
            <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
              <p>Perfil cliente</p>
            </div>
          </Link>
          <Link href={`/clients/${idCli}/projects`}>
            <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
              <p>Proyectos</p>
            </div>
          </Link>
          <Link href={`/clients/${idCli}/estimates`}>
            <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
              <p>Estimaciones</p>
            </div>
          </Link>
          <Link href={`/clients/${idCli}/wallet`}>
            <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
              <p>Cartera</p>
            </div>
          </Link>
        </div>
      )
    }
  }, [width, tab])
  
  return(
    <>
      {tabCli}
    </>
  )
}