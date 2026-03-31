import Navigation from "@/components/navigation/Navigation"
import ArrowReturn from "@/components/ArrowReturn"
import Selectize from "@/components/Selectize"
import NavTab from "@/components/clients/NavTab"
import { cookies } from "next/headers"
import { UsrBack } from "@/interfaces/User"
import { getClient, getClients, getAllTOTALPENDINGPaymentsOFClientANDBYProjectMIN } from "@/app/api/routeClients"
import { ClientBack } from "@/interfaces/Clients"
import { Options } from "@/interfaces/Common"
import ClientCollectionCli from "@/components/clients/ClientCollectionCLi"

export default async function Wallet({ params }: { params: { id: string }}){

  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [client, clients, pendindInvoices] = await Promise.all([
    getClient(token, params.id),
    getClients(token),
    // getAllTOTALPENDINGPaymentsByCLIENTMIN(token, params.id)
    getAllTOTALPENDINGPaymentsOFClientANDBYProjectMIN(token, params.id)
  ]);
  
  if(typeof(client) === "string"){
    return (
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{client}</h1>
      </>
    )
  }

  let options: Options[] = [];

  if(typeof(clients) === "string"){
    return (
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{clients}</h1>
      </>
    )
  }
   
  if(typeof(pendindInvoices) === "string"){
    return (
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{pendindInvoices}</h1>
      </>
    )
  }

  if(clients.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los clientes!!</h1>
      </>
    )
  }

  clients.map((cli: ClientBack) => {
    options.push({
      value: cli._id,
      label: cli.name,
    })
  })
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/clients" />
            <img src={client.logo? client.logo: '/img/clients.svg'} 
                      alt="logo cliente" className="w-12 h-12" />
            <p className="text-slate-500 mx-3">{client.name}</p>
          </div>
          <Selectize options={options} routePage="clients" subpath="/wallet" />
        </div>
        <NavTab idCli={params.id} tab='4' />
        <div className="mt-5">
          <ClientCollectionCli collections={pendindInvoices} rfc={client?.rfc?? 'sin rfc'} client={client?.name?? 'cliente'} />
        </div>
      </div>
    </>
  )
}