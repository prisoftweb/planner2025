'use client'

import { useState, useEffect } from "react";
// import { UserCircleIcon } from "@heroicons/react/24/solid"
// import {Tooltip} from "@nextui-org/react";
// import { propsTooltip } from "@/libs/animations";
import { MdOutlineAccountBalance } from "react-icons/md";
// import { VscEditSession } from "react-icons/vsc";
import { BsFiletypePdf } from "react-icons/bs";
import { SlDocs } from "react-icons/sl";
// import { VscEdit } from "react-icons/vsc";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";

export default function NavTab({tab, setTab}: {tab:number, setTab:Function}){

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
    // tabProv = <div className="flex justify-between mt-3 border-b border-blue-300">
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Resumen'>
    //                   <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                     className={`w-6 h-6 cursor-pointer transition-all duration-200
    //                     ${tab===1 
    //                       ? 'text-green-600 bg-green-100 rounded-lg p-1' 
    //                       : 'text-slate-600 hover:text-green-600 hover:bg-slate-200 rounded-lg p-1'
    //                     }`}
    //                     onClick={() => setTab(1)} />
    //                 </Tooltip>
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Modificar'>
    //                   <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                     className={`w-6 h-6 cursor-pointer transition-all duration-200
    //                     ${tab===2 
    //                       ? 'text-green-600 bg-green-100 rounded-lg p-1' 
    //                       : 'text-slate-600 hover:text-green-600 hover:bg-slate-200 rounded-lg p-1'
    //                     }`} 
    //                     onClick={() => setTab(2)} />
    //                 </Tooltip>
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Formatos'>
    //                   <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                     className={`w-6 h-6 cursor-pointer transition-all duration-200
    //                     ${tab===3 
    //                       ? 'text-green-600 bg-green-100 rounded-lg p-1' 
    //                       : 'text-slate-600 hover:text-green-600 hover:bg-slate-200 rounded-lg p-1'
    //                     }`}
    //                     onClick={() => setTab(3)} />
    //                 </Tooltip>
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Facturas'>
    //                   <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                     className={`w-6 h-6 cursor-pointer transition-all duration-200
    //                     ${tab===4 
    //                       ? 'text-green-600 bg-green-100 rounded-lg p-1' 
    //                       : 'text-slate-600 hover:text-green-600 hover:bg-slate-200 rounded-lg p-1'
    //                     }`}
    //                     onClick={() => setTab(4)} />
    //                 </Tooltip>                        
    //               </div>
    tabProv = <div className="grid grid-cols-4 mt-3 border-t pt-2">
              <div className="flex flex-col items-center">
                <MdOutlineAccountBalance 
                  className={`w-6 h-6 cursor-pointer ${tab===1 ? 'text-green-500' : 'text-slate-500'}`}
                  onClick={() => setTab(1)} />
                <span className="text-xs">Resumen</span>
              </div>

              <div className="flex flex-col items-center">
                <PaperAirplaneIcon 
                  className={`w-6 h-6 cursor-pointer ${tab===2 ? 'text-green-500' : 'text-slate-500'}`}
                  onClick={() => setTab(2)} />
                <span className="text-xs">Enviar</span>
              </div>

              <div className="flex flex-col items-center">
                <BsFiletypePdf 
                  className={`w-6 h-6 cursor-pointer ${tab===3 ? 'text-green-500' : 'text-slate-500'}`}
                  onClick={() => setTab(3)} />
                <span className="text-xs">Formatos</span>
              </div>

              <div className="flex flex-col items-center">
                <SlDocs 
                  className={`w-6 h-6 cursor-pointer ${tab===4 ? 'text-green-500' : 'text-slate-500'}`}
                  onClick={() => setTab(4)} />
                <span className="text-xs">Facturas</span>
              </div>
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
          <p className="text-blue-600">Enviar</p>
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