import { useState } from "react";
import {Tooltip} from "@nextui-org/react";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md"; //Roles
import { GrResources } from "react-icons/gr"; //Recursos
import { TbRoute } from "react-icons/tb"; //Rutas
import { BsWindowStack } from "react-icons/bs"; //Componentes
import { PiTreeDuotone } from "react-icons/pi";
import { propsTooltip } from "@/libs/animations";

export default function NavTab({option}: {option:number}){

  const [isHover, setIsHover] = useState<number>(-1);

  const nav =(<div>
                <div className="bg-white fixed top-12 left-0 p-2 space-y-4 flex flex-col items-center align-top rounded-md h-full shadow-md">
                  <Link href='/roles/role'>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      className="text-blue-500 bg-white rounded-md border border-slate-400" content='Roles'
                      placement="right"
                    >
                      <div className="p-1"  style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
                        <MdAdminPanelSettings className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                          text-slate-500 my-1 bg-white rounded-md" 
                          onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                          style={{ backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''),
                                  color: isHover===1 || option===1 ? 'white' : '',}}
                        />
                      </div>
                    </Tooltip>
                  </Link>
                  <Link href='/roles/resources'>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      className="text-blue-500 bg-white rounded-md border border-slate-400" content='Recursos'
                      placement="right"  
                    >
                      <div className="p-1"  style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
                        <GrResources className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                          text-slate-500 my-1 bg-white rounded-md" 
                          onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                          style={{ backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''),
                                  color: isHover===2 || option===2 ? 'white' : '',}}
                        />
                      </div>
                    </Tooltip>
                  </Link>
                  <Link href='/roles/sub-path'>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      className="text-blue-500 bg-white rounded-md border border-slate-400" content='Rutas'
                      placement="right"
                    >
                      <div className="p-1"  style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
                        <TbRoute className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                          text-slate-500 my-1 bg-white rounded-md" 
                          onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                          style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''),
                              color: isHover===3 || option===3 ? 'white' : '',}}
                        />
                      </div>
                    </Tooltip>
                  </Link>
                  <Link href='/roles/components'>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      className="text-blue-500 bg-white rounded-md border border-slate-400" content='Componentes'
                      placement="right"
                    >
                      <div className="p-1"  style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
                        <BsWindowStack className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                          text-slate-500 my-1 bg-white rounded-md" 
                          onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(-1)}
                          style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''),
                            color: isHover===4 || option===4 ? 'white' : '',}}  
                        />
                      </div>
                    </Tooltip>
                  </Link>
                  <Link href='/roles/trees'>
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      className="text-blue-500 bg-white rounded-md border border-slate-400" content='Arboles'
                      placement="right"
                    >
                      <div className="p-1"  style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': '')}}>
                        <PiTreeDuotone className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                          text-slate-500 my-1 bg-white rounded-md" 
                          onMouseEnter={() => setIsHover(5)} onMouseLeave={() => setIsHover(-1)}
                          style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
                                  color: isHover===5 || option===5 ? 'white' : '',}}
                        />
                      </div>
                    </Tooltip>
                  </Link>
                </div>
              </div>);

  const navResponsive=(
    <div className="grid grid-cols-5 mt-3 border-t pt-2 gap-y-2">
      <Link href='/roles/role' className="flex flex-col items-center" >
        <MdAdminPanelSettings
          className={`w-6 h-6 cursor-pointer ${option===1 ? 'text-green-500' : 'text-slate-500'}`}
        />
        <span className="text-xs">Roles</span>
      </Link >

      <Link  href='/roles/resources' className="flex flex-col items-center">
        <GrResources
          className={`w-6 h-6 cursor-pointer ${option===2 ? 'text-green-500' : 'text-slate-500'}`}
        />
        <span className="text-xs">Recursos</span>
      </Link >

      <Link href='/roles/sub-path' className="flex flex-col items-center">
        <TbRoute
          className={`w-6 h-6 cursor-pointer ${option===3 ? 'text-green-500' : 'text-slate-500'}`}
        />
        <span className="text-xs">Rutas</span>
      </Link >

      <Link href='/roles/components' className="flex flex-col items-center">
        <BsWindowStack
          className={`w-6 h-6 cursor-pointer ${option===4 ? 'text-green-500' : 'text-slate-500'}`}
        />
        <span className="text-xs">Componentes</span>
      </Link >

      <Link href='/roles/trees' className="flex flex-col items-center">
        <PiTreeDuotone
          className={`w-6 h-6 cursor-pointer ${option===5 ? 'text-green-500' : 'text-slate-500'}`}
        />
        <span className="text-xs">Arboles</span>
      </Link >

    </div>
  )

  return(
    <>
      <div className="hidden md:block">
        {nav}
      </div>
      <div className="md:hidden">
        {navResponsive}
      </div>
    </>
  )
}