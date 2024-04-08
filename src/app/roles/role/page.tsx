import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNew from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";
import { getRoles } from "@/app/api/routeRoles";
import { Role, RoleTable } from "@/interfaces/Roles";
import TableRole from "@/components/roles/TableRole";
import Header from "@/components/Header";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let roles: Role[];
  try {
    roles = await getRoles(token);
  } catch (error) {
    return <h1>Ocurrio un error al obtener roles!!</h1>
  }

  if(!roles || roles.length <= 0){
    return (
      <div>
        <Navigation user={user} />
        <RolesClient token={token} option={1}>
          <WithOut img="/img/clientes.svg" subtitle="Roles" 
            text="Aqui puedes gestionar tus roles para usuarios que usen el sistema"
            title="Roles">
              <ButtonNew token={token} opt={1} descComponents={[]} descRoutes={[]} 
                optComponents={[]} optResources={[]} optRoutes={[]} 
                idTree="" routesPerResource={[]} /></WithOut>
        </RolesClient>
      </div>
    )
  }

  const table: RoleTable[] = [];

  roles.map((role) => {
    table.push({
      id: role._id,
      name: role.name,
      description: role.description,
      users: 2,
      components: 3,
      status: {
        routes: 2,
        status: role.status,
      }
    })
  })

  return(
    <>
      <Navigation user={user} />      
      <RolesClient token={token} option={1}>
        <div>
          <Header title="Roles">
            <ButtonNew token={token} opt={1} descComponents={[]} descRoutes={[]} 
              optComponents={[]} optResources={[]} optRoutes={[]} 
              idTree="" routesPerResource={[]} />
          </Header>
          <div className="mt-10">
            <TableRole data={table} token={token} />
          </div>
        </div>
      </RolesClient>
    </>
  )
}