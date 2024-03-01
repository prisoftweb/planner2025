import TabUser from "@/components/users/TabUsers";
import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import IconText from "@/components/providers/IconText";
import ProviderClient from "@/components/providers/ProviderClient";
import { getProvider } from "@/app/api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { getContact } from "@/app/api/routeContacts";
import { Contact } from "@/interfaces/Contacts";

interface Options{
  value: string,
  label: string,
}

export default async function Page({ params, searchParams }: 
                    { params: { id: string }, searchParams: { tab: string } }){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';
  
  let provider: any;
  try {
    provider = await getProvider(params.id, token);
    if(typeof(provider) === "string")
      return <h1 className="text-center text-red-500">{provider}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proveedor!!</h1>  
  }

  // try {
  //   users = await getUsers(token);
  //   if(typeof(users) === "string")
  //     return <h1 className="text-center text-red-500">{users}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los usuarios!!</h1>  
  // }


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
  else res=<ProviderClient provider={provider} token={token} id={params.id} />;
  
  return(
    <>
      <Navigation />
      <div className="p-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={'/providers'}><ArrowLeftIcon className="w-8 h-8 text-slate-500" /></Link>
            <IconText text={provider.name.substring(0, 2)} />
            <p className="text-slate-500 mx-3">{provider.name}</p>
          </div>
          <Selectize options={options} />
        </div>
        <NavTab idProv={params.id} tab={searchParams.tab} />
        {res}
      </div>
    </>
  )
}