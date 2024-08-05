//import StatisticsHeader from "@/components/expenses/dashboard/StatisticsHeader"
import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
//import DonutChartt from "@/components/expenses/dashboard/DonutChart";
//import { BarChartComponent } from "@/components/expenses/dashboard/BarChartComponent";
import DashBoardContainer from "@/components/expenses/dashboard/DashBoardContainer";
import { GetAllCostsGroupByCOSTOCENTERCATEGORYONLY, GetAllCostsGroupByCOSTOCENTERCONCEPTONLY, GetAllCostsGroupByDAY } from "@/app/api/routeCost"
import { CostsByConceptAndCategory, Costocenter, CostsByDay } from "@/interfaces/DashboardsCosts";

interface OptionsDashboard {
  label: string,
  value: number
}

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const dateCurrent = new Date();
  const dateIni = dateCurrent.getFullYear.toString() + '-' + dateCurrent.getMonth().toString() + '-' + dateCurrent.getDate();
  //const dateEnd = dateCurrent.getFullYear.toString() + '-' + dateCurrent.getMonth().toString() + '-' + dateCurrent.getDate();

  let costsCategory: CostsByConceptAndCategory[] = [];
  try {
    // costsCategory = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLY(token, dateIni, dateIni);
    costsCategory = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLY(token, new Date().toDateString(), new Date().toDateString());
    if(typeof(costsCategory)==='string'){
      return <h1>Error al obtener costos agrupados por categoria!!!</h1>
    }
  } catch (error) {
    return <h1>Error al obtener costos agrupados por categoria!!!</h1>
  }

  let costsConcept: CostsByConceptAndCategory[] = [];
  try {
    // costsCategory = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLY(token, dateIni, dateIni);
    costsConcept = await GetAllCostsGroupByCOSTOCENTERCONCEPTONLY(token, new Date().toDateString(), new Date().toDateString());
    if(typeof(costsConcept)==='string'){
      return <h1>Error al obtener costos agrupados por concepto!!!</h1>
    }
  } catch (error) {
    return <h1>Error al obtener costos agrupados por concepto!!!</h1>
  }

  let costsDays: CostsByDay[] = [];
  try {
    // costsCategory = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLY(token, dateIni, dateIni);
    costsDays = await GetAllCostsGroupByDAY(token, new Date().toDateString(), new Date().toDateString());
    if(typeof(costsDays)==='string'){
      return <h1>Error al obtener costos agrupados por dias!!!</h1>
    }
  } catch (error) {
    return <h1>Error al obtener costos agrupados por dias!!!</h1>
  }

  const optCategories: OptionsDashboard[] = [];
  const optConcepts: OptionsDashboard[] = [];
  const optDays: OptionsDashboard[] = [];

  costsCategory.map((cc) => {
    optCategories.push({
      label: cc.costocenter.category ?? '',
      value: cc.subtotalCost
    })
  });

  costsConcept.map((cc) => {
    optConcepts.push({
      label: cc.costocenter.concept ?? '',
      value: cc.subtotalCost
    })
  });

  costsDays.map((cc) => {
    optDays.push({
      label: cc.date ?? '',
      value: cc.subtotalCost
    })
  })
  //console.log('costs category => ', costsCategory);

  return (
    <>
      <Navigation user={user} />
      <DashBoardContainer token={token} costsCategories={optCategories} costsConcepts={optConcepts} costsDays={optDays} />
      {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <StatisticsHeader />
        <div className="mt-5 grid grid-cols-2 gap-x-5">
          <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
            <div className="flex mb-3 gap-x-2 justify-between">
              <p>CENTRO DE COSTOS</p>
              <p>Categorias</p>
            </div>
            <DonutChartt />
          </div>
        </div>
        <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <BarChartComponent />
        </div>
      </div> */}
    </>
  )
}
