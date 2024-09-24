'use client'

import { Provider } from "@/interfaces/Providers"
import Navigation from "../navigation/Navigation"
import { UsrBack } from "@/interfaces/User"
import WithOutProvider from "./WithoutProvider"
import ButtonNewProvider from "./ButtonNewProvider"
import Header from "../Header"
import TableProviders from "./TableProviders"
import { useProviderStore } from "@/app/store/providerStore"
import { useEffect } from "react"
import { TableProvider } from "@/interfaces/Providers"
import { CurrencyFormatter } from "@/app/functions/Globals"

export default function ContainerProvider({providers, user, token}: 
  {providers: Provider[], user:UsrBack, token:string}){

  const {providerStore, updateProviderStore} = useProviderStore();

  useEffect(() => {
    updateProviderStore(providers);
  }, []);
  
  if(providerStore.length <= 0 && (providers.length === 0 || !providers)){
    return (
      <div>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10" style={{backgroundColor:'#F8FAFC'}}>
          <WithOutProvider id={user._id} token={token} />
        </div>
      </div>
    )      
  }

  let data:TableProvider[] = [];
  providerStore.map((prov:Provider) => {
    
    let nc = 0;
    if(prov.contact) nc = prov.contact.length;
    
    const dollar = CurrencyFormatter({
      currency: "MXN",
      value: prov.tradeline.currentbalance || 0
    })

    data.push({
      'id': prov._id,
      'name': prov.name,
      rfc: prov.rfc,
      //currentbalance: prov.tradeline.currentbalance,
      currentbalance: dollar,
      account: prov.account,
      suppliercredit: prov.suppliercredit,
      'contacts': nc,
      tradename: prov.tradename || ' '
    })
  })
  
  return(
    <>
      <Navigation user={user} />
      
      <div className="p-2 sm:p-3 md:p-5 lg:p-10" style={{backgroundColor:'#F8FAFC'}}>
        {/* <HeaderProvider id={id} token={token} /> */}
        <Header title="Proveedores" placeHolder="Buscar proveedor..">
          <ButtonNewProvider id={user._id} token={token} />    
        </Header>
        {/* <WithOutProvider /> */}
        <div className="mt-5">
          <TableProviders data={data} token={token} />
        </div>
      </div>
    </>
  )
}