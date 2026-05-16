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
import ContainerSideNav from "../ContainerSideNav";
import { propsTooltip } from "@/libs/animations";
import { useTableStates } from "@/app/store/tableStates";
import { useMemo } from "react";

type DeptProps={
  data:DepartmentTable[], 
  token:string, 
  optionsCompany:Options[],
  company:string
}

export default function TableDepartments({data, token, optionsCompany, company}: DeptProps ){
  
  const columnHelper = createColumnHelper<DepartmentTable>();

  const [editDept, setEditDept] = useState<boolean>(false);
  const [deptEdit, setDeptEdit] = useState<DepartmentTable>();

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
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Modificar' 
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
      {editDept && (
        <ContainerSideNav width="w-full max-w-[360px]">
          <NewDepartment token={token} OptionsCompany={optionsCompany} dept={deptEdit || ''} 
              showForm={setEditDept} company={company} />
        </ContainerSideNav>
      )}
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar departamento.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} />
      </div>
    </>
  )
}

const ListData = ({data, token}: {data: DepartmentTable[], token:string}) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((d) => (
            <CardDepartment department={d} key={d.id} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardDepartment = ({department, token}: 
  {department:DepartmentTable, token:string}) => {
  
  return(
    <div role="button"
      key={department.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ department.company.logo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <DeleteElement id={department.id} name={department.name} remove={RemoveDepartment} token={token} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {department.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {department.abbreviation}
              </p>
            </div>
            {/* <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}