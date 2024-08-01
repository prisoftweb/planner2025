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
          <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" 
            onClick={() => window.location.replace(previousPage)}
          />
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {/* <ButtonNewProvider id={id} token={token} /> */}
        {children}
      </div>
    </>
  )
}