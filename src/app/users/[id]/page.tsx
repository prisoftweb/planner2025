import TabUser from "@/components/users/TabUsers";
import NavTab from "@/components/users/NavTab";
import Navigation from "@/components/navigation/Navigation";
import Image from "next/image";
import { getUser, getUsers } from "@/app/api/routeUser";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import { UsrBack } from "@/interfaces/User";
import { Options } from "@/interfaces/Common";
import ArrowReturn from "@/components/ArrowReturn";

export default async function Page({ params, searchParams }: 
                  { params: { id: string }, searchParams: { tab: string, opt: string } }){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const userLog: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

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

  let opt = 1;
  if(searchParams.opt==='2') opt = 2;
  else if(searchParams.opt==='3') opt = 3;
    else if(searchParams.opt==='4') opt = 4;
      else opt = 1;

  let res;
  if(searchParams.tab==='2') res=<></>
  else if(searchParams.tab==='3') res=<></>
    else res=<TabUser id={params.id} opt={opt} />;

  return(
    <>
      <Navigation user={userLog} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center">
            <ArrowReturn link="/users" />
            {/* <Link href={'/users'}><ArrowLeftIcon className="w-8 h-8 text-slate-500" /></Link> */}
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
          <Selectize options={options} routePage="users" subpath="" />
        </div>
        <div className="mt-3">
          <NavTab idUser={params.id} tab={searchParams.tab} />
        </div>
        {res}
      </div>
    </>
  )
}