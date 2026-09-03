'use client'
import { TbArrowNarrowLeft } from "react-icons/tb";
import Image from "next/image";
import TooltipContainerIcon from "./tooltipIcons/TooltipContainerIcon";

export default function HeaderImage({children, title, previousPage, image}: 
  {children:JSX.Element, title:string, previousPage:string, image:string}){

  return(
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <TooltipContainerIcon label="Regresar">
            <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer hover:bg-blue-100" onClick={() => window.location.replace(previousPage)}>
              <TbArrowNarrowLeft className="w-10 h-10 text-slate-600 cursor-pointer" 
              />
            </div>
          </TooltipContainerIcon>
          <Image 
              src={image}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full mx-3"
            />
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {children}
      </div>
    </>
  )
}