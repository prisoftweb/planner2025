'use client'

import Link from "next/link"
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid"
import {Tooltip} from "@nextui-org/react";

export default function NavTab({tab, idRep}: {tab:string, idRep:string}){
  
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

  const [tabProv, setTabProv] = useState<JSX.Element>(<></>);
  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  useEffect(() => {
    if(width < 710){
      const icon = <div className="flex justify-between mt-3">
                      <Link href={`/reports/${idRep}/profile`}>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} 
                          placement="bottom" className="bg-white text-blue-500" content='Informes'>
                          <UserCircleIcon data-tooltip-target="tooltip-dark"
                            className={`w-6 h-6 text-slate-600 cursor-pointer 
                            ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                        </Tooltip>
                      </Link>                        
                    </div>                             
      setTabProv(icon)
    }else{
      setTabProv(
        <div className="flex mt-5 bg-white py-1">
          <Link href={`/reports/${idRep}/profile`}>
            <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
              <p>Informes</p>
            </div>
          </Link>
        </div>
      )
    }
  }, [width, tab])
  
  return(
    <>
      {tabProv}
    </>
  )
}