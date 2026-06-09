import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardContainer from "@/components/expenses/dashboard/DashBoardContainer";
import { GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject, GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject, 
  GetAllCostsGroupByDAYAndProject, GetAllCostsGroupByRESUMEN, GetAllCostsGroupByTYPERESUMEN } from "@/app/api/routeCost"
import { getProjectsLV, getAllCostoCentersCategorysLV } from "@/app/api/routeProjects";
import ComponentError from "@/components/ComponentError";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  // const token='';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [costsCategory, costsConcept, costsDays, costsResumen, costsResumenType, projects, categories] = await Promise.all([
    GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject(token, new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString(), new Date().toDateString(), 'TODOS', []),
    GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject(token, new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString(), new Date().toDateString(), 'TODOS', []),
    GetAllCostsGroupByDAYAndProject(token, new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString(), new Date().toDateString(), 'TODOS', []),
    GetAllCostsGroupByRESUMEN(token, new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString(), new Date().toDateString(), 'TODOS', []),
    GetAllCostsGroupByTYPERESUMEN(token, new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString(), new Date().toDateString(), 'TODOS', []),
    getProjectsLV(token),
    getAllCostoCentersCategorysLV(token)
  ]);
  
  if(typeof(costsCategory)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{costsCategory} cost cat</h1>
        </div> */}
        <ComponentError page="/expenses/dashboard" message={costsCategory} />
      </>
    )
  }
  
  if(typeof(costsConcept)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{costsConcept} cost con</h1>
        </div> */}
        <ComponentError page="/expenses/dashboard" message={costsConcept} />
      </>
    )
  }
  
  if(typeof(costsDays)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{costsDays} cost days</h1>
        </div> */}
        <ComponentError page="/expenses/dashboard" message={costsDays} />
      </>
    )
  }
  
  if(typeof(costsResumen)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{costsResumen} cost res</h1>
        </div> */}
        <ComponentError page="/expenses/dashboard" message={costsResumen} />
      </>
    )
  }
  
  if(typeof(costsResumenType)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{costsResumenType} cost res type</h1>
        </div> */}
        <ComponentError page="/expenses/dashboard" message={costsResumenType} />
      </>
    )
  }
  
  if(typeof(projects)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{projects} projects</h1>
        </div> */}
        <ComponentError page="/expenses/dashboard" message={projects} />
      </>
    )
  }

  const optCategories: OptionsDashboard[] = [];
  const optConcepts: OptionsDashboard[] = [];
  const optDays: OptionsDashboard[] = [];

  costsCategory.map((cc:any) => {
    optCategories.push({
      label: cc.costocenter.category ?? '',
      costo: cc.subtotalCost
    })
  });

  costsConcept.map((cc:any) => {
    optConcepts.push({
      label: cc.costocenter.concept ?? '',
      costo: cc.subtotalCost
    })
  });

  costsDays.map((cc:any) => {
    optDays.push({
      label: cc.day?.toString() || ' ',
      costo: cc.subtotalCost
    })
  });

  return (
    <>
      <Navigation user={user} token={token} />
      <DashBoardContainer token={token} costsCategories={optCategories} 
          costsConcepts={optConcepts} costsDays={optDays} projects={[{
            label: 'TODOS',
            value: 'TODOS'
          }].concat(projects)} costsResumen={costsResumen} costsResumenType={costsResumenType}
          costsCat={costsCategory} costsCon={costsConcept} company={user.profile} categories={categories} />
    </>
  )
}
