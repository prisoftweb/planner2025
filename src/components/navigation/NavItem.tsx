'use client'

import { useState } from "react"
import DropDownItem from "./DropDownItem"
import  { NavItem } from "@/interfaces/NavItem";
import { useOutsideClickButton } from "@/app/functions/useOutsideClick";

type NavProps={
  name:string, 
  items:NavItem[], 
  link:string
}

export default function NavItemComponent({name, items, link}: NavProps ){
  
  const [isOpen, setIsOpen] = useState(false);
  
  const dropDownItem = items.length > 0? <DropDownItem items={items} /> : <></>;

  const ref = useOutsideClickButton(() => {
    if(isOpen){
      setIsOpen(false);
    }
  });

  return(
    <>
      <button type="button" ref={ref} 
        className="text-sm cursor-pointer lg:text-base w-full mr-2 z-50 print:hidden" 
        onClick={() => {
          link===''? setIsOpen(!isOpen) : window.location.replace(link);
        }}
      >
        <p className="p-2 hover:bg-slate-700 text-center font-semibold print:hidden">{name}</p>
        {isOpen && dropDownItem}
      </button>
    </>
  )
}