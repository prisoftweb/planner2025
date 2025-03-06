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

type ContainerDetailEstimateProps = {
  project: OneProjectMin, 
  token: string, 
  user: string, 
  estimate:IEstimate, 
  concepts:IConceptEstimate[], 
  idEstimate:string, 
  totalEstimatedProject: TotalEstimatedByProject[]
}

export default function ContainerDetailEstimate({project, token, user, estimate, concepts, 
    idEstimate, totalEstimatedProject}: ContainerDetailEstimateProps) {

  const [openNewConcept, setOpenNewConcept] = useState<boolean>(false);
  const [isfilterTable, setIsFilterTable] = useState<boolean>(false);
  const [conceptsData, setConceptsData] = useState<IConceptEstimate[]>(concepts);

  const [totalEstimatedProjectState, setTotalEstimatedProjectState] = useState<TotalEstimatedByProject[]>(totalEstimatedProject);

  const handleFilterTable = (value: boolean) => {
    setIsFilterTable(value);
  }

  const handleShowForm = (value: boolean) => {
    setOpenNewConcept(value);
  }

  const updateConceptsEstimate = async () => {
    let concepts: IConceptEstimate[];
    try {
      // concepts = await getConeptsEstimate(token, estimate._id);
      concepts = await getAllConceptsDetailsByEstimateMin(token, estimate._id);
      // console.log('concepts min => ', concepts);
      if(typeof(concepts) === "string"){
        showToastMessageError(concepts);
      }else{
        setConceptsData(concepts);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al actualizar conceptos de la estimacion!!');
    }

    let totalEstimated: TotalEstimatedByProject[];
    try {
      totalEstimated = await getTotalEstimatesByProjectMin(token, project._id);
      if(typeof(totalEstimated) === "string"){
        showToastMessageError(totalEstimated);
      }else{
        setTotalEstimatedProjectState(totalEstimated);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al actualizar el total de las estimaciones del proyecto!!')
    }

    setIsFilterTable(false);
    // setConceptsData(concepts);
  }

  const delConcept = (id:string) => {
    updateConceptsEstimate();
  }

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
  let component = <TableConceptsEstimate concepts={conceptsData} delConcept={delConcept} 
      handleFilterTable={handleFilterTable} isFilterTable={isfilterTable} 
      project={project} token={token} idEstimate={idEstimate} estimatedTotal={totalEstimatedProjectState[0]?.estimatedTotal || 0} />;
// console.log('estimate => ', estimate);

  let button = <></>;
  if(!estimate.haveinvoice){
    if(estimate.ismoneyadvance){
      if(concepts.length===0 || !concepts[0].conceptEstimate?._id){
        button=<Button onClick={() => setOpenNewConcept(true)}>Agregar partida</Button>;
      }
    }else{
      button=<Button onClick={() => setOpenNewConcept(true)}>Agregar partida</Button>;
    }
  }
console.log('concepts estimate => ', conceptsData);
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
        {button}
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
              value: totalEstimatedProjectState[0]?.estimatedTotal || 0
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Esta estimacion</p>
            <p className="text-lg text-green-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: estimate?.estimatedTotal || 0
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Pendiente por estimar</p>
            <p className="text-lg text-slate-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: project.amount - (totalEstimatedProjectState[0]?.estimatedTotal || 0)
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Amortizado</p>
            <p className="text-lg text-slate-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: totalEstimatedProjectState[0].amountChargeOff
            })}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-slate-400">Fondo de garantia</p>
            <p className="text-lg text-slate-600 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: totalEstimatedProjectState[0].amountGuaranteeFund
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

      {/* <div>
        <NavTabEstimates setTab={handleTab} tab={tab} />
      </div> */}

      {component}
      {openNewConcept && <AddNewConceptEstimate project={project} showForm={handleShowForm} token={token}
                            updateConcepts={updateConceptsEstimate} user={user} idEstimate={estimate}
                            conceptsDataChart={conceptsData} />}
    </>
  )
}