import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
//import DashBoardContainer from "@/components/expenses/dashboard/DashBoardContainer";
import { Options } from "@/interfaces/Common";
import DashBoardContainer from "@/components/projects/dashboard/DashboardContainer";

import { getDashboardProjectsAmount, getDashboardListProjects, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ListProjects, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects } 
from "@/interfaces/DashboardProjects";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let amountProjects: TotalAmountProjects[] = [];
  try {
    // amountProjects = await getDashboardProjectsAmount(token, new Date().toDateString(), new Date().toDateString());
    amountProjects = await getDashboardProjectsAmount(token, '2024-01-01', '2024-10-30');
    if(typeof(amountProjects)==='string'){
      return <h1>{amountProjects} amount</h1>
    }
  } catch (error) {
    return <h1>Error al obtener monto total de proyectos!!!</h1>
  }

  let listProjects: ListProjects[] = [];
  try {
    // listProjects = await getDashboardListProjects(token, new Date().toDateString(), new Date().toDateString());
    listProjects = await getDashboardListProjects(token, '2024-01-01', '2024-10-30');
    if(typeof(listProjects)==='string'){
      return <h1>{listProjects} list</h1>
    }
  } catch (error) {
    return <h1>Error al obtener lista de proyectos!!!</h1>
  }

  let projectsClient: ProjectsByClient[] = [];
  try {
    // projectsClient = await getDashboardProjectsByClient(token, new Date().toDateString(), new Date().toDateString());
    projectsClient = await getDashboardProjectsByClient(token, '2024-01-01', '2024-10-30');
    if(typeof(projectsClient)==='string'){
      return <h1>{projectsClient} cleint</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por clientes!!!</h1>
  }

  let projectsSegment: ProjectsBySegment[] = [];
  try {
    projectsSegment = await getDashboardProjectsBySEGMENT(token, '2024-01-01', '2024-10-30');
    if(typeof(projectsSegment)==='string'){
      return <h1>{projectsSegment} segment</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por segmento!!!</h1>
  }

  let projectsStatus: ProjectsByStatus[] = [];
  try {
    projectsStatus = await getDashboardProjectsByESTATUS(token, '2024-01-01', '2024-10-30');
    if(typeof(projectsStatus)==='string'){
      return <h1>{projectsStatus} status</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por estatus!!!</h1>
  }

  let projectsProgress: ProjectsByProgress[] = [];
  try {
    projectsProgress = await getDashboardProjectsByPROGRESS(token, '2024-01-01', '2024-10-30');
    if(typeof(projectsProgress)==='string'){
      return <h1>{projectsProgress} progress</h1>
    }
  } catch (error) {
    return <h1>Error al obtener proyectos agrupados por progreso!!!</h1>
  }

  return (
    <>
      <Navigation user={user} />
      <DashBoardContainer token={token} amountProjects={amountProjects} listProjects={listProjects} 
        projectsClient={projectsClient} projectsProgress={projectsProgress} 
        projectsSegment={projectsSegment} projectsStatus={projectsStatus} />
    </>
  )
}
