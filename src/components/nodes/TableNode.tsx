'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { removeNode } from "@/app/api/routeNodes";
import { NodeTable } from "@/interfaces/Nodes";
import UpdateNode from "./UpdateNode";
import { Options } from "@/interfaces/Common";

export default function TableNode({data, token, departments, glossaries, workflows, 
                            optDesc, optRels}:
  {data:NodeTable[], token:string, departments: Options[], workflows: Options[], 
    glossaries:Options[], optRels: Options[], optDesc: Options[] }){
  
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
          <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer" 
            onClick={() => {setNodeEdit(row.original); setEditNode(true);}}
          />
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
      {editNode && <UpdateNode showForm={handleEdit} departments={departments} 
          glossaries={glossaries} id={nodeEdit?.id || ''} token={token} workFlows={workflows} 
          optDesc={optDesc} optRels={optRels} node={nodeEdit} /> }
      <Table columns={columns} data={data} placeH="Buscar nodo.." />
    </>
  )
}