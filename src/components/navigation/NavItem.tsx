'use client'

import { useState } from "react"
import DropDownItem from "./DropDownItem"
import { useRouter } from "next/navigation";
import  { NavItem } from "@/interfaces/NavItem";

export default function NavItemComponent({name, items, link}: {name:string, items:NavItem[], link:string}){
  
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const dropDownItem = items.length > 0? <DropDownItem items={items} /> : <></>;

  return(
    <>
      <button type="button" className="text-sm cursor-pointer lg:text-base w-full mr-2" 
        onClick={() => {
          link===''? setIsOpen(!isOpen) : router.push(link);
        }}
        onBlur={() => {setIsOpen(false); console.log('onblur ', isOpen)}}
      >
        <p className="p-2 hover:bg-slate-700 text-center font-semibold">{name}</p>
        {isOpen && dropDownItem}
      </button>
    </>
  )
}