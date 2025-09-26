'use client'
import { useState } from "react"
// import DonutChartComponent from "./DonutChartComponent"
import { DonutStatusChartComponent } from "./DonutChartComponent"
// import { BarChartComponent } from "./BarChartComponent"
import PieChartComponent from "./PieChartComponent"
import { ProgressBarComponent } from "./ProgressBarComponent"
// import HeaderDashboardPage from "./HeaderDashboardPage"
import HeaderDashboardPrjPage from "./HeaderDashboardPrjPage"
// import { BarChartTreeInOne } from "./BarChartTreeInOne"
import { LineChartComponent } from "./LineChartComponent"
import NewDonutChartComponent from "./NewDonutChartComponent"
import { Options } from "@/interfaces/Common"
import { showToastMessageError } from "@/components/Alert"

import { getDashboardProjectsAmount, getDashboardListProjects, 
  getDashboardProjectsByClient, getDashboardProjectsByESTATUS, 
  getDashboardProjectsByPROGRESS, getDashboardProjectsBySEGMENT,
  getDashboardByProjectAndType, getDashboardListProjectsNotComplete, 
  getDashboardListProjectsByDate, getDashboardListProjectsTop10, 
  getDashboardProjectTotalCost, getConfigMin, getProjectsBudgeted, 
  getProjectsControlBudgeted, getProjectsSpent } 
from "@/app/api/routeProjects";

import { ProjectsByClient, ProjectsByProgress, 
  ProjectsBySegment, ProjectsByStatus, TotalAmountProjects, 
  CostsByProjectAndType, ProjectsNotCompleted, ListProjectsByDate, 
  ProjectsTop10, DashboardTotalCost, ConfigMin, ControlBudgeted, DonutChartJS, Dataset } 
from "@/interfaces/DashboardProjects";

interface OptionsDashboard {
  label: string,
  costo: number
}

interface OptionsDashboardStatus {
  label: string,
  percentaje: number
  total: number,
  count: number
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

// function transformProjectsTypesToDataChart(dataProjects: CostsByProjectAndType[][]){
//   const res: DataProjectsByType[] = [];
//   dataProjects.map((arrData) => {
//     const r: Issue[] = [];
//     arrData.map((prj) => {
//       r.push({
//         percentage: prj.porcentage,
//         status: prj.type,
//         value: prj.subtotalCost
//       });
//     });
//     res.push({
//       project: arrData[0].project,
//       issues: r,
//     });
//   });

//   return res;
// }

type Params = {
  token: string, 
  amountProjects: TotalAmountProjects[], 
  listProjects: ListProjectsByDate[], 
  projectsClient: ProjectsByClient[], 
  projectsSegment: ProjectsBySegment[], 
  projectsStatus: ProjectsByStatus[], 
  projectsProgress: ProjectsByProgress[], 
  listProjectsnotCompleted: ProjectsNotCompleted[], 
  // projectsandTypes: CostsByProjectAndType[], 
  projectsTop10: ProjectsTop10[], 
  projectsTotalCost: DashboardTotalCost[], 
  configMin: ConfigMin[], 
  // projectsBudgeted: ControlBudgeted[], 
  // projectsSpent: ControlBudgeted[], 
  // projectsControlBudgeted: ControlBudgeted[], 
  projects:Options[],
  numEvaluado: number 
}

export default function DashBoardContainer({token, amountProjects, listProjects, projectsTop10, projectsTotalCost, 
    projectsClient, projectsProgress, projectsSegment, projectsStatus, listProjectsnotCompleted, 
    configMin, projects, numEvaluado }: Params) {
  
  const [stateListProjects, setStateListProjects] = useState<ListProjectsByDate[]>(listProjects);
  const [stateProjectsClient, setStateProjectsClient] = useState<ProjectsByClient[]>(projectsClient);
  const [stateProjectsSegment, setStateProjectsSegment] = useState<ProjectsBySegment[]>(projectsSegment);
  const [totalAmount, setTotalAmount] = useState<TotalAmountProjects[]>(amountProjects);
  const [stateProjectsStatus, setStateProjectsStatus] = useState<ProjectsByStatus[]>(projectsStatus);
  const [stateProjectsProgress, setStateProjectsProgress] = useState<ProjectsByProgress[]>(projectsProgress);
  const [stateProjectsNotCompleted, setStateProjectsNotCompleted] = useState<ProjectsNotCompleted[]>(listProjectsnotCompleted);  
  // const [stateProjectsAndType, setStateProjectsAndType] = useState<CostsByProjectAndType[]>(projectsandTypes);
  const [stateProjectsTop10, setStateProjectsTop10] = useState<ProjectsTop10[]>(projectsTop10);
  const [stateTotalCost, setStateTotalCost] = useState<DashboardTotalCost[]>(projectsTotalCost);
  const [stateConfiMin, setStateConfiMin] = useState<ConfigMin[]>(configMin);
  // const [stateProjectsBudgeted, setStateProjectsBudgeted] = useState<ControlBudgeted[]>(projectsBudgeted);
  // const [stateProjectsSpent, setStateProjectsSpent] = useState<ControlBudgeted[]>(projectsSpent);
  // const [stateProjectscontrolBudgeted, setStateProjectsControlBudgeted] = useState<ControlBudgeted[]>(projectsControlBudgeted);

  const fetchData = async (dateS: string, dateE: string, prj: string[]) => {
    // let amountPrjs: TotalAmountProjects[] = [];
    
    // let listPrjsDate: ListProjectsByDate[] = [];
    
    // let prjsClient: ProjectsByClient[] = [];
    
    // let prjsSegment: ProjectsBySegment[] = [];
    
    // let prjStatus: ProjectsByStatus[] = [];
    
    // let prjsProgress: ProjectsByProgress[] = [];
    
    // let listprjnotCompleted: ProjectsNotCompleted[] = [];
    
    // let prjsTop10: ProjectsTop10[] = [];
    
    // let totalCost: DashboardTotalCost[] = [];
    
    // let confMin: ConfigMin[] = [];
    
    if(prj.includes('all')){
      // amountPrjs = await getDashboardProjectsAmount(token, dateS, dateE, []);
      // listPrjsDate = await getDashboardListProjectsByDate(token, dateS, dateE, []);
      // prjsClient = await getDashboardProjectsByClient(token, dateS, dateE, []);
      // prjsSegment = await getDashboardProjectsBySEGMENT(token, dateS, dateE, []);
      // prjStatus = await getDashboardProjectsByESTATUS(token, dateS, dateE, []);
      // prjsProgress = await getDashboardProjectsByPROGRESS(token, dateS, dateE, []);
      // listprjnotCompleted = await getDashboardListProjectsNotComplete(token, dateS, dateE, []);
      // prjsTop10 = await getDashboardListProjectsTop10(token, '2024-01-01', '2024-10-30', []);
      // totalCost = await getDashboardProjectTotalCost(token, dateS, dateE, []);
      // confMin = await getConfigMin(token);

      const [amountPrjs, listPrjsDate, prjsClient, prjsSegment, prjStatus,
        prjsProgress, listprjnotCompleted, prjsTop10,
        totalCost, confMin] = await Promise.all([
          getDashboardProjectsAmount(token, dateS, dateE, []),
          getDashboardListProjectsByDate(token, dateS, dateE, []),
          getDashboardProjectsByClient(token, dateS, dateE, []),
          getDashboardProjectsBySEGMENT(token, dateS, dateE, []),
          getDashboardProjectsByESTATUS(token, dateS, dateE, []),
          getDashboardProjectsByPROGRESS(token, dateS, dateE, []),
          getDashboardListProjectsNotComplete(token, dateS, dateE, []),
          getDashboardListProjectsTop10(token, dateS, dateE, []),
          getDashboardProjectTotalCost(token, dateS, dateE, []),
          getConfigMin(token)
        ]); 
      
      if(typeof(amountPrjs)==='string'){
        showToastMessageError(amountPrjs);
      }

      if(typeof(listPrjsDate)==='string'){
        showToastMessageError(listPrjsDate);
      }

      if(typeof(prjsClient)==='string'){
        showToastMessageError(prjsClient);
      }

      if(typeof(prjsSegment)==='string'){
        showToastMessageError(prjsSegment);
      }

      if(typeof(prjStatus)==='string'){
        showToastMessageError(prjStatus);
      }

      if(typeof(prjsProgress)==='string'){
        showToastMessageError(prjsProgress);
      }

      if(typeof(listprjnotCompleted)==='string'){
        showToastMessageError(listprjnotCompleted);
      }

      if(typeof(prjsTop10)==='string'){
        showToastMessageError(prjsTop10);
      }

      if(typeof(totalCost)==='string'){
        showToastMessageError(totalCost);
      }

      if(typeof(confMin)==='string'){
        showToastMessageError(confMin);
      }

      setStateListProjects(listPrjsDate);
      setStateProjectsClient(prjsClient);
      setStateProjectsSegment(prjsSegment);
      setTotalAmount(amountPrjs);
      setStateProjectsStatus(prjStatus);
      setStateProjectsProgress(prjsProgress);
      setStateProjectsNotCompleted(listprjnotCompleted);
      // setStateProjectsAndType(prjandTypes);
      setStateProjectsTop10(prjsTop10);
      setStateTotalCost(totalCost);
      setStateConfiMin(confMin);

    }else{
      const [amountPrjs, listPrjsDate, prjsClient, prjsSegment, prjStatus,
        prjsProgress, listprjnotCompleted, prjsTop10,
        totalCost, confMin] = await Promise.all([
          getDashboardProjectsAmount(token, dateS, dateE, prj),
          getDashboardListProjectsByDate(token, dateS, dateE, prj),
          getDashboardProjectsByClient(token, dateS, dateE, prj),
          getDashboardProjectsBySEGMENT(token, dateS, dateE, prj),
          getDashboardProjectsByESTATUS(token, dateS, dateE, prj),
          getDashboardProjectsByPROGRESS(token, dateS, dateE, prj),
          getDashboardListProjectsNotComplete(token, dateS, dateE, prj),
          getDashboardListProjectsTop10(token, dateS, dateE, prj),
          getDashboardProjectTotalCost(token, dateS, dateE, prj),
          getConfigMin(token)
        ]);

      if(typeof(amountPrjs)==='string'){
        showToastMessageError(amountPrjs);
      }

      if(typeof(listPrjsDate)==='string'){
        showToastMessageError(listPrjsDate);
      }

      if(typeof(prjsClient)==='string'){
        showToastMessageError(prjsClient);
      }

      if(typeof(prjsSegment)==='string'){
        showToastMessageError(prjsSegment);
      }

      if(typeof(prjStatus)==='string'){
        showToastMessageError(prjStatus);
      }

      if(typeof(prjsProgress)==='string'){
        showToastMessageError(prjsProgress);
      }

      if(typeof(listprjnotCompleted)==='string'){
        showToastMessageError(listprjnotCompleted);
      }

      if(typeof(prjsTop10)==='string'){
        showToastMessageError(prjsTop10);
      }

      if(typeof(totalCost)==='string'){
        showToastMessageError(totalCost);
      }

      if(typeof(confMin)==='string'){
        showToastMessageError(confMin);
      }

      setStateListProjects(listPrjsDate);
      setStateProjectsClient(prjsClient);
      setStateProjectsSegment(prjsSegment);
      setTotalAmount(amountPrjs);
      setStateProjectsStatus(prjStatus);
      setStateProjectsProgress(prjsProgress);
      setStateProjectsNotCompleted(listprjnotCompleted);
      // setStateProjectsAndType(prjandTypes);
      setStateProjectsTop10(prjsTop10);
      setStateTotalCost(totalCost);
      setStateConfiMin(confMin);
      // try {
      //   amountPrjs = await getDashboardProjectsAmount(token, dateS, dateE, prj);
      //   if(typeof(amountPrjs)==='string'){
      //     showToastMessageError(amountPrjs);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener monto total de proyectos!!!');
      // }

      // try {
      //   listPrjsDate = await getDashboardListProjectsByDate(token, dateS, dateE, prj);
      //   if(typeof(listPrjsDate)==='string'){
      //     showToastMessageError(listPrjsDate);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener lista de proyectos!!!');
      // }

      // try {
      //   prjsClient = await getDashboardProjectsByClient(token, dateS, dateE, prj);
      //   if(typeof(prjsClient)==='string'){
      //     showToastMessageError(prjsClient);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener proyectos agrupados por clientes!!!');
      // }

      // try {
      //   prjsSegment = await getDashboardProjectsBySEGMENT(token, dateS, dateE, prj);
      //   if(typeof(prjsSegment)==='string'){
      //     showToastMessageError(prjsSegment);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener proyectos agrupados por segmento!!!');
      // }

      // try {
      //   prjStatus = await getDashboardProjectsByESTATUS(token, dateS, dateE, prj);
      //   if(typeof(prjStatus)==='string'){
      //     showToastMessageError(prjStatus);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener proyectos agrupados por estatus!!!');
      // }

      // try {
      //   prjsProgress = await getDashboardProjectsByPROGRESS(token, dateS, dateE, prj);
      //   if(typeof(prjsProgress)==='string'){
      //     showToastMessageError(prjsProgress);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener proyectos agrupados por progreso!!!');
      // }

      // try {
      //   listprjnotCompleted = await getDashboardListProjectsNotComplete(token, dateS, dateE, prj);
      //   if(typeof(listprjnotCompleted)==='string'){
      //     showToastMessageError(listprjnotCompleted);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener lista de proyectos no completos!!!');
      // }

      // try {
      //   prjsTop10 = await getDashboardListProjectsTop10(token, '2024-01-01', '2024-10-30', prj);
      //   if(typeof(prjsTop10)==='string'){
      //     showToastMessageError(prjsTop10);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener proyectos top 10!!!');
      // }

      // try {
      //   totalCost = await getDashboardProjectTotalCost(token, dateS, dateE, prj);
      //   if(typeof(totalCost)==='string'){
      //     showToastMessageError(totalCost);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener costo total de los proyectos!!!');
      // }

      // try {
      //   confMin = await getConfigMin(token);
      //   if(typeof(confMin)==='string'){
      //     showToastMessageError(confMin);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al obtener configuracion!!!');
      // }

    }
    // setStateListProjects(listPrjsDate);
    // setStateProjectsClient(prjsClient);
    // setStateProjectsSegment(prjsSegment);
    // setTotalAmount(amountPrjs);
    // setStateProjectsStatus(prjStatus);
    // setStateProjectsProgress(prjsProgress);
    // setStateProjectsNotCompleted(listprjnotCompleted);
    // // setStateProjectsAndType(prjandTypes);
    // setStateProjectsTop10(prjsTop10);
    // setStateTotalCost(totalCost);
    // setStateConfiMin(confMin);
    // setStateProjectsSpent(prjsSpent);
    // setStateProjectsControlBudgeted(prjsControlBudgeted);
    // setStateProjectsBudgeted(prjsBudgeted);
  }

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];
  // const colorsBudgeted = ['green', 'red', 'blue'];

  const dataProjectsStatus: OptionsDashboardStatus[] = [];
  const categoriesStatus: string[] = [];

  stateProjectsStatus.map((prj) => {
    dataProjectsStatus.push({
      percentaje: prj.porcentage,
      label: prj.client,
      count: prj.quantity,
      total: prj.totalAmount
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
  // const colorsDonutClientChart: string[] = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)',
  //   'rgb(255, 205, 86)', 'rgb(255, 132, 99)', 'rgb(54, 235, 162)', 'rgb(255, 86, 205)',
  //   'rgb(132, 99, 255)', 'rgb(235, 162, 54)', 'rgb(86, 205, 255)']
  
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
        backgroundColor:[ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'],
        hoverOffset: 4
      }
    ]
  };

  const dataProjectsProgress: OptionsDashboard[] = [];
  
  stateProjectsProgress.map((prj) => {
    dataProjectsProgress.push({
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

  // const dataProjectsAndTypes: OptionsDashboard[] = [];
  // const categoriesProjectsAndTypes: string[] = [];

  // stateProjectsAndType.map((prj) => {
  //   dataProjectsAndTypes.push({
  //     costo: prj.subtotalCost,
  //     label: prj.project
  //   });
  //   categoriesProjectsAndTypes.push(prj.project);
  // });

  // const groupedByProject = stateProjectsAndType.reduce((acc: any, prj) => {
  //     const project = prj.project;
  //     (acc[project] = acc[project] || []).push(prj);
  //     return acc;
  // }, {});

  // const resultArray: CostsByProjectAndType[][] = Object.values(groupedByProject);
  // const resParse = transformProjectsTypesToDataChart(resultArray);
  const dataProjectsTop: OptionsDashboard[] = [];

  stateProjectsTop10.map((prj) => {
    dataProjectsTop.push({
      costo: prj.amount,
      label: prj.title
    });
  });

  // let dataControlBudgeted: DataControlBudgeted[] = [];
  // if(stateProjectsBudgeted.length >= stateProjectscontrolBudgeted.length && stateProjectsBudgeted.length >= stateProjectsSpent.length){
  //   dataControlBudgeted = MoreProjectsBudgeted(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent);
  // }else{
  //   if(stateProjectscontrolBudgeted.length >= stateProjectsBudgeted.length && stateProjectscontrolBudgeted.length >= stateProjectsSpent.length){
  //     dataControlBudgeted = MoreProjectsCtrBudgeted(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent);
  //   }else{
  //     dataControlBudgeted = MoreProjectsSpent(stateProjectsBudgeted, stateProjectscontrolBudgeted, stateProjectsSpent);
  //   }
  // }

  const randomColors = [ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'];

  const colorSegments = ['green', 'orange', 'blue', 'gray'];

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  // const colorRandom = getRandomInt(10);
  const colorRandom2 = getRandomInt(10);



  return (
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <HeaderDashboardPrjPage amountProjects={totalAmount} handleDate={fetchData} projects={projects}
        projectsTotalCost={stateTotalCost} configMin={stateConfiMin} 
        activeProjects={dataProjectsProgress.length} numEvaluado={numEvaluado} />
      <div className="mt-5 gap-x-6 gap-y-6 flex flex-wrap md:flex-nowrap">
        {/* <div className="bg-white w-full md:w-2/3 border border-slate-100 shadow-lg shadow-slate-500 p-5"> */}
        <div className="w-full md:w-2/3 border border-slate-300 bg-white rounded-xl p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>AVANCE DE PROYECTOS ACTIVOS {dataProjectsProgress.length}</p>
          </div>
          {dataProjectsProgress.map((prj, index: number) => (
            <ProgressBarComponent label={prj.label} progress={prj.costo} key={prj.label}
               widthBar="w-2/3" color={ index > randomColors.length?  randomColors[index % randomColors.length] : randomColors[index]}  />
          ))}
        </div>
        
        {/* <div className="bg-white w-full md:w-1/3 border border-slate-100 shadow-lg shadow-slate-500 p-5"> */}
        <div className="w-full md:w-1/3 border border-slate-300 bg-white rounded-xl p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>ESTATUS</p>
          </div>
          {/* <DonutChartComponent data={dataProjectsStatus} colors={colors} category="costo"
              categories={categoriesStatus}  /> */}
          <DonutStatusChartComponent data={dataProjectsStatus} colors={colors} category="percentaje"
            categories={categoriesStatus}  />
        </div>
      </div>

      <div className="mt-5 gap-x-6 gap-y-6 flex flex-wrap md:flex-nowrap">

        {/* <div className="bg-white w-full md:w-1/3 border border-slate-100 shadow-lg shadow-slate-500 p-5"> */}
        <div className="w-full md:w-1/3 border border-slate-300 bg-white rounded-xl p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>PROYECTOS POR SEGMENTO</p>
          </div>
          <PieChartComponent data={dataProjectsSegment} colors={colorSegments} category="costo"
            categories={categoriesSegment}  />
        </div>

        {/* <div className="bg-white w-full md:w-1/3 border border-slate-100 shadow-lg shadow-slate-500 p-5"> */}
        <div className="w-full md:w-1/3 border border-slate-300 bg-white rounded-xl p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>TOP 10 PROYECTOS</p>
          </div>
          <LineChartComponent dataProjectsTop={dataProjectsTop} colors={[colors[colorRandom2]]} />
        </div>

        {/* <div className="bg-white w-full md:w-1/3 border border-slate-100 shadow-lg shadow-slate-500 p-5"> */}
        <div className="w-full md:w-1/3 border border-slate-300 bg-white rounded-xl p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>PROYECTOS POR Cliente</p>
          </div>
          <NewDonutChartComponent data={dataProjectsClient} />
        </div>
      </div>

      {/* <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <div className="mb-3">
          <p>COSTO POR TIPO</p>
        </div>
        <BarChartTreeInOne data={resParse} />
      </div> */}

      {/* <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <div className="mb-3">
          <p>CONTROL PRESUPUESTAL</p>
        </div>
        <BarChartComponent categories={['Monto de obra', 'Gastado', 'Presupuestado']} colors={colorsBudgeted} data={dataControlBudgeted} />
      </div> */}
    </div>
  )
}

interface DataControlBudgeted {
  label: string,
  "Monto de obra": number,
  Presupuestado: number,
  Gastado: number
}

// function MoreProjectsBudgeted(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[]){
//   const res: DataControlBudgeted[] = [];
//   prjBugeted.map((prj) => {
//     const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);
//     const prjS = prjSpent.find((pr) => pr.title === prj.title);

//     res.push({
//       label: prj.title,
//       "Monto de obra": prjCB?.total || 0,
//       Gastado: prjS?.total || 0,
//       Presupuestado: prj.total,
//     });
//   });
//   return res;
// }

// function MoreProjectsCtrBudgeted(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[]){
//   const res: DataControlBudgeted[] = [];
//   prjControlBudgeted.map((prj) => {
//     const prjB = prjBugeted.find((pr) => pr.title === prj.title);
//     const prjS = prjSpent.find((pr) => pr.title === prj.title);

//     res.push({
//       label: prj.title,
//       "Monto de obra": prj.total,
//       Gastado: prjS?.total || 0,
//       Presupuestado: prjB?.total || 0,
//     });
//   });
//   return res;
// }

// function MoreProjectsSpent(prjBugeted: ControlBudgeted[], prjControlBudgeted: ControlBudgeted[], prjSpent: ControlBudgeted[]){
//   const res: DataControlBudgeted[] = [];
//   prjSpent.map((prj) => {
//     const prjB = prjBugeted.find((pr) => pr.title === prj.title);
//     const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);

//     res.push({
//       label: prj.title,
//       "Monto de obra": prjCB?.total || 0,
//       Gastado: prj.total,
//       Presupuestado: prjB?.total || 0,
//     });
//   });
//   return res;
// }
