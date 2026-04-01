import { ArrowDownTrayIcon} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import {Tooltip} from "@nextui-org/react";

import { PiPresentationChartLight } from "react-icons/pi";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { propsTooltip } from "@/libs/animations";

export default function NavResponsive({open, setOpen, option, changeOption, tradeline}: 
  {open:boolean, setOpen:Function, option:number, changeOption:Function, tradeline: boolean}){

  const [isHover, setIsHover] = useState<number>(-1);

  let nav = <></>;

  if(!open){
    nav = (
      <div className="bg-white top-52 space-y-4 left-4 p-2 flex flex-col items-center rounded-md h-full shadow-md">
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Expandir' 
            placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
          <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
            text-slate-500 my-1 bg-white rounded-md rotate-90" 
            onClick={() => setOpen(true)} /></div>
        </Tooltip>
        {tradeline && (
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Resumen' 
            placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400"> 
              <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
                <PiPresentationChartLight 
                  style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                          color: isHover===1 || option===1 ? 'white' : '',}}
                  className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                    ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                    onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                />
              </div>
          </Tooltip>
        )}
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informacion basica' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="p-1" style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
              <FaPeopleRoof className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                    ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                    color: isHover===2 || option===2 ? 'white' : '',}}   
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Linea de credito' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="p-1" style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
              <FaMoneyCheckDollar 
                className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Contactos' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="p-1" style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
              <RiContactsBook3Line 
                className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                      text-slate-500 my-1 bg-white rounded-md ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
                onMouseEnter={() => {setIsHover(4)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                  color: isHover===4 || option===4 ? 'white' : '',}}
              />
            </div>              
        </Tooltip>
      </div>
    )
  }else{
    nav = (
      <div className="w-full">
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Reducir' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="flex justify-end border-b border-slate-300 pr-2">
              <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 pb-2 sm:pb-4 cursor-pointer 
                  text-slate-500 rotate-90" onClick={() => setOpen(false)} />
            </div>
        </Tooltip>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 mt-3 ${option===1? 'bg-slate-200': ''}`}
          onClick={() => changeOption(1)}
        >
          <PiPresentationChartLight 
            style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                        color: isHover===1 || option===1 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md mr-2
                ${option===1? 'bg-blue-500': ''}`}
          />
          Resumen
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 ${option===2? 'bg-slate-200': ''}`}
          onClick={() => changeOption(2)}  
        >
          <FaPeopleRoof 
            style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                color: isHover===2 || option===2 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===2? 'bg-blue-500': ''}`}
          />
          Datos basicos
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 ${option===3? 'bg-slate-200': ''}`}
          onClick={() => changeOption(3)}
        >
          <FaMoneyCheckDollar 
            style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
              color: isHover===3 || option===3 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===3? 'bg-blue-500': ''}`}
          />
          Linea de credito
        </div>        
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center ${option===4? 'bg-slate-200': ''}`}
          onClick={() => changeOption(4)}
        >
          <RiContactsBook3Line 
            style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
              color: isHover===4 || option===4 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===4? 'bg-blue-500': ''}`}
          />
          Contactos
        </div>
      </div>
    )
  }

  const navProv=<div className="grid grid-cols-4 mt-3 border-t pt-2 gap-y-2">
                  <div onClick={() => changeOption(1)} className="flex flex-col items-center" >
                    <PiPresentationChartLight 
                      className={`w-6 h-6 cursor-pointer ${option===1 ? 'text-green-500' : 'text-slate-500'}`}
                    />
                    <span className="text-xs">Resumen</span>
                  </div>

                  <div onClick={() => changeOption(2)} className="flex flex-col items-center">
                    <FaPeopleRoof
                      className={`w-6 h-6 cursor-pointer ${option===2 ? 'text-green-500' : 'text-slate-500'}`}
                    />
                    <span className="text-xs">Datos basicos</span>
                  </div>

                  <div onClick={() => changeOption(3)} className="flex flex-col items-center">
                    <FaMoneyCheckDollar
                      className={`w-6 h-6 cursor-pointer ${option===3 ? 'text-green-500' : 'text-slate-500'}`}
                    />
                    <span className="text-xs">Linea de credito</span>
                  </div>

                  <div onClick={() => changeOption(4)} className="flex flex-col items-center">
                    <RiContactsBook3Line
                      className={`w-6 h-6 cursor-pointer ${option===4 ? 'text-green-500' : 'text-slate-500'}`}
                    />
                    <span className="text-xs">Contactos</span>
                  </div>

                </div>

  return(
    <>
      <div className="hidden md:block">
        {nav}
      </div>
      <div className=" md:hidden">
        {navProv}
      </div>
    </>
  )
}