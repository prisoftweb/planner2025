import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardFinanceContainer from "@/components/projects/dashboard/DashboardFinanceContainer";
import { Options } from "@/interfaces/Common";

import { getDashboardProjectsAmount, 
  getDashboardByProjectAndType, getDashboardListProjectsByDate, 
  getDashboardProjectTotalCost, getConfigMin, getProjectsBudgeted, 
  getProjectsControlBudgeted, getProjectsSpent, getProjectsLV, getAllPaymentsProjects } 
from "@/app/api/routeProjects";

import { TotalAmountProjects, 
  CostsByProjectAndType, ListProjectsByDate, 
  DashboardTotalCost, ConfigMin, ControlBudgeted, ITotalPaymentsProyects } 
from "@/interfaces/DashboardProjects";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let amountProjects: TotalAmountProjects[] =  await getDashboardProjectsAmount(token, '2024-01-01', '2024-10-30', []);
  let listProjectsdate: ListProjectsByDate[] = await getDashboardListProjectsByDate(token, '2024-01-01', '2024-10-30', []);
  let projectsandTypes: CostsByProjectAndType[] = await getDashboardByProjectAndType(token, '2024-01-01', '2024-10-30', []);
  let projectsTotalCost: DashboardTotalCost[] = await getDashboardProjectTotalCost(token, '2024-01-01', '2024-10-30', []);
  let configMin: ConfigMin[] = await getConfigMin(token);
  let projectsBudgeted: ControlBudgeted[] = await getProjectsBudgeted(token, '2024-01-01', '2024-10-30', []);
  let projectsSpent: ControlBudgeted[] = await getProjectsSpent(token, '2024-01-01', '2024-10-30', []);
  let projectsControlBudgeted: ControlBudgeted[] = await getProjectsControlBudgeted(token, '2024-01-01', '2024-10-30', []);
  let projects: Options[] = await getProjectsLV(token);

  let allPaymentsProjects: ITotalPaymentsProyects[] = await getAllPaymentsProjects(token, '2024-01-01', '2024-10-30');
  if(typeof(allPaymentsProjects) === "string"){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{allPaymentsProjects}</h1>
        </div>
      </>
    )
  }
    
  if(typeof(amountProjects)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{amountProjects} amount</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projectsTotalCost)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsTotalCost} list</h1>
        </div>
      </>
    )
  }
  
  if(typeof(configMin)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{configMin}</h1>
        </div>
      </>
    )
  }

  if(typeof(projectsBudgeted)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsBudgeted}</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projectsSpent)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsSpent}</h1>
        </div>        
      </>
    )
  }
  
  if(typeof(projectsControlBudgeted)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsControlBudgeted}</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projects)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projects}</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation user={user} />
      <DashBoardFinanceContainer token={token} amountProjects={amountProjects} listProjects={listProjectsdate} 
        projectsandTypes={projectsandTypes} projectsTotalCost={projectsTotalCost} configMin={configMin} 
        projectsBudgeted={projectsBudgeted} projectsControlBudgeted={projectsControlBudgeted} 
        projectsSpent={projectsSpent} totalPaymentsProjects={allPaymentsProjects}
        projects={[{
          label: 'Todos',
          value: 'all'
        }, ...projects]} />
    </>
  )
}
