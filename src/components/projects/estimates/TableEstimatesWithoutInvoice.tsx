import { TableEstimatesProject } from "@/interfaces/Estimate";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import { IEstimateMin } from "@/interfaces/Estimate";
import { EstimatesWitoutInvoiceDataToEstimatesTable } from "@/app/functions/EstimatesFunctions";
import RemoveElement from "@/components/RemoveElement";
import { removeEstimate } from "@/app/api/routeEstimates";
import DetailEstimateWithoutInvoice from "./DetailEstimateWithoutInvoice";
import { useState } from "react";
import { BsFilePdfFill } from "react-icons/bs";
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";
import { Badge } from "@mui/material";

export default function TableEstimatesWithoutInovice({estimates, delEstimate, token, company }: 
  {estimates:IEstimateMin[], delEstimate:Function, token:string, company:string}) {

  const [showForm, setShowForm] = useState<boolean>(false);
  const [project, setProject] = useState<string>('');
  const [idEstimate, setIdEstimate] = useState<string>('');

  const handleShowForm = (value: boolean) => {
    setShowForm(value);
  }

  if(estimates.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center mt-5">
          <p className="text-5xl mt-20 font-bold">Estimaciones</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            // style={{maxInlineSize: '45ch', textWrap:'balance' }}
            >No hay estimaciones sin factura</p>
          <img src="/img/estimates/estimates.svg" alt="image" className="w-60 h-auto" />
        </div>
      </>
    )
  }

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
          <TooltipContainerIcon label="Detalle">
            <BsFilePdfFill className="h-6 w-6 text-green-500 cursor-pointer hover:text-green-300" onClick={() => {
                setIdEstimate(row.original.id);
                setShowForm(true);
                setProject(row.original.idProject);
            }} />
          </TooltipContainerIcon>
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
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
        >{row.original.Nombre}</p>
      )
    }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
        >{row.original.project}</p>
      ),
    }),
    columnHelper.accessor('Estimacion', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
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
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
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
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
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
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
        ><Chip label={row.original.Condicion.name} color={row.original.Condicion.color}
            darktext={row.original?.Condicion?.darktext?? false} /></p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Orden', {
      header: 'Orden',
      id: 'orden',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/${row.original.id}`)}
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

  let dataTable = EstimatesWitoutInvoiceDataToEstimatesTable(estimates);

  return (
    <>
      <div className="mt-5 flex justify-between items-center bg-white">
        <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
        {/* <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />           */}
      </div>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={dataTable} placeH="buscar estimacion" initialColumns={initialVisibilityColumns} />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={dataTable} token={token} delEstimate={delEstimate} />
      </div>
      
      {showForm && <DetailEstimateWithoutInvoice prj={project} nomEstimate={idEstimate} 
                      numEstimate={1} showForm={handleShowForm} token={token} company={company} />}
    </>
  )
}

const ListData = ({data, token, delEstimate }: 
  {data: TableEstimatesProject[], token:string, delEstimate:Function }) => {

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
            <CardEstimates estimates={e} key={e.id} token={token} delEstimate={delEstimate} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardEstimates = ({estimates, token, delEstimate }: 
  {estimates:TableEstimatesProject, token:string, delEstimate:Function }) => {
  
  return(
    <div role="button"
      key={estimates.id}
      // onClick={() => window.location.replace(pageProject? `/projects/estimates/${project._id}/${estimates.id}?page=project`
      //                               : `/projects/estimates/${project._id}/${estimates.id}`)}
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
        <div className="w-full"
          onClick={() => window.location.replace(`/projects/estimates/${estimates.idProject}/${estimates.id}`)}
        >
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
                  currency: 'MXN',
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