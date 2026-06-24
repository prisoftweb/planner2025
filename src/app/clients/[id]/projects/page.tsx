import Navigation from "@/components/navigation/Navigation"
import ArrowReturn from "@/components/ArrowReturn"
import Selectize from "@/components/Selectize"
import NavTab from "@/components/clients/NavTab"
import { cookies } from "next/headers"
import { UsrBack } from "@/interfaces/User"
import { getClient, getClients, getProjectsByClient } from "@/app/api/routeClients"
import { ClientBack } from "@/interfaces/Clients"
import { Options } from "@/interfaces/Common"
import TableProjectsClient from "@/components/clients/projects/TableProjectsClient"
import ComponentError from "@/components/ComponentError"
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let client: ClientBack = await getClient(token, params.id);
  // let clients: ClientBack[] = await getClients(token);
  // let projects: ProjectMin[] = await getProjectsByClient(token, params.id);

  const [client, clients, projects, resresource] = await Promise.all([
    getClient(token, params.id),
    getClients(token),
    getProjectsByClient(token, params.id),
    getAllResourcesByROL(token, user.rol?._id?? '')
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(client) === "string")
    return (
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{client}</h1>
        </div> */}
        <ComponentError page={`/clients/${params.id}/projects`} message={client} />
      </>
    )

  if(typeof(clients) === "string")
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{clients}</h1>
        </div> */}
        <ComponentError page="/clients" message={clients} />
      </>
    )

  if(typeof(projects) === "string")
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{projects}</h1>
        </div> */}
        <ComponentError page={`/clients/${params.id}/projects`} message={projects} />
      </>
    )

  let options: Options[] = [];

  clients.map((cli: ClientBack) => {
    options.push({
      value: cli._id,
      label: cli.name,
    })
  })

  return(
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/clients" />
            <img src={client.logo? client.logo: '/img/clients.svg'} 
                      alt="logo cliente" className="w-12 h-12" />
            <p className="text-slate-500 mx-3">{client.name}</p>
          </div>
          <Selectize options={options} routePage="clients" subpath="/projects" />
        </div>
        <NavTab idCli={params.id} tab='2' />
        <TableProjectsClient projects={projects} />
      </div>
    </>
  )
}