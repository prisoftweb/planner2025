import WithOut from "@/components/WithOut"
import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCompaniesLV } from "../api/routeCompany";
import { getDepartmentsLV } from "../api/routeDepartments";
import { Options } from "@/interfaces/Common";
import { getProjectsLV } from "../api/routeProjects";
import ButtonNew from "@/components/reports/ButtonNew";
import { GetReportsMin, GetReportsByUserMin, GetAllReportsMINAndNECondition, 
  GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, GetAllReportsWithUSERAndNEConditionMIN
 } from "../api/routeReports";
import { ReportParse, ReportTable } from "@/interfaces/Reports";
import { ReportParseDataToTableData } from "../functions/ReportsFunctions";
import { getCatalogsByName } from "../api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import ContainerClient from "@/components/reports/ContainerClient";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let reports: ReportParse[] = [];
  try {
    if(typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')){
      //reports = await GetReportsByUserMin(token, user._id);
      reports = await GetAllReportsWithUSERAndNEConditionMIN(token, user._id);
    }else{
      //reports = await GetAllReportsMINAndNECondition(token);
      reports = await GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id);
      // if(user.department.name.toLowerCase().includes('direccion')){
      //   reports = await GetAllReportsMINAndNECondition(token);
      // }else{
      //   reports = await GetReportsMin(token);
      // }
    }
    if(typeof(reports)==='string'){
      return <h1 className="text-lg text-center text-red-500">{reports}</h1>
    }
  } catch (error) {
    return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
  }
  
  let optCompanies: Options[] = [];
  try {
    optCompanies = await getCompaniesLV(token);
  } catch (error) {
    return <h1 className="text-center text-lg text-red">Error al consultar las compañias</h1>
  }

  let optCompaniesFilter: Options[] = [{
    label: 'TODAS',
    value: 'all'
  }]

  optCompaniesFilter = optCompaniesFilter.concat(optCompanies);

  let optDepartments: Options[] = [];
  try {
    optDepartments = await getDepartmentsLV(token);
  } catch (error) {
    return <h1 className="text-center text-lg text-red">Error al consultar los departamentos</h1>
  }

  let optProjects:Options[];
  let optProjectsFilter: Options[] = [{
      label: 'TODOS',
      value: 'all'
    }]
  try {
    optProjects = await getProjectsLV(token);
    if(typeof(optProjects)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  }

  optProjectsFilter = optProjectsFilter.concat(optProjects);

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'reports');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const condition = catalogs[0].condition[0].glossary._id;

  const optConditions:Options[] = [];
  const optConditionsFilter: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  catalogs[0].condition.map((cond) => {
    let c = {
      label: cond.glossary.name,
      value: cond.glossary._id
    }
    optConditions.push(c);
    optConditionsFilter.push(c);
  });

  // if(!reports || reports.length <= 0){
  //   return (
  //     <>
  //       <Navigation user={user} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
  //         <WithOut img="/img/costs/costs.svg" subtitle="Informes"
  //           text="Agrega informes de caja chica,
  //                 para el control de costos"
  //           title="Informes">
  //             <ButtonNew companies={optCompanies} departments={optDepartments} 
  //               projects={optProjects} token={token} condition={condition} user={user._id}
  //             />
  //         </WithOut>
  //       </div>
  //     </>
  //   )
  // }

  const table: ReportTable[] = ReportParseDataToTableData(reports);

  return (
    <>
      <Navigation user={user} />
      <ContainerClient data={table} condition={condition} optCompanies={optCompanies} 
          optCompaniesFilter={optCompaniesFilter} optConditionsFilter={optConditionsFilter}
          optDepartments={optDepartments} optProjects={optProjects} 
          optProjectsFilter={optProjectsFilter} reports={reports} token={token} user={user} />
    </>
  )
}
