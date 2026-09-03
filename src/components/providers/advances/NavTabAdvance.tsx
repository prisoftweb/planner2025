'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

export default function NavTabAdvance({tab, idProv}: {tab:string, idProv: string}){

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  let tabCli: JSX.Element;
  if(width < 710){
    tabCli = <div className="flex justify-between mt-3">
                    <Link href={`/providers/${idProv}/advances/profile`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                        placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Perfil'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>  
                  </div>                             
  }else{
    tabCli = (
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <Link href={`/providers/${idProv}/advances/profile`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600">Perfil</p>
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