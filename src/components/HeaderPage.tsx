'use client'
import { TbArrowNarrowLeft } from "react-icons/tb";
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

export default function Header({children, title, previousPage}: 
  {children:JSX.Element, title:string, previousPage:string}){
  
  return(
    <>
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex items-center">
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer hover:bg-blue-100" onClick={() => window.location.replace(previousPage)}>
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Tooltip>
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {children}
      </div>
    </>
  )
}