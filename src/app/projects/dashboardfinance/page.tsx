import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardFinanceContainer from "@/components/projects/dashboard/DashboardFinanceContainer";

import { getDashboardProjectsAmount, 
  getDashboardByProjectAndType, getDashboardListProjectsByDate, 
  getDashboardProjectTotalCost, getConfigMin, getProjectsBudgeted, 
  getProjectsControlBudgeted, getProjectsSpent, getProjectsLV, getAllPaymentsProjects } 
from "@/app/api/routeProjects";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [amountProjects, listProjectsdate, projectsandTypes, projectsTotalCost, configMin,
    projectsBudgeted, projectsSpent, projectsControlBudgeted, projects, allPaymentsProjects, resresource] = await Promise.all([
      getDashboardProjectsAmount(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardListProjectsByDate(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardByProjectAndType(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectTotalCost(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getConfigMin(token),
      getProjectsBudgeted(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getProjectsSpent(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getProjectsControlBudgeted(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getProjectsLV(token),
      getAllPaymentsProjects(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
      getAllResourcesByROL(token, user.rol?._id?? ''),
    ]); 

  if(typeof(resresource)==='string'){
        return (
          <>
            <ComponentError page="/" message={resresource} />
          </>
        )
      }
  
  if(typeof(allPaymentsProjects) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{allPaymentsProjects}</h1>
        </div> */}
        <ComponentError page="/projects/dashboardfinance" message={allPaymentsProjects} />
      </>
    )
  }
    
  if(typeof(amountProjects)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{amountProjects} amount</h1>
        </div> */}
        <ComponentError page="/projects/dashboardfinance" message={amountProjects} />
      </>
    )
  }
  
  if(typeof(projectsTotalCost)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsTotalCost} list</h1>
        </div> */}
        <ComponentError page="/projects/dashboardfinance" message={projectsTotalCost} />
      </>
    )
  }
  
  if(typeof(configMin)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{configMin}</h1>
        </div> */}
        <ComponentError page="/projects/dashboardfinance" message={configMin} />
      </>
    )
  }

  if(typeof(projectsBudgeted)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsBudgeted}</h1>
        </div> */}
        <ComponentError page="/projects/dashboardfinance" message={projectsBudgeted} />
      </>
    )
  }
  
  if(typeof(projectsSpent)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsSpent}</h1>
        </div>         */}
        <ComponentError page="/projects/dashboardfinance" message={projectsSpent} />
      </>
    )
  }
  
  if(typeof(projectsControlBudgeted)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsControlBudgeted}</h1>
        </div> */}
        <ComponentError page="/projects/dashboardfinance" message={projectsControlBudgeted} />
      </>
    )
  }
  
  if(typeof(projects)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projects}</h1>
        </div> */}
        <ComponentError page="/projects/dashboardfinance" message={projects} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
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
