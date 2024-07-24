import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import { getCostoCenters } from "../../api/routeCostCenter";
import { CostCenter, ReportByCostcenter, ReportByCostcenterCategory } from "@/interfaces/CostCenter";
import { Options } from "@/interfaces/Common";
//import ButtonNew from "@/components/expenses/ButtonNew";
//import { getProviders } from "../../api/routeProviders";
//import { Provider } from "@/interfaces/Providers";
//import { getUsers } from "../../api/routeUser";
import { getProjectsLV } from "../../api/routeProjects";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import { GetCostsMIN, GetVatsLV, GetCostsGroupByProject, GetCostsGroupByType, 
  GetCostsGroupByCostoCenterConcept, GetCostsGroupByCostoCenterCategory } from "../../api/routeCost";
//import { CurrencyFormatter } from "../../functions/Globals";
import { getCatalogsByName } from "../../api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { GetReportsMin, GetReportsByUserMin } from "../../api/routeReports";
import { ReportParse } from "@/interfaces/Reports";
import ContainerClient from "@/components/expenses/ContainerClient";
import { ExpenseDataToTableData, getTypeFiles } from "../../functions/CostsFunctions";
import { ReportByProject, CostGroupByType } from "@/interfaces/ReportsOfCosts";
//import { CostsDataToTableData } from "@/app/functions/ReportsFunctions";
//import { CostByCostCenter } from "@/components/ReportCostByCostCenterPDF";
import { GetAllCostsGroupByProjectOnly } from "../../api/routeCost";
import { ReportCostsByProjectOnly } from "@/interfaces/ReportsOfCosts";


export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const role = user.rol?.name || '';
  const isViewReports = role.toLowerCase().includes('residente')? false: true;

  let expenses: Expense[] = [];
  try {
    expenses = await GetCostsMIN(token);
    if(typeof(expenses)=== 'string')
      return <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
  } catch (error) {
    console.log('page expanses ', error);
    return <h1 className="text-lg text-red-500 text-center">Error al obtener costos!!</h1>
  }

  let costcenters: CostCenter[];
  try {
    costcenters = await getCostoCenters(token);
    if(typeof(costcenters)==='string'){
      return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
  }

  const optCostCenter:Options[]= [];
  const optCostCenterDeductible:Options[] = [];
  const optCostCenterFilter:Options[]= [{
    label: 'TODOS',
    value: 'all'
  }];
  costcenters.map((costcenter) => {
    costcenter.categorys.map((category) => {
      optCostCenterFilter.push({
        label: category.concept.name + ' ( ' + costcenter.name + ' ) ',
        value: category.concept._id
      });
    })
  });

  const optProviders:Options[]= [];

  const optResponsibles:Options[]= [];

  let reports: ReportParse[];
  try {
    if(user.rol && (user.rol?.name.toLowerCase().includes('admin') || user.rol?.name.toLowerCase().includes('superadmin'))){
      reports = await GetReportsMin(token);
    }else{
      reports = await GetReportsByUserMin(token, user._id);
    }
    
    if(typeof(reports)==='string'){
      return <h1 className="text-center text-lg text-red-500">{reports}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los reportes!!</h1>
  }

  const optReports:Options[]= [];
  const optReportsFilter:Options[] = [{
    label: 'TODOS',
    value: 'all'
  }]
  reports.map((rep) => {
    optReportsFilter.push({
      label: rep.name,
      value: rep._id
    });
  });

  let optProjects:Options[] = [];
  let optProjectFilter: Options[] = []
  try {
    optProjectFilter = await getProjectsLV(token);
    if(typeof(optProjectFilter)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optProjectFilter}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  }
  optProjectFilter.unshift({
        label: 'TODOS',
        value: 'all'
      })
 
  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'cost');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const optCategories: Options[] = [];
  const optCategoriesFilter: Options[] = [{
    label: 'TODOS',
    value: 'all'
  }];
  //const optCategories: Options[] = [];
  let labour:string = '';
  let ticket:string = '';
  catalogs[0].categorys.map((category) => {
    optCategoriesFilter.push({
        label: category.glossary.name,
        value: category.glossary._id
      });
  })

  const optTypes: Options[] = [];
  const optTypeFilter: Options[] = [{
    label: 'TODOS',
    value: 'all'
  }];
  catalogs[0].types.map((type) => {
    optTypeFilter.push({
      label: type.glossary.name,
      value: type.glossary._id
    });
  })

  const optConditions: Options[] = [];
  const optConditionsFilter: Options[] = [{
    label: 'TODOS',
    value: 'all'
  }];
  //const optConditions: Options[] = [];
  catalogs[0].condition.map((condition) => {
    optConditionsFilter.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    });
  })

  let optVats: Options[];
  try {
    optVats = await GetVatsLV(token);
    if(typeof(optVats)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optVats}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los ivas!!</h1>
  }

  if(!expenses || expenses.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/gastos.svg" subtitle="Gastos"
            text="El historial de gastos actualmente esta vacio!!!"
            title="Gastos">
              <></>
          </WithOut>
        </div>
      </>
    )
  }

  let costCostoCenter: ReportByCostcenter[] = [];
  try {
    costCostoCenter = await GetCostsGroupByCostoCenterConcept(token);
    //console.log('reports projects page => ', costCostoCenter);
    if(typeof(costCostoCenter)==='string'){
      return <h1>Error al consultar costos por centro de costos!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por centro de costos!!</h1>
  }

  let costCostoCenterCategory: ReportByCostcenterCategory[] = [];
  try {
    costCostoCenterCategory = await GetCostsGroupByCostoCenterCategory(token);
    //console.log('reports projects page => ', costCostoCenter);
    if(typeof(costCostoCenter)==='string'){
      return <h1>Error al consultar costos por centro de costos!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por centro de costos!!</h1>
  }

  const table: ExpensesTable[] = ExpenseDataToTableData(expenses);

  let reportsProject: ReportByProject[];
  try {
    reportsProject = await GetCostsGroupByProject(token);
    if(typeof(reportsProject)==='string'){
      return <h1>Error al consultar costos por proyecto!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por proyecto!!</h1>
  }

  // let costCostoCenterCategory: ReportByCostcenterCategory[] = [];
  // try {
  //   costCostoCenterCategory = await GetCostsGroupByCostoCenterCategory(token);
  //   //console.log('reports projects page => ', costCostoCenter);
  //   if(typeof(costCostoCenter)==='string'){
  //     return <h1>Error al consultar costos por centro de costos!!</h1>
  //   }
  // } catch (error) {
  //   return <h1>Error al consultar costos por centro de costos!!</h1>
  // }

  let costTypes: CostGroupByType[];
  try {
    costTypes = await GetCostsGroupByType(token);
    if(typeof(costTypes)==='string'){
      return <h1>Error al consultar costos por tipo!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por tipo!!</h1>
  }

  let reportProjectOnly: ReportCostsByProjectOnly[] = [];
  try {
    reportProjectOnly = await GetAllCostsGroupByProjectOnly(token);
    //console.log('reports projects page => ', costCostoCenter);
    if(typeof(reportProjectOnly)==='string'){
      return <h1>Error al consultar costos por proyecto!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por proyecto!!</h1>
  }

  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} expenses={expenses} idLabour={labour} idTicket={ticket}
        optCategories={optCategories} optCategoriesFilter={optCategoriesFilter} optConditions={optConditions}
        optConditionsFilter={optConditionsFilter} optCostCenter={optCostCenter} 
        optCostCenterDeductible={optCostCenterDeductible} optCostCenterFilter={optCostCenterFilter}
        optProjectFilter={optProjectFilter} optProjects={optProjects} optProviders={optProviders}
        optReports={optReports} optReportsFilter={optReportsFilter} optResponsibles={optResponsibles}
        optTypeFilter={optTypeFilter} optTypes={optTypes} reports={reports} optVats={optVats} 
        token={token} user={user._id} reportProjects={reportsProject} costsTypes={costTypes}
        idValidado="" costCostoCenter={costCostoCenter} costCostoCenterCategory={costCostoCenterCategory} 
        isViewReports={isViewReports} reportCostProjectOnly={reportProjectOnly} optProvidersSAT={[]} isHistory={true} />
    </>
  )
}
