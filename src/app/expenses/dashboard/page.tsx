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
  
  let costsCategory: CostsByConceptAndCategory[] = [];
  try {
    costsCategory = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
    if(typeof(costsCategory)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1>{costsCategory}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al obtener costos agrupados por categoria!!!</h1>
      </>
    )
  }

  let costsConcept: CostsByConceptAndCategory[] = [];
  try {
    costsConcept = await GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
    if(typeof(costsConcept)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1>{costsConcept}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al obtener costos agrupados por concepto!!!</h1>
      </>
    )
  }

  let costsDays: CostsByDay[] = [];
  try {
    costsDays = await GetAllCostsGroupByDAYAndProject(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
    if(typeof(costsDays)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1>{costsDays}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al obtener costos agrupados por dias!!!</h1>
      </>
    )
  }

  let costsResumen: CostsGroupByResumen[] = [];
  try {
    costsResumen = await GetAllCostsGroupByRESUMEN(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
    if(typeof(costsResumen)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1>{costsResumen}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al obtener costos agrupados por resumen!!!</h1>
      </>
    )
  }

  let costsResumenType: CostsGroupResumenByType[] = [];
  try {
    costsResumenType = await GetAllCostsGroupByTYPERESUMEN(token, new Date().toDateString(), new Date().toDateString(), 'TODOS');
    if(typeof(costsResumenType)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1>{costsResumenType}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al obtener costos agrupados por resumen y tipo!!!</h1>
      </>
    )
  }

  let projects: Options[] = [];
  try {
    projects = await getProjectsLV(token);
    if(typeof(projects)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1>{projects}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al obtener proyectos!!!</h1>
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
