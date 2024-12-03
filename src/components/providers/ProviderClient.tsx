'use client'

import ProfileProvider from "./ProfileProvider"
import Sumary from "./Sumary"
import DataBasic from "./DataBasic"
import CreditLine from "./CreditLine"
import Contacts from "./Contacts"
import { useState, useEffect } from "react"
import { Provider } from "@/interfaces/Providers"
import NavResponsive from "./NavResponsive"
import { useOneProviderStore } from "@/app/store/providerStore"

export default function ProviderClient({provider, token, id}: 
                            {provider:Provider, token:string, id:string}){

  const [opt, setOpt] = useState<number>(provider.tradeline?.creditlimit ? 1: 2);
  const {updateOneProviderStore} = useOneProviderStore();

  const [open, setOpen] = useState<boolean>(false);

  const view = (
    opt===2? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
          style={{borderColor:'#F8FAFC'}}>
            <DataBasic id={id} provider={provider} token={token} />
          </div>) : 
    (opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
              <CreditLine provider={provider} id={id} token={token} />
            </div>): 
    (opt===4? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
              style={{borderColor:'#F8FAFC'}}>
                <Contacts id={id} contacts={provider.contact || []} token={token} />
              </div>): 
      (<div className="mt-3 w-full md:w-1/2 xl:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
        style={{borderColor:'#F8FAFC'}}>
          {provider.tradeline?.creditlimit ? <Sumary provider={provider} token={token} /> : <DataBasic id={id} provider={provider} token={token} /> }
        </div>) ))
  );

  useEffect(() => {
    updateOneProviderStore(provider);
  }, []);
  
  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt}
              tradeline={provider.tradeline?.creditlimit ? true: false} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileProvider />
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