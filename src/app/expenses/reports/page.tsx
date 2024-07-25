import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User"
import { cookies } from "next/headers"
import HeaderImage from "@/components/HeaderImage";
import ContainerReportsPage from "@/components/expenses/ContainerReportsPage";

export default function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderImage image="/img/costs/costs.svg" previousPage="/" title="REPORTES DE COSTOS">
          <></>
        </HeaderImage>
        <ContainerReportsPage token={token} />
      </div>
    </>
  )
}