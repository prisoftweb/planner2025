import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardContainer from "@/components/expenses/dashboard/DashBoardContainer";
import { GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject, GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject, 
  GetAllCostsGroupByDAYAndProject, GetAllCostsGroupByRESUMEN, GetAllCostsGroupByTYPERESUMEN } from "@/app/api/routeCost"
import { CostsByConceptAndCategory, CostsByDay, CostsGroupByResumen, CostsGroupResumenByType } from "@/interfaces/DashboardsCosts";
import { getProjectsLV } from "@/app/api/routeProjects";
import { Options } from "@/interfaces/Common";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let costsCategory: CostsByConceptAndCategory[] = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
  let costsConcept: CostsByConceptAndCategory[] = await GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
  let costsDays: CostsByDay[] = await GetAllCostsGroupByDAYAndProject(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
  let costsResumen: CostsGroupByResumen[] = await GetAllCostsGroupByRESUMEN(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
  let costsResumenType: CostsGroupResumenByType[] = await GetAllCostsGroupByTYPERESUMEN(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
  let projects: Options[] = await getProjectsLV(token);
  
  if(typeof(costsCategory)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{costsCategory}</h1>
        </div>
      </>
    )
  }
  
  if(typeof(costsConcept)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{costsConcept}</h1>
        </div>
      </>
    )
  }
  
  if(typeof(costsDays)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{costsDays}</h1>
        </div>
      </>
    )
  }
  
  if(typeof(costsResumen)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{costsResumen}</h1>
        </div>
      </>
    )
  }
  
  if(typeof(costsResumenType)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{costsResumenType}</h1>
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

  const optCategories: OptionsDashboard[] = [];
  const optConcepts: OptionsDashboard[] = [];
  const optDays: OptionsDashboard[] = [];

  costsCategory.map((cc) => {
    optCategories.push({
      label: cc.costocenter.category ?? '',
      costo: cc.subtotalCost
    })
  });

  costsConcept.map((cc) => {
    optConcepts.push({
      label: cc.costocenter.concept ?? '',
      costo: cc.subtotalCost
    })
  });

  costsDays.map((cc) => {
    optDays.push({
      label: cc.day?.toString() || ' ',
      costo: cc.subtotalCost
    })
  })

  return (
    <>
      <Navigation user={user} />
      <DashBoardContainer token={token} costsCategories={optCategories} 
          costsConcepts={optConcepts} costsDays={optDays} projects={[{
            label: 'TODOS',
            value: 'TODOS'
          }].concat(projects)} costsResumen={costsResumen} costsResumenType={costsResumenType}
          costsCat={costsCategory} costsCon={costsConcept} />
    </>
  )
}
