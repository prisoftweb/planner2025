'use client'
import NavTab from "./NavTab";

export default function RolesClient({token, children}: {token:string, children:JSX.Element}){

  return(
    <>
      <div className="flex mt-5">
        <NavTab />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          {children}
        </div>
      </div>
    </>
  )
}