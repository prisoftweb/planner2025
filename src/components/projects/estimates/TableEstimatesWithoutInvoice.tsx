import { TableEstimatesProject } from "@/interfaces/Estimate";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import { IEstimateProject, IEstimateMin } from "@/interfaces/Estimate";
import { EstimatesDataToEstimatesTable, EstimatesWitoutInvoiceDataToEstimatesTable } from "@/app/functions/EstimatesFunctions";
import RemoveElement from "@/components/RemoveElement";
import { removeEstimate } from "@/app/api/routeEstimates";
import DetailEstimateWithoutInvoice from "./DetailEstimateWithoutInvoice";
import { useState } from "react";
import { BsFilePdfFill } from "react-icons/bs";

export default function TableEstimatesWithoutInovice({estimates, delEstimate, token }: 
  {estimates:IEstimateMin[], delEstimate:Function, token:string}) {

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
              setIdEstimate(row.original.id);
              setShowForm(true);
              setProject(row.original.idProject);
          }} />
          {/* {row.original.haveInvoice? (
            <DocumentArrowDownIcon className="h-6 w-6 text-green-500 hover:text-green-300" />
          ): (
            <DocumentArrowDownIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-300" onClick={() => {
                refEstimate.current = row.original.id;
                selEstimate(row.original);
                showNewInvoice(true);
            }} />
          )} */}
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
        ><Chip label={row.original.Condicion.name} color={row.original.Condicion.color} /></p>
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

  // let dataTable;
  // if(isFilterTable){
  //   dataTable = EstimatesDataToEstimatesTable(filterEstimates);
  // }else{
  //   dataTable = EstimatesDataToEstimatesTable(estimates);
  // }

  let dataTable = EstimatesWitoutInvoiceDataToEstimatesTable(estimates);

  return (
    <>
      <div className="mt-5 flex justify-between items-center bg-white">
        <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
        {/* <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />           */}
      </div>
      <Table columns={columns} data={dataTable} placeH="buscar estimacion" initialColumns={initialVisibilityColumns} />
      {/* {isFilter && <FilteringEstimatesProject showForm={handleIsFilter} optConditions={optConditions} 
                                FilterData={handleFilterData} maxAmount={maxAmount} optProjects={optProjects}  />} */}
      {/* {isShowDetailEstimate && <DetailEstimateComponent project={project} nomEstimate={refEstimate.current} 
                                    numEstimate={1} showForm={handleIsShowDetailEstimate} token={token} />} */}
                                    {showForm && <DetailEstimateWithoutInvoice prj={project} nomEstimate={idEstimate} 
                                    numEstimate={1} showForm={handleShowForm} token={token} />}
    </>
  )
}
