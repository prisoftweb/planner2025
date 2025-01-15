'use client'

import Link from "next/link"
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

  // const [tabProv, setTabProv] = useState<JSX.Element>(<></>);
  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  // useEffect(() => {
  //   if(width < 710){
  //     const icon = <div className="flex justify-between mt-3">
  //                     {/* <Link href={`/providers/${idProv}/profile`}> */}
  //                       <Tooltip closeDelay={0} delay={100} motionProps={props} 
  //                         placement="bottom" className="bg-white text-blue-500" content='Perfil'>
  //                         <UserCircleIcon data-tooltip-target="tooltip-dark"
  //                           className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                           ${tab==='1'? 'bg-green-500 rounded-lg': ''}`}
  //                           onClick={() => window.location.replace(`/providers/${idProv}/profile`)} />
  //                       </Tooltip>
  //                     {/* </Link>   */}
  //                     {/* <Link href={`/providers/${idProv}/invoiceHistory`}> */}
  //                       <Tooltip closeDelay={0} delay={100} motionProps={props} 
  //                         placement="bottom" className="bg-white text-blue-500" content='Historial'>
  //                           <DocumentChartBarIcon
  //                             className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                             ${tab==='2'? 'bg-green-500 rounded-lg': ''}`}
  //                             onClick={() => window.location.replace(`/providers/${idProv}/invoiceHistory`)} />
  //                       </Tooltip>
  //                     {/* </Link> */}
  //                     {/* <Link href={`/providers/${idProv}/advances`}> */}
  //                       <Tooltip closeDelay={0} delay={100} motionProps={props} 
  //                         placement="bottom" className="bg-white text-blue-500" content='Anticipos'>
  //                         <CurrencyDollarIcon
  //                           className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                           ${tab==='3'? 'bg-green-500 rounded-lg': ''}`}
  //                           onClick={() => window.location.replace(`/providers/${idProv}/advances`)} />
  //                       </Tooltip>
  //                     {/* </Link> */}
  //                     {/* <Link href={`/providers/${idProv}/payments`}> */}
  //                       <Tooltip closeDelay={0} delay={100} motionProps={props} 
  //                         placement="bottom" className="bg-white text-blue-500" content='Pagos'>
  //                         <CreditCardIcon
  //                           className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                           ${tab==='4'? 'bg-green-500 rounded-lg': ''}`}
  //                           onClick={() => window.location.replace(`/providers/${idProv}/payments`)} />
  //                       </Tooltip>
  //                     {/* </Link> */}
  //                   </div>                             
  //     setTabProv(icon)
  //   }else{
  //     setTabProv(
  //       <div className="flex mt-5 bg-white py-1">
  //         {/* <Link href={`/providers/${idProv}/profile`}> */}
  //           <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}
  //               onClick={() => window.location.replace(`/providers/${idProv}/profile`)}>
  //             <p>Perfil proveedor</p>
  //           </div>
  //         {/* </Link> */}
  //         {/* <Link href={`/providers/${idProv}/invoiceHistory`}> */}
  //           <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}
  //               onClick={() => window.location.replace(`/providers/${idProv}/invoiceHistory`)}>
  //             <p>Historial de facturas</p>
  //           </div>
  //         {/* </Link> */}
  //         {/* <Link href={`/providers/${idProv}/advances`}> */}
  //           <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}
  //               onClick={() => window.location.replace(`/providers/${idProv}/advances`)}>
  //             <p>Anticipos</p>
  //           </div>
  //         {/* </Link> */}
  //         {/* <Link href={`/providers/${idProv}/payments`}> */}
  //           <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}
  //               onClick={() => window.location.replace(`/providers/${idProv}/payments`)}>
  //             <p>Pagos</p>
  //           </div>
  //         {/* </Link> */}
  //       </div>
  //     )
  //   }
  // }, [width, tab])

  let tabProv = <></>;
  if(width < 710){
    tabProv = <div className="flex justify-between mt-3 border-b border-blue-300">
                    {/* <Link href={`/providers/${idProv}/profile`}> */}
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Perfil'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`}
                          onClick={() => window.location.replace(`/providers/${idProv}/profile`)} />
                      </Tooltip>
                    {/* </Link>   */}
                    {/* <Link href={`/providers/${idProv}/invoiceHistory`}> */}
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Historial'>
                          <DocumentChartBarIcon
                            className={`w-6 h-6 text-slate-600 cursor-pointer 
                            ${tab==='2'? 'bg-green-500 rounded-lg': ''}`}
                            onClick={() => window.location.replace(`/providers/${idProv}/invoiceHistory`)} />
                      </Tooltip>
                    {/* </Link> */}
                    {/* <Link href={`/providers/${idProv}/advances`}> */}
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Anticipos'>
                        <CurrencyDollarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='3'? 'bg-green-500 rounded-lg': ''}`}
                          onClick={() => window.location.replace(`/providers/${idProv}/advances`)} />
                      </Tooltip>
                    {/* </Link> */}
                    {/* <Link href={`/providers/${idProv}/payments`}> */}
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Pagos'>
                        <CreditCardIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='4'? 'bg-green-500 rounded-lg': ''}`}
                          onClick={() => window.location.replace(`/providers/${idProv}/payments`)} />
                      </Tooltip>
                    {/* </Link> */}
                  </div>                             
    // setTabProv(icon)
  }else{
    // setTabProv(
    tabProv = (
      <div className="flex mt-5 py-1 border-b border-blue-300">
        {/* <Link href={`/providers/${idProv}/profile`}> */}
          <div className={`w-50 px-5 cursor-pointer ${tab==='1'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/profile`)}>
            <p className="text-blue-600">Perfil proveedor</p>
          </div>
        {/* </Link> */}
        {/* <Link href={`/providers/${idProv}/invoiceHistory`}> */}
          <div className={`w-50 px-5 cursor-pointer ${tab==='2'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/invoiceHistory`)}>
            <p className="text-blue-600">Historial de facturas</p>
          </div>
        {/* </Link> */}
        {/* <Link href={`/providers/${idProv}/advances`}> */}
          <div className={`w-50 px-5 cursor-pointer ${tab==='3'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/advances`)}>
            <p className="text-blue-600">Anticipos</p>
          </div>
        {/* </Link> */}
        {/* <Link href={`/providers/${idProv}/payments`}> */}
          <div className={`w-50 px-5 cursor-pointer ${tab==='4'? 'border-b-4 border-blue-600':''}`}
              onClick={() => window.location.replace(`/providers/${idProv}/payments`)}>
            <p className="text-blue-600">Pagos</p>
          </div>
        {/* </Link> */}
      </div>
    )
  }
  
  return(
    <>
      {tabProv}
    </>
  )
}