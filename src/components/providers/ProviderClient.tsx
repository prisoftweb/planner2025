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
import { ICostTOTALPendingPAYGroupByPROVIDER } from "@/interfaces/Providers"
import ShowContactasProv from "./ShowContactsProv"
import BankData from "./BankData"
import ConfigProvider from "./ConfigProvider"

export default function ProviderClient({provider, token, id, costPayment, user, company}: 
  {provider:Provider, token:string, id:string, costPayment:ICostTOTALPendingPAYGroupByPROVIDER, 
    user:string, company:string}){

  const [opt, setOpt] = useState<number>(provider.tradeline?.creditlimit ? 1: 2);
  const {updateOneProviderStore} = useOneProviderStore();

  const [open, setOpen] = useState<boolean>(false);

  console.log('prov => ', provider);

  const view = (
    opt===2? (<div className="w-full h-full flex flex-wrap lg:flex-nowrap gap-x-3">
                <DataBasic id={id} provider={provider} token={token} user={user} />
                <div className="bg-white rounded-lg shadow-md pl-2 px-3 w-full max-w-md">
                  <ShowContactasProv provider={provider} token={token} />
                </div>
              </div>) : 
    (opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
              <CreditLine provider={provider} id={id} token={token} />
            </div>): 
    (opt===4? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
              style={{borderColor:'#F8FAFC'}}>
                <Contacts id={id} contacts={provider.contact || []} token={token} company={company} />
              </div>): 
      (opt===5? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
              style={{borderColor:'#F8FAFC'}}>
                <BankData id={id} provider={provider} token={token} company={company} user={user} />
              </div>): 
        (opt===6? (<>
                    <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                        <ConfigProvider provider={provider} status={provider?.status?? false} token={token} />
                    </div>
                  </>):
                    (<div>
                      {provider.tradeline?.creditlimit ? 
                        <div className="w-full h-full flex flex-wrap lg:flex-nowrap gap-x-3">
                          <Sumary provider={provider} token={token} costPayment={costPayment} />
                          <div className="bg-white rounded-lg shadow-md pl-2 px-3 w-full max-w-md">
                            <ShowContactasProv provider={provider} token={token} />
                          </div>
                        </div>
                        : <div className="w-full h-full flex flex-wrap lg:flex-nowrap gap-x-3">
                            <DataBasic id={id} provider={provider} token={token} user={user} />
                            <div className="bg-white rounded-lg shadow-md pl-2 px-3 w-full max-w-md">
                              <ShowContactasProv provider={provider} token={token} />
                            </div>
                          </div> }
                    </div>) ))))
      
  );

  useEffect(() => {
    updateOneProviderStore(provider);
  }, []);
  
  return(
    <>
      <div className={`md:hidden bg-white`}>
        <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt}
          tradeline={provider.tradeline?.creditlimit ? true: false} />
      </div>
      <div className={`flex`}>
        <div className={`hidden md:block bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt}
              tradeline={provider.tradeline?.creditlimit ? true: false} />
          </div>
        </div>
        <div className="flex w-full md:px-2 flex-wrap lg:flex-nowrap lg:space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full md:max-w-md`}>
            <ProfileProvider costPayment={costPayment} />
          </div>
          <div className="mt-3 w-full">
            {view}
          </div>
        </div>
      </div>
    </>
  )
}