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
import { GetReports, GetReportsMin, GetReportsByUserMin, GetReportsLastMovInDept } from "../api/routeReports";
import { Report, ReportParse, ReportTable } from "@/interfaces/Reports";
//import Header from "@/components/Header";
//import TableReports from "@/components/reports/TableReports";
import { ReportDataToTableData, ReportParseDataToTableData } from "../functions/ReportsFunctions";
import { getCatalogsByName } from "../api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import ContainerClient from "@/components/reports/ContainerClient";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  //let reports: Report[] = [];
  let reports: ReportParse[] = [];
  try {
    //console.log(user.department.name.toLowerCase());
    if(typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')){
      reports = await GetReportsByUserMin(token, user._id);
      console.log('rep por usuario!! => ', reports);
      //consultar por usuario y por departamento
      //console.log('by user');
    }else{
      if(user.department.name.toLowerCase().includes('direccion')){
        //reports = await GetReports(token);
        reports = await GetReportsMin(token);
        console.log('rep por min!! => ', reports);
      }else{
        //console.log('by dept');
        //reports = await GetReportsByDept(token, typeof(user.department)==='string' ? user.department : user.department._id);
        reports = await GetReportsLastMovInDept(token, typeof(user.department)==='string' ? user.department : user.department._id);
        console.log('rep por ultimo dept!! => ', reports);
      }
    }
    //reports = await GetReports(token);
    if(typeof(reports)==='string'){
      return <h1 className="text-lg text-center text-red-500">{reports}</h1>
    }
  } catch (error) {
    return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
  }
  
  // try {
  //   reports = await GetReportsByDept(token, typeof(user.department)==='string' ? user.department : user.department._id);
  //   if(typeof(reports)==='string'){
  //     return <h1 className="text-lg text-center text-red-500">{reports}</h1>
  //   }
  // } catch (error) {
  //   return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar informes!!</h1>
  // }

  // try {
  //   reports = await GetReportsByUser(token, user._id);
  //   if(typeof(reports)==='string'){
  //     return <h1 className="text-lg text-center text-red-500">{reports}</h1>
  //   }
  // } catch (error) {
  //   return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar informes!!</h1>
  // }
  
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
  const optProjectsFilter: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  projects.map((project) => {
    let p = {
      label: project.title,
      value: project._id
    }
    optProjects.push(p);
    optProjectsFilter.push(p);
  });

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

  const optCompanies: Options[] = [];
  const optCompaniesFilter: Options[] = [{
    label: 'Todas',
    value: 'all'
  }];
  companies.map((company) => {
    let c = {
      label: company.name,
      value: company._id
    };
    optCompanies.push(c);
    optCompaniesFilter.push(c);
  });

  const optDepartments: Options[] = [];

  departments.map((department) => {
    let d = {
      label: department.name,
      value: department._id
    }
    optDepartments.push(d);
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

  //const table: ReportTable[] = ReportDataToTableData(reports);
  const table: ReportTable[] = ReportParseDataToTableData(reports);

  return (
    <>
      <Navigation user={user} />
      <ContainerClient data={table} condition={condition} optCompanies={optCompanies} 
          optCompaniesFilter={optCompaniesFilter} optConditionsFilter={optConditionsFilter}
          optDepartments={optDepartments} optProjects={optProjects} 
          optProjectsFilter={optProjectsFilter} reports={reports} token={token} user={user._id} />
      {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Informes" placeHolder="Buscar Informe.." >
          <ButtonNew companies={optCompanies} departments={optDepartments} 
              projects={optProjects} token={token} condition={condition} user={user._id}
          />
        </Header>
        <div className="mt-5">
          <TableReports data={table} optConditions={optConditionsFilter} 
              reports={reports} token={token} optCompanies={optCompaniesFilter} 
              optProjects={optProjectsFilter} />
        </div>
      </div> */}
    </>
  )
}
