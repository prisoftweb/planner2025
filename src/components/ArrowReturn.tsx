"use client"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link";

export default function ArrowReturn({link}: {link:string}){
  
  return(
    <>
      <Link href={link}>
        <ArrowLeftIcon className="w-8 h-8 text-slate-500 cursor-pointer" />
      </Link>
    </>
  )
}