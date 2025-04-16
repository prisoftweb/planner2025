import { getUsers } from "../api/routeUser";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getDepartmentsLV } from "../api/routeDepartments";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import ButtonNewUser from "@/components/users/ButtonNewUser";
import { Options } from "@/interfaces/Common";
import { getRolesLV } from "../api/routeRoles";
import UsersConstext from "@/components/users/UsersContext";

export default async function Users() {  

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let users;
  try {
    users = await getUsers(token);
    if(typeof(users)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{users}</h1>
        </>
      )
  } catch (error) {
    return(
      <> 
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener usuarios!!</h1>
      </>
    )
  }

  let optionsRoles:Options[] = [];
  try {
    optionsRoles = await getRolesLV(token);
    if(typeof(optionsRoles)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{optionsRoles}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener roles!!</h1>
      </>
    )
  }

  let departments;
  try {
    departments = await getDepartmentsLV(token);
    if(typeof(departments)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{departments}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener departamentos!!</h1>
      </>
    )
  }

  if(users.length === 0 || !users){
    return (
      <>
        <Navigation user={user} />
        <WithOut img="/img/user.svg" subtitle="Usuarios" 
            text="Aqui puedes gestionar tus usuarios con toda su informacion" title="Usuarios"
          ><ButtonNewUser optionsDepartments={departments} token={token} 
              roles={optionsRoles} />
        </WithOut>
      </>
    )
  }
  
  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <UsersConstext departments={departments} optionsRoles={optionsRoles} token={token} users={users} />
      </div>
    </>
  );
}
