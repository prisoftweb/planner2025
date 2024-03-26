import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNew from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";
import { Resource, ResourceTable } from "@/interfaces/Roles";
import Header from "@/components/Header";
import TableSubPath from "@/components/roles/TableSubPath";
import { getComponents } from "@/app/api/routeRoles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');


  let components: Resource[];
  try {
    components = await getComponents(token);
    if(typeof(components) === 'string'){
    return <h1 className="text-center text-red-500">{components}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar recursos!!</h1>
  }
  
  if(!components || components.length <= 0){
    <RolesClient token={token}>
      <WithOut img="/img/clientes.svg" subtitle="Componentes" 
          text="Aqui puedes gestionar tus componentes para usuarios que usen el sistema"
          title="Componentes"><ButtonNew token={token} opt={4} /></WithOut>
    </RolesClient>
  }
  
  const data: ResourceTable[] = [];
  components.map((resource) => {
    data.push({
      description: resource.description,
      id: resource._id,
      name: resource.name,
      status: true
    })
  })

  return(
    <>
      <Navigation user={user} />
      <RolesClient token={token}>
        <div>
          <Header title="Componentes"><ButtonNew token={token} opt={4} /></Header>
          <div className="mt-10">
            <TableSubPath data={data} token={token} />
          </div>
        </div>
        {/* <WithOut img="/img/clientes.svg" subtitle="Componentes" 
          text="Aqui puedes gestionar tus componentes para usuarios que usen el sistema"
          title="Componentes"><ButtonNew token={token} opt={4} /></WithOut> */}
      </RolesClient>
    </>
  )
}