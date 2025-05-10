import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";
import { LuConstruction } from "react-icons/lu";

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
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion basica' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
              <LuConstruction className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                    color: isHover===1 || option===1 ? 'white' : '',}}
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
          <LuConstruction className="w-4 h-4 mr-2 text-slate-500" />
          Datos basicos
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