import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { Tree, TreeTable } from "@/interfaces/Roles";
import Navigation from "@/components/navigation/Navigation";
import RolesClient from "@/components/roles/RolesClient";
import Header from "@/components/Header";
import TableTree from "@/components/roles/TableTree";
import ButtonNew from "@/components/roles/ButtonNew";
import { getResources, getRoutes, getComponents,
        getTree, getTrees
      } from "@/app/api/routeRoles";
import { Resource } from "@/interfaces/Roles";
import { Options } from "@/interfaces/Common";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let trees: Tree[];
  try {
    trees = await getTrees(token);
    if(typeof(trees) === 'string'){
    return <h1 className="text-center text-red-500">{trees}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar arboles!!</h1>
  }

  const data: TreeTable[] = [];
  
  if(!trees || trees.length <= 0){
    <h1 className="text-center text-red-500">Falta crear pantalla de no hay arboles!!</h1>
  }

  trees[0].resources.map((res) => {
    let str: string = '';
    res.routes.map((route) => {
      str += ' ' + route.route.name;
    })
    data.push({
      id: res._id,
      status: res.status,
      resource: res.resource.name,
      routes: str,
    })
  })

  let resources: Resource[];
  try {
    resources = await getResources(token);
    if(typeof(resources) === 'string'){
    return <h1 className="text-center text-red-500">{resources}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar recursos!!</h1>
  }

  let routes: Resource[];
  try {
    routes = await getRoutes(token);
    if(typeof(routes) === 'string'){
    return <h1 className="text-center text-red-500">{routes}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar rutas!!</h1>
  }

  let components: Resource[];
  try {
    components = await getComponents(token);
    if(typeof(components) === 'string'){
    return <h1 className="text-center text-red-500">{components}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar rutas!!</h1>
  }

  let optionsResource: Options[] = [];

  resources.map((resource) => {
    optionsResource.push({
      label: resource.name,
      value: resource._id,
    })
  })

  let optionsRoutes: Options[] = [];
  let titleRoutes: Options[] = [];

  routes.map((route) => {
    optionsRoutes.push({
      label: route.name,
      value: route._id
    })
    titleRoutes.push({
      label: route.description,
      value: route._id
    })
  })

  let optionsComponents: Options[] = [];
  let descComponents: Options[] = [];

  routes.map((route) => {
    optionsComponents.push({
      label: route.name,
      value: route._id
    })
    descComponents.push({
      label: route.description,
      value: route._id
    })
  })

  return(
    <>
      <Navigation user={user} />
      <RolesClient token={token}>
        <div>
          <Header title="Rutas">
            <div className="flex gap-x-2">
            <ButtonNew token={token} opt={5} 
                optResources={optionsResource} optRoutes={optionsRoutes}
                descRoutes={titleRoutes} descComponents={[]} 
                optComponents={[]} idTree={trees[0]._id} />
            
            <ButtonNew token={token} opt={6} 
                optResources={optionsResource} optRoutes={optionsRoutes}
                descRoutes={[]} descComponents={descComponents} 
                optComponents={optionsComponents} idTree={trees[0]._id} />
            </div>
          </Header>
          <div className="mt-10">
            <TableTree idTree={trees[0]._id} data={data} token={token} />
          </div>
        </div>
      </RolesClient>
    </>
  )
}