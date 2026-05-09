import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { getCompany } from "@/app/api/routeCompany";
import Header from "@/components/HeaderPage";
import NavTabAccount from "@/components/workspace/NavTabAccount";
import WorkSpaceCli from "@/components/workspace/WorkSpaceCli";
import { Company } from "@/interfaces/Companies";
import CompanyProfileCli from "@/components/workspace/companies/CompanyProfileCli";

export default async function Page({params}: {params:{id:string}}) {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let company: Company = await getCompany(token, params.id);
  
  if(typeof(company)=== 'string')
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{company}</h1>
        </div>
      </>
    )

  return(
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header previousPage="/workspace/companies" title="Compañia">
          <></>
        </Header>
        <CompanyProfileCli token={token} companyParam={company} />
        {/* <NavTabAccount idWS="" tab="1" /> */}
        {/* <WorkSpaceCli id="" token={token} workspaceParam={company} /> */}
      </div>
    </>
  )
}