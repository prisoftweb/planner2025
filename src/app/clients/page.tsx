import { getClients, getTags } from "../api/routeClients"
import { cookies } from "next/headers";
import WithOut from "@/components/WithOut";
import ButtonNewClient from "@/components/clients/ButtonNewClient";
import Navigation from "@/components/navigation/Navigation";
import { TableClient, Tag } from "@/interfaces/Clients";
import { UsrBack } from "@/interfaces/User";
// import Header from "@/components/Header";
import { ResponsiveHeader } from "@/components/Header";
import TableClients from "@/components/clients/TableClients";
import { Options } from "@/interfaces/Common";
import { ClientDataToTableClient } from "../functions/ClientFunctions";
// import { Resource2 } from "@/interfaces/Roles";
import ComponentError from "@/components/ComponentError";
import { getCompany } from "../api/routeCompany";

export default async function clients(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  // const clientCookie = cookieStore.get('clients')?.value;
  // let permisionsClient: Resource2 | undefined;
  // if(clientCookie){
  //   permisionsClient = JSON.parse(clientCookie);
  // }
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  // if(!permisionsClient){
  //   return(
  //     <>
  //       <Navigation user={user} token={token} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10">
  //         <WithOut img="/img/clientes.svg" subtitle="Clientes" 
  //           text="Lo sentimos pero no tienes autorizacion para visualizar esta pagina!!!" 
  //           title="Clientes"><></></WithOut>
  //       </div>
  //     </>
  //   )
  // }

  // let tags;
  // let clients;
  
  // tags = await getTags(token);
  // clients = await getClients(token);

  const [tags, clients, company]=await Promise.all([
    getTags(token),
    getClients(token),
    getCompany(token, user.profile)
  ]);
  
  if(typeof(tags)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-red-500 text-2xl text-center">{tags}</h1> */}
        <ComponentError page="/clients" message={tags} />
      </>
    )
  }
  
  // console.log('tags => ', tags);
  let arrTags: Options[] = [];
  if(Array.isArray(tags) && tags.length > 0){
    arrTags = tags.map((tag:Tag) => ({
      'label': tag.name,
      'value': tag._id,
    }));
    // console.log('arrTags => ', arrTags);
  }else{
    arrTags = [];
    // return(
    //   <>
    //     <Navigation user={user} token={token} />
    //     <h1 className="text-red-500 text-2xl text-center">Error al obtener etiquetas!!</h1>
    //   </>
    // )
  }
  // if(tags.length > 0){
  //   tags.map((tag:Tag) => {
  //     arrTags.push({
  //       'label': tag.name,
  //       'value': tag._id,
  //     })
  //   });
  //   console.log('arrTags => ', arrTags);
  // }else{
  //   return(
  //     <>
  //       <Navigation user={user} token={token} />
  //       <h1 className="text-red-500 text-2xl text-center">Error al obtener etiquetas!!</h1>
  //     </>
  //   )
  // }

  if(typeof(clients)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-red-500 text-2xl text-center">{clients}</h1> */}
        <ComponentError page="/clients" message={clients} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <WithOut img="/img/clientes.svg" subtitle="Clientes" 
            text={clients} 
            title="Clientes"><></></WithOut>
        </div> */}
      </>
    )
  }

  if(typeof(company)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-red-500 text-2xl text-center">{clients}</h1> */}
        <ComponentError page="/clients" message={company} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <WithOut img="/img/clientes.svg" subtitle="Clientes" 
            text={clients} 
            title="Clientes"><></></WithOut>
        </div> */}
      </>
    )
  }

  // let permission = false;

  // if(!permission){
  //   return (
  //     <>
  //       <Navigation user={user} token={token} />
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
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <WithOut img="/img/clientes.svg" subtitle="Clientes" 
            text="Aqui puedes gestionar tus clientes con toda su informacion relevante" 
            title="Clientes"><ButtonNewClient token={token} id={user._id} tags={arrTags}
                                company={user.profile} /></WithOut>
        </div>
      </>
  }
  
  let data:TableClient[] = ClientDataToTableClient(clients);

  // console.log('server tags => ', arrTags);

  return (
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md:p-5 lg:p-10">
        {/* <ResponsiveHeader title="Clientes" placeHolder="Buscar cliente.." >
          <ButtonNewClient id={user._id} token={token} tags={arrTags} company={user.profile} />
        </ResponsiveHeader> */}
        <div className="mt-5">
          <TableClients data={data} token={token} clientsData={clients} 
            // deletePermission={permisionsClient.permission.delete}
            // selectPermission={permisionsClient.permission.select}
            selectPermission={true}
            deletePermission={true}
            company={company} tags={arrTags} user={user._id}
          />
        </div>
      </div>
    </>
  )
}