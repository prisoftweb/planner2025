import WithOut from "@/components/WithOut"
import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCompaniesLV } from "../../api/routeCompany";
import { Options } from "@/interfaces/Common";
import { getProjectsLV } from "../../api/routeProjects";
import { GetReportsMin, GetReportsByUserMin} from "../../api/routeReports";
import { ReportParse, ReportTable } from "@/interfaces/Reports";
import { ReportParseDataToTableData } from "../../functions/ReportsFunctions";
import { getCatalogsByName } from "../../api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import ContainerClient from "@/components/reports/ContainerClient";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let reports: ReportParse[] = [];
  try {
    if(typeof(user.department)!=='string' && user.department.name.toLowerCase().includes('direccion')){
      reports = await GetReportsMin(token);
    }else{
      reports = await GetReportsByUserMin(token, user._id);
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

  const optConditionsFilter: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  catalogs[0].condition.map((cond) => {
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

  const table: ReportTable[] = ReportParseDataToTableData(reports);

  return (
    <>
      <Navigation user={user} />
      <ContainerClient data={table} optCompaniesFilter={optCompaniesFilter} 
          optConditionsFilter={optConditionsFilter} condition="" optCompanies={[]}
          optDepartments={[]} optProjects={[]} user="" isHistory={true}
          optProjectsFilter={optProjectsFilter} reports={reports} token={token} />
    </>
  )
}
