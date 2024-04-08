import { ChartBarIcon, AdjustmentsVerticalIcon, TableCellsIcon, 
  GlobeAmericasIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";
import Link from "next/link";


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
                <div className="bg-slate-300 p-1">
                  <Link href='/roles/role'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500" content='Roles'>
                      <ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                                color: isHover===1 || option===1 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/roles/resources'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500" content='Recursos'>
                      <AdjustmentsVerticalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                                color: isHover===2 || option===2 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/roles/sub-path'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500" content='Rutas'>
                      <TableCellsIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                                color: isHover===3 || option===3 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/roles/components'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500" content='Componentes'>
                      <GlobeAmericasIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                                color: isHover===4 || option===4 ? 'white' : '',}}  
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/roles/trees'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500" content='Arboles'>
                      <AdjustmentsHorizontalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(5)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
                                color: isHover===5 || option===5 ? 'white' : '',}}
                      />
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