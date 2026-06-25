import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { getCompany } from "@/app/api/routeCompany";
import Header from "@/components/HeaderPage";
import { Company } from "@/interfaces/Companies";
import CompanyProfileCli from "@/components/workspace/companies/CompanyProfileCli";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({params}: {params:{id:string}}) {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  // let company: Company = await getCompany(token, params.id);

  const [company, resresource] = await Promise.all([
      getCompany(token, params.id),
      getAllResourcesByROL(token, user.rol?._id?? ''),
    ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(company)=== 'string')
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/workspace/config" message={company} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{company}</h1>
        </div> */}
      </>
    )

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header previousPage="/workspace/companies" title="Compañia">
          <></>
        </Header>
        <CompanyProfileCli token={token} companyParam={company} />
      </div>
    </>
  )
}