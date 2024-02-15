import { cookies } from "next/headers"
import { getUser } from "@/app/api/routeUser";
import UserClient from "./UserClient";

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

  const photo=user.photo
  const name=user.name
  const email=user.email

  return(
    <>
      <UserClient email={email} name={name} photo={photo} token={token} />
    </>
  )
}