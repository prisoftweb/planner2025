import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User"
import { cookies } from "next/headers"
import HeaderImage from "@/components/HeaderImage";
import ContainerReportsPage from "@/components/expenses/ContainerReportsPage";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [resresource, rescomponents] = await Promise.all([
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'expenses', 'reports'),
  ]);

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
        <ComponentError page={`/glossary`} message={rescomponents} />
      </>
    )
  }

  if(!token || token===''){
    return (
      <>
        <Navigation user={user} token={''} resources={resresource} />
        <ComponentError page="/guarantee" message="No estas logueado" />
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
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderImage image="/img/costs/costs.svg" previousPage="/" title="REPORTES DE COSTOS">
          <></>
        </HeaderImage>
        <ContainerReportsPage token={token} company={user.profile} />
      </div>
    </>
  )
}