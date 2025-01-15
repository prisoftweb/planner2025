'use client'
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb";

export default function Header({children, title, previousPage}: 
                    {children:JSX.Element, title:string, previousPage:string}){
  return(
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* <Link href={previousPage}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link> */}
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer" onClick={() => window.location.replace(previousPage)}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" 
            />
          </div>
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {/* <ButtonNewProvider id={id} token={token} /> */}
        {children}
      </div>
    </>
  )
}