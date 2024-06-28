import { cookies } from "next/headers"
import { getUser } from "@/app/api/routeUser";
import UserClient from "./UserClient";
import { getDepartments } from "@/app/api/routeDepartments";
import { getRoles } from "@/app/api/routeRoles";
import { Role } from "@/interfaces/Roles";
import { Options } from "@/interfaces/Common";
import { Department } from "@/interfaces/Departments";
import { UsrBack } from "@/interfaces/User";

export default async function TabUser({id, opt}: {id:string, opt: number}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  let user: UsrBack;

  try {
    user = await getUser(id, token);
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del usuario!!</h1>  
  }

  if(typeof(user) === "string")
    return <h1 className="text-center text-red-500">{user}</h1>

  let departments: Department[];
  try {
    departments = await getDepartments(token);
    if(typeof(departments) === "string")
      return <h1 className="text-center text-red-500">{departments}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener los departamentos!!</h1>
  }

  let roles:Role[];

  try {
    roles = await getRoles(token);
    if(typeof(roles)==='string')
        return <h1 className="text-red-500 text-center text-lg">{roles}</h1>
  } catch (error) {
    return <h1 className="text-red-500 text-center text-lg">Ocurrio un error al obtener roles!!</h1>
  }

  const optsRole:Options[] = [];
  roles.map((role) => {
    optsRole.push({
      label: role.name,
      value: role._id
    });
  });

  let optionsDepartments:Options[] = [];
  departments.map((dept:any) => {
    optionsDepartments.push({
      label: dept.name,
      value: dept._id
    });
  });

  return(
    <>
      <UserClient user={user} token={token} departments={optionsDepartments} 
            optQuery={opt} optsRole={optsRole} />
    </>
  )
}