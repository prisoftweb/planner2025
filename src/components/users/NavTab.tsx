'use client'
import Link from "next/link"
import { UserCircleIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import {Tooltip} from "@nextui-org/react";

export default function NavTab({tab, idUser}: {tab:string, idUser:string}){
  
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
  
  let tabUser: JSX.Element = <></>;
  if(width < 710){
    tabUser = <div className="flex mt-3 gap-x-5 justify-between">
                    <Link href={`/users/${idUser}/profile?opt=1`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Perfil'>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>  
                    <Link href={`/users/${idUser}/costs`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Costos'>
                        <CurrencyDollarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='2'? 'bg-yellow-950 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                    <Link href={`/users/${idUser}/statistics`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Estadisticas'>
                        <QuestionMarkCircleIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                    <Link href={`/users/${idUser}/logs`}>
                      <Tooltip closeDelay={0} delay={100} motionProps={props} 
                        placement="bottom" className="bg-white text-blue-500" content='Logs'>
                        <QuestionMarkCircleIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
                      </Tooltip>
                    </Link>
                  </div>                             
  }else{
    tabUser = (
      <div className="flex mt-5 bg-white py-1">
        <Link href={`/users/${idUser}/profile?opt=1`}>
          <div className={`flex justify-around w-40 items-center border border-slate-400 ${tab==='1'? 'bg-green-500 text-white':''}`}>
            <p>Perfil</p>
            <UserCircleIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}/costs`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='2'? 'bg-green-500 text-white':''}`}>
            <p>Costos</p>
            <CurrencyDollarIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}/statistics`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='3'? 'bg-green-500 text-white':''}`}>
            <p>Estadisticas</p>
            <QuestionMarkCircleIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}/logs`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='4'? 'bg-green-500 text-white':''}`}>
            <p>Logs</p>
            <QuestionMarkCircleIcon className="w-8 h-8" />
          </div>
        </Link>
      </div>)
  }

  return(
    <>
      {tabUser}
    </>
  )
}