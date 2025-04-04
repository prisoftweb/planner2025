'use client'
import { OneProjectMin } from "@/interfaces/Projects"
import Button from "@/components/Button";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { ProgressCircle } from "@tremor/react";
import { useState } from "react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import DonutChartComponent from "../dashboard/DonutChartComponent";
// import TableEstimatesByProject from "./TableEstimatesByProject";
import TableConceptsEstimate from "./TableConceptsEstimate";
import AddNewEstimateProject from "./AddNewEstimateProject";
import { IEstimateProject, IEstimate, IConceptEstimate, TotalEstimatedByProject } from "@/interfaces/Estimate";
import { getAllConceptsDetailsByEstimateMin, getTotalEstimatesByProjectMin } from "@/app/api/routeEstimates";
import AddNewConceptEstimate from "./AddNewConceptEstimate";
import { Options } from "@/interfaces/Common";
import { showToastMessageError } from "@/components/Alert";
import NavTabEstimates from "./NavTabEstimates";

import { IInvoiceMinFull, IConceptInvoice, ITotalInvoicesByProject } from "@/interfaces/Invoices";
import TableConceptsInvoice from "./TableConceptsInvoice";

export default function ContainerDetailInvoice({project, token, user, invoice, concepts, 
    totalInvoiceProject}: 
  {project: OneProjectMin, token: string, user: string, invoice:IInvoiceMinFull, 
    concepts:IConceptInvoice[], totalInvoiceProject: ITotalInvoicesByProject[]}) {

  const [openNewConcept, setOpenNewConcept] = useState<boolean>(false);
  const [isfilterTable, setIsFilterTable] = useState<boolean>(false);
  const [conceptsData, setConceptsData] = useState<IConceptInvoice[]>(concepts);

  // const [totalEstimatedProjectState, setTotalEstimatedProjectState] = useState<TotalEstimatedByProject[]>(totalEstimatedProject);

  // const [tab, setTab] = useState<number>(0);

  // const handleTab = (value:number) => {
  //   setTab(value);
  // }

  const handleFilterTable = (value: boolean) => {
    setIsFilterTable(value);
  }

  // const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  // const handleShowForm = (value: boolean) => {
  //   setOpenNewConcept(value);
  // }

  // const updateConceptsEstimate = async () => {
  //   let concepts: IConceptEstimate[];
  //   try {
  //     // concepts = await getConeptsEstimate(token, estimate._id);
  //     concepts = await getAllConceptsDetailsByEstimateMin(token, estimate._id);
  //     // console.log('concepts min => ', concepts);
  //     if(typeof(concepts) === "string"){
  //       showToastMessageError(concepts);
  //     }else{
  //       setConceptsData(concepts);
  //     }
  //   } catch (error) {
  //     showToastMessageError('Ocurrio un error al actualizar conceptos de la estimacion!!');
  //   }

  //   let totalEstimated: TotalEstimatedByProject[];
  //   try {
  //     totalEstimated = await getTotalEstimatesByProjectMin(token, project._id);
  //     if(typeof(totalEstimated) === "string"){
  //       showToastMessageError(totalEstimated);
  //     }else{
  //       setTotalEstimatedProjectState(totalEstimated);
  //     }
  //   } catch (error) {
  //     showToastMessageError('Ocurrio un error al actualizar el total de las estimaciones del proyecto!!')
  //   }

  //   setIsFilterTable(false);
  //   // setConceptsData(concepts);
  // }

  // const delConcept = (id:string) => {
  //   // const newData = conceptsData.filter((c) => c.conceptEstimate._id!==id);
  //   // setIsFilterTable(false);
  //   // setConceptsData(newData);
  //   updateConceptsEstimate();
  // }

  const conceptsLV: Options[] = [];
  concepts.map((c) => {
    conceptsLV.push({
      label: c.conceptEstimate.name,
      value: c.conceptEstimate._id
    });
  });

  // let component = tab===1? <></>: (tab===2? <></>: 
  //                       <TableConceptsEstimate concepts={conceptsData} delConcept={delConcept} 
  //                         handleFilterTable={handleFilterTable} isFilterTable={isfilterTable} 
  //                         project={project} token={token} idEstimate={idEstimate} />)

  console.log('invoice => ', invoice);

  // return (
  //   <>
  //     <div className="flex justify-between items-center">
  //       <div className="flex items-center gap-x-5">
  //         <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer"
  //           onClick={() => window.location.replace(`/projects/estimates/${project._id}`)}
  //         >
  //           <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
  //         </div>
  //         <p className="text-xl ml-4 font-medium">{project.title} {'->'} {invoice?.folio || 'sin factura'} </p>
  //       </div>
  //     </div>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 mt-2 sm:mt-3 md:mt-5 gap-y-2">
  //       <div className="bg-white p-3">
  //         <img src={project.client.logo} 
  //           alt={project.client.name} className="h-20 w-auto " />
  //         <div className="flex items-center gap-x-2">
  //           <img src={project.photo} alt={project.title} className="rounded-full w-14 h-auto" />
  //           <div>
  //             <p className="text-blue-500">{project.title}</p>
  //             <p className="text-blue-300">{CurrencyFormatter({
  //               currency: 'MXN',
  //               value: project.amount
  //             })}</p>
  //             <Chip label={project.category.name} color={project.category.color} />
  //           </div>
  //         </div>
  //       </div>

  //       <div className="bg-white p-3">
  //         <div className="flex justify-between ">
  //           <p className="text-slate-400">Uso CFDI</p>
  //           <p className="text-lg text-slate-900 text-right">{invoice?.useCFDI || 'Sin CFDI'}</p>
  //         </div>

  //         <div className="flex justify-between ">
  //           <p className="text-slate-400">Metodo de pago</p>
  //           <p className="text-lg text-slate-900 text-right">{invoice?.paymentMethod || 'Sin Metodo'}</p>
  //         </div>

  //         <div className="flex justify-between ">
  //           <p className="text-slate-400">Forma de pago:</p>
  //           <p className="text-lg text-slate-900 text-right">{invoice?.paymentWay || 'Sin forma'}</p>
  //         </div>
  //       </div>

  //       <div className="bg-white p-3">
  //         <div className=" border border-gray-700">
  //           <div className="flex items-center border border-gray-700">
  //             <p className="bg-purple-700 text-white p-2 w-40 text-center">FACTURA</p>
  //             <p className="w-full text-blue-500 text-center p-2">{invoice.folio}</p>
  //           </div>
  //           <div className="text-center border border-slate-700 p-2">
  //             <p className="text-slate-600 text-center">{CurrencyFormatter({
  //               currency: 'MXN',
  //               value: invoice.cost.total
  //             })}</p>
  //           </div>

  //         </div>
  //         <div className="flex justify-between ">
  //           <p className="text-slate-400">Fecha </p>
  //           <p className="text-lg text-slate-600 text-right">{invoice.date?.substring(0, 10)}</p>
  //         </div>
  //         <div className="flex justify-between ">
  //           <p className="text-slate-400">Estimacion </p>
  //           <p className="text-lg text-slate-600 text-right">{invoice.estimate?.name || 'Sin estimacion'}</p>
  //         </div>
  //       </div>

  //     </div>

  //     <TableConceptsInvoice concepts={concepts} project={project} token={token} isFilterTable={false} />
  //   </>
  // )

  // console.log('concepts invoice => ', concepts);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer"
            onClick={() => window.location.replace(`/projects/estimates/${project._id}`)}
          >
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </div>
          <p className="text-xl ml-4 font-medium">{project.title} {'->'} {invoice?.folio || 'sin factura'} </p>
        </div>
      </div>

      <div className="flex justify-between gap-x-3 border-b border-slate-500 pb-3">
        <div className="mt-2">
          <p className="text-lg">{invoice?.client?.name}</p>
          <p className="text-lg">{invoice?.client?.rfc}</p>

          <p className="text-sm">{invoice?.client?.location?.stret}</p>
          <p className="text-sm">{invoice?.client?.location?.community}</p>
          <p className="text-sm">{invoice?.client?.location?.state}</p>
          <p className="text-sm">{invoice?.client?.location?.cp}</p>
        </div>

        <div className="text-right">
          <img src="/Palaciosconstrucciones_horizontal.png" alt="palacios"
            className="h-24 w-auto"
          />
          <p className="font-extrabold text-lg text-black">Samuel Palacios Hernandez</p>
          <p className="font-extrabold text-lg text-black">PAHS76123U25</p>
          <p className="text-sm text-slate-500">Betelgeuze #334</p>
          <p className="text-sm text-slate-500">Del Llano San Luis Potosi, S.L.P.</p>
          <p className="text-sm text-slate-500">CP 78377 Mexico</p>
        </div>
      </div>

      <div className="flex justify-between gap-x-3 mt-3">
        <div>
          <p className="text-slate-500 font-extrabold">PROYECTO</p>
          <p className="text-black font-extrabold">{invoice.project.title}</p>
          {/* <p>direccion?</p> */}
        </div>

        <div>
          <p className="text-slate-500 font-extrabold">ESTIMACION</p>
          <p className="text-black font-extrabold">{invoice?.estimate?.name}</p>
        </div>

        <div className="text-right">
          <p className="text-slate-500 font-extrabold">FACTURA</p>
          <p className="text-blue-500 font-bold">Factura No: {invoice.folio}</p>
          <p className="text-sm">{invoice.date.substring(8, 10)} de {months[new Date(invoice.date).getMonth()]} {invoice?.date?.substring(0, 4)}</p>
          <p className="text-sm">{invoice.useCFDI}</p>
          <p className="text-sm">{invoice.paymentMethod}</p>
          <p className="text-sm">{invoice.paymentWay}</p>
        </div>

      </div>

      <div className="mt-5 bg-blue-500 py-3">
        <p className="text-white text-center text-lg font-bold">FACTURA</p>
      </div>

      <div className="grid grid-cols-6 gap-x-2 mt-4">
        <p className="text-slate-600 font-bold">CANTIDAD</p>
        <p className="text-slate-600 font-bold col-span-3">DESCRIPCION</p>
        <p className="text-slate-600 font-bold text-right">PRECIO</p>
        <p className="text-slate-600 font-bold text-right">IMPORTE</p>
      </div>

      {invoice.conceptsInvoiceInfo.map((c) => (
        <div className="grid grid-cols-6 gap-x-2 mt-3" key={c._id}>
          <p className="text-black">{c?.quantity || 0}</p>
          <p className="text-black col-span-3">{c.conceptEstimate.description}</p>
          <p className="text-black text-right">{CurrencyFormatter({
            currency: 'MXN',
            value: c?.priceConcepEstimate?.cost || 0
          })}</p>
          <p className="text-black text-right">{CurrencyFormatter({
            currency: 'MXN', 
            value: c?.amount || 0
          })}</p>
        </div>
      ))}

      <div className="mt-6 py-3 flex justify-between items-center border-y-2 border-blue-200">
        <p className="font-extrabold text-slate-600">SUBTOTAL</p>
        <p className="text-blue-600 font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: invoice.cost.subtotal
        })}</p>
      </div>
      
      <div className="py-3 flex justify-between items-center">
        <p className="font-extrabold text-slate-600">(+)IVA</p>
        <p className="text-blue-600 font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: invoice.cost.iva
        })}</p>
      </div>

      <div className="py-3 flex justify-between items-center border-y-2 border-blue-500">
        <p className="font-extrabold text-slate-600">Total</p>
        <p className="text-blue-600 font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: invoice.cost.total
        })}</p>
      </div>

      <p className="font-extrabold text-slate-600 mt-6">NOTE</p>
      <p className="text-slate-600 text-sm">Validar estimacion vs factura</p>
      <p className="text-slate-600 text-sm">Validar abonos de factura completos</p>

      {/* <TableConceptsInvoice concepts={concepts} project={project} token={token} isFilterTable={false} /> */}
    </>
  )
}