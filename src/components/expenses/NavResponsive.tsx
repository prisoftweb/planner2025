import { ArrowDownTrayIcon} from "@heroicons/react/24/solid"
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";

//import { PiInvoiceFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXml } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export default function NavResponsive({open, setOpen, option, 
                  changeOption, isticket}: 
                {open:boolean, setOpen:Function, option:number, 
                  changeOption:Function, isticket:boolean}){

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

  let nav;
  if(!open){
    nav = (
      <div className="bg-white left-4 p-2 space-y-4 flex flex-col items-center rounded-md h-full shadow-md">
        <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md rotate-90" 
            onClick={() => setOpen(true)} /></div>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion basica' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
              <FaMoneyCheckDollar className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                    color: isHover===1 || option===1 ? 'white' : '',}}  
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion extra' 
          className="text-blue-500 bg-white" placement="right">
            <div className={`p-1 ${isticket? 'hidden': ''}`} style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
              <FaFileInvoiceDollar className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                  color: isHover===2 || option===2 ? 'white' : '',}}  
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Comprobante' 
          className="text-blue-500 bg-white" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
              <FaFilePdf className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}}  
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='CFDI' 
          className={`text-blue-500 bg-white`} placement="right">
            <div className={`p-1 ${isticket? 'hidden': ''}`} style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
              <BsFiletypeXml className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
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
        <div className="flex justify-end border-b border-slate-300">
          <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 pb-2 sm:pb-4 cursor-pointer 
              text-slate-500 rotate-90" onClick={() => setOpen(false)} />
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center border-b border-slate-300 mt-3 ${option===1? 'bg-slate-200': ''}`}
          onClick={() => changeOption(1)}
        >
          <FaMoneyCheckDollar className="w-4 h-4 mr-2 text-slate-500" />
          Datos basicos
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center border-b border-slate-300 ${option===2? 'bg-slate-200': ''}`}
          onClick={() => changeOption(2)}
        >
          <FaFileInvoiceDollar className="w-4 h-4 mr-2 text-slate-500" />
          Datos extras
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center border-b border-slate-300 ${option===3? 'bg-slate-200': ''}`}
          onClick={() => changeOption(3)}
        >
          <FaFilePdf className="w-4 h-4 mr-2 text-slate-500" />
          Comprobante
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center ${option===4? 'bg-slate-200': ''}`}
          onClick={() => changeOption(4)}
        >
          <BsFiletypeXml className="w-4 h-4 mr-2 text-slate-500" />
          CFDI
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