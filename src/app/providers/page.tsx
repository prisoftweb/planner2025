import { cookies } from "next/headers"
import {getProviders} from "../api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { UsrBack } from "@/interfaces/User";
import ContainerProvider from "@/components/providers/ContainerProvider";
import Navigation from "@/components/navigation/Navigation";
import ComponentError from "@/components/ComponentError";

export default async function Providers(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let providers:Provider[]=[];
  try {
    providers = await getProviders(token);
  } catch (error) {
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-5xl text-center text-red-500 font-semibold">Error al consultar proveedores!!</h1>
        </div> */}
        <ComponentError page="/providers" message="Error al consultar proveedores!!" />
      </>
    )
  }  

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        <ComponentError page="/providers" message={providers} />
      </>
    )
  }  

  return(
    <ContainerProvider providers={providers} token={token} user={user} />
  )
}