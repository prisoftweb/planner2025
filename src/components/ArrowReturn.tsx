"use client"
//import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { TbArrowNarrowLeft } from "react-icons/tb";
import Link from "next/link";

export default function ArrowReturn({link}: {link:string}){
  
  return(
    <>
      {/* <Link href={link}>
        <TbArrowNarrowLeft className="w-9 h-9 text-slate-600 cursor-pointer" />
      </Link> */}
      <div className="p-1 border cursor-pointer border-slate-400 bg-white rounded-md" onClick={() => window.location.replace(link)}>
        <TbArrowNarrowLeft className="w-9 h-9 text-slate-600 cursor-pointer" 
        />
      </div>
    </>
  )
}