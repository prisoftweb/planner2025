'use client'
import { useState } from "react"
import DonutChartComponent from "./DonutChartComponent"
import { BarChartComponent } from "./BarChartComponent"
import PieChartComponent from "./PieChartComponent"
import { ProgressBarComponent } from "./ProgressBarComponent"
import HeaderDashboardPage from "./HeaderDashboardPage"
import { BarChartTreeInOne } from "./BarChartTreeInOne"

import { getDashboardProjectsAmount, getDashboardListProjects, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT,
  getDashboardByProjectAndType, getDashboardListProjectsNotComplete, 
  getDashboardListProjectsByDate } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ListProjects, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects, 
  CostsByProjectAndType, ProjectsNotCompleted, ListProjectsByDate } 
from "@/interfaces/DashboardProjects";

interface OptionsDashboard {
  label: string,
  costo: number
}

export interface DataProjectsByType {
  //project: "PROVEEDOR" | "MANO DE OBRA" | "OTROS"
  project: string
  issues: Issue[]
}

export interface Issue {
  status: any
  value: number
  percentage: number
}

function transformProjectsTypesToDataChart(dataProjects: CostsByProjectAndType[][]){
  const res: DataProjectsByType[] = [];
  dataProjects.map((arrData) => {
    const r: Issue[] = [];
    arrData.map((prj) => {
      r.push({
        percentage: prj.quantity,
        status: prj.type,
        value: prj.subtotalCost
      });
    });
    res.push({
      project: arrData[0].project,
      issues: r,
    });
  });

  return res;
}

export default function DashBoardContainer({token, amountProjects, listProjects, 
    projectsClient, projectsProgress, projectsSegment, projectsStatus, listProjectsnotCompleted, projectsandTypes}:
  {token: string, amountProjects: TotalAmountProjects[], listProjects: ListProjectsByDate[], 
    projectsClient: ProjectsByClient[], projectsSegment: ProjectsBySegment[], projectsStatus: ProjectsByStatus[], 
    projectsProgress: ProjectsByProgress[], listProjectsnotCompleted: ProjectsNotCompleted[], 
    projectsandTypes: CostsByProjectAndType[] }) {
  
  // const [dataProjectsStatus, setDataProjectsStatus] = useState<OptionsDashboard[]>([]);
  const [stateListProjects, setStateListProjects] = useState<ListProjectsByDate[]>(listProjects);
  const [stateProjectsClient, setStateProjectsClient] = useState<ProjectsByClient[]>(projectsClient);
  const [stateProjectsSegment, setStateProjectsSegment] = useState<ProjectsBySegment[]>(projectsSegment);
  const [totalAmount, setTotalAmount] = useState<TotalAmountProjects[]>(amountProjects);
  const [stateProjectsStatus, setStateProjectsStatus] = useState<ProjectsByStatus[]>(projectsStatus);
  const [stateProjectsProgress, setStateProjectsProgress] = useState<ProjectsByProgress[]>(projectsProgress);
  const [stateProjectsNotCompleted, setStateProjectsNotCompleted] = useState<ProjectsNotCompleted[]>(listProjectsnotCompleted);  
  const [stateProjectsAndType, setStateProjectsAndType] = useState<CostsByProjectAndType[]>(projectsandTypes);

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

    // let listPrjs: ListProjects[] = [];
    // try {
    //   listPrjs = await getDashboardListProjects(token, dateS, dateE);
    //   if(typeof(listPrjs)==='string'){
    //     return <h1>{listPrjs}</h1>
    //   }
    // } catch (error) {
    //   return <h1>Error al obtener lista de proyectos!!!</h1>
    // }

    let listPrjsDate: ListProjectsByDate[] = [];
    try {
      listPrjsDate = await getDashboardListProjectsByDate(token, dateS, dateE);
      if(typeof(listPrjsDate)==='string'){
        return <h1>{listPrjsDate}</h1>
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

    let listprjnotCompleted: ProjectsNotCompleted[] = [];
    try {
      listprjnotCompleted = await getDashboardListProjectsNotComplete(token, dateS, dateE);
      if(typeof(listprjnotCompleted)==='string'){
        return <h1>{listprjnotCompleted} list not completed</h1>
      }
    } catch (error) {
      return <h1>Error al obtener lista de proyectos no completos!!!</h1>
    }

    let prjandTypes: CostsByProjectAndType[] = [];
    try {
      prjandTypes = await getDashboardByProjectAndType(token, dateS, dateE);
      if(typeof(prjandTypes)==='string'){
        return <h1>{prjandTypes} list</h1>
      }
    } catch (error) {
      return <h1>Error al obtener costos por proyecto y tipo!!!</h1>
    }

    setStateListProjects(listPrjsDate);
    setStateProjectsClient(prjsClient);
    setStateProjectsSegment(prjsSegment);
    setTotalAmount(amountPrjs);
    setStateProjectsStatus(prjStatus);
    setStateProjectsProgress(prjsProgress);
    setStateProjectsNotCompleted(listprjnotCompleted);
    setStateProjectsAndType(prjandTypes);
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

  const dataListProjectsNotCompleted: OptionsDashboard[] = [];
  
  stateProjectsNotCompleted.map((prj) => {
    dataListProjectsNotCompleted.push({
      costo: prj.amount,
      label: prj.title
    });
  });

  const dataProjectsAndTypes: OptionsDashboard[] = [];
  const categoriesProjectsAndTypes: string[] = [];

  stateProjectsAndType.map((prj) => {
    dataProjectsAndTypes.push({
      costo: prj.subtotalCost,
      label: prj.project
    });
    categoriesProjectsAndTypes.push(prj.project);
  });

  //const projectsGroup = Object.groupBy(stateProjectsAndType, ({ project }) => project);
  //Array.prototype.group(stateProjectsAndType, ({ project }) => project)
  //console.log(projectsGroup);

  // const fruits = [
  //   {
  //       fruit_name: "Apple",
  //       fruit_color: "Red",
  //   },
  //   {
  //       fruit_name: "Pomegranate",
  //       fruit_color: "Red",
  //   },
  //   {
  //       fruit_name: "Grapes",
  //       fruit_color: "Green",
  //   },
  //   {
  //       fruit_name: "Kiwi",
  //       fruit_color: "Green",
  //   },
  // ];

  // const groupedByColor = fruits.reduce((acc: any, fruit) => {
  //     const color = fruit.fruit_color;
  //     (acc[color] = acc[color] || []).push(fruit);
  //     return acc;
  // }, {});

  // const resultArray = Object.values(groupedByColor);
  // console.log(resultArray);

  const groupedByProject = stateProjectsAndType.reduce((acc: any, prj) => {
      const project = prj.project;
      (acc[project] = acc[project] || []).push(prj);
      return acc;
  }, {});

  const resultArray: CostsByProjectAndType[][] = Object.values(groupedByProject);
  console.log(resultArray);

  const resParse = transformProjectsTypesToDataChart(resultArray);
  console.log('res parse +> ', resParse);

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
            <p>TOTAL PROJECTS NOT COMPLETED | Montos de proyectos</p>
            {/* <p>Categorias</p> */}
          </div>
          <BarChartComponent categories={['costo']} colors={colors} data={dataListProjectsNotCompleted} />
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
      
      <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <BarChartTreeInOne data={resParse} />
      </div>
      {/* <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <BarChartComponent categories={['costo']} colors={colors} data={costsByDay} />
      </div> */}
    </div>
  )
}