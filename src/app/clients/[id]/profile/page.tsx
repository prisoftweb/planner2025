import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { ClientBack } from "@/interfaces/Clients";
import { getClient, getClients } from "@/app/api/routeClients";
import { getTags } from "@/app/api/routeClients";
import { Options } from "@/interfaces/Common";
import { Tag } from "@/interfaces/Clients";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import ClientCli from "@/components/clients/Clientcli";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTab from "@/components/clients/NavTab";
import HeaderImage from "@/components/HeaderImage";
import WithOut from "@/components/WithOut";
import { Resource2 } from "@/interfaces/Roles";

export default async function Page({ params }: { params: { id: string }}){
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

  const clientCookie = cookieStore.get('clients')?.value;
  let permisionsClient: Resource2 | undefined;
  if(clientCookie){
    permisionsClient = JSON.parse(clientCookie);
  }

  if(!permisionsClient){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <WithOut img="/img/clientes.svg" subtitle="Clientes" 
            text="Lo sentimos pero no tienes autorizacion para visualizar esta pagina!!!" 
            title="Clientes"><></></WithOut>
        </div>
      </>
    )
  }

  let clients: ClientBack[];
  try {
    clients = await getClients(token);
    if(typeof(clients) === "string")
      return (
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{clients}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los clientes!!</h1>
      </>
    )  
  }

  let options: Options[] = [];

  if(clients.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener clientes...</h1>
      </>
    )
  }

  let tags = [];
  try {
    tags = await getTags(token);
    if(typeof(tags)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{tags}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener etiquetas!!</h1>
      </>
    )
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
    return (
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-2xl text-center">Error al obtener etiquetas!!</h1>
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
        <HeaderImage image={client.logo? client.logo: '/img/clients.svg'} 
              previousPage="/clients" title={client.name}>
          {permisionsClient.permission.searchfull? (
            <Selectize options={options} routePage="clients" subpath="/profile" />
          ): <></>}
        </HeaderImage>
        <NavTab idCli={params.id} tab='1' />
        <NextUiProviders>
          <ClientCli client={client} token={token} id={params.id} tags={arrTags} clientPermissions={permisionsClient} />
        </NextUiProviders>
      </div>
    </>
  )
}