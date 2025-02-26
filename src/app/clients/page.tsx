import { getClients, getTags } from "../api/routeClients"
import { cookies } from "next/headers";
import WithOut from "@/components/WithOut";
import ButtonNewClient from "@/components/clients/ButtonNewClient";
import Navigation from "@/components/navigation/Navigation";
import { TableClient, Tag } from "@/interfaces/Clients";
import { UsrBack } from "@/interfaces/User";
import Header from "@/components/Header";
import TableClients from "@/components/clients/TableClients";
import { Options } from "@/interfaces/Common";
import { ClientDataToTableClient } from "../functions/ClientFunctions";
import { Resource2 } from "@/interfaces/Roles";

export default async function clients(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  const clientCookie = cookieStore.get('clients')?.value;
  let permisionsClient: Resource2 | undefined;
  if(clientCookie){
    permisionsClient = JSON.parse(clientCookie);
  }
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
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

  let tags;
  try {
    tags = await getTags(token);
    if(typeof(tags)==='string'){
      return <h1 className="text-red-500 text-2xl text-center">{tags}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-2xl text-center">Error al obtener etiquetas!!</h1>
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

  let clients;
  try {
    clients = await getClients(token);
    if(typeof(clients)==='string'){
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <WithOut img="/img/clientes.svg" subtitle="Clientes" 
          text={clients} 
          title="Clientes"><></></WithOut>
      </div>
    }
  } catch (error) {
    return <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <WithOut img="/img/clientes.svg" subtitle="Clientes" 
            text="Aqui puedes gestionar tus clientes con toda su informacion relevante" 
            title="Clientes"><ButtonNewClient token={token} id={user._id} tags={tags} /></WithOut>
        </div>
      </>
  }

  // let permission = false;

  // if(!permission){
  //   return (
  //     <>
  //       <Navigation user={user} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10">
  //         <WithOut img="/img/clientes.svg" subtitle="Clientes" 
  //           text="Lo sentimos, no tienes acceso a esta informacion!!!" 
  //           title="Clientes"><></></WithOut>
  //       </div>
  //     </>
  //   )
  // }

  if(!clients || clients.length<= 0){
    return <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <WithOut img="/img/clientes.svg" subtitle="Clientes" 
            text="Aqui puedes gestionar tus clientes con toda su informacion relevante" 
            title="Clientes"><ButtonNewClient token={token} id={user._id} tags={tags} /></WithOut>
        </div>
      </>
  }
  
  let data:TableClient[] = ClientDataToTableClient(clients);

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md:p-5 lg:p-10">
        <Header title="Clientes" placeHolder="Buscar cliente.." >
          {permisionsClient.permission.create? (
            <ButtonNewClient id={user._id} token={token} tags={arrTags} />
          ): (
            <></>
          )}
        </Header>
        <div className="mt-5">
          <TableClients data={data} token={token} deletePermission={permisionsClient.permission.delete}
            selectPermission={permisionsClient.permission.select} />
        </div>
      </div>
    </>
  )
}