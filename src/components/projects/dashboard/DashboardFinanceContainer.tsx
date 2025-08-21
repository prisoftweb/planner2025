'use client'
import { useState } from "react"
import { BarChartComponent } from "./BarChartComponent"
import HeaderDashboardPage from "./HeaderDashboardPage"
import { BarChartTreeInOne } from "./BarChartTreeInOne"
import { Options } from "@/interfaces/Common"
import { showToastMessageError } from "@/components/Alert"

import { getDashboardProjectsAmount, getDashboardByProjectAndType,
  getDashboardListProjectsByDate, getDashboardProjectTotalCost, getConfigMin, 
  getProjectsBudgeted, getProjectsControlBudgeted, getProjectsSpent, getAllPaymentsProjects } 
from "@/app/api/routeProjects";

import { TotalAmountProjects, 
  CostsByProjectAndType, ListProjectsByDate, 
  DashboardTotalCost, ConfigMin, ControlBudgeted, ITotalPaymentsProyects } 
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
  projects:Options[],
  totalPaymentsProjects: ITotalPaymentsProyects[]
}

export default function DashBoardFinanceContainer({token, amountProjects, listProjects, projectsTotalCost, 
    projectsandTypes, configMin, projectsBudgeted, projectsControlBudgeted, projectsSpent, projects, 
    totalPaymentsProjects }: Params) {
  
  const [stateListProjects, setStateListProjects] = useState<ListProjectsByDate[]>(listProjects);
  const [totalAmount, setTotalAmount] = useState<TotalAmountProjects[]>(amountProjects);
  const [stateProjectsAndType, setStateProjectsAndType] = useState<CostsByProjectAndType[]>(projectsandTypes);
  const [stateTotalCost, setStateTotalCost] = useState<DashboardTotalCost[]>(projectsTotalCost);
  const [stateConfiMin, setStateConfiMin] = useState<ConfigMin[]>(configMin);
  const [stateProjectsBudgeted, setStateProjectsBudgeted] = useState<ControlBudgeted[]>(projectsBudgeted);
  const [stateProjectsSpent, setStateProjectsSpent] = useState<ControlBudgeted[]>(projectsSpent);
  const [stateProjectscontrolBudgeted, setStateProjectsControlBudgeted] = useState<ControlBudgeted[]>(projectsControlBudgeted);
  const [stateTotalPaymentsProjects, setStateTotalPaymentsProjects] = useState<ITotalPaymentsProyects[]>(totalPaymentsProjects);

  const fetchData = async (dateS: string, dateE: string, prj: string[]) => {
    let amountPrjs: TotalAmountProjects[] = [];
    
    let listPrjsDate: ListProjectsByDate[] = [];    
    
    let prjandTypes: CostsByProjectAndType[] = [];
    
    let totalCost: DashboardTotalCost[] = [];
    
    let confMin: ConfigMin[] = [];
    
    let prjsBudgeted: ControlBudgeted[] = [];
    
    let prjsSpent: ControlBudgeted[] = [];
    
    let prjsControlBudgeted: ControlBudgeted[] = [];

    let allPaymentsProjects: ITotalPaymentsProyects[] = [];
    try {
      allPaymentsProjects = await getAllPaymentsProjects(token, dateS, dateE);
      if(typeof(allPaymentsProjects) === "string"){
        showToastMessageError(allPaymentsProjects);
      }
    } catch (error) {
      showToastMessageError('Error al obtener pagos de proyectos!!!');
    }
    
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
    setStateTotalPaymentsProjects(allPaymentsProjects);
  }

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];
  const colorsBudgeted = ['green', 'blue', 'red', 'violet'];

  const dataListProjects: OptionsDashboard[] = [];
  
  stateListProjects.map((prj) => {
    dataListProjects.push({
      costo: prj.amount,
      label: prj.title
    });
  });

  const dataProjectsProgress: OptionsDashboard[] = [];

  console.log('stateProjectsAndType => ', stateProjectsAndType);

  const groupedByProject = stateProjectsAndType.reduce((acc: any, prj) => {
      const project = prj.project;
      (acc[project] = acc[project] || []).push(prj);
      return acc;
  }, {});

  const resultArray: CostsByProjectAndType[][] = Object.values(groupedByProject);
  const resParse = transformProjectsTypesToDataChart(resultArray);

  let dataControlBudgeted: DataControlBudgeted[] = [];
  if(stateProjectsBudgeted.length >= stateProjectscontrolBudgeted.length && 
    stateProjectsBudgeted.length >= stateProjectsSpent.length && stateProjectsBudgeted.length >= stateTotalPaymentsProjects.length){
      dataControlBudgeted = MoreProjectsBudgeted(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent, stateTotalPaymentsProjects);
  }else{
    if(stateProjectscontrolBudgeted.length >= stateProjectsBudgeted.length && 
      stateProjectscontrolBudgeted.length >= stateProjectsSpent.length && stateProjectscontrolBudgeted.length >= stateTotalPaymentsProjects.length){
        dataControlBudgeted = MoreProjectsCtrBudgeted(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent, stateTotalPaymentsProjects);
    }else{
      if(stateProjectsSpent.length >= stateProjectsBudgeted.length && 
        stateProjectsSpent.length >= stateProjectscontrolBudgeted.length && stateProjectsSpent.length >= stateTotalPaymentsProjects.length){
        dataControlBudgeted = MoreProjectsSpent(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent, stateTotalPaymentsProjects);
      }else{
        dataControlBudgeted = MoreProjectsPayment(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent, stateTotalPaymentsProjects);
      }      
    }
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const colorRandom = getRandomInt(10);

  console.log('res parse => ', resParse);
  
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
        <BarChartComponent categories={['Monto de obra', 'Gastado', 'Presupuestado', 'Pagado']} colors={colorsBudgeted} data={dataControlBudgeted} />
      </div>
    </div>
  )
}

interface DataControlBudgeted {
  label: string,
  "Monto de obra": number,
  Presupuestado: number,
  Gastado: number
  Pagado: number
}

function MoreProjectsBudgeted(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], 
  prjSpent: ControlBudgeted[], prjPayments: ITotalPaymentsProyects[]){

  const res: DataControlBudgeted[] = [];
  prjBugeted.map((prj) => {
    const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);
    const prjS = prjSpent.find((pr) => pr.title === prj.title);
    const prjP = prjPayments.find((pr) => pr.project === prj.title);

    res.push({
      label: prj.title,
      "Monto de obra": prjCB?.total || 0,
      Gastado: prjS?.total || 0,
      Presupuestado: prj.total,
      Pagado: prjP?.fullyCharged || 0,
    });
  });
  return res;
}

function MoreProjectsCtrBudgeted(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[], 
  prjPayments: ITotalPaymentsProyects[]){
  
  const res: DataControlBudgeted[] = [];
  prjControlBudgeted.map((prj) => {
    const prjB = prjBugeted.find((pr) => pr.title === prj.title);
    const prjS = prjSpent.find((pr) => pr.title === prj.title);
    const prjP = prjPayments.find((pr) => pr.project === prj.title);

    res.push({
      label: prj.title,
      "Monto de obra": prj.total,
      Gastado: prjS?.total || 0,
      Presupuestado: prjB?.total || 0,
      Pagado: prjP?.fullyCharged || 0,
    });
  });
  return res;
}

function MoreProjectsSpent(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], 
  prjSpent: ControlBudgeted[], prjPayments: ITotalPaymentsProyects[]){
  
  const res: DataControlBudgeted[] = [];
  prjSpent.map((prj) => {
    const prjB = prjBugeted.find((pr) => pr.title === prj.title);
    const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);
    const prjP = prjPayments.find((pr) => pr.project === prj.title);

    res.push({
      label: prj.title,
      "Monto de obra": prjCB?.total || 0,
      Gastado: prj.total,
      Presupuestado: prjB?.total || 0,
      Pagado: prjP?.fullyCharged || 0,
    });
  });
  return res;
}

function MoreProjectsPayment(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], 
  prjSpent: ControlBudgeted[], prjPayments: ITotalPaymentsProyects[]){
  
  const res: DataControlBudgeted[] = [];
  prjPayments.map((prj) => {
    const prjB = prjBugeted.find((pr) => pr.title === prj.project);
    const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.project);
    const prjS = prjSpent.find((pr) => pr.title === prj.project);

    res.push({
      label: prj.project,
      "Monto de obra": prjCB?.total || 0,
      Gastado: prjS?.total || 0,
      Presupuestado: prjB?.total || 0,
      Pagado: prj.fullyCharged || 0,
    });
  });
  return res;
}
