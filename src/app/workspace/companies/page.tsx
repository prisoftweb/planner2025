import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { IWorkSpace } from "@/interfaces/WorkSpaces";
import Header from "@/components/HeaderPage";
import NavTabAccount from "@/components/workspace/NavTabAccount";
import { getWorkSpacesMin } from "@/app/api/routeWorkspace";
import WorkSpaceCompaniesCli from "@/components/workspace/companies/WorkSpaceCompaniesCli";
import { getCompanies } from "@/app/api/routeCompany";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  // let workSpaces: IWorkSpace[] = await getWorkSpaces(token);

  const [workSpaces, companies] = await Promise.all([
    getWorkSpacesMin(token),
    getCompanies(token)
  ]);
  
  if(typeof(workSpaces)=== 'string')
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{workSpaces}</h1>
        </div>
      </>
    )

  if(typeof(companies)=== 'string')
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{companies}</h1>
        </div>
      </>
    )

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header previousPage="/" title="">
          <></>
        </Header>
        <NavTabAccount idWS="" tab="2" />
        <WorkSpaceCompaniesCli id="" token="" companies={companies} workspace={workSpaces[workSpaces.length-1]} />
      </div>
    </>
  )
}