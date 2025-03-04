'use client'
import { TbArrowNarrowLeft } from "react-icons/tb";

export default function Header({children, title, previousPage}: 
                    {children:JSX.Element, title:string, previousPage:string}){
  return(
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer" onClick={() => window.location.replace(previousPage)}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" 
            />
          </div>
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {children}
      </div>
    </>
  )
}