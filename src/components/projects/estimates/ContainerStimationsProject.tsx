'use client'
import { OneProjectMin } from "@/interfaces/Projects"
import Button from "@/components/Button";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { ProgressCircle } from "@tremor/react";
import { useState } from "react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import DonutChartComponent from "../dashboard/DonutChartComponent";
import TableEstimatesByProject from "./TableEstimatesByProject";
import AddNewEstimateProject from "./AddNewEstimateProject";
import { Options } from "@/interfaces/Common";
import { IEstimateProject } from "@/interfaces/Estimate";
import { getEstimatesByProject } from "@/app/api/routeEstimates";
interface OptionsDashboard {
  label: string,
  costo: number
}

export default function ContainerStimationsProject({project, optConditions, optProjects, estimates, token, user}: 
  {project: OneProjectMin, optProjects: Options[], optConditions: Options[], estimates:IEstimateProject[], 
    token: string, user: string}) {

  const [openNewStimate, setOpenNewStimate] = useState<boolean>(false);
  const [isfilterTable, setIsFilterTable] = useState<boolean>(false);
  const [estimatesData, setEstimatesData] = useState<IEstimateProject[]>(estimates);

  const handleFilterTable = (value: boolean) => {
    setIsFilterTable(value);
  }

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const categoriesEstimates: string[] = [];
  const dataEstimatesDashboard: OptionsDashboard[] = [];  

  estimates.map((e) => {
    dataEstimatesDashboard.push({
      costo: e.amount,
      label: e.name
    });
    categoriesEstimates.push(e.name);
  });

  const handleShowForm = (value: boolean) => {
    setOpenNewStimate(value);
  }

  const updateEstimatesProject = async () => {
    let estimates: IEstimateProject[];
    try {
      estimates = await getEstimatesByProject(token, project._id);
      console.log('estimates min => ', estimates);
      if(typeof(estimates) === "string")
        return <h1 className="text-center text-red-500">{estimates}</h1>
    } catch (error) {
      return <h1 className="text-center text-red-500">Ocurrio un error al obtener las estimaciones del proyecto!!</h1>  
    }

    setIsFilterTable(false);
    setEstimatesData(estimates);
  }

  const delEstimate = (id:string) => {
    const newData=estimatesData.filter((e) => e._id !== id);
    setIsFilterTable(false);
    setEstimatesData(newData);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" 
            onClick={() => window.location.replace('/projects/estimates')}
          />
          <p className="text-xl ml-4 font-medium">{project.title}</p>
          <ProgressCircle value={project.progress} color={'orange'} >
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {project.progress}%
            </span>
          </ProgressCircle>
        </div>
        <Button onClick={() => setOpenNewStimate(true)}>Agregar estimacion</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5">
        <div className="bg-white p-3">
          <img src={project.client.logo} 
            alt={project.client.name} className="h-32 w-auto " />
          {/* <img src={project.client.logo} alt={project.client.name} /> */}
          <div className="flex items-center gap-x-2">
            <img src={project.photo} alt={project.title} className="rounded-full w-14 h-auto" />
            <div>
              <p className="text-blue-500">{project.title}</p>
              <p className="text-blue-300">{CurrencyFormatter({
                currency: 'MXN',
                value: project.amount
              })}</p>
              <Chip label={project.category.name} color={project.category.color} />
            </div>
          </div>
        </div>

        <div className="bg-white p-3">
          <DonutChartComponent data={dataEstimatesDashboard} colors={colors} category="costo"
                        categories={categoriesEstimates} flexWrap="" size="w-60 h-60" />
        </div>

        <div className="bg-white p-3">
          <div className=" border border-gray-700">
            <div className="flex items-center border border-gray-700">
              <p className="bg-green-600 text-white p-2 w-40 text-center">PAGADO</p>
              <p className="w-full text-blue-500 text-right p-2">{CurrencyFormatter({
                currency: 'MXN',
                value: 0
              })}</p>
            </div>
            <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Anticipo del 30%</p>
              <p className="text-slate-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: 0
              })}</p>
            </div>

            <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Estimado acumulado</p>
              <p className="text-slate-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: 0
              })}</p>
            </div>

            <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Amortizado</p>
              <p className="text-slate-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: 0
              })}</p>
            </div>

            <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Garantia del {project.guaranteefund.porcentage}%</p>
              <p className="text-slate-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: 0
              })}</p>
            </div>
          </div>
        </div>

      </div>
      <TableEstimatesByProject project={project} optConditions={optConditions} optProjects={optProjects} 
        estimates={estimatesData} handleFilterTable={handleFilterTable} isFilterTable={isfilterTable} 
        delEstimate={delEstimate} token={token} />
      {openNewStimate && <AddNewEstimateProject showForm={handleShowForm} project={project} user={user}
      updateEstimates={updateEstimatesProject} token={token} />}
    </>
  )
}