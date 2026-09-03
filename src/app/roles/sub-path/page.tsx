import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNew from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";
import { ResourceTable, Resource } from "@/interfaces/Roles";
import { getRoutes } from "@/app/api/routeRoles";
// import Header from "@/components/Header";
import TableResource from "@/components/roles/TableResource";
import { ResponsiveHeader as Header } from "@/components/Header";

import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let routes: Resource[];
  
  // routes = await getRoutes(token);

  const [routes, resresource] = await Promise.all([
      getRoutes(token),
      getAllResourcesByROL(token, user.rol?._id?? ''),
    ]);

  if(typeof(resresource)==='string'){
          return (
            <>
              <ComponentError page="/" message={resresource} />
            </>
          )
        }
  
  if(typeof(routes) === 'string'){
    // return <h1 className="text-center text-red-500">{routes}</h1>
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/roles/trees" message={routes} />
      </>
    )
  }
  
  if(!routes || routes.length <= 0){
    return(
      <div>
        <Navigation user={user} token={token} resources={resresource} />
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
  routes.map((route:Resource) => {
    data.push({
      description: route.description,
      id: route._id,
      name: route.name,
      title: route.title
    })
  })

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
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