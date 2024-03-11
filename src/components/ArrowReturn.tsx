"use client"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

export default function ArrowReturn({link}: {link:string}){
  const router = useRouter();
  
  const onclick = () => {
    //router.refresh();
    router.push(link);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return(
    <>
      <ArrowLeftIcon className="w-8 h-8 text-slate-500 cursor-pointer" onClick={onclick} />
    </>
  )
}