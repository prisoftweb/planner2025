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

export default async function Users() {  

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [users, optionsRoles, departments] = await Promise.all([
    getUsers(token),
    getRolesLV(token),
    getDepartmentsLV(token)
  ]);

  if(typeof(users)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <ComponentError page="/users" message={users} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{users}</h1>
        </div> */}
      </>
    )
  }

  if(typeof(optionsRoles)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <ComponentError page="/users" message={optionsRoles} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{optionsRoles}</h1>
        </div> */}
      </>
    )
  }

  if(typeof(departments)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <ComponentError page="/users" message={departments} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{departments}</h1>
        </div> */}
      </>
    )
  }

  if(users.length === 0 || !users){
    return (
      <>
        <Navigation user={user} token={token} />
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
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <UsersConstext departments={departments} optionsRoles={optionsRoles} token={token} users={users} />
      </div>
    </>
  );
}
