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
                (<div className="w-full p-2 md:w-1/2 border-t-8 lg:border-t-0 lg:border-l-8 
                  pl-2" style={{borderColor:'#F8FAFC'}}>
                    <Sumary provider={provider} token={token} />
                </div>)

  const [opt, setOpt] = useState<number>(1);
  //const [arrContacts, setArrContacts] = useState<Contact[]>([]);
  
  useEffect(() => {
    opt===2? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
                  <DataBasic id={id} provider={provider} token={token} />
                </div>) : 
      (opt===3? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                  style={{borderColor:'#F8FAFC'}}>
                    <CreditLine provider={provider} id={id} token={token} />
                  </div>): 
        (opt===4? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
                      <Contacts id={id} contacts={provider.contact || []} token={token} />
                    </div>): 
          setView(<div className="mt-3 w-full md:w-1/2 xl:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
              <Sumary provider={provider} token={token} />
            </div>) ))
  }, [opt, ])
  
  return(
    <>
      <div className="flex space-x-2 px-1 bg-slate-200 mt-3 flex-wrap">
        <div className="w-full max-w-md lg:max-w-xs ">
          <ProfileProvider option={opt} provider={provider} setOption={setOpt} />
        </div>
        {view}
      </div>
    </>
  )
}