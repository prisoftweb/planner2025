import { cookies } from "next/headers"
import {getProviders, getAllProvidersMin} from "../api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { UsrBack } from "@/interfaces/User";
import ContainerProvider from "@/components/providers/ContainerProvider";
import Navigation from "@/components/navigation/Navigation";
import ComponentError from "@/components/ComponentError";
import { getCompany } from "../api/routeCompany";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Providers(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [providers, company, resresource, rescomponents]=await Promise.all([
    // getProviders(token),
    getAllProvidersMin(token),
    getCompany(token, user.profile),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'providers', ''),
  ])

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/providers`} message={rescomponents} />
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

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerProvider providers={providers} token={token} user={user} company={company} />
    </>
  )
}