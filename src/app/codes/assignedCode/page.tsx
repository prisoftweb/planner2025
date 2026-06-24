import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { getAllCodesMINByDateANDProvider } from "@/app/api/routeCode";
import ContainerAssignedCodes from "@/components/codes/ContainerAssignedCodes";
import Header from "@/components/HeaderPage";
import { getAllProvidersWithTradeLine } from "@/app/api/routeDashboardProviders";
import { getAllCostsMINByDateANDProvider } from "@/app/api/routeCost";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page() {

  const cookieStore = cookies();
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value || '');
  const token: string = cookieStore.get('token')?.value || '';

  const today = new Date();
  
  const [codes, providers, costs, resresource] = await Promise.all([
    getAllCodesMINByDateANDProvider(token, new Date(today.getFullYear(), today.getMonth(), 1).toDateString(), 
        today.toDateString(), [], 'SIN ASIGNAR'), 
    getAllProvidersWithTradeLine(token), 
    getAllCostsMINByDateANDProvider(token, new Date(today.getFullYear(), today.getMonth(), 1).toDateString(), 
        today.toDateString(), []),
    getAllResourcesByROL(token, user.rol?._id?? '')
  ])
 
  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if (typeof(codes) === 'string') {
    return (
      <div>
        <Navigation user={user} token={token} />
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
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md:p-5">
          <h1 className="text-red-500 text-center text-lg">{providers}</h1>
        </div> */}
        <ComponentError page="/codes" message={providers} />
      </div>
    )
  }

  return (
    <div>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md:p-5">
        <Header previousPage="/" title="Asignar codigos" >
          <></>
        </Header>
        <ContainerAssignedCodes codes={codes} providers={providers} token={token} costs={costs} />
      </div>
    </div>
  )
}
