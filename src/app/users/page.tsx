import { getUsers } from "../api/routeUser";
import TableUsers from "@/components/users/TableUsers";
import { cookies } from "next/headers";
import { UsrBack, User } from "@/interfaces/User";
import { getDepartments } from "../api/routeDepartments";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import ButtonNewUser from "@/components/users/ButtonNewUser";
import { Options } from "@/interfaces/Common";
import { getRoles } from "../api/routeRoles";
import { Role } from "@/interfaces/Roles";

export default async function Users() {  

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let users;
  try {
    users = await getUsers(token);
    if(typeof(users)==='string') 
      return <h1 className="text-center text-red-500">{users}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al obtener usuarios!!</h1>
  }

  let roles: Role[];
  try {
    roles = await getRoles(token);
    if(typeof(roles)==='string') 
      return <h1 className="text-center text-red-500">{roles}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al obtener roles!!</h1>
  }

  const optionsRoles:Options[] = [];
  roles.map((role) => {
    optionsRoles.push({
      label: role.name,
      value: role._id
    })
  });

  let departments;
  try {
    //departments = await getDepartments(token);
    departments = await getDepartments('');
    if(typeof(departments)==='string') 
      return <h1 className="text-center text-red-500">{departments}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al obtener departamentos!!</h1>
  }

  if(users.length === 0 || !users){
    return <WithOut img="/img/user.svg" subtitle="Usuarios" 
              text="Aqui puedes gestionar tus usuarios con toda su informacion" title="Usuarios"
            ><ButtonNewUser departments={departments} id={user._id} token={token} 
                roles={optionsRoles} /></WithOut>
  }
  
  let data:User[] = [];
  users.map((user:any) => {
    data.push({
      'id': user._id,
      'photo': user.photo? user.photo: '/img/default.jpg',
      'name': user.name,
      'profile': {
        'role': user.role,
        'status': user.status
      },
      'email': user.email
    })
  })

  return (
    <>
      {/* <div className="h-screen p-10" style={{backgroundColor:'#F8FAFC'}}> */}
      <Navigation user={user} />
      {/* <div className="bg-slate-300 h-screen p-10"> */}
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <TableUsers data={data} token={token} departments={departments} roles={optionsRoles} />
      </div>
    </>
  );
}
