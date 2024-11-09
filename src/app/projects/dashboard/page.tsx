import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardContainer from "@/components/projects/dashboard/DashboardContainer";
import { Options } from "@/interfaces/Common";

import { getDashboardProjectsAmount, getDashboardListProjects, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT, 
  getDashboardByProjectAndType, getDashboardListProjectsNotComplete, 
  getDashboardListProjectsByDate, getDashboardListProjectsTop10, 
  getDashboardProjectTotalCost, getConfigMin, getProjectsBudgeted, 
  getProjectsControlBudgeted, getProjectsSpent, getProjectsLV } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ListProjects, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects, 
  CostsByProjectAndType, ProjectsNotCompleted, ListProjectsByDate, 
  ProjectsTop10, DashboardTotalCost, ConfigMin, ControlBudgeted } 
from "@/interfaces/DashboardProjects";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let amountProjects: TotalAmountProjects[] = [];
  try {
    // amountProjects = await getDashboardProjectsAmount(token, new Date().toDateString(), new Date().toDateString());
    amountProjects = await getDashboardProjectsAmount(token, '2024-01-01', '2024-10-30', []);
    if(typeof(amountProjects)==='string'){
      return <h1>{amountProjects} amount</h1>
    }
  } catch (error) {
    return <h1>Error al obtener monto total de proyectos!!!</h1>
  }

  // let listProjects: ListProjects[] = [];
  // try {
  //   // listProjects = await getDashboardListProjects(token, new Date().toDateString(), new Date().toDateString());
  //   listProjects = await getDashboardListProjects(token, '2024-01-01', '2024-10-30');
  //   if(typeof(listProjects)==='string'){
  //     return <h1>{listProjects} list</h1>
  //   }
  // } catch (error) {
  //   return <h1>Error al obtener lista de proyectos!!!</h1>
  // }

  let listProjectsdate: ListProjectsByDate[] = [];
  try {
    // listProjects = await getDashboardListProjects(token, new Date().toDateString(), new Date().toDateString());
    listProjectsdate = await getDashboardListProjectsByDate(token, '2024-01-01', '2024-10-30', []);
    if(typeof(listProjectsdate)==='string'){
      return <h1>{listProjectsdate} list</h1>
    }
  } catch (error) {
    return <h1>Error al obtener lista de proyectos!!!</h1>
  }

  let projectsClient: ProjectsByClient[] = [];
  try {
    // projectsClient = await getDashboardProjectsByClient(token, new Date().toDateString(), new Date().toDateString());
    projectsClient = await getDashboardProjectsByClient(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsClient)==='string'){
      return <h1>{projectsClient} cleint</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por clientes!!!</h1>
  }

  let projectsSegment: ProjectsBySegment[] = [];
  try {
    projectsSegment = await getDashboardProjectsBySEGMENT(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsSegment)==='string'){
      return <h1>{projectsSegment} segment</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por segmento!!!</h1>
  }

  let projectsStatus: ProjectsByStatus[] = [];
  try {
    projectsStatus = await getDashboardProjectsByESTATUS(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsStatus)==='string'){
      return <h1>{projectsStatus} status</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por estatus!!!</h1>
  }

  let projectsProgress: ProjectsByProgress[] = [];
  try {
    projectsProgress = await getDashboardProjectsByPROGRESS(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsProgress)==='string'){
      return <h1>{projectsProgress} progress</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por progreso!!!</h1>
  }

  let listProjectsnotCompleted: ProjectsNotCompleted[] = [];
  try {
    listProjectsnotCompleted = await getDashboardListProjectsNotComplete(token, '2024-01-01', '2024-10-30', []);
    if(typeof(listProjectsnotCompleted)==='string'){
      return <h1>{listProjectsnotCompleted} list not completed</h1>
    }
  } catch (error) {
    return <h1>Error al obtener lista de proyectos no completos!!!</h1>
  }

  let projectsandTypes: CostsByProjectAndType[] = [];
  try {
    projectsandTypes = await getDashboardByProjectAndType(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsandTypes)==='string'){
      return <h1>{projectsandTypes} list</h1>
    }
  } catch (error) {
    return <h1>Error al obtener costos por proyecto y tipo!!!</h1>
  }

  let projectsTop10: ProjectsTop10[] = [];
  try {
    projectsTop10 = await getDashboardListProjectsTop10(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsTop10)==='string'){
      return <h1>{projectsTop10} list</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos top 10!!!</h1>
  }

  let projectsTotalCost: DashboardTotalCost[] = [];
  try {
    projectsTotalCost = await getDashboardProjectTotalCost(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsTotalCost)==='string'){
      return <h1>{projectsTotalCost} list</h1>
    }
  } catch (error) {
    return <h1>Error al obtener costo total de los proyectos!!!</h1>
  }

  let configMin: ConfigMin[] = [];
  try {
    configMin = await getConfigMin(token);
    if(typeof(configMin)==='string'){
      return <h1>{configMin}</h1>
    }
  } catch (error) {
    return <h1>Error al obtener configuracion!!!</h1>
  }

  let projectsBudgeted: ControlBudgeted[] = [];
  try {
    projectsBudgeted = await getProjectsBudgeted(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsBudgeted)==='string'){
      return <h1>{projectsBudgeted}</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos presupuestados!!!</h1>
  }

  let projectsSpent: ControlBudgeted[] = [];
  try {
    projectsSpent = await getProjectsSpent(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsSpent)==='string'){
      return <h1>{projectsSpent}</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos por gastos!!!</h1>
  }

  let projectsControlBudgeted: ControlBudgeted[] = [];
  try {
    projectsControlBudgeted = await getProjectsControlBudgeted(token, '2024-01-01', '2024-10-30', []);
    if(typeof(projectsControlBudgeted)==='string'){
      return <h1>{projectsControlBudgeted}</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos por control presupuestal!!!</h1>
  }

  let projects: Options[] = [];
  try {
    projects = await getProjectsLV(token);
    if(typeof(projects)==='string'){
      return <h1>{projects}</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos!!!</h1>
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
