'use client'

import { NavItem } from "@/interfaces/NavItem"
//import Link from "next/link"
import { useRouter } from "next/navigation";

export default function DropDownItem({items}:{items:NavItem[]}){
  
  const router = useRouter();

  return(
    <>
      {/* <div className="md:absolute w-full md:w-60 md:border border-slate-300 z-50">
        {items.map((item, index:number) => (
          <Link key={index} href={item.link} >
            <div
              className="p-2 cursor-pointer text-black bg-white 
              hover:bg-gray-200 z-50"
            >
              <p className=" z-50">{item.name}</p>
            </div>
          </Link>
        ))}
      </div> */}
      <div className="md:absolute w-full md:w-60 md:border border-slate-300 z-50">
        {items.map((item, index:number) => (
          <div
            className="p-2 cursor-pointer text-black bg-white 
            hover:bg-gray-200 z-50"
            onClick={() => router.push(item.link)}
            key={index}
          >
            <p className=" z-50">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}