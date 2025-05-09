import TabUser from "@/components/users/TabUsers";
import NavTab from "@/components/users/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { getUser, getUsers } from "@/app/api/routeUser";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
//import { UsrBack } from "@/interfaces/User";
import { Options } from "@/interfaces/Common";
import HeaderImage from "@/components/HeaderImage";

export default async function Page({ params, searchParams }: 
                  { params: { id: string }, searchParams: { opt: string } }){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  //const userLog: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let user;
  let users;

  try {
    user = await getUser(params.id, token);
    if(typeof(user) === "string")
      return <h1 className="text-center text-red-500">{user}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del usuario!!</h1>  
  }

  try {
    users = await getUsers(token);
    if(typeof(users) === "string")
      return <h1 className="text-center text-red-500">{users}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los usuarios!!</h1>  
  }

  const photo=user.photo
  const name=user.name
  
  let options: Options[] = [];
  
  users.map((usr: any) => {
    options.push({
      value: usr._id,
      label: usr.name,
    })
  })

  let opt = 1;
  if(searchParams.opt==='2') opt = 2;
  else if(searchParams.opt==='3') opt = 3;
    else if(searchParams.opt==='4') opt = 4;

  return(
    <>
      {/* <Navigation user={userLog} /> */}
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderImage image={photo? photo: '/img/default.jpg'} previousPage="/users" title={name} >
          <Selectize options={options} routePage="users" subpath="/profile?opt=1" />
        </HeaderImage>
        <div className="mt-3">
          <NavTab idUser={params.id} tab={'1'} />
        </div>
        <TabUser user={user} opt={opt} />
      </div>
    </>
  )
}