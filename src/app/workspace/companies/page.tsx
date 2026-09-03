import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import Header from "@/components/HeaderPage";
import NavTabAccount from "@/components/workspace/NavTabAccount";
import { getWorkSpacesMin } from "@/app/api/routeWorkspace";
import WorkSpaceCompaniesCli from "@/components/workspace/companies/WorkSpaceCompaniesCli";
import { getCompaniesByWorkSpace } from "@/app/api/routeCompany";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  // const [workSpaces, companies] = await Promise.all([
  //   getWorkSpacesMin(token),
  //   getCompanies(token)
  // ]);
  // const workSpaces=await getWorkSpacesMin(token);

  const [workSpaces, resresource] = await Promise.all([
        getWorkSpacesMin(token),
        getAllResourcesByROL(token, user.rol?._id?? ''),
      ]);
  
    if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }
  
  if(typeof(workSpaces)=== 'string')
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/workspace/config" message={workSpaces} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{workSpaces}</h1>
        </div> */}
      </>
    )
  
  const companies=await getCompaniesByWorkSpace(token, workSpaces[workSpaces.length-1]._id);

  if(typeof(companies)=== 'string')
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/workspace/config" message={companies} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{companies}</h1>
        </div> */}
      </>
    )

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header previousPage="/" title="">
          <></>
        </Header>
        <NavTabAccount idWS="" tab="2" />
        <WorkSpaceCompaniesCli token={token} companies={companies} 
            workspace={workSpaces[workSpaces.length-1]} idUser={user._id} />
      </div>
    </>
  )
}