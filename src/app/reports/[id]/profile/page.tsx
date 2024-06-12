import { Options } from "@/interfaces/Common";
import { Company } from "@/interfaces/Companies";
import { getCompanies } from "@/app/api/routeCompany";
import { Department } from "@/interfaces/Departments";
import { getDepartments } from "@/app/api/routeDepartments";
import { Project } from "@/interfaces/Projects";
import { getProjects } from "@/app/api/routeProjects";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import ArrowReturn from "@/components/ArrowReturn";
import Selectize from "@/components/Selectize";
import NavTab from "@/components/reports/NavTab";
import ReportClient from "@/components/reports/ReportClient";
import { GetReport, GetReports } from "@/app/api/routeReports";
import { Report } from "@/interfaces/Reports";
import { getCostByReport } from "@/app/api/routeReports";
import { Expense } from "@/interfaces/Expenses";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let report: Report;
  try {
    report = await GetReport(token, params.id);
    if(typeof(report)==='string'){
      return <h1 className="text-center text-lg text-red">{report}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-lg text-red">Error al consultar reporte!!</h1>
  }
  
  let reports: Report[] = [];
  try {
    reports = await GetReports(token);
    if(typeof(reports)==='string'){
      return <h1 className="text-lg text-center text-red-500">{reports}</h1>
    }
  } catch (error) {
    return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
  }

  const optReports:Options[] = [];
  reports.map((rep) => {
    optReports.push({
      label: rep.name,
      value: rep._id
    });
  });

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

  let costs:Expense[] = [];
  try {
    costs = await getCostByReport(params.id, token);
    if(typeof(costs)==='string') 
      return <h1 className="text-center text-lg text-red">{costs}</h1>
  } catch (error) {
    return <h1 className="text-center text-lg text-red">Error al consultar los costos del reporte!</h1>
  }

  //console.log('costos del reporte!! ', costs);
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/reports" />
            <p className="text-xl ml-4 font-medium">{report.name}</p>
          </div>
          <Selectize options={optReports} routePage="reports" subpath="/profile" />
        </div>
        <NavTab idRep={params.id} tab='1' />
        <ReportClient report={report} token={token} id={params.id} 
          companies={optCompanies} departments={optDepartments}
          projects={optProjects} expenses={costs}
        />
      </div>
    </>
  )
}