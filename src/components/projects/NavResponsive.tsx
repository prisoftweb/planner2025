import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";

import { LuConstruction } from "react-icons/lu";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import {FcAdvance} from "react-icons/fc"
import {ChartBarIcon} from "@heroicons/react/24/solid";

export default function NavResponsive({open, setOpen, option, changeOption}: 
  {open:boolean, setOpen:Function, option:number, changeOption:Function}){

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
  
  let nav = <></>;
  if(!open){
    nav = (
      <div className="bg-white left-4 p-2 space-y-4 flex flex-col items-center rounded-md h-full shadow-md">
        <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md rotate-90" 
            onClick={() => setOpen(true)} /></div>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Dashboard' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
              <ChartBarIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                    color: isHover===1 || option===1 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion basica' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
              <LuConstruction className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                    color: isHover===2 || option===2 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion extra' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
              <AiOutlineFundProjectionScreen className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}} 
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Direccion' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
              <MdOutlineEditLocationAlt className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
                onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                  color: isHover===4 || option===4 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Garantia' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': '')}}>
              <FaRegCreditCard className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md ${option===5? 'bg-blue-500': ''}`} onClick={() => changeOption(5)} 
                onMouseEnter={() => {setIsHover(5)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
                  color: isHover===5 || option===5 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Avance' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': '')}}>
              <FcAdvance className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md ${option===6? 'bg-blue-500': ''}`} onClick={() => changeOption(6)} 
                onMouseEnter={() => {setIsHover(6)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': ''), 
                  color: isHover===6 || option===6 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
      </div>
    )
  }else{
    nav = (
      <div className="w-full">
        <div className="flex justify-end border-b border-slate-300">
          <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 pb-2 sm:pb-4 cursor-pointer 
              text-slate-500 rotate-90" onClick={() => setOpen(false)} />
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center border-b border-slate-300 mt-3 ${option===1? 'bg-slate-200': ''}`}
          onClick={() => changeOption(1)}
        >
          <ChartBarIcon className="w-4 h-4 mr-2 text-slate-500" />
          Dashboard
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center border-b border-slate-300 mt-3 ${option===2? 'bg-slate-200': ''}`}
          onClick={() => changeOption(2)}
        >
          <LuConstruction className="w-4 h-4 mr-2 text-slate-500" />
          Datos basicos
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center border-b border-slate-300 ${option===3? 'bg-slate-200': ''}`}
          onClick={() => changeOption(3)}
        >
          <AiOutlineFundProjectionScreen className="w-4 h-4 mr-2 text-slate-500" />
          Datos extras
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center border-b border-slate-300 ${option===4? 'bg-slate-200': ''}`}
          onClick={() => changeOption(4)}
        >
          <MdOutlineEditLocationAlt className="w-4 h-4 mr-2 text-slate-500" />
          Direccion
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center ${option===5? 'bg-slate-200': ''}`}
          onClick={() => changeOption(5)}
        >
          <FaRegCreditCard className="w-4 h-4 mr-2 text-slate-500" />
          Garantia
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center ${option===6? 'bg-slate-200': ''}`}
          onClick={() => changeOption(6)}
        >
          <FcAdvance className="w-4 h-4 mr-2 text-slate-500" />
          Avance
        </div>
      </div>
    )
  }

  return(
    <>
      {nav}
    </>
  )
}