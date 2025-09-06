import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCompaniesLV } from "../api/routeCompany";
import { getDepartmentsLV } from "../api/routeDepartments";
import { Options } from "@/interfaces/Common";
import { getProjectsLVNoCompleted } from "../api/routeProjects";
import { GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, 
  GetAllReportsWithUSERAndNEConditionMIN
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

  // let reports: ReportParse[] = [];
  // let optCompanies: Options[] = [];
  // let optDepartments: Options[] = [];
  // let optProjects:Options[];
  let optProjectsFilter: Options[] = [{
      label: 'TODOS',
      value: 'all'
    }]
  // let catalogs: GlossaryCatalog[];
  
  // if(typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')){
  //   reports = await GetAllReportsWithUSERAndNEConditionMIN(token, user._id);
  // }else{
  //   reports = await GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id);
  // }

  // optCompanies = await getCompaniesLV(token);
  // optDepartments = await getDepartmentsLV(token);
  // optProjects = await getProjectsLVNoCompleted(token);
  // catalogs = await getCatalogsByName(token, 'reports');

  const [reports, optCompanies, optDepartments, optProjects, catalogs]=await Promise.all([
    typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')? 
      GetAllReportsWithUSERAndNEConditionMIN(token, user._id): GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id),
      getCompaniesLV(token),
      getDepartmentsLV(token),
      getProjectsLVNoCompleted(token),
      getCatalogsByName(token, 'reports')
  ]);
  
  if(typeof(reports)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-lg text-center text-red-500">{reports}</h1>
      </>
    )
  }

  let optCompaniesFilter: Options[] = [{
    label: 'TODAS',
    value: 'all'
  }]

  optCompaniesFilter = optCompaniesFilter.concat(optCompanies);

  if(typeof(optProjects)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
      </>
    )
  }

  optProjectsFilter = optProjectsFilter.concat(optProjects);

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
      </>
    )
  }

  const condition = catalogs[0].condition[0].glossary._id;

  const optConditions:Options[] = [];
  const optConditionsFilter: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  catalogs[0].condition.map((cond:any) => {
    let c = {
      label: cond.glossary.name,
      value: cond.glossary._id
    }
    optConditions.push(c);
    optConditionsFilter.push(c);
  });

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