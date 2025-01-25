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
import { getConeptsEstimate } from "@/app/api/routeEstimates";
import AddNewConceptEstimate from "./AddNewConceptEstimate";
import { Options } from "@/interfaces/Common";

export default function ContainerDetailEstimate({project, token, user, estimate, concepts, 
    idEstimate, totalEstimatedProject}: 
  {project: OneProjectMin, token: string, user: string, estimate:IEstimate, 
    concepts:IConceptEstimate[], idEstimate:string, totalEstimatedProject: TotalEstimatedByProject[]}) {

  const [openNewConcept, setOpenNewConcept] = useState<boolean>(false);
  const [isfilterTable, setIsFilterTable] = useState<boolean>(false);
  const [conceptsData, setConceptsData] = useState<IConceptEstimate[]>(concepts);

  // console.log('estimCION RECIVIDA => ', estimate);

  const handleFilterTable = (value: boolean) => {
    setIsFilterTable(value);
  }

  // const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const handleShowForm = (value: boolean) => {
    setOpenNewConcept(value);
  }

  const updateConceptsEstimate = async () => {
    // let estimates: IEstimateProject[];
    // try {
    //   estimates = await getEstimatesByProject(token, project._id);
    //   console.log('estimates min => ', estimates);
    //   if(typeof(estimates) === "string")
    //     return <h1 className="text-center text-red-500">{estimates}</h1>
    // } catch (error) {
    //   return <h1 className="text-center text-red-500">Ocurrio un error al obtener las estimaciones del proyecto!!</h1>  
    // }

    // setIsFilterTable(false);
    // setEstimatesData(estimates);
    let concepts: IConceptEstimate[];
    try {
      concepts = await getConeptsEstimate(token, estimate._id);
      console.log('concepts min => ', concepts);
      if(typeof(concepts) === "string")
        return <h1 className="text-center text-red-500">{concepts}</h1>
    } catch (error) {
      return <h1 className="text-center text-red-500">Ocurrio un error al actualizar conceptos de la estimacion!!</h1>  
    }
    setIsFilterTable(false);
    setConceptsData(concepts);
  }

  const delConcept = (id:string) => {
    const newData = conceptsData.filter((c) => c.conceptEstimate._id!==id);
    setIsFilterTable(false);
    setConceptsData(newData);
    // const newData=estimatesData.filter((e) => e._id !== id);
    // setIsFilterTable(false);
    // setEstimatesData(newData);
  }

  const conceptsLV: Options[] = [];
  concepts.map((c) => {
    conceptsLV.push({
      label: c.conceptEstimate.name,
      value: c.conceptEstimate._id
    });
  });

  // const conceptsPrueba: IConceptEstimate[] = [];
  // for (let index = 0; index < 2; index++) {
  //   conceptsPrueba.push(concepts[0]);  
  // }
// console.log('estimate => ', estimate);



  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer"
            onClick={() => window.location.replace(`/projects/estimates/${project._id}`)}
          >
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </div>
          <p className="text-xl ml-4 font-medium">{project.title} {'->'} {estimate?.name || 'sin estimacion'} </p>
        </div>
        <Button onClick={() => setOpenNewConcept(true)}>Agregar partida</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 mt-2 sm:mt-3 md:mt-5 gap-y-2">
        <div className="bg-white p-3">
          <img src={project.client.logo} 
            alt={project.client.name} className="h-20 w-auto " />
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
          <div className="flex justify-between ">
            <p className="text-slate-400">Acumulado estimado</p>
            <p className="text-lg text-slate-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: totalEstimatedProject[0].estimatedTotal
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Esta estimacion</p>
            <p className="text-lg text-green-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: estimate.estimatedTotal
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Pendiente por estimar</p>
            <p className="text-lg text-slate-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: totalEstimatedProject[0].amountPayable
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Amortizado</p>
            <p className="text-lg text-slate-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: totalEstimatedProject[0].amountChargeOff
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Fondo de garantia</p>
            <p className="text-lg text-slate-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: totalEstimatedProject[0].amountGuaranteeFund
            })}</p>
          </div>
        </div>

        <div className="bg-white p-3">
          <div className=" border border-gray-700">
            <div className="flex items-center border border-gray-700">
              <p className="bg-green-600 text-white p-2 w-40 text-center">CREADA</p>
              <p className="w-full text-blue-500 text-right p-2">ESTIMACION</p>
            </div>
            <div className="text-center border border-slate-700 p-2">
              <p className="text-slate-600 text-center">{CurrencyFormatter({
                currency: 'MXN',
                value: estimate.amount
              })}</p>
            </div>

          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Fecha {typeof(estimate.date)}</p>
            <p className="text-lg text-slate-600 text-right">{estimate.date?.substring(0, 10)}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Orden de compra</p>
            <p className="text-lg text-slate-600 text-right">{estimate.purschaseOrder}</p>
          </div>
        </div>

      </div>
      <TableConceptsEstimate concepts={conceptsData} delConcept={delConcept} handleFilterTable={handleFilterTable} 
        isFilterTable={isfilterTable} project={project} token={token} />
      {openNewConcept && <AddNewConceptEstimate project={project} showForm={handleShowForm} token={token}
                            updateConcepts={updateConceptsEstimate} user={user} idEstimate={idEstimate}
                            conceptsDataChart={concepts} />}
      {/* {openNewStimate && <AddNewEstimateProject showForm={handleShowForm} project={project} user={user}
      updateEstimates={updateEstimatesProject} token={token} />} */}
    </>
  )
}