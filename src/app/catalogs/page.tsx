import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCatalogs } from "../api/routeCatalogs";
import { Catalog } from "@/interfaces/Catalogs";
import ListClient from "@/components/catalogs/ListClient";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let catalogs: Catalog[];
  try {
    catalogs = await getCatalogs(token);
    if(typeof(catalogs)=== 'string'){
      return (
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500 text-lg">{catalogs}</h1>
        </>
      )
    }
  } catch (error) {
    return <h1 className="text-center text-red-500 text-lg">Ocurrio un error al consultar catalogos!!</h1>
  } 

  return(
    <>
      <Navigation user={user} />
      <ListClient lists={catalogs} token={token} />
    </>
  )
}