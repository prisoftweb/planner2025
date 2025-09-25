import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { Tree, TreeTable } from "@/interfaces/Roles";
import Navigation from "@/components/navigation/Navigation";
import RolesClient from "@/components/roles/RolesClient";
import TableTree from "@/components/roles/TableTree";
import ButtonNew from "@/components/roles/ButtonNew";
import { getResources, getRoutes, getComponents,
        getTrees
      } from "@/app/api/routeRoles";
import { Resource } from "@/interfaces/Roles";
import { Options } from "@/interfaces/Common";
import WithOut from "@/components/WithOut";
import SearchInTable from "@/components/SearchInTable";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let trees: Tree[];
  // let resources: Resource[];
  // let routes: Resource[];
  // let components: Resource[];
  
  // trees = await getTrees(token);
  // resources = await getResources(token);
  // routes = await getRoutes(token);
  // components = await getComponents(token);

  const [trees, resources, routes, components] = await Promise.all([
    getTrees(token),
    getResources(token),
    getRoutes(token),
    getComponents(token)
  ]);
  
  if(typeof(trees) === 'string'){
    return <h1 className="text-center text-red-500">{trees}</h1>
  }

  const data: TreeTable[] = [];
  
  if(!trees || trees.length <= 0){
    return <div className="p-10">
              <Navigation user={user} />
              <WithOut img="/img/clientes.svg" subtitle="Arboles" 
                text="Aqui puedes gestionar tu arbol con toda su informacion relevante"
                title="Arboles">
                  <ButtonNew token={token} opt={7} 
                        optResources={[]} optRoutes={[]}
                        descRoutes={[]} descComponents={[]} 
                        optComponents={[]} idTree='' routesPerResource={[]} />
              </WithOut>  
            </div>
  }

  trees[0].resources.map((res:any) => {
    if(res.resource){
      if(res.routes.length > 0){
        res.routes.map((route:any) => {
          let strComp: string = '';
          route.components.map((comp:any) => {
            strComp += ' ' + comp.component.name;
          })
          data.push({
            id: res._id,
            status: res.status,
            resource: res.resource.name,
            routes: route.route.name,
            components: strComp,
          })
        })  
      }else{
        data.push({
          id: res._id,
          status: res.status,
          resource: res.resource.name,
          routes: '',
          components: ''
        })
      }
    }
  })

  if(typeof(resources) === 'string'){
    return <h1 className="text-center text-red-500">{resources}</h1>
  }

  if(typeof(routes) === 'string'){
    return <h1 className="text-center text-red-500">{routes}</h1>
  }

  if(typeof(components) === 'string'){
    return <h1 className="text-center text-red-500">{components}</h1>
  }

  let optionsResource: Options[] = [];

  resources.map((resource:any) => {
    optionsResource.push({
      label: resource.name,
      value: resource._id,
    })
  })

  let optionsResourceComponents: Options[] = [];

  trees[0].resources.map((resource:any) => {
    if(resource.resource){
      optionsResourceComponents.push({
        label: resource.resource.name,
        value: resource._id,
      })
    }
  })

  let optionsRoutes: Options[] = [];
  let titleRoutes: Options[] = [];

  routes.map((route:any) => {
    optionsRoutes.push({
      label: route.name,
      value: route._id
    })
    titleRoutes.push({
      label: route.description,
      value: route._id
    })
  })

  let optionsRoutesComponents: Options[] = [];
  
  let routesPerResource: Options[] = [];
  let descRoutes:Options[] = [];

  trees[0].resources.map((resources:any) => {
    resources.routes.map((route:any) => {
      
      routesPerResource.push({
        label: resources._id,
        value: route._id
      })

      optionsRoutesComponents.push({
        label: route.route.name,
        value: route._id
      })

      descRoutes.push({
        label: route.route.description,
        value: route._id
      })
    })
  })

  let optionsComponents: Options[] = [];
  let descComponents: Options[] = [];

  components.map((component:any) => {
    optionsComponents.push({
      label: component.name,
      value: component._id
    })
    descComponents.push({
      label: component.description,
      value: component._id
    })
  })

  return(
    <>
      <Navigation user={user} />
      
      <RolesClient token={token} option={5}>
        <div>
          <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap">
            <div className="flex items-center gap-x-3 w-full max-w-96">
              <Link href={'/'}>
                <TooltipContainerIcon label="Regresar">
                  <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                    <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                  </div>
                </TooltipContainerIcon>
              </Link>
              <p className="text-xl ml-4 font-medium">Arbol</p>
            </div>
            {/* <ButtonNewProvider id={id} token={token} /> */}
            <div className="flex gap-x-3 gap-y-2 justify-end w-full flex-wrap-reverse sm:flex-nowrap">
              <SearchInTable placeH="Buscar arbol.." />
              <div className="w-70">
                <div className="flex gap-x-2">
                  <ButtonNew token={token} opt={5} 
                    optResources={optionsResource} optRoutes={optionsRoutes}
                    descRoutes={titleRoutes} descComponents={[]} 
                    optComponents={[]} idTree={trees[0]._id} routesPerResource={[]} />
                
                  <ButtonNew token={token} opt={6} 
                    optResources={optionsResourceComponents} optRoutes={optionsRoutesComponents}
                    descRoutes={descRoutes} descComponents={descComponents} 
                    optComponents={optionsComponents} idTree={trees[0]._id} 
                    routesPerResource={routesPerResource} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <TableTree idTree={trees[0]._id} data={data} token={token} />
          </div>
        </div>
      </RolesClient>
    </>
  )
}