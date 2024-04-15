'use client'

import { NavItem } from "@/interfaces/NavItem"
import Link from "next/link"

export default function DropDownItem({items}:{items:NavItem[]}){
  return(
    <>
      <div className="md:absolute w-full md:w-60 md:border border-slate-300">
        {items.map((item, index:number) => (
          <Link key={index} href={item.link} >
            <div
              className="p-2 cursor-pointer text-black bg-white 
              hover:bg-gray-200"
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}