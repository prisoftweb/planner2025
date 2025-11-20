import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { IWorkSpace, ITableWorkSpace } from "@/interfaces/WorkSpaces";
import { getWorkSpaces } from "../api/routeWorkspace";
import ContainerClient from "@/components/expenses/ContainerClient";
import { WorkSpaceDataToTableData } from "../functions/WorkSpaceFunctions";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // const role = user.rol?.name || '';
  // const isViewReports = role.toLowerCase().includes('residente')? false: true;
  
  let workSpaces: IWorkSpace[] = await getWorkSpaces(token);
  
  if(typeof(workSpaces)=== 'string')
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{workSpaces}</h1>
        </div>
      </>
    )

  const table: ITableWorkSpace[] = WorkSpaceDataToTableData(workSpaces);

  return(
    <>
      <Navigation user={user} />
      {/* <ContainerClient data={table} expenses={expenses}
        token={token} user={user} isViewReports={isViewReports} /> */}
    </>
  )
}