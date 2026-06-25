import { cookies } from "next/headers"
import {getProviders, getAllProvidersMin} from "../api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { UsrBack } from "@/interfaces/User";
import ContainerProvider from "@/components/providers/ContainerProvider";
import Navigation from "@/components/navigation/Navigation";
import ComponentError from "@/components/ComponentError";
import { getCompany } from "../api/routeCompany";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Providers(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let providers:Provider[]=[];

  // try {
  //   providers = await getProviders(token);
  // } catch (error) {
  //   return(
  //     <>
  //       <Navigation user={user} token={token} resources={resresource} />
  //       {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
  //         <h1 className="text-5xl text-center text-red-500 font-semibold">Error al consultar proveedores!!</h1>
  //       </div> */}
  //       <ComponentError page="/providers" message="Error al consultar proveedores!!" />
  //     </>
  //   )
  // }
  
  const [providers, company, resresource]=await Promise.all([
    // getProviders(token),
    getAllProvidersMin(token),
    getCompany(token, user.profile),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ])

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/providers" message={providers} />
      </>
    )
  }  

  if(typeof(company)==='string'){
      return(
        <>
          <Navigation user={user} token={token} resources={resresource} />
          <ComponentError page="/clients" message={company} />
        </>
      )
    }

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerProvider providers={providers} token={token} user={user} company={company} />
    </>
  )
}