import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNew from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";
import { Route, ResourceTable } from "@/interfaces/Roles";
import { getRoutes } from "@/app/api/routeRoles";
import Header from "@/components/Header";
import TableSubPath from "@/components/roles/TableSubPath";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let routes: Route[];
  try {
    routes = await getRoutes(token);
    if(typeof(routes) === 'string'){
    return <h1 className="text-center text-red-500">{routes}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar recursos!!</h1>
  }
  
  if(!routes || routes.length <= 0){
    <RolesClient token={token}>
      <WithOut img="/img/clientes.svg" subtitle="Sub Rutas" 
          text="Aqui puedes gestionar tus rutas para usuarios que usen el sistema"
          title="Sub Rutas"><ButtonNew token={token} opt={3} /></WithOut>
    </RolesClient>
  }
  
  const data: ResourceTable[] = [];
  routes.map((route) => {
    data.push({
      description: route.description,
      id: route._id,
      name: route.name,
      status: true
    })
  })

  return(
    <>
      <Navigation user={user} />
      <RolesClient token={token}>
        <div>
          <Header title="Rutas"><ButtonNew token={token} opt={3} /></Header>
          <div className="mt-10">
            <TableSubPath data={data} token={token} />
          </div>
        </div>
      </RolesClient>
    </>
  )
}