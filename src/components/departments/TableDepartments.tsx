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
import {Tooltip} from "@nextui-org/react";

type DeptProps={
  data:DepartmentTable[], 
  token:string, 
  optionsCompany:Options[]
}

export default function TableDepartments({data, token, optionsCompany}: DeptProps ){
  
  const columnHelper = createColumnHelper<DepartmentTable>();

  const [editDept, setEditDept] = useState<boolean>(false);
  const [deptEdit, setDeptEdit] = useState<DepartmentTable>();

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

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
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Modificar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            <PencilIcon className="w-6 h-6 text-slate-500 hover:text-slate-400 cursor-pointer hover:bg-blue-100" 
              onClick={() => {setDeptEdit(row.original); setEditDept(true);}}
            />
          </Tooltip>
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveDepartment} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('company', {
      header: 'Compañia',
      id: 'compañia',
      cell: ({row}) => (
        <img src={row.original.company.logo} 
            className="w-12 h-auto rounded-full" 
            alt="logo" />
      )
    }),
    columnHelper.accessor('name', {
      header: 'Departamento',
      id: 'departamento',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('abbreviation', {
      header: 'Abreviacion',
      id: 'abreviacion',
      cell: ({row}) => (
        <p className="">{row.original.abbreviation}</p>
      ),
    }),
  ]
  
  return(
    <>
      {editDept && <NewDepartment token={token} OptionsCompany={optionsCompany} dept={deptEdit || ''} showForm={setEditDept} />}
      <Table columns={columns} data={data} placeH="Buscar departamento.." />
    </>
  )
}