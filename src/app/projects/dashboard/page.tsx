import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardContainer from "@/components/projects/dashboard/DashboardContainer";
import ComponentError from "@/components/ComponentError";

import { getDashboardProjectsAmount, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT, 
  getDashboardByProjectAndType, getDashboardListProjectsNotComplete, 
  getDashboardListProjectsByDate, getDashboardListProjectsTop10, 
  getDashboardProjectTotalCost, getConfigMin, getProjectsLV, getLenghtProjectsEvaluacion,
  getDashboardProjectsByFeaturesGuaranteeFund, getDashboardProjectsByFeaturesAmountCharge, 
  getDashboardProjectsByFeaturesTaxes } 
from "@/app/api/routeProjects";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [amountProjects, listProjectsdate, projectsClient, projectsSegment, projectsStatus,
    projectsProgress, listProjectsnotCompleted, projectsandTypes, projectsTop10,
    projectsTotalCost, configMin, projects, numEvaluacion, totGuaranteeFund, totAmountCharge, totTaxes, resresource] = await Promise.all([
      getDashboardProjectsAmount(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardListProjectsByDate(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectsByClient(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectsBySEGMENT(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectsByESTATUS(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectsByPROGRESS(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardListProjectsNotComplete(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardByProjectAndType(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardListProjectsTop10(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectTotalCost(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getConfigMin(token),
      getProjectsLV(token),
      getLenghtProjectsEvaluacion(token),
      getDashboardProjectsByFeaturesGuaranteeFund(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectsByFeaturesAmountCharge(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getDashboardProjectsByFeaturesTaxes(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString(), []),
      getAllResourcesByROL(token, user.rol?._id?? ''),
    ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }
    
  if(typeof(amountProjects)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{amountProjects} amountprojects</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={amountProjects} />
      </>
    )
  }
  
  if(typeof(listProjectsdate)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{listProjectsdate} list</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={listProjectsdate} />
      </>
    )
  }
  
  if(typeof(projectsClient)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsClient} cleint</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={projectsClient} />
      </>
    )
  }

  if(typeof(projectsSegment)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsSegment} segment</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={projectsSegment} />
      </>
    )
  }
  
  if(typeof(projectsStatus)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsStatus} status</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={projectsStatus} />
      </>
    )
  }
  
  if(typeof(projectsProgress)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsProgress} progress</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={projectsProgress} />
      </>
    )
  }
  
  if(typeof(listProjectsnotCompleted)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{listProjectsnotCompleted} list not completed</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={listProjectsnotCompleted} />
      </>
    )
  }
  
  if(typeof(projectsandTypes)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsandTypes} list</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={projectsandTypes} />
      </>
    )
  }
  
  if(typeof(projectsTop10)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{projectsTop10} list</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={projectsTop10} />
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
        <ComponentError page="/projects/dashboard" message={projectsTotalCost} />
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
        <ComponentError page="/projects/dashboard" message={configMin} />
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
        <ComponentError page="/projects/dashboard" message={projects} />
      </>
    )
  }

  if(typeof(totGuaranteeFund)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totGuaranteeFund}</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={totGuaranteeFund} />
      </>
    )
  }

  if(typeof(totAmountCharge)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totAmountCharge}</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={totAmountCharge} />
      </>
    )
  }

  if(typeof(totTaxes)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totTaxes}</h1>
        </div> */}
        <ComponentError page="/projects/dashboard" message={totTaxes} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <DashBoardContainer token={token} amountProjects={amountProjects} listProjects={listProjectsdate} 
        projectsClient={projectsClient} projectsProgress={projectsProgress} 
        projectsSegment={projectsSegment} projectsStatus={projectsStatus} projectsTop10={projectsTop10}
        listProjectsnotCompleted={listProjectsnotCompleted} numEvaluado={numEvaluacion}
        projectsTotalCost={projectsTotalCost} configMin={configMin}
        totalFeaturesAC={totAmountCharge} totalFeaturesGF={totGuaranteeFund} totalFeaturesT={totTaxes} 
        projects={[{
          label: 'Todos',
          value: 'all'
        }, ...projects]} />
    </>
  )
}
