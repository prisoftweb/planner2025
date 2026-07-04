import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { ClientBack } from "@/interfaces/Clients";
import { getClient, getClients, getAllTOTALsProjectsByCLIENT, 
  getAllTOTALAccountReceivablesOnlyByOneClientMINRESUME, 
  getAllTOTALEstimatesPendingByOneClientMINRESUME, getAllTOTALChargedByOneCLIENT } from "@/app/api/routeClients";
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
import ConfigClient from "@/components/clients/ConfigClient";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import ComponentError from "@/components/ComponentError";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const perm=((user.rol?._id?? '') + ('/clients/id%2Fprofile'));
  
  console.log('per => ', perm);

  const [client, clients, tags, totalprj, totalColl, totalPenBil, totalpay, resresource, rescomponents] = await Promise.all([
    getClient(token, params.id),
    getClients(token),
    getTags(token),
    getAllTOTALsProjectsByCLIENT(token, params.id), 
    getAllTOTALAccountReceivablesOnlyByOneClientMINRESUME(token, params.id),
    getAllTOTALEstimatesPendingByOneClientMINRESUME(token, params.id),
    getAllTOTALChargedByOneCLIENT(token, params.id),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'clients', 'id/profile'),
  ]);
 
  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/projects/history/${params.id}`} message={rescomponents} />
      </>
    )
  }

  if(typeof(client) === "string")
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/" message={client} />
        {/* <h1 className="text-center text-red-500">{client} client</h1> */}
      </>
  )

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  // const clientCookie = cookieStore.get('clients')?.value;
  // let permisionsClient: Resource2 | undefined;
  // if(clientCookie){
  //   permisionsClient = JSON.parse(clientCookie);
  // }

  // if(!permisionsClient){
  //   return(
  //     <>
  //       <Navigation user={user} token={token} resources={resresource} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10">
  //         <WithOut img="/img/clientes.svg" subtitle="Clientes" 
  //           text="Lo sentimos pero no tienes autorizacion para visualizar esta pagina!!!" 
  //           title="Clientes"><></></WithOut>
  //       </div>
  //     </>
  //   )
  // }

  if(typeof(clients) === "string")
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{clients} clients</h1> */}
        <ComponentError page="/" message={clients} />
      </>
    )

  let options: Options[] = [];

  if(clients.length <= 0){
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">Error al obtener clientes...</h1> */}
        <ComponentError page="/" message={'Error al obtener clientes...'} />
      </>
    )
  }

  if(typeof(tags)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{tags} tags</h1> */}
        <ComponentError page="/" message={tags} />
      </>
    )
  }

  if(typeof(totalprj)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{totalprj} proyecto</h1> */}
        <ComponentError page="/" message={totalprj} />
      </>
    )
  }

  if(typeof(totalPenBil)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{totalPenBil} fact</h1> */}
        <ComponentError page="/" message={totalPenBil} />
      </>
    )
  }

  if(typeof(totalpay)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{totalpay}</h1> */}
        <ComponentError page="/" message={totalpay} />
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
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-2xl text-center">Error al obtener etiquetas!!</h1> */}
        <ComponentError page="/" message={'Error al obtener etiquetas!!'} />
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
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderImage image={client.logo? client.logo: '/img/clients.svg'} 
              previousPage="/clients" title={client.name}>
          {/* {permisionsClient.permission.searchfull? (
            <Selectize options={options} routePage="clients" subpath="/profile" />
          ): <></>} */}
          <Selectize options={options} routePage="clients" subpath="/profile" />
        </HeaderImage>
        <NavTab idCli={params.id} tab='1' />
        <NextUiProviders>
          <ClientCli client={client} token={token} id={params.id} tags={arrTags} totalPenBil={totalPenBil}
            totalprj={totalprj} totalColl={totalColl} 
            totalpay={totalpay} company={user.profile} permissions={result} />
        </NextUiProviders>
      </div>
    </>
  )
}