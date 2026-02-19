import WithOut from "@/components/WithOut"
import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCompaniesLV } from "../../api/routeCompany";
import { Options } from "@/interfaces/Common";
import { getProjectsLV } from "../../api/routeProjects";
import { GetReportsMin, GetReportsByUserMin} from "../../api/routeReports";
import { ReportTable } from "@/interfaces/Reports";
import { ReportParseDataToTableData } from "../../functions/ReportsFunctions";
import { getCatalogsByName } from "../../api/routeCatalogs";
import ContainerClient from "@/components/reports/ContainerClient";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let optProjectsFilter: Options[] = [{
      label: 'TODOS',
      value: 'all'
    }]
    
  const [reports, optCompanies, optProjects, catalogs]=await Promise.all([
    typeof(user.department)!=='string' && user.department.name.toLowerCase().includes('direccion')? 
      GetReportsMin(token) : (typeof(user.department)!=='string' && user.department.name.toLowerCase().includes('obras') ?
      GetReportsByUserMin(token, user._id) : GetReportsMin(token)),
    getCompaniesLV(token),
    getProjectsLV(token),
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

  if(typeof(optProjects)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
      </>
    )
  }

  let optCompaniesFilter: Options[] = [{
    label: 'TODAS',
    value: 'all'
  }]

  optCompaniesFilter = optCompaniesFilter.concat(optCompanies);

  optProjectsFilter = optProjectsFilter.concat(optProjects);

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
      </>
    )
  }

  const optConditionsFilter: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  catalogs[0].condition.map((cond:any) => {
    let c = {
      label: cond.glossary.name,
      value: cond.glossary._id
    }
    optConditionsFilter.push(c);
  });

  if(!reports || reports.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/costs.svg" subtitle="Informes"
            text="No cuentas con un historial de informes!!"
            title="Informes">
              <></>
          </WithOut>
        </div>
      </>
    )
  }

  const table: ReportTable[] = ReportParseDataToTableData(reports, true);

  return (
    <>
      <Navigation user={user} />
      <ContainerClient data={table} optCompaniesFilter={optCompaniesFilter} 
          optConditionsFilter={optConditionsFilter} condition="" optCompanies={[]}
          optDepartments={[]} optProjects={[]} user={user} isHistory={true}
          optProjectsFilter={optProjectsFilter} reports={reports} token={token} 
          optReps={[]} />
    </>
  )
}
