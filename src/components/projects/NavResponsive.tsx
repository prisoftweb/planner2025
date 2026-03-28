import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";

import { LuConstruction } from "react-icons/lu";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import {FcAdvance} from "react-icons/fc"
import {ChartBarIcon} from "@heroicons/react/24/solid";
import { FaMoneyBill } from "react-icons/fa6";
import { propsTooltip } from "@/libs/animations";

export default function NavResponsive({open, setOpen, option, changeOption}: 
  {open:boolean, setOpen:Function, option:number, changeOption:Function}){

  const [isHover, setIsHover] = useState<number>(-1);
  
  let nav = <></>;
  if(!open){
    nav = (
      <div className="bg-white left-4 p-2 space-y-4 flex flex-col items-center rounded-md h-full shadow-md">
        <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md rotate-90" 
            onClick={() => setOpen(true)} /></div>
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Dashboard' 
          className="text-blue-500 bg-white rounded-md border border-slate-400" placement="right">
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
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informacion basica' 
          className="text-blue-500 bg-white rounded-md border border-slate-400" placement="right">
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
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informacion extra' 
          className="text-blue-500 bg-white rounded-md border border-slate-400" placement="right">
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
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Direccion' 
          className="text-blue-500 bg-white rounded-md border border-slate-400" placement="right">
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
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Garantia' 
          className="text-blue-500 bg-white rounded-md border border-slate-400" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': '')}}>
              <FaRegCreditCard className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md ${option===5? 'bg-blue-500': ''}`} onClick={() => changeOption(5)} 
                onMouseEnter={() => {setIsHover(5)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
                  color: isHover===5 || option===5 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Avance' 
          className="text-blue-500 bg-white rounded-md border border-slate-400" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': '')}}>
              <FcAdvance className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md ${option===6? 'bg-blue-500': ''}`} onClick={() => changeOption(6)} 
                onMouseEnter={() => {setIsHover(6)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': ''), 
                  color: isHover===6 || option===6 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Fechas garantia' 
          className="text-blue-500 bg-white rounded-md border border-slate-400" placement="right">
            <div className="p-1" style={{backgroundColor: isHover===7 ? '#0075c9' : (option===7? '#178DE1': '')}}>
              <FaMoneyBill className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md ${option===7? 'bg-blue-500': ''}`} onClick={() => changeOption(7)} 
                onMouseEnter={() => {setIsHover(7)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===7 ? '#0075c9' : (option===7? '#178DE1': ''), 
                  color: isHover===7 || option===7 ? 'white' : '',}}
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
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center ${option===7? 'bg-slate-200': ''}`}
          onClick={() => changeOption(7)}
        >
          <FaMoneyBill className="w-4 h-4 mr-2 text-slate-500" />
          Fechas de garantia
        </div>
      </div>
    )
  }

  const tabCli = <div className="grid grid-cols-4 sm:grid-cols-8 mt-3 border-t pt-2">
              <div  className="flex flex-col items-center"
                onClick={() => changeOption(1)}
              >
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Dashboard'>
                  <ChartBarIcon 
                    className={`w-6 h-6 cursor-pointer ${option===1 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                </Tooltip>
                {/* <span className="text-xs">Resumen</span> */}
              </div>

              <div  className="flex flex-col items-center"
                onClick={() => changeOption(2)}
              >
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Datos basicos'>
                  <LuConstruction
                    className={`w-6 h-6 cursor-pointer ${option===2 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                </Tooltip>
                {/* <span className="text-xs">Modificar</span> */}
              </div>

              <div className="flex flex-col items-center"
                onClick={() => changeOption(3)}
              >
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Datos extras'>
                  <AiOutlineFundProjectionScreen
                    className={`w-6 h-6 cursor-pointer ${option===3 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                </Tooltip>
                {/* <span className="text-xs">Formatos</span> */}
              </div>

              <div className="flex flex-col items-center"
                onClick={() => changeOption(4)}
              >
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Direccion'>
                  <MdOutlineEditLocationAlt
                    className={`w-6 h-6 cursor-pointer ${option===4 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                </Tooltip>
                {/* <span className="text-xs">Facturas</span> */}
              </div>

              <div className="flex flex-col items-center"
                onClick={() => changeOption(5)}
              >
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Garantia'>
                  <FaRegCreditCard
                    className={`w-6 h-6 cursor-pointer ${option===5 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                </Tooltip>
                {/* <span className="text-xs">Facturas</span> */}
              </div>

              <div className="flex flex-col items-center"
                onClick={() => changeOption(6)}
              >
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Avance'>
                  <FcAdvance
                    className={`w-6 h-6 cursor-pointer ${option===6 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                </Tooltip>
                {/* <span className="text-xs">Facturas</span> */}
              </div>

              <div className="flex flex-col items-center"
                onClick={() => changeOption(7)}
              >
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                      placement="bottom" className="bg-white text-blue-500 rounded-md border border-slate-400" content='Fechas de garantia'>
                  <FaMoneyBill
                    className={`w-6 h-6 cursor-pointer ${option===7 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                </Tooltip>
                {/* <span className="text-xs">Facturas</span> */}
              </div>
            </div>

  return(
    <>
      <div className="hidden lg:block">
        {nav}
      </div>
      <div className=" lg:hidden">
        {tabCli}
      </div>
    </>
  )
}