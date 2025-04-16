'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CompanyTable } from "@/interfaces/Companies";
import { RemoveCompany } from "@/app/api/routeCompany";
import DeleteElement from "../DeleteElement";

export default function TableCompany({data, token}: {data:CompanyTable[], token:string}){
  
  const columnHelper = createColumnHelper<CompanyTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <img src={row.original.logo} 
            className="w-12 h-auto rounded-full" 
            alt="logo" />
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
        <div className="flex text-slate-500 items-center">
          <div 
            className={`w-4 h-4 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveCompany} token={token} />
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
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Telefono | Correo',
      id: 'telefono',
      cell: ({row}) => (
        <div className=" text-slate-500">
          <p className="">{row.original.phoneNumber}</p>
          <p className="">{row.original.email}</p>
        </div>
      ),
    }),
    columnHelper.accessor('address', {
      header: 'Direccion',
      id: 'direccion',
      cell: ({row}) => (
        <p className="py-2 text-center text-slate-500">{row.original.address}</p>
      )
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar compañia.." />
    </>
  )
}