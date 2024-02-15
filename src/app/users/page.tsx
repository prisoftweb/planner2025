import { getUsers } from "../api/routeUser";
import TableUsers from "@/components/users/TableUsers";
import { cookies } from "next/headers";
import { User } from "@/interfaces/User";

export default async function Users() {  

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let users;
  try {
    users = await getUsers(token);
    if(typeof(users)==='string') 
      return <h1 className="text-center text-red-500">{users}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al obtener usuarios!!</h1>
  }

  let data:User[] = [];
  users.map((user:any) => {
    data.push({
      'id': user._id,
      'photo': user.photo,
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
      <div className="bg-slate-300 h-screen">
        <TableUsers data={data} token={token} />
      </div>
    </>
  );
}
