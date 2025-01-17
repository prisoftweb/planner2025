import { ChartBarIcon, AdjustmentsVerticalIcon, TableCellsIcon, 
  GlobeAmericasIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md"; //Roles
import { GrResources } from "react-icons/gr"; //Recursos
import { TbRoute } from "react-icons/tb"; //Rutas
import { BsWindowStack } from "react-icons/bs"; //Componentes
//import { PiTreeViewDuotone } from "react-icons/pi"; //Arbol
import { PiTreeDuotone } from "react-icons/pi";

export default function NavTab({option}: {option:number}){

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

  const [isHover, setIsHover] = useState<number>(-1);

  const nav =(<div>
                <div className="bg-white fixed top-12 left-0 p-2 space-y-4 flex flex-col items-center align-top rounded-md h-full shadow-md">
                  <Link href='/roles/role'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 bg-white" content='Roles'
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
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 bg-white" content='Recursos'
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
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 bg-white" content='Rutas'
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
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 bg-white" content='Componentes'
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
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 bg-white" content='Arboles'
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

  return(
    <>
      {nav}
    </>
  )
}