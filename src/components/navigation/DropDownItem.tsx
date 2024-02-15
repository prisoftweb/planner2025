'use client'

import { NavItem } from "@/interfaces/NavItem"

export default function DropDownItem({items}:{items:NavItem[]}){
  return(
    <>
      <div className="md:absolute w-full md:w-60 md:border border-slate-300">
        {items.map((item:any, index:number) => (
          <div
            key={index} 
            className="p-2 cursor-pointer text-black bg-white 
             hover:bg-gray-200"
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  )
}