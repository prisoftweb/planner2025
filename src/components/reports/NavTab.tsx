'use client'

import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";

export default function NavTab({tab, setTab}: {tab:number, setTab:Function}){
  
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
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Resumen'>
                      <UserCircleIcon data-tooltip-target="tooltip-dark"
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===1? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => setTab(1)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Modificar'>
                      <UserCircleIcon data-tooltip-target="tooltip-dark"
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===2? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => setTab(2)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Formatos'>
                      <UserCircleIcon data-tooltip-target="tooltip-dark"
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===3? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => setTab(3)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Facturas'>
                      <UserCircleIcon data-tooltip-target="tooltip-dark"
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===4? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => setTab(4)} />
                    </Tooltip>                        
                  </div>                             
  }else{
    tabProv =(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <div className={`w-50 px-5 cursor-pointer ${tab===1? 'border-b-4 border-blue-600':''}`}
          onClick={() => setTab(1)}
        >
          <p className="text-blue-600">Resumen</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===2? 'border-b-4 border-blue-600':''}`}
          onClick={() => setTab(2)}
        >
          <p className="text-blue-600">Modificar</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===3? 'border-b-4 border-blue-600':''}`}
          onClick={() => setTab(3)}
        >
          <p className="text-blue-600">Formatos</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===4? 'border-b-4 border-blue-600':''}`}
          onClick={() => setTab(4)}
        >
          <p className="text-blue-600">Facturas</p>
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