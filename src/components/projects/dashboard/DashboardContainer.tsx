'use client'
import { useState, useEffect } from "react"
import DonutChartComponent from "./DonutChartComponent"
import { BarChartComponent } from "./BarChartComponent"
import PieChartComponent from "./PieChartComponent"
import { ProgressBarComponent } from "./ProgressBarComponent"
import HeaderDashboardPage from "./HeaderDashboardPage"

import { getDashboardProjectsAmount, getDashboardListProjects, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ListProjects, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects } 
from "@/interfaces/DashboardProjects";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function DashBoardContainer({token, amountProjects, listProjects, 
    projectsClient, projectsProgress, projectsSegment, projectsStatus}:
  {token: string, amountProjects: TotalAmountProjects[], listProjects: ListProjects[], 
    projectsClient: ProjectsByClient[], projectsSegment: ProjectsBySegment[], projectsStatus: ProjectsByStatus[], 
    projectsProgress: ProjectsByProgress[] }) {
  
  // const [dataProjectsStatus, setDataProjectsStatus] = useState<OptionsDashboard[]>([]);
  const [stateListProjects, setStateListProjects] = useState<ListProjects[]>(listProjects);
  const [stateProjectsClient, setStateProjectsClient] = useState<ProjectsByClient[]>(projectsClient);
  const [stateProjectsSegment, setStateProjectsSegment] = useState<ProjectsBySegment[]>(projectsSegment);
  const [totalAmount, setTotalAmount] = useState<TotalAmountProjects[]>(amountProjects);
  const [stateProjectsStatus, setStateProjectsStatus] = useState<ProjectsByStatus[]>(projectsStatus);
  const [stateProjectsProgress, setStateProjectsProgress] = useState<ProjectsByProgress[]>(projectsProgress);


  // useEffect(() => {
  //   const optProjectsStatus: OptionsDashboard[] = [];

  //   projectsStatus.map((prj) => {
  //     optProjectsStatus.push({
  //       costo: prj.porcentage,
  //       label: prj.client
  //     });
  //   });

  //   setDataProjectsStatus(optProjectsStatus);
  // }, []);

  const fetchData = async (dateS: string, dateE: string) => {
    let amountPrjs: TotalAmountProjects[] = [];
    try {
      amountPrjs = await getDashboardProjectsAmount(token, dateS, dateE);
      if(typeof(amountPrjs)==='string'){
        return <h1>{amountPrjs}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener monto total de proyectos!!!</h1>
    }

    let listPrjs: ListProjects[] = [];
    try {
      listPrjs = await getDashboardListProjects(token, dateS, dateE);
      if(typeof(listPrjs)==='string'){
        return <h1>{listPrjs}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener lista de proyectos!!!</h1>
    }

    let prjsClient: ProjectsByClient[] = [];
    try {
      prjsClient = await getDashboardProjectsByClient(token, dateS, dateE);
      if(typeof(prjsClient)==='string'){
        return <h1>{prjsClient}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos agrupados por clientes!!!</h1>
    }

    let prjsSegment: ProjectsBySegment[] = [];
    try {
      prjsSegment = await getDashboardProjectsBySEGMENT(token, dateS, dateE);
      if(typeof(prjsSegment)==='string'){
        return <h1>{prjsSegment}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos agrupados por segmento!!!</h1>
    }

    let prjStatus: ProjectsByStatus[] = [];
    try {
      prjStatus = await getDashboardProjectsByESTATUS(token, dateS, dateE);
      if(typeof(prjStatus)==='string'){
        return <h1>{prjStatus}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos agrupados por estatus!!!</h1>
    }

    let prjsProgress: ProjectsByProgress[] = [];
    try {
      prjsProgress = await getDashboardProjectsByPROGRESS(token, dateS, dateE);
      if(typeof(prjsProgress)==='string'){
        return <h1>{prjsProgress}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos agrupados por progreso!!!</h1>
    }

    setStateListProjects(listPrjs);
    setStateProjectsClient(prjsClient);
    setStateProjectsSegment(prjsSegment);
    setTotalAmount(amountPrjs);
    setStateProjectsStatus(prjStatus);
    setStateProjectsProgress(prjsProgress);
  }

  // const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];
  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const dataProjectsStatus: OptionsDashboard[] = [];
  const categoriesStatus: string[] = [];

  stateProjectsStatus.map((prj) => {
    dataProjectsStatus.push({
      costo: prj.porcentage,
      label: prj.client
    });
    categoriesStatus.push(prj.client);
  });

  const dataProjectsSegment: OptionsDashboard[] = [];
  const categoriesSegment: string[] = [];

  stateProjectsSegment.map((prj) => {
    dataProjectsSegment.push({
      costo: prj.porcentage,
      label: prj.client
    });
    categoriesSegment.push(prj.client);
  });

  const dataListProjects: OptionsDashboard[] = [];
  
  stateListProjects.map((prj) => {
    dataListProjects.push({
      costo: prj.amount,
      label: prj.title
    });
    categoriesSegment.push(prj.title);
  });

  const dataProjectsClient: OptionsDashboard[] = [];
  const categoriesClient: string[] = [];

  stateProjectsClient.map((prj) => {
    dataProjectsClient.push({
      costo: prj.porcentage,
      label: prj.client
    });
    categoriesClient.push(prj.client);
  });

  const dataProjectsProgress: OptionsDashboard[] = [];
  
  stateProjectsProgress.map((prj) => {
    dataProjectsProgress.push({
      costo: prj.porcentage,
      label: prj.title
    });
  });

  return (
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <HeaderDashboardPage amountProjects={totalAmount} handleDate={fetchData} />
      {/* <StatisticsHeader handleDate={fetchData} projects={projects} costsResumen={costsByResumen} 
        costsResumenType={costsByResumenType} /> */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>AVANCE DE PROYECTOS ACTIVOS</p>
          </div>
          {dataProjectsProgress.map((prj) => (
            <ProgressBarComponent label={prj.label} progress={prj.costo} key={prj.label} />
          ))}
        </div>
        
        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>ESTATUS</p>
            {/* <p>Categorias</p> */}
          </div>
          <DonutChartComponent data={dataProjectsStatus} colors={colors} category="costo"
              categories={categoriesStatus}  />
        </div>

        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>PROYECTOS POR SEGMENTO</p>
            {/* <p>Categorias</p> */}
          </div>
          <DonutChartComponent data={dataProjectsSegment} colors={colors} category="costo"
              categories={categoriesSegment}  />
        </div>

        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>TOTAL PROJECTS   | Montos de proyectos</p>
            {/* <p>Categorias</p> */}
          </div>
          <BarChartComponent categories={['costo']} colors={colors} data={dataListProjects} />
        </div>

        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>PROYECTOS POR SEGMENTO</p>
            {/* <p>Categorias</p> */}
          </div>
          <PieChartComponent data={dataProjectsClient} colors={colors} category="costo"
              categories={categoriesClient}  />
        </div>
      </div>
      {/* <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <BarChartComponent categories={['costo']} colors={colors} data={costsByDay} />
      </div> */}
    </div>
  )
}