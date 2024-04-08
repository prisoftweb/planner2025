'use client'
import NavTab from "./NavTab";

export default function RolesClient({token, children, option}: 
                            {token:string, children:JSX.Element, option:number}){

  return(
    <>
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        
        <div className="flex mt-5 gap-x-3">
          <NavTab option={option} />
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}