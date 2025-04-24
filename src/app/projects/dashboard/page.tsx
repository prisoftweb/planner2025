import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardContainer from "@/components/projects/dashboard/DashboardContainer";
import { Options } from "@/interfaces/Common";

import { getDashboardProjectsAmount, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT, 
  getDashboardByProjectAndType, getDashboardListProjectsNotComplete, 
  getDashboardListProjectsByDate, getDashboardListProjectsTop10, 
  getDashboardProjectTotalCost, getConfigMin, getProjectsBudgeted, 
  getProjectsControlBudgeted, getProjectsSpent, getProjectsLV } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects, 
  CostsByProjectAndType, ProjectsNotCompleted, ListProjectsByDate, 
  ProjectsTop10, DashboardTotalCost, ConfigMin, ControlBudgeted } 
from "@/interfaces/DashboardProjects";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let amountProjects: TotalAmountProjects[] =  await getDashboardProjectsAmount(token, '2024-01-01', '2024-10-30', []);
  let listProjectsdate: ListProjectsByDate[] = await getDashboardListProjectsByDate(token, '2024-01-01', '2024-10-30', []);
  let projectsClient: ProjectsByClient[] = await getDashboardProjectsByClient(token, '2024-01-01', '2024-10-30', []);
  let projectsSegment: ProjectsBySegment[] = await getDashboardProjectsBySEGMENT(token, '2024-01-01', '2024-10-30', []);
  let projectsStatus: ProjectsByStatus[] = await getDashboardProjectsByESTATUS(token, '2024-01-01', '2024-10-30', []);
  let projectsProgress: ProjectsByProgress[] = await getDashboardProjectsByPROGRESS(token, '2024-01-01', '2024-10-30', []);
  let listProjectsnotCompleted: ProjectsNotCompleted[] = await getDashboardListProjectsNotComplete(token, '2024-01-01', '2024-10-30', []);
  let projectsandTypes: CostsByProjectAndType[] = await getDashboardByProjectAndType(token, '2024-01-01', '2024-10-30', []);
  let projectsTop10: ProjectsTop10[] = await getDashboardListProjectsTop10(token, '2024-01-01', '2024-10-30', []);
  let projectsTotalCost: DashboardTotalCost[] = await getDashboardProjectTotalCost(token, '2024-01-01', '2024-10-30', []);
  let configMin: ConfigMin[] = await getConfigMin(token);
  let projectsBudgeted: ControlBudgeted[] = await getProjectsBudgeted(token, '2024-01-01', '2024-10-30', []);
  let projectsSpent: ControlBudgeted[] = await getProjectsSpent(token, '2024-01-01', '2024-10-30', []);
  let projectsControlBudgeted: ControlBudgeted[] = await getProjectsControlBudgeted(token, '2024-01-01', '2024-10-30', []);
  let projects: Options[] = await getProjectsLV(token);
    
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
  
  if(typeof(listProjectsdate)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{listProjectsdate} list</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projectsClient)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsClient} cleint</h1>
        </div>
      </>
    )
  }

  if(typeof(projectsSegment)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsSegment} segment</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projectsStatus)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsStatus} status</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projectsProgress)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsProgress} progress</h1>
        </div>
      </>
    )
  }
  
  if(typeof(listProjectsnotCompleted)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{listProjectsnotCompleted} list not completed</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projectsandTypes)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsandTypes} list</h1>
        </div>
      </>
    )
  }
  
  if(typeof(projectsTop10)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsTop10} list</h1>
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
      <DashBoardContainer token={token} amountProjects={amountProjects} listProjects={listProjectsdate} 
        projectsClient={projectsClient} projectsProgress={projectsProgress} 
        projectsSegment={projectsSegment} projectsStatus={projectsStatus} projectsTop10={projectsTop10}
        listProjectsnotCompleted={listProjectsnotCompleted} projectsandTypes={projectsandTypes}
        projectsTotalCost={projectsTotalCost} configMin={configMin} projectsBudgeted={projectsBudgeted}
        projectsControlBudgeted={projectsControlBudgeted} projectsSpent={projectsSpent} 
        projects={[{
          label: 'Todos',
          value: 'all'
        }, ...projects]} />
    </>
  )
}
