import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNew from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";
import { ResourceTable, Resource } from "@/interfaces/Roles";
import { getRoutes } from "@/app/api/routeRoles";
import Header from "@/components/Header";
//import TableSubPath from "@/components/roles/TableSubPath";
import TableResource from "@/components/roles/TableResource";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let routes: Resource[];
  try {
    routes = await getRoutes(token);
    if(typeof(routes) === 'string'){
    return <h1 className="text-center text-red-500">{routes}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar recursos!!</h1>
  }
  
  if(!routes || routes.length <= 0){
    return(
      <div>
        <Navigation user={user} />
        <RolesClient token={token} option={3}>
          <WithOut img="/img/clientes.svg" subtitle="Sub Rutas" 
              text="Aqui puedes gestionar tus rutas para usuarios que usen el sistema"
              title="Sub Rutas">
                <ButtonNew token={token} opt={3} optResources={[]} optRoutes={[]}
                  descComponents={[]} descRoutes={[]} optComponents={[]} 
                  idTree="" routesPerResource={[]} />
          </WithOut>
        </RolesClient>
      </div>
    )
  }
  
  const data: ResourceTable[] = [];
  routes.map((route) => {
    data.push({
      description: route.description,
      id: route._id,
      name: route.name,
      title: route.title
    })
  })

  return(
    <>
      <Navigation user={user} />
      <RolesClient token={token} option={3}>
        <div>
          <Header title="Rutas" placeHolder="Buscar ruta..">
            <ButtonNew token={token} opt={3} optResources={[]} optRoutes={[]}
              descComponents={[]} descRoutes={[]} optComponents={[]} 
              idTree="" routesPerResource={[]} />
          </Header>
          <div className="mt-5">
            <TableResource data={data} token={token} option={2} />
          </div>
        </div>
      </RolesClient>
    </>
  )
}