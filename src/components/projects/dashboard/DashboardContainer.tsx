'use client'
import { useState } from "react"
import DonutChartComponent from "./DonutChartComponent"
import { BarChartComponent } from "./BarChartComponent"
import PieChartComponent from "./PieChartComponent"
import { ProgressBarComponent } from "./ProgressBarComponent"
import HeaderDashboardPage from "./HeaderDashboardPage"
import { BarChartTreeInOne } from "./BarChartTreeInOne"
import { LineChartComponent } from "./LineChartComponent"
import NewDonutChartComponent from "./NewDonutChartComponent"
import { Options } from "@/interfaces/Common"

import { getDashboardProjectsAmount, getDashboardListProjects, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT,
  getDashboardByProjectAndType, getDashboardListProjectsNotComplete, 
  getDashboardListProjectsByDate, getDashboardListProjectsTop10, 
  getDashboardProjectTotalCost, getConfigMin, getProjectsBudgeted, 
  getProjectsControlBudgeted, getProjectsSpent } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ListProjects, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects, 
  CostsByProjectAndType, ProjectsNotCompleted, ListProjectsByDate, 
  ProjectsTop10, DashboardTotalCost, ConfigMin, ControlBudgeted, DonutChartJS, Dataset } 
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
        percentage: prj.porcentage,
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

export default function DashBoardContainer({token, amountProjects, listProjects, projectsTop10, projectsTotalCost, 
    projectsClient, projectsProgress, projectsSegment, projectsStatus, listProjectsnotCompleted, 
    projectsandTypes, configMin, projectsBudgeted, projectsControlBudgeted, projectsSpent, projects }:
  {token: string, amountProjects: TotalAmountProjects[], listProjects: ListProjectsByDate[], 
    projectsClient: ProjectsByClient[], projectsSegment: ProjectsBySegment[], projectsStatus: ProjectsByStatus[], 
    projectsProgress: ProjectsByProgress[], listProjectsnotCompleted: ProjectsNotCompleted[], 
    projectsandTypes: CostsByProjectAndType[], projectsTop10: ProjectsTop10[], 
    projectsTotalCost: DashboardTotalCost[], configMin: ConfigMin[], projectsBudgeted: ControlBudgeted[], 
    projectsSpent: ControlBudgeted[], projectsControlBudgeted: ControlBudgeted[], projects:Options[] }) {
  
  // const [dataProjectsStatus, setDataProjectsStatus] = useState<OptionsDashboard[]>([]);
  const [stateListProjects, setStateListProjects] = useState<ListProjectsByDate[]>(listProjects);
  const [stateProjectsClient, setStateProjectsClient] = useState<ProjectsByClient[]>(projectsClient);
  const [stateProjectsSegment, setStateProjectsSegment] = useState<ProjectsBySegment[]>(projectsSegment);
  const [totalAmount, setTotalAmount] = useState<TotalAmountProjects[]>(amountProjects);
  const [stateProjectsStatus, setStateProjectsStatus] = useState<ProjectsByStatus[]>(projectsStatus);
  const [stateProjectsProgress, setStateProjectsProgress] = useState<ProjectsByProgress[]>(projectsProgress);
  const [stateProjectsNotCompleted, setStateProjectsNotCompleted] = useState<ProjectsNotCompleted[]>(listProjectsnotCompleted);  
  const [stateProjectsAndType, setStateProjectsAndType] = useState<CostsByProjectAndType[]>(projectsandTypes);
  const [stateProjectsTop10, setStateProjectsTop10] = useState<ProjectsTop10[]>(projectsTop10);
  const [stateTotalCost, setStateTotalCost] = useState<DashboardTotalCost[]>(projectsTotalCost);
  const [stateConfiMin, setStateConfiMin] = useState<ConfigMin[]>(configMin);
  const [stateProjectsBudgeted, setStateProjectsBudgeted] = useState<ControlBudgeted[]>(projectsBudgeted);
  const [stateProjectsSpent, setStateProjectsSpent] = useState<ControlBudgeted[]>(projectsSpent);
  const [stateProjectscontrolBudgeted, setStateProjectsControlBudgeted] = useState<ControlBudgeted[]>(projectsControlBudgeted);

  const fetchData = async (dateS: string, dateE: string, prj: string[]) => {
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

    let prjsTop10: ProjectsTop10[] = [];
    try {
      prjsTop10 = await getDashboardListProjectsTop10(token, '2024-01-01', '2024-10-30');
      if(typeof(prjsTop10)==='string'){
        return <h1>{prjsTop10}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos top 10!!!</h1>
    }

    let totalCost: DashboardTotalCost[] = [];
    try {
      totalCost = await getDashboardProjectTotalCost(token, dateS, dateE);
      if(typeof(totalCost)==='string'){
        return <h1>{totalCost}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener costo total de los proyectos!!!</h1>
    }

    let confMin: ConfigMin[] = [];
    try {
      confMin = await getConfigMin(token);
      if(typeof(confMin)==='string'){
        return <h1>{confMin}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener configuracion!!!</h1>
    }

    let prjsBudgeted: ControlBudgeted[] = [];
    try {
      prjsBudgeted = await getProjectsBudgeted(token, dateS, dateE);
      if(typeof(prjsBudgeted)==='string'){
        return <h1>{prjsBudgeted}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos presupuestados!!!</h1>
    }

    let prjsSpent: ControlBudgeted[] = [];
    try {
      prjsSpent = await getProjectsSpent(token, dateS, dateE);
      if(typeof(prjsSpent)==='string'){
        return <h1>{prjsSpent}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos por gastos!!!</h1>
    }

    let prjsControlBudgeted: ControlBudgeted[] = [];
    try {
      prjsControlBudgeted = await getProjectsControlBudgeted(token, dateS, dateE);
      if(typeof(prjsControlBudgeted)==='string'){
        return <h1>{prjsControlBudgeted}</h1>
      }
    } catch (error) {
      return <h1>Error al obtener proyectos por control presupuestal!!!</h1>
    }

    if(prj.includes('all')){
      setStateListProjects(listPrjsDate);
      setStateProjectsClient(prjsClient);
      setStateProjectsSegment(prjsSegment);
      setTotalAmount(amountPrjs);
      setStateProjectsStatus(prjStatus);
      setStateProjectsProgress(prjsProgress);
      setStateProjectsNotCompleted(listprjnotCompleted);
      setStateProjectsAndType(prjandTypes);
      setStateProjectsTop10(prjsTop10);
      setStateTotalCost(totalCost);
      setStateConfiMin(confMin);
      setStateProjectsSpent(prjsSpent);
      setStateProjectsControlBudgeted(prjsControlBudgeted);
      setStateProjectsBudgeted(prjsBudgeted);
    }else{
      let auxListPrj = listPrjsDate.filter((p) => !prj.includes(p._id));

      console.log('data primer grafico => ', listPrjsDate);
      console.log('data filtrada => ', auxListPrj);
      let auxPrjCli = prjsClient.filter((p) => !prj.includes(p.client));
      let auxPrjSeg = prjsSegment.filter((p) => !prj.includes(p.client));
      // let auxTotalAmount = amountPrjs.filter((p) => !prj.includes(p.));
      let auxPrjStatus = prjStatus.filter((p) => !prj.includes(p.client));
      // let auxPrjProgress = prjsProgress.filter((p) => !prj.includes(p.title));
      let auxPrjNotCompleted = listProjectsnotCompleted.filter((p) => !prj.includes(p._id));
      let auxPrjAntTypes = prjandTypes.filter((p) => !prj.includes(p.project));
      let auxPrjTop10 = prjsTop10.filter((p) => !prj.includes(p._id));
      let auxPrjSpent = prjsSpent.filter((p) => !prj.includes(p.id));
      let auxPrjCtrBud = prjsControlBudgeted.filter((p) => !prj.includes(p.id));
      let auxBud = prjsBudgeted.filter((p) => !prj.includes(p.id));

      // setStateListProjects(listPrjsDate);
      setStateListProjects(auxListPrj);
      // setStateProjectsClient(prjsClient);
      setStateProjectsClient(auxPrjCli);
      // setStateProjectsSegment(prjsSegment);
      setStateProjectsSegment(auxPrjSeg);
      setTotalAmount(amountPrjs);
      // setStateProjectsStatus(prjStatus);
      setStateProjectsStatus(auxPrjStatus);
      setStateProjectsProgress(prjsProgress);
      // setStateProjectsNotCompleted(listprjnotCompleted);
      setStateProjectsNotCompleted(auxPrjNotCompleted);
      // setStateProjectsAndType(prjandTypes);
      setStateProjectsAndType(auxPrjAntTypes);
      // setStateProjectsTop10(prjsTop10);
      setStateProjectsTop10(auxPrjTop10);
      setStateTotalCost(totalCost);
      setStateConfiMin(confMin);
      // setStateProjectsSpent(prjsSpent);
      setStateProjectsSpent(auxPrjSpent);
      // setStateProjectsControlBudgeted(prjsControlBudgeted);
      setStateProjectsControlBudgeted(auxPrjCtrBud);
      // setStateProjectsBudgeted(prjsBudgeted);
      setStateProjectsBudgeted(auxBud);
    }
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

  const values: number[] = [];
  const titles: string[] = [];
  
  stateProjectsClient.map((prj) => {
    titles.push(prj.client);
    values.push(prj.porcentage);
  });

  const dataProjectsClient: DonutChartJS = {
    labels: titles,
    datasets: [
      {
        label: 'Projectos por cliente',
        data: values,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',

          'rgb(255, 132, 99)',
          'rgb(54, 235, 162)',
          'rgb(255, 86, 205)',

          'rgb(132, 99, 255)',
          'rgb(235, 162, 54)',
          'rgb(86, 205, 255)'
        ],
        hoverOffset: 4
      }
    ]
  };

  const dataProjectsProgress: OptionsDashboard[] = [];
  
  stateProjectsProgress.map((prj) => {
    dataProjectsProgress.push({
      //costo: prj.porcentage,
      costo: prj.progress?? 0,
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

  const groupedByProject = stateProjectsAndType.reduce((acc: any, prj) => {
      const project = prj.project;
      (acc[project] = acc[project] || []).push(prj);
      return acc;
  }, {});

  const resultArray: CostsByProjectAndType[][] = Object.values(groupedByProject);
  const resParse = transformProjectsTypesToDataChart(resultArray);
  const dataProjectsTop: OptionsDashboard[] = [];

  stateProjectsTop10.map((prj) => {
    dataProjectsTop.push({
      costo: prj.amount,
      label: prj.title
    });
  });

  let dataControlBudgeted: DataControlBudgeted[] = [];
  if(stateProjectsBudgeted.length >= stateProjectscontrolBudgeted.length && stateProjectsBudgeted.length >= stateProjectsSpent.length){
    dataControlBudgeted = MoreProjectsBudgeted(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent);
  }else{
    if(stateProjectscontrolBudgeted.length >= stateProjectsBudgeted.length && stateProjectscontrolBudgeted.length >= stateProjectsSpent.length){
      dataControlBudgeted = MoreProjectsCtrBudgeted(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent);
    }else{
      dataControlBudgeted = MoreProjectsSpent(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent);
    }
  }

  const randomColors = [ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'];

  return (
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <HeaderDashboardPage amountProjects={totalAmount} handleDate={fetchData} projects={projects}
        projectsTotalCost={stateTotalCost} configMin={stateConfiMin} activeProjects={dataProjectsProgress.length} />
      {/* <StatisticsHeader handleDate={fetchData} projects={projects} costsResumen={costsByResumen} 
        costsResumenType={costsByResumenType} /> */}
      <div className="mt-5 gap-x-5 gap-y-5 flex">
        <div className="bg-white w-2/3 border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>AVANCE DE PROYECTOS ACTIVOS</p>
          </div>
          {dataProjectsProgress.map((prj, index: number) => (
            <ProgressBarComponent label={prj.label} progress={prj.costo} key={prj.label}
               widthBar="w-2/3" color={ index > randomColors.length?  randomColors[index % randomColors.length] : randomColors[index]}  />
          ))}
        </div>
        
        <div className="bg-white w-1/3 border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>ESTATUS</p>
          </div>
          <DonutChartComponent data={dataProjectsStatus} colors={colors} category="costo"
              categories={categoriesStatus}  />
        </div>
      </div>

      <div className="mt-5 gap-x-5 gap-y-5 flex">
        <div className="bg-white w-1/3 border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>PROYECTOS POR SEGMENTO</p>
          </div>
          {/* <DonutChartComponent data={dataProjectsSegment} colors={colors} category="costo"
              categories={categoriesSegment}  /> */}
          <PieChartComponent data={dataProjectsSegment} colors={colors} category="costo"
            categories={categoriesSegment}  />
        </div>

        <div className="bg-white w-2/3 border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>TOTAL PROJECTS   | Montos de proyectos</p>
          </div>
          <BarChartComponent categories={['costo']} colors={colors} data={dataListProjects} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
        {/* <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
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
          </div>
          <DonutChartComponent data={dataProjectsStatus} colors={colors} category="costo"
              categories={categoriesStatus}  />
        </div> */}

        {/* <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>PROYECTOS POR SEGMENTO</p>
          </div>
          <DonutChartComponent data={dataProjectsSegment} colors={colors} category="costo"
              categories={categoriesSegment}  />
        </div>

        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>TOTAL PROJECTS   | Montos de proyectos</p>
          </div>
          <BarChartComponent categories={['costo']} colors={colors} data={dataListProjects} />
        </div> */}

        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>TOP 10 PROYECTOS</p>
          </div>
          <LineChartComponent dataProjectsTop={dataProjectsTop} />
          {/* <BarChartComponent categories={['costo']} colors={colors} data={dataListProjectsNotCompleted} /> */}
        </div>

        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>PROYECTOS POR Cliente</p>
          </div>
          {/* <PieChartComponent data={dataProjectsClient} colors={colors} category="costo"
              categories={categoriesClient}  /> */}
            <NewDonutChartComponent data={dataProjectsClient} />
        </div>
      </div>
      
      <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <div className="mb-3">
          <p>COSTO POR TIPO</p>
        </div>
        <BarChartTreeInOne data={resParse} />
      </div>

      <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <div className="mb-3">
          <p>CONTROL PRESUPUESTAL</p>
        </div>
        <BarChartComponent categories={['controlBudgeted', 'budgeted', 'spent']} colors={colors} data={dataControlBudgeted} />
        {/* <BarChartTreeInOne data={resParse} /> */}
      </div>
      {/* <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <BarChartComponent categories={['costo']} colors={colors} data={costsByDay} />
      </div> */}
    </div>
  )
}

interface DataControlBudgeted {
  //project: string,
  label: string,
  controlBudgeted: number,
  budgeted: number,
  spent: number
}

function MoreProjectsBudgeted(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[]){
  const res: DataControlBudgeted[] = [];
  prjBugeted.map((prj) => {
    const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);
    const prjS = prjSpent.find((pr) => pr.title === prj.title);

    res.push({
      // project: prj.title,
      label: prj.title,
      budgeted: prj.total,
      controlBudgeted: prjCB?.total || 0,
      spent: prjS?.total || 0
    });
  });
  return res;
}

function MoreProjectsCtrBudgeted(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[]){
  const res: DataControlBudgeted[] = [];
  prjControlBudgeted.map((prj) => {
    const prjB = prjBugeted.find((pr) => pr.title === prj.title);
    const prjS = prjSpent.find((pr) => pr.title === prj.title);

    res.push({
      //project: prj.title,
      label: prj.title,
      budgeted: prjB?.total || 0,
      controlBudgeted: prj.total,
      spent: prjS?.total || 0
    });
  });
  return res;
}

function MoreProjectsSpent(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[]){
  const res: DataControlBudgeted[] = [];
  prjSpent.map((prj) => {
    const prjB = prjBugeted.find((pr) => pr.title === prj.title);
    const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);

    res.push({
      //project: prj.title,
      label: prj.title,
      budgeted: prjB?.total || 0,
      controlBudgeted: prjCB?.total || 0,
      spent: prj.total
    });
  });
  return res;
}