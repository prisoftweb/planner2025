import { useState, useEffect, useRef } from "react"
import { OneProjectMin } from "@/interfaces/Projects";
import FilteringEstimatesProject from "./FilteringEstimatesProject";
import { Options } from "@/interfaces/Common";
import { GiSettingsKnobs } from "react-icons/gi"
import DetailEstimateComponent from "./DetailEstimateComponent";
import { TableEstimatesProject } from "@/interfaces/Estimate";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import { IEstimateProject } from "@/interfaces/Estimate";
import { EstimatesDataToEstimatesTable } from "@/app/functions/EstimatesFunctions";
import RemoveElement from "@/components/RemoveElement";
import { removeEstimate } from "@/app/api/routeEstimates";
import { BsFilePdfFill } from "react-icons/bs";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import NumberContacts from "@/components/providers/NumberContacts";

export default function TableEstimatesByProject({project, optConditions, optProjects, estimates, handleFilterTable, 
  isFilterTable, delEstimate, token, showNewInvoice, selEstimate }: 
  {project: OneProjectMin, optProjects: Options[], optConditions: Options[], estimates:IEstimateProject[], 
    isFilterTable:boolean, handleFilterTable:Function, delEstimate:Function, token:string, 
    showNewInvoice:Function, selEstimate:Function }) {

  // const [estimates, setEstimates] = useState<IEstimateProject[]>(estimatesPro);
  const [filterEstimates, setFilterEstimates] = useState<IEstimateProject[]>(estimates);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isShowDetailEstimate, setIsShowDetailEstimate] = useState<boolean>(false);

  // const [resumenEstimate, setResumenEstimate] = useState<ResumenEstimateProject>();

  // useEffect(() => {
  //   const fetchResumen = async () => {
  //     try {
  //       const result = await getResumenEstimateProject(token, project._id);
  //       // console.log('estimates min => ', estimates);
  //       if(typeof(result) === "string"){
  //         return <h1 className="text-center text-red-500">{result}</h1>
  //       }else{
  //         setResumenEstimate(result);
  //       }
  //     } catch (error) {
  //       return <h1 className="text-center text-red-500">Ocurrio un error al obtener el resumen de las estimaciones del proyecto!!</h1>  
  //     }
  //   }
  //   fetchResumen();
  // }, []);

  const refEstimate = useRef('');

  const handleIsFilter = (value: boolean) => {
    setIsFilter(value);
  }

  useEffect(() => {

  }, []);

  const handleFilterData = (value: any) => {
    setFilterEstimates(value);
  }

  const handleIsShowDetailEstimate = (value: boolean) => {
    setIsShowDetailEstimate(value);
  }

  // console.log('estimates => ', estimates);

  if(estimates.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center mt-5">
          <p className="text-5xl mt-20 font-bold">Estimaciones</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            // style={{maxInlineSize: '45ch', textWrap:'balance' }}
            >Agregar una estimacion al proyecto de {project.title}</p>
          <img src="/img/estimates/estimates.svg" alt="image" className="w-60 h-auto" />
        </div>
        {/* <div className="mt-5 flex justify-between items-center bg-white">
          <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
          <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />          
        </div> */}
      </>
    )
  }

  const estimatetM = estimates.reduce((previous, current) => {
    return current.amount > previous.amount ? current : previous;
  });

  const maxAmount = estimatetM.amount;

  const columnHelper = createColumnHelper<TableEstimatesProject>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {/* <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          /> */}
          <RemoveElement id={row.original.id} name={row.original.Nombre} remove={removeEstimate} 
            removeElement={delEstimate} token={token} />
          <BsFilePdfFill className="h-6 w-6 text-green-500 cursor-pointer hover:text-green-300" onClick={() => {
              refEstimate.current = row.original.id;
              setIsShowDetailEstimate(true);
          }} />
          {row.original.haveInvoice? (
            <DocumentArrowDownIcon className="h-6 w-6 text-green-500 hover:text-green-300" />
          ): (
            <DocumentArrowDownIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-300" onClick={() => {
                refEstimate.current = row.original.id;
                selEstimate(row.original);
                showNewInvoice(true);
            }} />
          )}
          <NumberContacts numContacts={row.original.numConcepts} />
        </div>
      ),
      size: 300,
      enableSorting:false,
      header: ({table}:any) => (
        // <input type="checkbox"
        //   checked={table.getIsAllRowsSelected()}
        //   onClick={()=> {
        //     table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
        //   }}
        // />
        <p>Accion</p>
      )
    }),
    // columnHelper.accessor('condition', {
    //   id: 'accion',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-1 items-center">
    //       <img src={row.original.imgProject} alt="foto" className="w-8 h-8" />
    //       <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
    //       <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} />
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: () => (
    //     <p>accion</p>
    //   )
    // }),
    // columnHelper.accessor(row => row.No, {
    //   id: 'numero',
    //   cell: ({row}) => (
    //     <div className="">
    //       <p>{row.original.No}</p>
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: () => (
    //     <p>No.</p>
    //   )
    // }), 
    columnHelper.accessor('Nombre', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${project._id}/${row.original.id}`)}
        >{row.original.Nombre}</p>
      )
    }),
    columnHelper.accessor('Estimacion', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${project._id}/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Estimacion
        })}</p>
      ),
    }),
    columnHelper.accessor('Amortizacion', {
      header: 'Amortizacion',
      id: 'amortizacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${project._id}/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Amortizacion
        })}</p>
      ),
    }),
    columnHelper.accessor('Fondo', {
      header: 'Fondo',
      id: 'fondo',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${project._id}/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Fondo
        })}</p>
      ),
    }),
    columnHelper.accessor('MontoPay', {
      header: 'Monto a pagar',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.MontoPay
        })}</p>
      ),
    }), 
    columnHelper.accessor('amountVat', {
      header: 'Monto con iva',
      id: 'monto iva',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amountVat
        })}</p>
      ),
    }),
    columnHelper.accessor('Condicion', {
      header: 'Condicion',
      id: 'condicion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${project._id}/${row.original.id}`)}
        ><Chip label={row.original.Condicion.name} color={row.original.Condicion.color} /></p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${project._id}/${row.original.id}`)}
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Orden', {
      header: 'Orden',
      id: 'orden',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${project._id}/${row.original.id}`)}
        >{row.original.Orden}</p>
      ),
    }),
  ]

  const initialVisibilityColumns: any = {
    Accion: true,
    // numero: true,
    nombre: true,
    estimacion: true, 
    amortizacion: true, 
    fondo: true,
    monto: true, 
    'monto iva': false, 
    condicion: true, 
    fecha: true,
    orden: true,
  }

  console.log('estimates table  => ', estimates);
  let dataTable;
  if(isFilterTable){
    dataTable = EstimatesDataToEstimatesTable(filterEstimates);
  }else{
    dataTable = EstimatesDataToEstimatesTable(estimates);
  }

  return (
    // <div className="mt-5 flex justify-between items-center bg-white">
    //   <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
      
    // </div>
    <>
      <div className="mt-5 flex justify-between items-center bg-white">
        <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
        <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />          
      </div>
      <Table columns={columns} data={dataTable} placeH="buscar estimacion" initialColumns={initialVisibilityColumns} />
      {isFilter && <FilteringEstimatesProject showForm={handleIsFilter} optConditions={optConditions} 
                                FilterData={handleFilterData} maxAmount={maxAmount} optProjects={optProjects}  />}
      {isShowDetailEstimate && <DetailEstimateComponent project={project} nomEstimate={refEstimate.current} 
                                    numEstimate={1} showForm={handleIsShowDetailEstimate} token={token} />}
    </>
  )
}
