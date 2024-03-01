'use client'

import ProfileProvider from "./ProfileProvider"
import Sumary from "./Sumary"
import DataBasic from "./DataBasic"
import CreditLine from "./CreditLine"
import Contacts from "./Contacts"
import { useState, useEffect } from "react"
import { Provider } from "@/interfaces/Providers"


export default function ProviderClient({provider, token, id}: 
                            {provider:Provider, token:string, id:string}){
  
  const [view, setView] = useState<JSX.Element>
                (<Sumary provider={provider} />)

  const [opt, setOpt] = useState<number>(1);

  useEffect(() => {
    opt===2? setView(<DataBasic id={id} provider={provider} token={token} />) : 
      (opt===3? setView(<CreditLine provider={provider} id={id} token={token} />): 
        (opt===4? setView(<Contacts id={id} provider={provider} token={token} />): 
          setView(<Sumary provider={provider} />) ))
  }, [opt])
  
  return(
    <>
      <div className="flex px-5 bg-white mt-2">
        <div className="w-1/3 md:w-1/2 mt-5">
          <ProfileProvider provider={provider} setOption={setOpt} />
        </div>
        <div className="w-full">
          {view}
        </div>
      </div>
    </>
  )
}