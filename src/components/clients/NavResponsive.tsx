import { ArrowDownTrayIcon, ChartBarIcon, 
        AdjustmentsVerticalIcon, TableCellsIcon, 
        UserCircleIcon, GlobeAmericasIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";

export default function NavResponsive({open, setOpen, option, changeOption}: 
                      {open:boolean, setOpen:Function, option:number, changeOption:Function}){
  
  //let Nav: JSX.Element = <></>;

  const [nav, setNav] = useState<JSX.Element>(<div>
                          <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 rotate-90" onClick={() => setOpen(false)} />
                          <ChartBarIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500" onClick={() => changeOption(1)} />
                          <AdjustmentsVerticalIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500" onClick={() => changeOption(2)} />
                          <TableCellsIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500" onClick={() => changeOption(3)} />
                          <GlobeAmericasIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500" onClick={() => changeOption(4)} />
                          <UserCircleIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500" onClick={() => changeOption(5)} />
                        </div>);

  useEffect(() => {
    if(!open){
      setNav (
        <div>
          <div className="rotate-180"><ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 rotate-90 my-4" onClick={() => setOpen(true)} /></div>
          <ChartBarIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 my-4" onClick={() => changeOption(1)} />
          <AdjustmentsVerticalIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 my-4" onClick={() => changeOption(2)} />
          <TableCellsIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 my-4" onClick={() => changeOption(3)} />
          <GlobeAmericasIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 my-4" onClick={() => changeOption(4)} />
          <UserCircleIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 my-4" onClick={() => changeOption(5)} />
        </div>
      )
    }else{
      setNav (
        <div className="w-full">
          <div className="flex justify-end">
            <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 cursor-pointer text-slate-500 rotate-90" onClick={() => setOpen(false)} />
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center mt-3 ${option===1? 'bg-slate-200': ''}`}
            onClick={() => changeOption(1)}
          >
            <ChartBarIcon className="w-4 h-4 mr-2 text-slate-500" />
            Resumen
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center ${option===2? 'bg-slate-200': ''}`}
            onClick={() => changeOption(2)}  
          >
            <AdjustmentsVerticalIcon className="w-4 h-4 mr-2 text-slate-500" />
            Datos basicos
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center ${option===3? 'bg-slate-200': ''}`}
            onClick={() => changeOption(3)}
          >
            <TableCellsIcon className="w-4 h-4 mr-2 text-slate-500" />
            Datos extras
          </div>
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
            flex py-2 items-center ${option===4? 'bg-slate-200': ''}`}
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
  }, [open])
  
  return(
    <>
      {nav}
    </>
  )
}