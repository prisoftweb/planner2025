import { ArrowDownTrayIcon, ChartBarIcon, 
        AdjustmentsVerticalIcon, TableCellsIcon, 
        UserCircleIcon, GlobeAmericasIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import {Tooltip} from "@nextui-org/react";


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

  const [nav, setNav] = useState<JSX.Element>(<div>
                          <ArrowDownTrayIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                              text-slate-500 rotate-90 border-b border-slate-200" onClick={() => setOpen(false)} />
                          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Resumen'><ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                              text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(1)} />
                          </Tooltip>
                          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion basica'><AdjustmentsVerticalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                              text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(2)} />
                          </Tooltip>
                          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion extra'><TableCellsIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                              text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(3)} />
                          </Tooltip>
                          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Direccion'><GlobeAmericasIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                              text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(4)} />
                          </Tooltip>
                          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Contactos'><UserCircleIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                              text-slate-500 pb-2 sm:pb-4" onClick={() => changeOption(5)} />
                          </Tooltip>
                        </div>);

  useEffect(() => {
    if(!open){
      setNav (
        <div>
          <div className="rotate-180"><ArrowDownTrayIcon className="w-8 h-8 sm:w-12 sm:h-12 
              cursor-pointer text-slate-500 rotate-90 my-4 pb-2 sm:pb-4 border-l border-slate-300" 
              onClick={() => setOpen(true)} /></div>
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Resumen' className="text-blue-500"><ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer text-slate-500 
              my-4 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(1)} />
          </Tooltip>
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion basica' className="text-blue-500"><AdjustmentsVerticalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
              text-slate-500 my-4 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(2)} />
          </Tooltip>
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informacion extra' className="text-blue-500"><TableCellsIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer text-slate-500 
              my-4 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(3)} />
          </Tooltip>
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Direccion' className="text-blue-500"><GlobeAmericasIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer text-slate-500 
              my-4 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(4)} />
          </Tooltip>
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Contactos' className="text-blue-500"><UserCircleIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer text-slate-500 
              my-4 pb-2 sm:pb-4" onClick={() => changeOption(5)} />
          </Tooltip>
        </div>
      )
    }else{
      setNav (
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
            Resumen
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center border-b border-slate-300 ${option===2? 'bg-slate-200': ''}`}
            onClick={() => changeOption(2)}  
          >
            <AdjustmentsVerticalIcon className="w-4 h-4 mr-2 text-slate-500" />
            Datos basicos
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center border-b border-slate-300 ${option===3? 'bg-slate-200': ''}`}
            onClick={() => changeOption(3)}
          >
            <TableCellsIcon className="w-4 h-4 mr-2 text-slate-500" />
            Datos extras
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center border-b border-slate-300 ${option===4? 'bg-slate-200': ''}`}
            onClick={() => changeOption(4)}
          >
            <GlobeAmericasIcon className="w-4 h-4 mr-2 text-slate-500" />
            Direccion
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center ${option===5? 'bg-slate-200': ''}`}
            onClick={() => changeOption(5)}
          >
            <UserCircleIcon className="w-4 h-4 mr-2 text-slate-500" />
            Contactos
          </div>
        </div>
      )
    }
  }, [open, option])
  
  return(
    <>
      {nav}
    </>
  )
}