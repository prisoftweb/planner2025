import WithOut from "@/components/WithOut"
import Navigation from "@/components/navigation/Navigation"
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCompanies } from "../api/routeCompany";
import { getDepartments } from "../api/routeDepartments";
import { Options } from "@/interfaces/Common";
import { Department } from "@/interfaces/Departments";
import { Company } from "@/interfaces/Companies";
import { Project } from "@/interfaces/Projects";
import { getProjects } from "../api/routeProjects";
import ButtonNew from "@/components/reports/ButtonNew";
import { GetReports } from "../api/routeReports";
import { Report, ReportTable } from "@/interfaces/Reports";
import Header from "@/components/Header";
import TableReports from "@/components/reports/TableReports";
import { ReportDataToTableData } from "../functions/ReportsFunctions";
import { getCatalogsByName } from "../api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let reports: Report[] = [];
  try {
    reports = await GetReports(token);
    if(typeof(reports)==='string'){
      return <h1 className="text-lg text-center text-red-500">{reports}</h1>
    }
  } catch (error) {
    return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
  }
  
  let companies: Company[] = [];
  try {
    companies = await getCompanies(token);
  } catch (error) {
    return <h1 className="text-center text-lg text-red">Error al consultar las compañias</h1>
  }

  let departments: Department[] = [];
  try {
    departments = await getDepartments(token);
  } catch (error) {
    return <h1 className="text-center text-lg text-red">Error al consultar los departamentos</h1>
  }

  let projects:Project[] = [];
  try {
    projects = await getProjects(token);
  } catch (error) {
    return <h1 className="text-center text-lg text-red">Error al consultar los proyectos</h1>
  }

  const optProjects: Options[] = [];
  projects.map((project) => {
    optProjects.push({
      label: project.title,
      value: project._id
    });
  });

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'reports');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const condition = catalogs[0].condition[0].glossary._id;

  const optCompanies: Options[] = [];
  companies.map((company) => {
    optCompanies.push({
      label: company.name,
      value: company._id
    });
  });

  const optDepartments: Options[] = [];
  departments.map((department) => {
    optDepartments.push({
      label: department.name,
      value: department._id
    });
  });

  if(!reports || reports.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/costs.svg" subtitle="Informes"
            text="Agrega informes de caja chica,
                  para el control de costos"
            title="Informes">
              <ButtonNew companies={optCompanies} departments={optDepartments} 
                projects={optProjects} token={token} condition={condition} user={user._id}
              />
          </WithOut>
        </div>
      </>
    )
  }

  const table: ReportTable[] = ReportDataToTableData(reports);

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Informes" placeHolder="Buscar Informe.." >
          <ButtonNew companies={optCompanies} departments={optDepartments} 
              projects={optProjects} token={token} condition={condition} user={user._id}
          />
        </Header>
        <div className="mt-5">
          <TableReports data={table} optCategories={[]} optConditions={[]} 
              optTypes={[]} reports={reports} token={token} />
        </div>
      </div>
    </>
  )
}
