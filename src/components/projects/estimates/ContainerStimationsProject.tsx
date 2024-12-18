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
interface OptionsDashboard {
  label: string,
  costo: number
}

export default function ContainerStimationsProject({project, optConditions, optProjects}: 
  {project: OneProjectMin, optProjects: Options[], optConditions: Options[]}) {

  const [openNewStimate, setOpenNewStimate] = useState<boolean>(false);

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const categoriesEstimates = ['estimacion 1', 'estimacion 2', 'estimacion 3', 'estimacion 4', 'estimacion 5']
  const dataEstimatesDashboard: OptionsDashboard[] = [{
    costo: 10,
    label: 'estimacion 1'
  },
  {
    costo: 15,
    label: 'estimacion 2'
  },
  {
    costo: 20,
    label: 'estimacion 3'
  },
  {
    costo: 25,
    label: 'estimacion 4'
  },
  {
    costo: 30,
    label: 'estimacion 5'
  }];  

  const handleShowForm = (value: boolean) => {
    setOpenNewStimate(value);
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
            alt={project.client.name} className="w-full h-auto" />
          {/* <img src={project.client.logo} alt={project.client.name} /> */}
          <div className="flex justify-center gap-x-2">
          <img src={project.photo} alt={project.title} className="rounded-full w-14 h-14" />
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
      <TableEstimatesByProject project={project} optConditions={optConditions} optProjects={optProjects} />
      {openNewStimate && <AddNewEstimateProject showForm={handleShowForm} project={project} />}
    </>
  )
}