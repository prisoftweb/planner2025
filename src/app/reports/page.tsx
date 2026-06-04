import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCompaniesLV } from "../api/routeCompany";
import { getDepartmentsLV } from "../api/routeDepartments";
import { Options } from "@/interfaces/Common";
import { getProjectsLVNoCompleted } from "../api/routeProjects";
import { GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, 
  GetAllReportsWithUSERAndNEConditionMIN, getAllReportsNE3ConditionsLV
 } from "../api/routeReports";
import { ReportTable } from "@/interfaces/Reports";
import { ReportParseDataToTableData } from "../functions/ReportsFunctions";
import { getCatalogsByName } from "../api/routeCatalogs";
import ContainerClient from "@/components/reports/ContainerClient";
import ComponentError from "@/components/ComponentError";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let optProjectsFilter: Options[] = [{
      label: 'TODOS',
      value: 'all'
    }]
  
  const [reports, optCompanies, optDepartments, optProjects, catalogs, optReps]=await Promise.all([
    typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')? 
      GetAllReportsWithUSERAndNEConditionMIN(token, user._id): GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id),
      getCompaniesLV(token),
      getDepartmentsLV(token),
      getProjectsLVNoCompleted(token),
      getCatalogsByName(token, 'reports'), 
      getAllReportsNE3ConditionsLV(token)
  ]);
  
  if(typeof(reports)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-lg text-center text-red-500">{reports} rep</h1> */}
        <ComponentError page="/reports" message={reports} />
      </>
    )
  }

  if(typeof(optReps)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-lg text-center text-red-500">{optReps} opr</h1> */}
        <ComponentError page="/reports" message={optReps} />
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
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-lg text-red-500">{optProjects} opp</h1> */}
        <ComponentError page="/reports" message={optProjects} />
      </>
    )
  }

  optProjectsFilter = optProjectsFilter.concat(optProjects);

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-red-500 text-center text-lg">{catalogs} cat</h1> */}
        <ComponentError page="/reports" message={catalogs} />
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
      <Navigation user={user} token={token} />
      <ContainerClient data={table} condition={condition} optCompanies={optCompanies} 
          optCompaniesFilter={optCompaniesFilter} optConditionsFilter={optConditionsFilter}
          optDepartments={optDepartments} optProjects={optProjects} optReps={optReps} 
          optProjectsFilter={optProjectsFilter} reports={reports} token={token} user={user} />
    </>
  )
}