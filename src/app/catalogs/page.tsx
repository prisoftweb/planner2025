import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCatalogs } from "../api/routeCatalogs";
import { Catalog } from "@/interfaces/Catalogs";
import ListClient from "@/components/catalogs/ListClient";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let catalogs: Catalog[] = await getCatalogs(token);

  const [catalogs, resresource]=await Promise.all([
    getCatalogs(token),
    getAllResourcesByROL(token, user.rol?._id?? '')
  ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }

  if(typeof(catalogs)=== 'string'){
    return (
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500 text-lg">{catalogs}</h1>
        </div> */}
        <ComponentError page="/catalogs" message={catalogs} />
      </>
    )
  } 

  return(
    <>
      <Navigation user={user} token={token} />
      <ListClient lists={catalogs} token={token} />
    </>
  )
}