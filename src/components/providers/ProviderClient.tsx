'use client'

import ProfileProvider from "./ProfileProvider"
import Sumary from "./Sumary"
import DataBasic from "./DataBasic"
import CreditLine from "./CreditLine"
import Contacts from "./Contacts"
import { useState, useEffect } from "react"
import { Provider } from "@/interfaces/Providers"
//import { Contact } from "@/interfaces/Contacts"
//import { getContact, getContacts } from "@/app/api/routeContacts"

export default function ProviderClient({provider, token, id}: 
                            {provider:Provider, token:string, id:string}){
  
  const [view, setView] = useState<JSX.Element>
                (<div className="w-full p-2 md:w-1/2"><Sumary provider={provider} /></div>)

  const [opt, setOpt] = useState<number>(1);
  //const [arrContacts, setArrContacts] = useState<Contact[]>([]);
  
  useEffect(() => {
    opt===2? setView(<div className="w-full p-1 md:max-w-md"><DataBasic id={id} provider={provider} token={token} /></div>) : 
      (opt===3? setView(<div className="w-full p-1 md:max-w-md"><CreditLine provider={provider} id={id} token={token} /></div>): 
        (opt===4? setView(<div className="w-full p-1 md:max-w-md lg:max-w-xl"><Contacts id={id} contacts={provider.contact || []} token={token} /></div>): 
          setView(<div className="w-full md:w-1/2 xl:w-1/2"><Sumary provider={provider} /></div>) ))
  }, [opt, ])
  
  return(
    <>
      <div className="flex px-1 bg-white mt-2 flex-wrap">
        <div className="w-full p-2 max-w-xs">
          <ProfileProvider option={opt} provider={provider} setOption={setOpt} />
        </div>
        {view}
      </div>
    </>
  )
}