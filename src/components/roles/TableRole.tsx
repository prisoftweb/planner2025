'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import IconText from "../providers/IconText";
import { RoleTable } from "@/interfaces/Roles";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { RemoveRole } from "@/app/api/routeRoles";
import DeleteElement from "../DeleteElement";
import { useMemo } from "react";
import { useTableStates } from "@/app/store/tableStates";

export default function TableRole({data, token}:
  {data:RoleTable[], token:string}){
  
  const columnHelper = createColumnHelper<RoleTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <IconText size="w-6 h-6" sizeText="text-sm" text={row.original.name} />
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
    columnHelper.accessor('status', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center gap-x-1">
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveRole} token={token} />
          <div className="flex text-slate-500 items-end">
            <div 
              className={`w-4 h-4 ${row.original.status.status? 'bg-green-500': 'bg-red-500'}`}>
            </div>
            <p><sub>{row.original.status.routes}</sub></p>
          </div>
          <div className="flex text-slate-500 items-end">
            <UserCircleIcon className="w-6 h-6 text-slate-500" />
            <p><sub>{row.original.status.routes}</sub></p>
          </div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <Link href={`/roles/role/${row.original.id}`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    columnHelper.accessor('components', {
      header: 'Componentes',
      id: 'componentes',
      cell: ({row}) => (
        <Link href={`/roles/role/${row.original.id}`}>
          <p className="py-2 text-center">{row.original.components}</p>
        </Link>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <Link href={`/roles/role/${row.original.id}`}>
          <p className="py-2">{row.original.description}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar rol.." />
      </div>
      <div className="block md:hidden">
        <ListData data={data} token={token} />
      </div>
    </>
  )
}

const ListData = ({data, token}: {data: RoleTable[], token:string}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.description.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((r) => (
            <CardRole role={r} key={r.id} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardRole = ({role, token }: 
  {role:RoleTable, token:string }) => {

  return(
    <div role="button"
      key={role.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <IconText size="w-6 h-6" sizeText="text-sm" text={role.name} />
          <DeleteElement id={role.id} name={role.name} remove={RemoveRole} token={token} />
          {/* <img alt="responsable" src={ role.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <DeleteElement id={role.id} name={role.name} remove={RemoveCompany} token={token} />
          <TooltipContainerIcon label="Eliminar">
            <TrashIcon className="text-red-500 w-6 h-6 hover:bg-blue-100 cursor-pointer" />
          </TooltipContainerIcon> */}
        </div>
        
        <div className="w-full">
          <Link href={`/roles/role/${role.id}`}>
            <div className="flex gap-x-3 w-full justify-between items-center p-3"
              // onClick={() => window.location.replace(`/expenses/${role.id}/profile?prov=${idProv}`)}
            >
              <div>
                <h6
                  className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                  {role.name}
                </h6>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                  {role.description}
                </p>
              </div>
              <div className="text-right w-32">
                <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                  {role.name}
                </p>
                {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                  
                </p> */}
              </div>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  )
}