import { cookies } from "next/headers"
import { getUser } from "@/app/api/routeUser";
import UserClient from "./UserClient";
import { getDepartments } from "@/app/api/routeDepartments";

export default async function TabUser({id}: {id:string}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  let user;

  try {
    user = await getUser(id, token);
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del usuario!!</h1>  
  }

  if(typeof(user) === "string")
    return <h1 className="text-center text-red-500">{user}</h1>

  let departments
  try {
    departments = await getDepartments(token);
    if(typeof(departments) === "string")
      return <h1 className="text-center text-red-500">{departments}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener los departamentos!!</h1>
  }

  // const photo=user.photo
  // const name=user.name
  // const email=user.email

  return(
    <>
      <UserClient user={user} token={token} departments={departments} />
    </>
  )
}