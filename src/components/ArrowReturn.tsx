"use client"
import { TbArrowNarrowLeft } from "react-icons/tb";
import TooltipContainerIcon from "./tooltipIcons/TooltipContainerIcon";

export default function ArrowReturn({link}: {link:string}){
  
  return(
    <>
      <TooltipContainerIcon label="Regresar">
        <div className="p-1 border cursor-pointer border-slate-400 bg-white rounded-md hover:bg-blue-100" onClick={() => window.location.replace(link)}>
          <TbArrowNarrowLeft className="w-10 h-10 text-slate-600 cursor-pointer" />
        </div>
      </TooltipContainerIcon>
    </>
  )
}