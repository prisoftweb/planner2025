'use client'

import ProfileProvider from "./ProfileProvider"
import Sumary from "./Sumary"
import DataBasic from "./DataBasic"
import CreditLine from "./CreditLine"
import Contacts from "./Contacts"
import { useState, useEffect } from "react"
import { Provider } from "@/interfaces/Providers"
import NavResponsive from "./NavResponsive"

export default function ProviderClient({provider, token, id}: 
                            {provider:Provider, token:string, id:string}){
  
  const [view, setView] = useState<JSX.Element>
                (<div className="w-full p-2 md:w-1/2 border-t-8 lg:border-t-0 lg:border-l-8 
                  pl-2" style={{borderColor:'#F8FAFC'}}>
                    <Sumary provider={provider} token={token} />
                </div>)

  const [opt, setOpt] = useState<number>(1);
  
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

  const [open, setOpen] = useState<boolean>(false);
  
  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileProvider option={opt} provider={provider} setOption={setOpt} />
          </div>
          {view}
        </div>
      </div>
      
      {/* <div className="flex space-x-2 px-1 mt-3 flex-wrap" 
        style={{'backgroundColor': '#F8FAFC'}}>
        <div className="w-full max-w-md lg:max-w-xs ">
          <ProfileProvider option={opt} provider={provider} setOption={setOpt} />
        </div>
        {view}
      </div> */}
    </>
  )
}