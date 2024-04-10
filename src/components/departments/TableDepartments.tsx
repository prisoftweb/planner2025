'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { DepartmentTable } from "@/interfaces/Departments";
import { PencilIcon } from "@heroicons/react/24/solid";
import { RemoveDepartment } from "@/app/api/routeDepartments";
import { useState } from "react";
import NewDepartment from "./NewDepartment";
import { Options } from "@/interfaces/Common";

export default function TableDepartments({data, token, optionsCompany}:
                        {data:DepartmentTable[], token:string, optionsCompany:Options[]}){
  
  const columnHelper = createColumnHelper<DepartmentTable>();

  const [editDept, setEditDept] = useState<boolean>(false);
  const [deptEdit, setDeptEdit] = useState<DepartmentTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'id',
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
      id: 'action',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer" 
            onClick={() => {setDeptEdit(row.original); setEditDept(true);}}
          />
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveDepartment} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Departamento',
      id: 'name',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('abbreviation', {
      header: 'Abreviacion',
      id: 'abbreviation',
      cell: ({row}) => (
        <p className="">{row.original.abbreviation}</p>
      ),
    }),
    columnHelper.accessor('company', {
      header: 'Compañia',
      id: 'company',
      cell: ({row}) => (
        <img src={row.original.company.logo} 
            className="w-16 h-16 rounded-full" 
            alt="logo" />
      )
    }),
  ]
  
  return(
    <>
      {editDept && <NewDepartment token={token} OptionsCompany={optionsCompany} dept={deptEdit || ''} showForm={setEditDept} />}
      <Table columns={columns} data={data} placeH="Buscar departamento.." />
    </>
  )
}