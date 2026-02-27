'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { RelationTable } from "@/interfaces/Relation";
import { removeRelation } from "@/app/api/routeRelations";
import { useTableStates } from "@/app/store/tableStates";
import { useMemo } from "react";

export default function TableRelations({data, token}:
  {data:RelationTable[], token:string}){
  
  const columnHelper = createColumnHelper<RelationTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <input type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onClick={()=> {
            table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
          }}
        />
      )
    }),
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <DeleteElement id={row.original.id} name={row.original.condition} remove={removeRelation} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('condition', {
      header: 'Condicion',
      id: 'Condicion',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.condition}</p>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'Descripcion',
      cell: ({row}) => (
        <p className="">{row.original.description}</p>
      ),
    }),
    columnHelper.accessor('nextNode', {
      header: 'Nodo siguiente',
      id: 'Nodo',
      cell: ({row}) => (
        <p className="">{row.original.nextNode}</p>
      ),
    }),
  ]
  
  return(
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar relation.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} />
      </div>
    </>
  )
}

const ListData = ({data, token}: {data: RelationTable[], token:string}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.condition.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[450px]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((c) => (
            <CardRelation relation={c} key={c.id} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardRelation = ({relation, token}: 
  {relation:RelationTable, token:string}) => {
  
  return(
    <div role="button"
      key={relation.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ '/img/catalog.svg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <DeleteElement id={relation.id} name={relation.condition} remove={removeRelation} token={token} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {relation.condition}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {relation.description}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {relation.nextNode}  
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {/* {node.condition} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}