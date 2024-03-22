import NavTab from "@/components/clients/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import {getClient, getClients} from "@/app/api/routeClients";
import { UsrBack } from "@/interfaces/User";
import { ClientBack } from "@/interfaces/Clients";
import ArrowReturn from "@/components/ArrowReturn";
import { Options } from "@/interfaces/Common";
import ClientCli from "@/components/clients/Clientcli";
import { getTags } from "@/app/api/routeClients";
import { Tag } from "@/interfaces/Clients";
import { NextUiProviders } from "@/components/NextUIProviderComponent";

export default async function Page({ params, searchParams }: 
                    { params: { id: string }, searchParams: { tab: string } }){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let client: ClientBack;
  try {
    client = await getClient(token, params.id);
    if(typeof(client) === "string")
      return <h1 className="text-center text-red-500">{client}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del cliente!!</h1>  
  }

  let clients: ClientBack[];
  try {
    clients = await getClients(token);
    if(typeof(clients) === "string")
      return <h1 className="text-center text-red-500">{clients}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los clientes!!</h1>  
  }

  let options: Options[] = [];

  if(clients.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener clientes...</h1>
  }

  let tags = [];
  try {
    tags = await getTags(token);
    if(typeof(tags)==='string'){
      return <h1 className="text-center text-red-500">{tags}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al obtener etiquetas!!</h1>
  }

  let arrTags: Options[] = [];
  if(tags.length > 0){
    tags.map((tag:Tag) => {
      arrTags.push({
        'label': tag.name,
        'value': tag._id,
      })
    })
  }else{
    return <h1 className="text-red-500 text-2xl text-center">Error al obtener etiquetas!!</h1>
  }
  
  clients.map((cli: ClientBack) => {
    options.push({
      value: cli._id,
      label: cli.name,
    })
  })

  let res;
  if(searchParams.tab==='2') res=<></>
  else if(searchParams.tab==='3') res=<></>
  else if(searchParams.tab==='4') res=<></>
  else res=<NextUiProviders><ClientCli client={client} token={token} id={params.id} tags={arrTags} /></NextUiProviders>;

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/clients" />
            {/* <IconText text={provider.tradename} size="w-8 h-8" sizeText="" /> */}
            <img src={client.logo? client.logo: '/img/clients.svg'} 
                      alt="logo cliente" className="w-12 h-12" />
            <p className="text-slate-500 mx-3">{client.name}</p>
          </div>
          <Selectize options={options} routePage="clients" />
        </div>
        <NavTab idCli={params.id} tab={searchParams.tab} />
        {res}
      </div>
    </>
  )
}