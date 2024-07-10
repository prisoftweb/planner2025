import { getClients, getTags } from "../api/routeClients"
import { cookies } from "next/headers";
import WithOut from "@/components/WithOut";
import ButtonNewClient from "@/components/clients/ButtonNewClient";
import Navigation from "@/components/navigation/Navigation";
import { ClientBack, TableClient, Tag } from "@/interfaces/Clients";
import { UsrBack } from "@/interfaces/User";
import Header from "@/components/Header";
//import Header from "@/components/HeaderPage";
import TableClients from "@/components/clients/TableClients";
import { Options } from "@/interfaces/Common";
import { ClientDataToTableClient } from "../functions/ClientFunctions";

export default async function clients(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

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
  
  // let data:TableClient[] = [];
  // clients.map((client:ClientBack) => {
  //   data.push({
  //     'id': client._id,
  //     'name': client.name,
  //     account: client.account,
  //     contacts: client.contact.length,
  //     currentbalance: 0,
  //     rfc: client.rfc,
  //     status: client.status,
  //     logo: client.logo? client.logo: '/img/clients/default.jpg',
  //   })
  // })

  let data:TableClient[] = ClientDataToTableClient(clients);

  return (
    <>
      <Navigation user={user} />
      
      <div className="p-2 sm:p-3 md:p-5 lg:p-10">
        <Header title="Clientes" placeHolder="Buscar cliente.."><ButtonNewClient id={user._id} token={token} tags={arrTags} /></Header>
        <div className="mt-5">
          <TableClients data={data} token={token} />
        </div>
      </div>
    </>
  )
}