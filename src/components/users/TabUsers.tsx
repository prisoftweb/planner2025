import { cookies } from "next/headers"
import UserClient from "./UserClient";
import { getDepartmentsLV } from "@/app/api/routeDepartments";
import { getRolesLV } from "@/app/api/routeRoles";
import { Options } from "@/interfaces/Common";
import { UsrBack } from "@/interfaces/User";

export default async function TabUser({user, opt}: {user:UsrBack, opt: number}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  let optionsDepartments:Options[] = [];
  try {
    optionsDepartments = await getDepartmentsLV(token);
    if(typeof(optionsDepartments) === "string")
      return <h1 className="text-center text-red-500">{optionsDepartments}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener los departamentos!!</h1>
  }

  let optsRole:Options[] = [];

  try {
    optsRole = await getRolesLV(token);
    if(typeof(optsRole)==='string')
        return <h1 className="text-red-500 text-center text-lg">{optsRole}</h1>
  } catch (error) {
    return <h1 className="text-red-500 text-center text-lg">Ocurrio un error al obtener roles!!</h1>
  }

  return(
    <>
      <UserClient user={user} token={token} departments={optionsDepartments} 
            optQuery={opt} optsRole={optsRole} />
    </>
  )
}