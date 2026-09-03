import { useState, useRef } from "react"
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
import { Badge } from "@mui/material";
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";
import TooltipFilterIcon from "@/components/tooltipIcons/TooltipFilterIcon";

type Props = {
  project: OneProjectMin, 
  optProjects: Options[], 
  optConditions: Options[], 
  estimates:IEstimateProject[], 
  isFilterTable:boolean, 
  handleFilterTable:Function, 
  delEstimate:Function, 
  token:string, 
  showNewInvoice:Function, 
  selEstimate:Function 
  pageProject: string | undefined,
  company:string
}

export default function TableEstimatesByProject({project, optConditions, optProjects, estimates, handleFilterTable, 
  isFilterTable, delEstimate, token, showNewInvoice, selEstimate, pageProject, company }: Props) {

  const [filterEstimates, setFilterEstimates] = useState<IEstimateProject[]>(estimates);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isShowDetailEstimate, setIsShowDetailEstimate] = useState<boolean>(false);
  const refEstimate = useRef('');

  const handleIsFilter = (value: boolean) => {
    setIsFilter(value);
  }

  const handleFilterData = (value: any) => {
    setFilterEstimates(value);
  }

  const handleIsShowDetailEstimate = (value: boolean) => {
    setIsShowDetailEstimate(value);
  }

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
          <Badge color="secondary" badgeContent={row.original.numConcepts}>
            <TooltipContainerIcon label="Conceptos">
              <BsFilePdfFill className="h-6 w-6 text-green-500 cursor-pointer hover:text-green-300" onClick={() => {
                  refEstimate.current = row.original.id;
                  setIsShowDetailEstimate(true);
              }} />
            </TooltipContainerIcon>
          </Badge>
          
          {row.original.haveInvoice? (
            <TooltipContainerIcon label="Con factura">
              <DocumentArrowDownIcon className="h-6 w-6 text-green-500 hover:text-green-300" />
            </TooltipContainerIcon>
          ): (
            <TooltipContainerIcon label="Sin factura">
              <DocumentArrowDownIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-300" onClick={() => {
                  refEstimate.current = row.original.id;
                  selEstimate(row.original);
                  showNewInvoice(true);
              }} />
            </TooltipContainerIcon>
          )}
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
    columnHelper.accessor('Nombre', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${row.original.id}?page=project`
                                    : `/projects/estimates/${project._id}/${row.original.id}`)}
        >{row.original.Nombre}</p>
      )
    }),
    columnHelper.accessor('Estimacion', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${row.original.id}?page=project`
                                    : `/projects/estimates/${project._id}/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'USD',
          value: row.original.Estimacion
        })}</p>
      ),
    }),
    columnHelper.accessor('Amortizacion', {
      header: 'Amortizacion',
      id: 'amortizacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${row.original.id}?page=project`
                                    : `/projects/estimates/${project._id}/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'USD',
          value: row.original.Amortizacion
        })}</p>
      ),
    }),
    columnHelper.accessor('Fondo', {
      header: 'Fondo',
      id: 'fondo',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${row.original.id}?page=project`
                                    : `/projects/estimates/${project._id}/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'USD',
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
          currency: 'USD',
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
          currency: 'USD',
          value: row.original.amountVat
        })}</p>
      ),
    }),
    columnHelper.accessor('Condicion', {
      header: 'Condicion',
      id: 'condicion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${row.original.id}?page=project`
                                    : `/projects/estimates/${project._id}/${row.original.id}`)}
        ><Chip label={row.original.Condicion.name} color={row.original.Condicion.color} darktext={row.original?.Condicion?.darktext?? false} /></p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${row.original.id}?page=project`
                                    : `/projects/estimates/${project._id}/${row.original.id}`)}
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Orden', {
      header: 'Orden',
      id: 'orden',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${row.original.id}?page=project`
                                    : `/projects/estimates/${project._id}/${row.original.id}`)}
        >{row.original.Orden}</p>
      ),
    }),
  ]

  const initialVisibilityColumns: any = {
    Accion: true,
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

  let dataTable;
  if(isFilterTable){
    dataTable = EstimatesDataToEstimatesTable(filterEstimates);
  }else{
    dataTable = EstimatesDataToEstimatesTable(estimates);
  }

  return (
    <>
      <div className="mt-5 flex justify-between items-center bg-white">
        <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
        <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />          
      </div>

      <div className="hidden md:block w-full">
        <Table columns={columns} data={dataTable} placeH="buscar estimacion" initialColumns={initialVisibilityColumns} />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={dataTable} token={token} delEstimate={delEstimate} pageProject={pageProject} project={project} />
      </div>

      {isFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
          <FilteringEstimatesProject showForm={handleIsFilter} optConditions={optConditions} 
                                FilterData={handleFilterData} maxAmount={maxAmount} optProjects={optProjects}  />
        </div>
      )}
      {isShowDetailEstimate && <DetailEstimateComponent project={project} nomEstimate={refEstimate.current} 
                                    numEstimate={1} showForm={handleIsShowDetailEstimate} token={token} company={company} />}
    </>
  )
}

const ListData = ({data, token, pageProject, project, delEstimate }: 
  {data: TableEstimatesProject[], token:string, pageProject: string | undefined, project: OneProjectMin, 
    delEstimate:Function }) => {

  // const [dataReports, setDataReports] = useState(data);
  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.category.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div className="mt-2">
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((e) => (
            <CardEstimates estimates={e} key={e.id} token={token} pageProject={pageProject} 
              project={project} delEstimate={delEstimate} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardEstimates = ({estimates, token, pageProject, project, delEstimate }: 
  {estimates:TableEstimatesProject, token:string, pageProject: string | undefined, project: OneProjectMin, 
    delEstimate:Function }) => {
  
  return(
    <div role="button"
      key={estimates.id}
      onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${estimates.id}?page=project`
                                    : `/projects/estimates/${project._id}/${estimates.id}`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ estimates.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            <Badge color="secondary" badgeContent={estimates.numConcepts}>
              <TooltipContainerIcon label="Conceptos">
                <BsFilePdfFill className="h-6 w-6 text-green-500 cursor-pointer hover:text-green-300" 
                  // onClick={() => {
                  //   refEstimate.current = estimates.id;
                  //   setIsShowDetailEstimate(true);
                  // }} 
                />
              </TooltipContainerIcon>
            </Badge>
            <RemoveElement id={estimates.id} name={estimates.Nombre} remove={removeEstimate} 
              removeElement={delEstimate} token={token} />
            {/* <RemoveElement id={estimates.id} name={estimates.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {estimates.Nombre}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {estimates.Fecha?.substring(0, 10)}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: estimates.Estimacion
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                <Chip label={estimates.Condicion.name} color={estimates.Condicion.color} darktext={estimates?.Condicion?.darktext?? false} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}