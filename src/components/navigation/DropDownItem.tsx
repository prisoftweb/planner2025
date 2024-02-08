'use client'

import { NavItem } from "@/interfaces/NavItem"

export default function DropDownItem({items}:{items:NavItem[]}){
  return(
    <>
      <div className="md:absolute w-full md:w-60 md:border border-slate-500">
        {items.map((item:any, index:number) => (
          <div
            key={index} 
            className="p-2 border-b cursor-pointer bg-blue-900 md:bg-blue-950 
              border-slate-600 hover:bg-blue-700"
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  )
}