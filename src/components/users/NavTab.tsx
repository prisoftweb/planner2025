'use client'
// import Link from "next/link"
import { UserCircleIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

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

  // if(width < 710){
  //   tabUser = <div className="flex justify-between mt-3">
  //                   <Link href={`/users/${idUser}/profile?opt=1`}>
  //                     <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
  //                       placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Perfil'>
  //                       <UserCircleIcon data-tooltip-target="tooltip-dark"
  //                         className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                         ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
  //                     </Tooltip>
  //                   </Link>  
  //                   <Link href={`/users/${idUser}/costs`}>
  //                     <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
  //                       placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Costos'>
  //                       <CurrencyDollarIcon
  //                         className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                         ${tab==='2'? 'bg-green-500 rounded-lg': ''}`} />
  //                     </Tooltip>
  //                   </Link>
  //                   <Link href={`/users/${idUser}/statistics`}>
  //                     <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
  //                       placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Estadisticas'>
  //                       <QuestionMarkCircleIcon
  //                         className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                         ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
  //                     </Tooltip>
  //                   </Link>
  //                   <Link href={`/users/${idUser}/logs`}>
  //                     <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
  //                       placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Logs'>
  //                       <QuestionMarkCircleIcon
  //                         className={`w-6 h-6 text-slate-600 cursor-pointer 
  //                         ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
  //                     </Tooltip>
  //                   </Link>
  //                 </div>                             
  // }else{
  //   tabUser=(
  //     <div className="flex mt-5 py-1 border-b border-blue-300">
  //       <Link href={`/users/${idUser}/profile?opt=1`}>
  //         <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
  //           <p className="text-blue-600">Perfil</p>
  //         </div>
  //       </Link>
  //       <Link href={`/users/${idUser}/costs`}>
  //         <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
  //           <p className="text-blue-600">Costos</p>
  //         </div>
  //       </Link>
  //       <Link href={`/users/${idUser}/statistics`}>
  //         <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
  //           <p className="text-blue-600">Estadisticas</p>
  //         </div>
  //       </Link>
  //       <Link href={`/users/${idUser}/logs`}>
  //         <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
  //           <p className="text-blue-600">Logs</p>
  //         </div>
  //       </Link>
  //     </div>
  //   )
  // }

  if(width < 710){
    tabUser = <div className="flex justify-between mt-3">
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Perfil'>
                      <UserCircleIcon data-tooltip-target="tooltip-dark"
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===1? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => handleTab(1) } />
                    </Tooltip>  
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Cambiar foto'>
                      <CurrencyDollarIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===2? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => handleTab(2)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Cambiar contrasena'>
                      <QuestionMarkCircleIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===3? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => handleTab(3)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Logs'>
                      <QuestionMarkCircleIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===4? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => handleTab(4)} />
                    </Tooltip>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Configuracion'>
                      <QuestionMarkCircleIcon
                        className={`w-6 h-6 text-slate-600 cursor-pointer 
                        ${tab===5? 'bg-green-500 rounded-lg': ''}`}
                        onClick={() => handleTab(5)} />
                    </Tooltip>
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
          <p className="text-blue-600" onClick={() => handleTab(3)}>Cambiar contrasena</p>
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