'use client'
import { OneProjectMin } from "@/interfaces/Projects"
import { TbArrowNarrowLeft } from "react-icons/tb";
import { ProgressCircle } from "@tremor/react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import DonutChartComponent from "../../dashboard/DonutChartComponent";
import { ITotalInvoicesByProject, ITotalInvoiceResumen } from "@/interfaces/Invoices";
import NavTabEstimates from "../NavTabEstimates";

import { ICollectionMin, ITotalResumentPayment } from "@/interfaces/Collections";
import TableCollectionsComponent from "./TableCollectionsComponent";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function ContainerCollectionsProject({project, token, user, collections, 
    totalInvoiceProject, resumenPayment }: 
  {project: OneProjectMin, collections:ICollectionMin[], token: string, user: string, 
    totalInvoiceProject: ITotalInvoicesByProject[], resumenPayment:ITotalResumentPayment }) {

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const categoriesEstimates: string[] = [];
  const dataInvoicesDashboard: OptionsDashboard[] = [];  

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer"
            onClick={() => window.location.replace('/projects/estimates')}
          >
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </div>
          <p className="text-xl ml-4 font-medium">{project.title}</p>
          <ProgressCircle value={project.progress} color={'orange'} >
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {project.progress}%
            </span>
          </ProgressCircle>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2 mt-2 sm:mt-3 md:mt-5">
        <div className="bg-white p-3">
          <img src={project.client.logo} 
            alt={project.client.name} className="h-32 w-auto " />
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
          <DonutChartComponent data={dataInvoicesDashboard} colors={colors} category="costo"
                        categories={categoriesEstimates} flexWrap="" size="w-60 h-60" />
        </div>

        <div className="bg-white p-3">
          <div className=" border border-gray-700">
            <div className="flex items-center border border-gray-700">
              <p className="bg-green-600 text-white p-2 w-40 text-center">COBRADO</p>
              <p className="w-full text-blue-500 text-right p-2">{CurrencyFormatter({
                currency: 'MXN',
                value: resumenPayment?.totalPayments?.totalPayments || 0
              })}</p>
            </div>
            <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Monto de proyecto</p>
              <p className="text-slate-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: project.amount
              })}</p>
            </div>

            <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Pendiente de cobrar</p>
              <p className="text-green-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: resumenPayment?.billedTotal?.billedTotal || 0
              })}</p>
            </div>

            <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Pendiente de facturar</p>
              <p className="text-red-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: resumenPayment?.billedTotal?.pendingBillingTotal || 0
              })}</p>
            </div>

            {/* <div className="flex justify-between items-center border border-slate-700 p-2">
              <p className="text-xs text-slate-600">Pendiente de estimar</p>
              <p className="text-slate-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value:  project.amount - resumenInvoice.totalAccumulated.estimatedTotal
              })}</p>
            </div> */}
          </div>
        </div>

      </div>

      <div>
        <NavTabEstimates tab={2} id_p={project._id} />
      </div>
      
      <TableCollectionsComponent project={project} token={token} />
    </>
  )
}