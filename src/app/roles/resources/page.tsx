import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNew from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";
import { getResources } from "@/app/api/routeRoles";
import { Resource, ResourceTable } from "@/interfaces/Roles";
import TableResource from "@/components/roles/TableResource";
import Header from "@/components/Header";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let resources: Resource[];
  try {
    resources = await getResources(token);
    if(typeof(resources) === 'string'){
    return <h1 className="text-center text-red-500">{resources}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar recursos!!</h1>
  }
  
  if(!resources || resources.length <= 0){
    return(
      <div>
        <Navigation user={user} />
        <RolesClient token={token} option={2}>
          <WithOut img="/img/clientes.svg" subtitle="Rutas" 
            text="Aqui puedes gestionar tus rutas para usuarios que usen el sistema"
            title="Rutas">
              <ButtonNew token={token} opt={2} optResources={[]} optRoutes={[]}
                descComponents={[]} descRoutes={[]} optComponents={[]} 
                idTree="" routesPerResource={[]} /></WithOut>
        </RolesClient>
      </div>
    )
  }
  
  const data: ResourceTable[] = [];
  resources.map((resource) => {
    data.push({
      description: resource.description,
      id: resource._id,
      name: resource.name,
      title: resource.title
    })
  })

  return(
    <>
      <Navigation user={user} />
      <RolesClient token={token} option={2}>
        <div>
          <Header title="Recursos" placeHolder="Buscar recurso..">
            <ButtonNew token={token} opt={2} optResources={[]} optRoutes={[]}
              descComponents={[]} descRoutes={[]} optComponents={[]} 
              idTree="" routesPerResource={[]} />
          </Header>
          <div className="mt-5">
            <TableResource data={data} token={token} option={1} />
          </div>
        </div>
      </RolesClient>
    </>
  )
}