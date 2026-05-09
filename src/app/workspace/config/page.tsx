import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";
import Header from "@/components/HeaderPage";
import NavTabAccount from "@/components/workspace/NavTabAccount";
import { getWorkSpacesMin } from "@/app/api/routeWorkspace";
import WorkSpaceConfigCli from "@/components/workspace/config/WorkSpaceConfigCli";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let workSpaces: IWorkSpaceMin[] = await getWorkSpacesMin(token);
    
  if(typeof(workSpaces)=== 'string')
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{workSpaces}</h1>
        </div>
      </>
    )

  return(
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header previousPage="/" title="">
          <></>
        </Header>
        <NavTabAccount idWS="" tab="4" />
        <WorkSpaceConfigCli id="" token=""  workspace={workSpaces[workSpaces.length-1]} />
      </div>
    </>
  )
}