'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { useState, useMemo } from "react";
import { removeNode } from "@/app/api/routeNodes";
import { NodeTable } from "@/interfaces/Nodes";
import UpdateNode from "./UpdateNode";
import { Options } from "@/interfaces/Common";
import TooltipPencilIcon from "../tooltipIcons/TooltipPencilIcon";
import ContainerSideNav from "../ContainerSideNav";
import { useTableStates } from "@/app/store/tableStates";

type Params = {
  data:NodeTable[], 
  token:string, 
  departments: Options[], 
  workflows: Options[], 
  glossaries:Options[], 
  optRels: Options[], 
  optDesc: Options[] 
}

export default function TableNode({data, token, departments, glossaries, workflows, 
  optDesc, optRels}: Params){
  
  const columnHelper = createColumnHelper<NodeTable>();

  const [editNode, setEditNode] = useState<boolean>(false);
  const [nodeEdit, setNodeEdit] = useState<NodeTable>();

  const handleEdit = (value: boolean) => {
    setEditNode(value);
  };

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
          <TooltipPencilIcon element={row.original} handleBooleanValue={setEditNode} handleElement={setNodeEdit} />
          <DeleteElement id={row.original.id} name={row.original.department} remove={removeNode} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('workflow', {
      header: 'Workflow',
      id: 'workflow',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.workflow}</p>
      )
    }),
    columnHelper.accessor('department', {
      header: 'Departamento',
      id: 'Departamento',
      cell: ({row}) => (
        <p className="">{row.original.department}</p>
      ),
    }),
    columnHelper.accessor('caminos', {
      header: 'Caminos',
      id: 'Caminos',
      cell: ({row}) => (
        <p className="">{row.original.caminos}</p>
      ),
    }),
  ]
  
  return(
    <>
      {editNode && (
        <ContainerSideNav width="w-full max-w-md">
          <UpdateNode showForm={handleEdit} departments={departments} 
            glossaries={glossaries} id={nodeEdit?.id || ''} token={token} workFlows={workflows} 
            optDesc={optDesc} optRels={optRels} node={nodeEdit} />
        </ContainerSideNav>
      ) }
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar nodo.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} />
      </div>
    </>
  )
}

const ListData = ({data, token}: {data: NodeTable[], token:string}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.caminos.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-222px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((c) => (
            <CardNode node={c} key={c.id} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardNode = ({node, token}: 
  {node:NodeTable, token:string}) => {
  
  return(
    <div role="button"
      key={node.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ '/img/catalogs.svg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <DeleteElement id={node.id} name={node.department} remove={removeNode} token={token} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {node.workflow}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {node.caminos}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {node.department}  
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {node.condition}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}