'use client'
// import Link from "next/link"
import { UserIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";

export default function NavTab({tab, handleTab}: {tab:number, handleTab: (numTab: number) => void}){

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  let tabUser: JSX.Element = <></>;

  if(width < 710){
    // tabUser = <div className="flex justify-between mt-3">
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Perfil'>
    //                   <UserCircleIcon data-tooltip-target="tooltip-dark"
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===1? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => handleTab(1) } />
    //                 </Tooltip>  
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Cambiar foto'>
    //                   <CurrencyDollarIcon
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===2? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => handleTab(2)} />
    //                 </Tooltip>
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Cambiar contrasena'>
    //                   <QuestionMarkCircleIcon
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===3? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => handleTab(3)} />
    //                 </Tooltip>
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Logs'>
    //                   <QuestionMarkCircleIcon
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===4? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => handleTab(4)} />
    //                 </Tooltip>
    //                 <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
    //                   placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Configuracion'>
    //                   <QuestionMarkCircleIcon
    //                     className={`w-6 h-6 text-slate-600 cursor-pointer 
    //                     ${tab===5? 'bg-green-500 rounded-lg': ''}`}
    //                     onClick={() => handleTab(5)} />
    //                 </Tooltip>
    //               </div>
                
    tabUser=<div className="grid grid-cols-5 mt-3 border-t pt-2 gap-y-2">
              <div onClick={() => handleTab(1) } className="flex flex-col items-center" >
                <UserIcon
                  className={`w-6 h-6 cursor-pointer ${tab===1 ? 'text-green-500' : 'text-slate-500'}`}
                />
                <span className="text-xs">Perfil</span>
              </div >

              <div  onClick={() => handleTab(2) } className="flex flex-col items-center">
                <MdOutlinePhotoLibrary
                  className={`w-6 h-6 cursor-pointer ${tab===2 ? 'text-green-500' : 'text-slate-500'}`}
                />
                <span className="text-xs">Cambiar foto</span>
              </div >

              <div onClick={() => handleTab(3) } className="flex flex-col items-center">
                <TbPasswordUser
                  className={`w-6 h-6 cursor-pointer ${tab===3 ? 'text-green-500' : 'text-slate-500'}`}
                />
                <span className="text-xs text-center">Cambiar contraseña</span>
              </div >

              <div onClick={() => handleTab(4) } className="flex flex-col items-center">
                <QuestionMarkCircleIcon
                  className={`w-6 h-6 cursor-pointer ${tab===4 ? 'text-green-500' : 'text-slate-500'}`}
                />
                <span className="text-xs">Logs</span>
              </div >

              <div onClick={() => handleTab(5) } className="flex flex-col items-center">
                <FaUserCog
                  className={`w-6 h-6 cursor-pointer ${tab===5 ? 'text-green-500' : 'text-slate-500'}`}
                />
                <span className="text-xs">Configuracion</span>
              </div >

            </div>
  }else{
    tabUser=(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        <div className={`w-50 px-5 cursor-pointer ${tab===1? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600" onClick={() => handleTab(1)}>Perfil</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===2? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600" onClick={() => handleTab(2)}>Cambiar foto</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===3? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600" onClick={() => handleTab(3)}>Cambiar contraseña</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===4? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600" onClick={() => handleTab(4)}>Logs</p>
        </div>
        <div className={`w-50 px-5 cursor-pointer ${tab===5? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600" onClick={() => handleTab(5)}>Configuracion</p>
        </div>
      </div>
    )
  }

  return(
    <>
      {tabUser}
    </>
  )
}