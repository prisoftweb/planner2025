import TabUser from "@/components/users/TabUsers";
import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
//import { getUser, getUsers } from "@/app/api/routeUser";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import IconText from "@/components/providers/IconText";
import ProviderClient from "@/components/providers/ProviderClient";

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

  // try {
  //   user = await getUser(params.id, token);
  //   if(typeof(user) === "string")
  //     return <h1 className="text-center text-red-500">{user}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del usuario!!</h1>  
  // }

  // try {
  //   users = await getUsers(token);
  //   if(typeof(users) === "string")
  //     return <h1 className="text-center text-red-500">{users}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los usuarios!!</h1>  
  // }

  // const photo=user.photo
  // const name=user.name
  // const email=user.email

  const photo=''
  const name=''
  const email=''

  let options: Options[] = [];
  
  // users.map((usr: any) => {
  //   options.push({
  //     value: usr._id,
  //     label: usr.name,
  //   })
  // })

  let res;
  if(searchParams.tab==='2') res=<></>
  else if(searchParams.tab==='3') res=<></>
  else if(searchParams.tab==='4') res=<></>
  else res=<ProviderClient email={email} name={name} photo="" token={token} />;
  
  return(
    <>
      <Navigation />
      <div className="p-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={'/providers'}><ArrowLeftIcon className="w-8 h-8 text-slate-500" /></Link>
            <IconText text="P" />
            <p className="text-slate-500 mx-3">Plaforama</p>
          </div>
          <Selectize options={options} />
        </div>
        <NavTab idProv={params.id} tab={searchParams.tab} />
        {res}
      </div>
    </>
  )
}