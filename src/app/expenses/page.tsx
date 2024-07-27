import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
// import { getCostoCentersLV } from "../api/routeCostCenter";
import { CostoCenterLV, ReportByCostcenter, ReportByCostcenterCategory } from "@/interfaces/CostCenter";
import { Options } from "@/interfaces/Common";
import ButtonNew from "@/components/expenses/ButtonNew";
import { getProvidersLV, getProvidersSATLV } from "../api/routeProviders";
// import { getUsersLV } from "../api/routeUser";
// import { getProjectsLV } from "../api/routeProjects";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import { getAllCostsByCondition, GetVatsLV, GetCostsGroupByProject, 
  GetCostsGroupByType, GetCostsGroupByCostoCenterConcept, GetCostsGroupByCostoCenterCategory } from "../api/routeCost";
//import { CurrencyFormatter } from "../functions/Globals";
// import { getCatalogsByNameAndCategory, getCatalogsByNameAndCondition, getCatalogsByNameAndType } from "../api/routeCatalogs";
// import { GetReportsMin, GetReportsByUserMin } from "../api/routeReports";
// import { ReportParse } from "@/interfaces/Reports";
import ContainerClient from "@/components/expenses/ContainerClient";
//import { getTypeFiles } from "../functions/CostsFunctions";
//import { ReportByProject, CostGroupByType } from "@/interfaces/ReportsOfCosts";
//import { CostByCostCenter } from "@/components/ReportCostByCostCenterPDF";
import { ExpenseDataToTableData } from "../functions/CostsFunctions";
//import { GetAllCostsGroupByProjectOnly } from "../api/routeCost";
//import { ReportCostsByProjectOnly } from "@/interfaces/ReportsOfCosts";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const role = user.rol?.name || '';
  const isViewReports = role.toLowerCase().includes('residente')? false: true;

  //console.log('role => ', role);
  //console.log('is view reports =>', isViewReports);
  
  let expenses: Expense[] = [];
  try {
    expenses = await getAllCostsByCondition(token);
    if(typeof(expenses)=== 'string')
      return <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
  } catch (error) {
    console.log('page expanses ', error);
    return <h1 className="text-lg text-red-500 text-center">Error al obtener costos!!</h1>
  }

  // let costcenters: CostoCenterLV[];
  // try {
  //   costcenters = await getCostoCentersLV(token);
  //   if(typeof(costcenters)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
  // }

  // const optCostCenter:Options[]= [];
  // const optCostCenterFilter:Options[]= [{
  //   label: 'TODOS',
  //   value: 'all'
  // }];
  
  // costcenters.map((costcenter) => {
  //   optCostCenter.push({
  //     label: costcenter.label || 'sin categoria',
  //     value: costcenter.categoryid + '/' + costcenter.value
  //   });
  //   optCostCenterFilter.push({
  //     label: costcenter.label || 'sin categoria',
  //     value: costcenter.value
  //   });
  // });
  
  // let optProviders:Options[]= [];
  // try {
  //   optProviders = await getProvidersLV(token);
  //   if(typeof(optProviders)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{optProviders}</h1>
  //   }
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores!!</h1>
  // }

  // let optProvidersSAT:Options[]= [];
  // try {
  //   optProvidersSAT = await getProvidersSATLV(token);
  //   if(typeof(optProvidersSAT)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{optProvidersSAT}</h1>
  //   }
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores del sat!!</h1>
  // }

  // let optResponsibles:Options[]= [];
  // try {
  //   optResponsibles = await getUsersLV(token);
  //   if(typeof(optResponsibles)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{optResponsibles}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los usuarios!!</h1>
  // }

  // let reports: ReportParse[];
  // try {
  //   if(user.rol && (user.rol?.name.toLowerCase().includes('admin') || user.rol?.name.toLowerCase().includes('superadmin'))){
  //     reports = await GetReportsMin(token);
  //   }else{
  //     reports = await GetReportsByUserMin(token, user._id);
  //   }
    
  //   if(typeof(reports)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{reports}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los reportes!!</h1>
  // }

  // const optReports:Options[]= [];
  // const optReportsFilter:Options[] = [{
  //   label: 'TODOS',
  //   value: 'all'
  // }]
  // reports.map((rep) => {
  //   const r = {
  //     label: rep.name,
  //     value: rep._id
  //   }
  //   optReports.push(r);
  //   optReportsFilter.push(r);
  // });

  // let optProjects:Options[];
  // let optProjectFilter: Options[] = [{
  //     label: 'TODOS',
  //     value: 'all'
  //   }]
  // try {
  //   optProjects = await getProjectsLV(token);
  //   if(typeof(optProjects)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  // }

  // optProjectFilter = optProjectFilter.concat(optProjects);

  // let optCategories: Options[] = [];
  // try {
  //   optCategories = await getCatalogsByNameAndCategory(token, 'cost');
  //   if(typeof(optCategories)==='string') return <h1 className="text-red-500 text-center text-lg">{optCategories}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }  

  // const optCategoriesFilter = [{
  //   label: 'TODOS',
  //   value: 'all'
  // }].concat(optCategories);
  
  // let optTypes: Options[] = [];
  // try {
  //   optTypes = await getCatalogsByNameAndType(token, 'cost');
  //   if(typeof(optTypes)==='string') return <h1 className="text-red-500 text-center text-lg">{optTypes}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }
  // const optTypeFilter: Options[] = [{
  //   label: 'TODOS',
  //   value: 'all'
  // }].concat(optTypes);

  // let optConditions: Options[] = [];
  // try {
  //   optConditions = await getCatalogsByNameAndCondition(token, 'cost');
  //   if(typeof(optConditions)==='string') return <h1 className="text-red-500 text-center text-lg">{optConditions}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }

  // const optConditionsFilter: Options[] = [{
  //   label: 'TODOS',
  //   value: 'all'
  // }].concat(optConditions);

  // const idValidado = optConditions.find((cond) => cond.label.toLowerCase().includes('validado'))?.value || '';
  //const idValidado = '';
  //let labour:string = '';
  //let ticket:string = '';

  //labour = optCategories.find((cat) => cat.label.toLowerCase().includes('mano de obra'))?.value || '';
  //ticket = optCategories.find((cat) => cat.label.toLowerCase().includes('ticket'))?.value || '';

  //labour = '';
  //ticket = '';

  // let optVats: Options[];
  // try {
  //   optVats = await GetVatsLV(token);
  //   if(typeof(optVats)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{optVats}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los ivas!!</h1>
  // }

  if(!expenses || expenses.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/gastos.svg" subtitle="Gastos"
            text="Agrega el costo de mano de obra,
                  caja chica o proveedor desde esta
                  seccion a un determinado proyecto"
            title="Gastos">
              <ButtonNew token={token} user={user} />
          </WithOut>
        </div>
      </>
    )
  }

  const table: ExpensesTable[] = ExpenseDataToTableData(expenses);

  // let reportsProject: ReportByProject[];
  // try {
  //   reportsProject = await GetCostsGroupByProject(token);
  //   //console.log('reports projects page => ', reportsProject);
  //   if(typeof(reportsProject)==='string'){
  //     return <h1>Error al consultar costos por proyecto!!</h1>
  //   }
  // } catch (error) {
  //   return <h1>Error al consultar costos por proyecto!!</h1>
  // }

  // let costTypes: CostGroupByType[];
  // try {
  //   costTypes = await GetCostsGroupByType(token);
  //   //console.log('reports projects page => ', costTypes);
  //   if(typeof(costTypes)==='string'){
  //     return <h1>Error al consultar costos por tipo!!</h1>
  //   }
  // } catch (error) {
  //   return <h1>Error al consultar costos por tipo!!</h1>
  // }

  let costCostoCenter: ReportByCostcenter[] = [];
  try {
    costCostoCenter = await GetCostsGroupByCostoCenterConcept(token);
    if(typeof(costCostoCenter)==='string'){
      return <h1>Error al consultar costos por centro de costos!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por centro de costos!!</h1>
  }

  let costCostoCenterCategory: ReportByCostcenterCategory[] = [];
  try {
    costCostoCenterCategory = await GetCostsGroupByCostoCenterCategory(token);
    if(typeof(costCostoCenter)==='string'){
      return <h1>Error al consultar costos por centro de costos!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por centro de costos!!</h1>
  }
  //console.log('res costo center category => ', costCostoCenterCategory);

  // let reportProjectOnly: ReportCostsByProjectOnly[] = [];
  // try {
  //   reportProjectOnly = await GetAllCostsGroupByProjectOnly(token);
  //   //console.log('reports projects page => ', costCostoCenter);
  //   if(typeof(reportProjectOnly)==='string'){
  //     return <h1>Error al consultar costos por proyecto!!</h1>
  //   }
  // } catch (error) {
  //   return <h1>Error al consultar costos por proyecto!!</h1>
  // }

  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} expenses={expenses}
        token={token} user={user} costCostoCenter={costCostoCenter} 
        costCostoCenterCategory={costCostoCenterCategory} isViewReports={isViewReports} />
    </>
  )
}