import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { getAllCodesMINByDateANDProvider } from "../api/routeCode";
import ContainerCodes from "@/components/codes/ContainerCodes";
import Header from "@/components/HeaderPage";
import { getAllProvidersWithTradeLine } from "../api/routeDashboardProviders";

export default async function Page() {

  const cookieStore = cookies();
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value || '');
  const token: string = cookieStore.get('token')?.value || '';
  
  const [codes, providers] = await Promise.all([
    // getAllCodesMINByDateANDProvider(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), 
    //     new Date().toDateString(), ["664e7332277711ed05dc0424","67b359e34fc894a4dab47b18",
    //       "664e7332277711ed05dc0463", "664e7332277711ed05dc0422"]),
    getAllCodesMINByDateANDProvider(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), 
        new Date().toDateString(), []), 
    getAllProvidersWithTradeLine(token)
  ])
  
  if (typeof(codes) === 'string') {
    return (
      <div>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md:p-5">
          <h1 className="text-red-500 text-center text-lg">{codes}</h1>
        </div>
      </div>
    )
  }

  if (typeof(providers) === 'string') {
    return (
      <div>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md:p-5">
          <h1 className="text-red-500 text-center text-lg">{providers}</h1>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md:p-5">
        <Header previousPage="/" title="Codigos" >
          <></>
        </Header>
        <ContainerCodes codes={codes} providers={providers} token={token} />
      </div>
    </div>
  )
}
