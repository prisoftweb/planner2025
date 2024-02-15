'use client'

import { useState } from "react"
import DropDownItem from "./DropDownItem"

import { NavItem } from "@/interfaces/NavItem";

export default function NavItem({name, items}: {name:string, items:NavItem[]}){
  
  const [isOpen, setIsOpen] = useState(false);
  
  const dropDownItem = items.length > 0? <DropDownItem items={items} /> : <></>;

  return(
    <>
      <div className="text-sm cursor-pointer lg:text-base w-full mr-2" onClick={() => setIsOpen(!isOpen)}>
        <p className="p-2 hover:bg-slate-700 text-center font-semibold">{name}</p>
        {isOpen && dropDownItem}
      </div>
    </>
  )
}