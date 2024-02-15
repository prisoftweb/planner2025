import TabUser from "@/components/users/TabUsers";
import NavTab from "@/components/users/NavTab";
import Navigation from "@/components/navigation/Navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { getUser, getUsers } from "@/app/api/routeUser";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";

interface Options{
  value: string,
  label: string,
}

export default async function Page({ params, searchParams }: 
                  { params: { id: string }, searchParams: { tab: string } }){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

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
  const email=user.email

  let options: Options[] = [];
  
  users.map((usr: any) => {
    options.push({
      value: usr._id,
      label: usr.name,
    })
  })

  let res;
  if(searchParams.tab==='2') res=<></>
  else if(searchParams.tab==='3') res=<></>
  else res=<TabUser id={params.id} />;

  return(
    <>
      <Navigation />
      <div className="flex mt-10 justify-around items-center">
        <div className="flex items-center">
          <Link href={'/users'}><ArrowLeftIcon className="w-8 h-8 text-slate-500" /></Link>
          <Image 
            src={photo? photo: '/img/default.jpg'}
            //src={'/img/default.jpg'}
            alt="profile"
            width={50}
            height={50}
            className="rounded-full mx-3"
          />
          <p className="text-slate-500 mx-3">{name}</p>
        </div>
        <Selectize options={options} />
      </div>
      <NavTab idUser={params.id} tab={searchParams.tab} />
      {res}
    </>
  )
}