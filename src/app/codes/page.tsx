import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { getAllCodesMINByDateANDProvider } from "../api/routeCode";
import ContainerCodes from "@/components/codes/ContainerCodes";
import Header from "@/components/HeaderPage";
import { getAllProvidersWithTradeLine } from "../api/routeDashboardProviders";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page() {

  const cookieStore = cookies();
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value || '');
  const token: string = cookieStore.get('token')?.value || '';

  const today = new Date();

  const [codes, providers, resresource, rescomponents] = await Promise.all([
    // getAllCodesMINByDateANDProvider(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), 
    //     new Date().toDateString(), [], 'TODOS'),
    getAllCodesMINByDateANDProvider(token, new Date(today.getFullYear(), today.getMonth(), 1).toDateString(), 
        today.toDateString(), [], 'TODOS'), 
    getAllProvidersWithTradeLine(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'codes', ''),
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
        <ComponentError page={`/catalogs`} message={rescomponents} />
      </>
    )
  }
  
  if (typeof(codes) === 'string') {
    return (
      <div>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md:p-5">
          <h1 className="text-red-500 text-center text-lg">{codes}</h1>
        </div> */}
        <ComponentError page="/codes" message={codes} />
      </div>
    )
  }

  if (typeof(providers) === 'string') {
    return (
      <div>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md:p-5">
          <h1 className="text-red-500 text-center text-lg">{providers}</h1>
        </div> */}
        <ComponentError page="/codes" message={providers} />
      </div>
    )
  }

  // const result = {
  //   permission: rescomponents[0]?.permission ?? {},
  //   components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  // };

  //pendiente

  return (
    <div>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md:p-5">
        <Header previousPage="/" title="Codigos" >
          <></>
        </Header>
        <ContainerCodes codes={codes} providers={providers} token={token} />
      </div>
    </div>
  )
}
