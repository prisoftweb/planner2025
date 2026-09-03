'use client'
import NavTab from "./NavTab";

export default function RolesClient({token, children, option}: 
  {token:string, children:JSX.Element, option:number}){

  return(
    <>
      <div className="md:hidden ">
        <NavTab option={option} />
      </div>
      <div className="w-full pl-2 md:pl-10 pt-2 sm:pt-3 md:pt-5 pr-2 sm:pr-3 md:pr-5 lg:pr-10">
        <div className="flex mt-5 gap-x-3">
          <div className="hidden md:block">
            <NavTab option={option} />
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}