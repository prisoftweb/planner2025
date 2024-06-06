import { ArrowDownTrayIcon} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import {Tooltip} from "@nextui-org/react";

import { PiPresentationChartLight } from "react-icons/pi";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";

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

  const [nav, setNav] = useState<JSX.Element>();

  useEffect(() => {
  if(!open){
    setNav (
      <div className="bg-white top-52 space-y-4 left-4 p-2 flex flex-col items-center rounded-md h-full shadow-md">
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Expandir' 
            placement="right" className="text-blue-500 bg-white">
          <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
            text-slate-500 my-1 bg-white rounded-md rotate-90" 
            onClick={() => setOpen(true)} /></div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Resumen' 
            placement="right" className="text-blue-500 bg-white"> 
              <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
                <PiPresentationChartLight 
                  style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                          color: isHover===1 || option===1 ? 'white' : '',}}
                  className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                    ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                    onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                />
                {/* <ChartBarIcon 
                  style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                          color: isHover===1 || option===1 ? 'white' : '',}}
                  className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                    ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                    onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                    
                /> */}
              </div>
          </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion basica' 
          placement="right" className="text-blue-500 bg-white">
            <div className="p-1" style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
              <FaPeopleRoof className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                    ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                    color: isHover===2 || option===2 ? 'white' : '',}}   
              />
              {/* <AdjustmentsVerticalIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                    color: isHover===2 || option===2 ? 'white' : '',}}  
              /> */}
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Linea de credito' 
          placement="right" className="text-blue-500 bg-white">
            <div className="p-1" style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
              <FaMoneyCheckDollar 
                className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}}
              />
              {/* <TableCellsIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}}  
              /> */}
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Contactos' 
          placement="right" className="text-blue-500 bg-white">
            <div className="p-1" style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
              <RiContactsBook3Line 
                className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                      text-slate-500 my-1 bg-white rounded-md ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
                onMouseEnter={() => {setIsHover(4)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                  color: isHover===4 || option===4 ? 'white' : '',}}
              />
              {/* <UserCircleIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                      text-slate-500 my-1 bg-white rounded-md ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
                onMouseEnter={() => {setIsHover(4)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                  color: isHover===4 || option===4 ? 'white' : '',}}
              />   */}
            </div>              
        </Tooltip>
      </div>
    )
  }else{
    setNav (
      <div className="w-full">
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Reducir' 
          placement="right" className="text-blue-500 bg-white">
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
          {/* <ChartBarIcon 
            // className="w-4 h-4 mr-2 text-slate-500" 
            style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                            color: isHover===1 || option===1 ? 'white' : '',}}
              className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
                ${option===1? 'bg-blue-500': ''}`} 
          /> */}
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
          {/* <AdjustmentsVerticalIcon 
            style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                color: isHover===2 || option===2 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===2? 'bg-blue-500': ''}`} 
          /> */}
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
          {/* <TableCellsIcon 
            style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
              color: isHover===3 || option===3 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===3? 'bg-blue-500': ''}`}
          /> */}
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
          {/* <UserCircleIcon 
            style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
              color: isHover===4 || option===4 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===4? 'bg-blue-500': ''}`}
          /> */}
          Contactos
        </div>
      </div>
    )
    }
  }, [open, option, isHover])

  return(
    <>
      {nav}
    </>
  )
}