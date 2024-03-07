'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon, CurrencyDollarIcon, CreditCardIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid"

export default function NavTab({tab, idProv}: {tab:string, idProv:string}){
  
  const [tabProv, setTabProv] = useState<JSX.Element>(<></>);
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
      const icon = <div className="flex m-2 gap-x-5">
                      <Link href={`/providers/${idProv}?tab=1`}>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-10 h-10 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>  
                      <Link href={`/providers/${idProv}?tab=2`}>
                        <DocumentChartBarIcon
                          className={`w-10 h-10 text-slate-600 cursor-pointer 
                          ${tab==='2'? 'bg-yellow-950 rounded-lg': ''}`} />
                      </Link>
                      <Link href={`/providers/${idProv}?tab=3`}>
                        <CurrencyDollarIcon
                          className={`w-10 h-10 text-slate-600 cursor-pointer 
                          ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>
                      <Link href={`/providers/${idProv}?tab=4`}>
                        <CreditCardIcon
                          className={`w-10 h-10 text-slate-600 cursor-pointer 
                          ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>
                    </div>                             
      setTabProv(icon)
    }else{
      setTabProv(
        <div className="flex mt-5 bg-white py-1">
          <Link href={`/providers/${idProv}?tab=1`}>
            <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
              <p>Perfil proveedor</p>
            </div>
          </Link>
          <Link href={`/providers/${idProv}?tab=2`}>
            <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
              <p>Historial de facturas</p>
            </div>
          </Link>
          <Link href={`/providers/${idProv}?tab=3`}>
            <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
              <p>Anticipos</p>
            </div>
          </Link>
          <Link href={`/providers/${idProv}?tab=4`}>
            <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
              <p>Pagos</p>
            </div>
          </Link>
        </div>
      )
    }
  }, [width, tab])
  
  return(
    <>
      {tabProv}
      {/* <div className="flex mt-5 bg-white py-1">
        <Link href={`/providers/${idProv}?tab=1`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p>Perfil proveedor</p>
          </div>
        </Link>
        <Link href={`/providers/${idProv}?tab=2`}>
          <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
            <p>Historial de facturas</p>
          </div>
        </Link>
        <Link href={`/providers/${idProv}?tab=3`}>
          <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
            <p>Anticipos</p>
          </div>
        </Link>
        <Link href={`/providers/${idProv}?tab=4`}>
          <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
            <p>Pagos</p>
          </div>
        </Link>
      </div> */}
    </>
  )
}