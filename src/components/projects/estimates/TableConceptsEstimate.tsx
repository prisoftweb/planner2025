import { useState } from "react"
import { OneProjectMin } from "@/interfaces/Projects";
import { ITableConceptsEstimate } from "@/interfaces/Estimate";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { IConceptEstimate } from "@/interfaces/Estimate";
import { ConceptsDataToConceptsTable } from "@/app/functions/EstimatesFunctions";
import RemoveElement from "@/components/RemoveElement";
import { deleteConceptInEstimate } from "@/app/api/routeEstimates";

type TableConceptsProps = {
  project: OneProjectMin, 
  concepts:IConceptEstimate[], 
  idEstimate:string, 
  isFilterTable:boolean, 
  handleFilterTable:Function, 
  delConcept:Function, 
  token:string,
  estimatedTotal:number
}

export default function TableConceptsEstimate({project, concepts, handleFilterTable, 
  isFilterTable, delConcept, token, idEstimate, estimatedTotal}: TableConceptsProps) {

  const [filterConcepts, setFilterConcepts] = useState<IConceptEstimate[]>(concepts);

  if(concepts.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center mt-5">
          <p className="text-5xl mt-20 font-bold">Conceptos</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            // style={{maxInlineSize: '45ch', textWrap:'balance' }}
            >Agregar un concepto a la estimacion del proyecto {project.title}</p>
          <img src="/img/estimates/concepts.svg" alt="image" className="w-60 h-auto" />
        </div>
        <div className="mt-5 flex justify-between items-center bg-white">
          <p className="text-blue-400">CONCEPTOS DE ESTIMACION</p>
          {/* <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />           */}
        </div>
      </>
    )
  }

  const columnHelper = createColumnHelper<ITableConceptsEstimate>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {/* <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          /> */}
          <RemoveElement id={`${idEstimate}/${row.original.idconcept}`} name={row.original.nombre} remove={deleteConceptInEstimate} 
            removeElement={delConcept} token={token} progreesAverage={estimatedTotal} />
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
    columnHelper.accessor(row => row.Clave, {
      id: 'clave',
      cell: ({row}) => (
        <div className="">
          <p>{row.original.Clave}</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Clave</p>
      )
    }),
    columnHelper.accessor('nombre', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer">{row.original.nombre}</p>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Descripcion}</p>
      ),
    }),
    columnHelper.accessor('Unidad', {
      header: 'Unidad',
      id: 'unidad',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Unidad}</p>
      ),
    }),
    columnHelper.accessor('Cantidad', {
      header: 'Cantidad',
      id: 'cantidad',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Cantidad}</p>
      ),
    }),
    columnHelper.accessor('PU', {
      header: 'P.U.',
      id: 'pu',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.PU
        })}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Importe
        })}</p>
      ),
    }),
  ]

  let dataTable;
  if(isFilterTable){
    dataTable = ConceptsDataToConceptsTable(filterConcepts);
  }else{
    dataTable = ConceptsDataToConceptsTable(concepts);
  }

  return (
    <>
      <div className="mt-5 flex justify-between items-center bg-white">
        <p className="text-blue-400">PREELIMINARES</p>
        {/* <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />           */}
      </div>
      <Table columns={columns} data={dataTable} placeH="buscar estimacion" />
    </>
  )
}
