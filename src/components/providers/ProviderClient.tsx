'use client'

import ProfileProvider from "./ProfileProvider"
import Sumary from "./Sumary"
import DataBasic from "./DataBasic"
import CreditLine from "./CreditLine"
import Contacts from "./Contacts"
import { useState, useEffect } from "react"

export default function ProviderClient({email, name, photo, token}: 
                            {email:string, name:string, photo:string, token:string}){
  
  const [view, setView] = useState<JSX.Element>
                (<Sumary />)

  const [opt, setOpt] = useState<number>(1);

  useEffect(() => {
    opt===2? setView(<DataBasic />) : 
      (opt===3? setView(<CreditLine />): 
        (opt===4? setView(<Contacts />): 
          setView(<Sumary />) ))
  }, [opt])
  
  return(
    <>
      <div className="flex px-5 bg-white mt-2">
        <div className="w-1/3 md:w-1/2 mt-5">
          <ProfileProvider email={email} name={name} photo={photo} setOption={setOpt} />
        </div>
        <div className="w-full">
          {view}
        </div>
      </div>
    </>
  )
}