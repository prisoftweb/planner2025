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
          currency: 'USD',
          value: row.original.PU
        })}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'USD',
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
      
      <div className="hidden md:block w-full">
        <Table columns={columns} data={dataTable} placeH="buscar estimacion" />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={dataTable} token={token} delConcept={delConcept} estimatedTotal={estimatedTotal} idEstimate={idEstimate} />
      </div>
    </>
  )
}

const ListData = ({data, token, delConcept, idEstimate, estimatedTotal }: 
  {data: ITableConceptsEstimate[], token:string, idEstimate:string, estimatedTotal:number, delConcept:Function }) => {

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

          {data.map((c) => (
            <CardConcepts concepts={c} key={c.id} token={token} delConcept={delConcept} 
              estimatedTotal={estimatedTotal} idEstimate={idEstimate}  />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardConcepts = ({concepts, token, idEstimate, estimatedTotal, delConcept }: 
  {concepts:ITableConceptsEstimate, token:string, idEstimate:string, estimatedTotal:number, delConcept:Function, }) => {
  
  return(
    <div role="button"
      key={concepts.id}
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
            <RemoveElement id={`${idEstimate}/${concepts.idconcept}`} name={concepts.nombre} remove={deleteConceptInEstimate} 
            removeElement={delConcept} token={token} progreesAverage={estimatedTotal} />
            {/* <RemoveElement id={estimates.id} name={estimates.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {concepts.nombre}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {concepts.Descripcion}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: concepts.PU?? 0
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: concepts.Importe?? 0
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}