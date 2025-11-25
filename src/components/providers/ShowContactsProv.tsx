import { ClientBack } from "@/interfaces/Clients"
import CardContact from "./CardContact"
import { Provider } from "@/interfaces/Providers"

export default function ShowContactasProv({provider, token}: 
  {provider:Provider, token:string}) {

  let showContacts: JSX.Element[] =[];
    
  if(provider.contact){
    provider.contact.map((contact, index) => {
      showContacts.push(<CardContact token={token} contact={contact} key={index} idProv={provider._id} />)
    })
  }

  return (
    <div className="mt-0 w-full max-w-md bg-white rounded-lg pl-2 px-3">
      {/* <h1 className="text-2xl text-slate-600 font-semibold">Resumen de cliente</h1>
      <p className="text-slate-400 text-sm">Proyectos, extras y estimaciones</p> */}
      <div className="flex flex-wrap gap-x-3 mt-3 gap-y-2">
        {showContacts}
      </div>
    </div>
  )
}
