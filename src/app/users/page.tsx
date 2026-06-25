import { getUsers } from "../api/routeUser";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getDepartmentsLV } from "../api/routeDepartments";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import ButtonNewUser from "@/components/users/ButtonNewUser";
import { getRolesLV } from "../api/routeRoles";
import UsersConstext from "@/components/users/UsersContext";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Users() {  

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [users, optionsRoles, departments, resresource] = await Promise.all([
    getUsers(token),
    getRolesLV(token),
    getDepartmentsLV(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
        return (
          <>
            <ComponentError page="/" message={resresource} />
          </>
        )
      }

  if(typeof(users)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/users" message={users} />
      </>
    )
  }

  if(typeof(optionsRoles)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/users" message={optionsRoles} />
      </>
    )
  }

  if(typeof(departments)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/users" message={departments} />
      </>
    )
  }

  if(users.length === 0 || !users){
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
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
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <UsersConstext departments={departments} optionsRoles={optionsRoles} token={token} users={users} />
      </div>
    </>
  );
}
