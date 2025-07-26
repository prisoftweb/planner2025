'use client'
import { useState } from "react"
import { BarChartComponent } from "./BarChartComponent"
import HeaderDashboardPage from "./HeaderDashboardPage"
import { BarChartTreeInOne } from "./BarChartTreeInOne"
import { Options } from "@/interfaces/Common"
import { showToastMessageError } from "@/components/Alert"

import { getDashboardProjectsAmount, getDashboardByProjectAndType,
  getDashboardListProjectsByDate, getDashboardProjectTotalCost, getConfigMin, 
  getProjectsBudgeted, getProjectsControlBudgeted, getProjectsSpent } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects, 
  CostsByProjectAndType, ProjectsNotCompleted, ListProjectsByDate, 
  ProjectsTop10, DashboardTotalCost, ConfigMin, ControlBudgeted } 
from "@/interfaces/DashboardProjects";

interface OptionsDashboard {
  label: string,
  costo: number
}

export interface DataProjectsByType {
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

type Params = {
  token: string, 
  amountProjects: TotalAmountProjects[], 
  listProjects: ListProjectsByDate[], 
  projectsandTypes: CostsByProjectAndType[], 
  projectsTotalCost: DashboardTotalCost[], 
  configMin: ConfigMin[], 
  projectsBudgeted: ControlBudgeted[], 
  projectsSpent: ControlBudgeted[], 
  projectsControlBudgeted: ControlBudgeted[], 
  projects:Options[] 
}

export default function DashBoardFinanceContainer({token, amountProjects, listProjects, projectsTotalCost, 
    projectsandTypes, configMin, projectsBudgeted, projectsControlBudgeted, projectsSpent, projects }: Params) {
  
  const [stateListProjects, setStateListProjects] = useState<ListProjectsByDate[]>(listProjects);
  const [totalAmount, setTotalAmount] = useState<TotalAmountProjects[]>(amountProjects);
  const [stateProjectsAndType, setStateProjectsAndType] = useState<CostsByProjectAndType[]>(projectsandTypes);
  const [stateTotalCost, setStateTotalCost] = useState<DashboardTotalCost[]>(projectsTotalCost);
  const [stateConfiMin, setStateConfiMin] = useState<ConfigMin[]>(configMin);
  const [stateProjectsBudgeted, setStateProjectsBudgeted] = useState<ControlBudgeted[]>(projectsBudgeted);
  const [stateProjectsSpent, setStateProjectsSpent] = useState<ControlBudgeted[]>(projectsSpent);
  const [stateProjectscontrolBudgeted, setStateProjectsControlBudgeted] = useState<ControlBudgeted[]>(projectsControlBudgeted);

  const fetchData = async (dateS: string, dateE: string, prj: string[]) => {
    let amountPrjs: TotalAmountProjects[] = [];
    
    let listPrjsDate: ListProjectsByDate[] = [];
    
    
    let prjandTypes: CostsByProjectAndType[] = [];
    
    let totalCost: DashboardTotalCost[] = [];
    
    let confMin: ConfigMin[] = [];
    
    let prjsBudgeted: ControlBudgeted[] = [];
    
    let prjsSpent: ControlBudgeted[] = [];
    
    let prjsControlBudgeted: ControlBudgeted[] = [];
    
    if(prj.includes('all')){
      try {
        amountPrjs = await getDashboardProjectsAmount(token, dateS, dateE, []);
        if(typeof(amountPrjs)==='string'){
          showToastMessageError(amountPrjs);
        }
      } catch (error) {
        showToastMessageError('Error al obtener monto total de proyectos!!!');
      }

      try {
        listPrjsDate = await getDashboardListProjectsByDate(token, dateS, dateE, []);
        if(typeof(listPrjsDate)==='string'){
          showToastMessageError(listPrjsDate);
        }
      } catch (error) {
        showToastMessageError('Error al obtener lista de proyectos!!!');
      }

      try {
        totalCost = await getDashboardProjectTotalCost(token, dateS, dateE, []);
        if(typeof(totalCost)==='string'){
          showToastMessageError(totalCost);
        }
      } catch (error) {
        showToastMessageError('Error al obtener costo total de los proyectos!!!');
      }

      try {
        confMin = await getConfigMin(token);
        if(typeof(confMin)==='string'){
          showToastMessageError(confMin);
        }
      } catch (error) {
        showToastMessageError('Error al obtener configuracion!!!');
      }

      try {
        prjsBudgeted = await getProjectsBudgeted(token, dateS, dateE, []);
        if(typeof(prjsBudgeted)==='string'){
          showToastMessageError(prjsBudgeted);
        }
      } catch (error) {
        showToastMessageError('Error al obtener proyectos presupuestados!!!');
      }

      try {
        prjsSpent = await getProjectsSpent(token, dateS, dateE, []);
        if(typeof(prjsSpent)==='string'){
          showToastMessageError(prjsSpent);
        }
      } catch (error) {
        showToastMessageError('Error al obtener proyectos por gastos!!!');
      }

      try {
        prjsControlBudgeted = await getProjectsControlBudgeted(token, dateS, dateE, []);
        if(typeof(prjsControlBudgeted)==='string'){
          showToastMessageError(prjsControlBudgeted);
        }
      } catch (error) {
        showToastMessageError('Error al obtener proyectos por control presupuestal!!!');
      }

      try {
        prjandTypes = await getDashboardByProjectAndType(token, dateS, dateE, []);
        if(typeof(prjandTypes)==='string'){
          showToastMessageError(prjandTypes);
        }
      } catch (error) {
        showToastMessageError('Error al obtener costos por proyecto y tipo!!!');
      }
    }else{
      try {
        amountPrjs = await getDashboardProjectsAmount(token, dateS, dateE, prj);
        if(typeof(amountPrjs)==='string'){
          showToastMessageError(amountPrjs);
        }
      } catch (error) {
        showToastMessageError('Error al obtener monto total de proyectos!!!');
      }

      try {
        listPrjsDate = await getDashboardListProjectsByDate(token, dateS, dateE, prj);
        if(typeof(listPrjsDate)==='string'){
          showToastMessageError(listPrjsDate);
        }
      } catch (error) {
        showToastMessageError('Error al obtener lista de proyectos!!!');
      }

      try {
        totalCost = await getDashboardProjectTotalCost(token, dateS, dateE, prj);
        if(typeof(totalCost)==='string'){
          showToastMessageError(totalCost);
        }
      } catch (error) {
        showToastMessageError('Error al obtener costo total de los proyectos!!!');
      }

      try {
        confMin = await getConfigMin(token);
        if(typeof(confMin)==='string'){
          showToastMessageError(confMin);
        }
      } catch (error) {
        showToastMessageError('Error al obtener configuracion!!!');
      }

      try {
        prjsBudgeted = await getProjectsBudgeted(token, dateS, dateE, prj);
        if(typeof(prjsBudgeted)==='string'){
          showToastMessageError(prjsBudgeted);
        }
      } catch (error) {
        showToastMessageError('Error al obtener proyectos presupuestados!!!');
      }

      try {
        prjsSpent = await getProjectsSpent(token, dateS, dateE, prj);
        if(typeof(prjsSpent)==='string'){
          showToastMessageError(prjsSpent);
        }
      } catch (error) {
        showToastMessageError('Error al obtener proyectos por gastos!!!');
      }

      try {
        prjsControlBudgeted = await getProjectsControlBudgeted(token, dateS, dateE, prj);
        if(typeof(prjsControlBudgeted)==='string'){
          showToastMessageError(prjsControlBudgeted);
        }
      } catch (error) {
        showToastMessageError('Error al obtener proyectos por control presupuestal!!!');
      }

      try {
        prjandTypes = await getDashboardByProjectAndType(token, dateS, dateE, prj);
        if(typeof(prjandTypes)==='string'){
          showToastMessageError(prjandTypes);
        }
      } catch (error) {
        showToastMessageError('Error al obtener costos por proyecto y tipo!!!');
      }
    }
    setStateListProjects(listPrjsDate);
    setTotalAmount(amountPrjs);
    setStateProjectsAndType(prjandTypes);
    setStateTotalCost(totalCost);
    setStateConfiMin(confMin);
    setStateProjectsSpent(prjsSpent);
    setStateProjectsControlBudgeted(prjsControlBudgeted);
    setStateProjectsBudgeted(prjsBudgeted);
  }

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];
  const colorsBudgeted = ['green', 'red', 'blue'];

  const dataListProjects: OptionsDashboard[] = [];
  
  stateListProjects.map((prj) => {
    dataListProjects.push({
      costo: prj.amount,
      label: prj.title
    });
  });

  const dataProjectsProgress: OptionsDashboard[] = [];

  const groupedByProject = stateProjectsAndType.reduce((acc: any, prj) => {
      const project = prj.project;
      (acc[project] = acc[project] || []).push(prj);
      return acc;
  }, {});

  const resultArray: CostsByProjectAndType[][] = Object.values(groupedByProject);
  const resParse = transformProjectsTypesToDataChart(resultArray);

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

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const colorRandom = getRandomInt(10);
  
  return (
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <HeaderDashboardPage amountProjects={totalAmount} handleDate={fetchData} projects={projects}
        projectsTotalCost={stateTotalCost} configMin={stateConfiMin} activeProjects={dataProjectsProgress.length} />

      <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <div className="flex mb-3 gap-x-2 justify-between">
          <p>TOTAL PROJECTS   | Montos de proyectos</p>
        </div>
        <BarChartComponent categories={['costo']} colors={[colors[colorRandom]]} data={dataListProjects} />
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
        <BarChartComponent categories={['Monto de obra', 'Gastado', 'Presupuestado']} colors={colorsBudgeted} data={dataControlBudgeted} />
      </div>
    </div>
  )
}

interface DataControlBudgeted {
  label: string,
  "Monto de obra": number,
  Presupuestado: number,
  Gastado: number
}

function MoreProjectsBudgeted(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[]){
  const res: DataControlBudgeted[] = [];
  prjBugeted.map((prj) => {
    const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);
    const prjS = prjSpent.find((pr) => pr.title === prj.title);

    res.push({
      label: prj.title,
      "Monto de obra": prjCB?.total || 0,
      Gastado: prjS?.total || 0,
      Presupuestado: prj.total,
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
      label: prj.title,
      "Monto de obra": prj.total,
      Gastado: prjS?.total || 0,
      Presupuestado: prjB?.total || 0,
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
      label: prj.title,
      "Monto de obra": prjCB?.total || 0,
      Gastado: prj.total,
      Presupuestado: prjB?.total || 0,
    });
  });
  return res;
}
