'use client'
import { ChartBarIcon, AdjustmentsVerticalIcon } from "@heroicons/react/24/solid"
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
                  <Link href='/departments'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500" content='Departamentos'>
                      <ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                                color: isHover===1 || option===1 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/companies'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500" content='Compañia'>
                      <AdjustmentsVerticalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                                color: isHover===2 || option===2 ? 'white' : '',}}
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