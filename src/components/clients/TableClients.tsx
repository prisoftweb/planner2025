'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import NumberContacts from "../providers/NumberContacts";
import IconText from "../providers/IconText";
import { TableClient } from "@/interfaces/Clients";
import DeleteClient from "./DeleteClient";

export default function TableClients({data, token}:
                        {data:TableClient[], token:string}){
  
  const columnHelper = createColumnHelper<TableClient>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'id',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          {/* <IconText size="w-6 h-6" sizeText="text-sm" text={row.original.name} /> */}
          <img src={row.original.logo} alt="logo" className="w-10 h-10" />
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
        <DeleteClient client={row.original} token={token} />
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'name',
      cell: ({row}) => (
        <Link href={`/clients/${row.original.id}/profile`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      id: 'status',
      cell: ({row}) => (
        <Link href={`/clients/${row.original.id}/profile`}>
          <div className="flex items-center">
            <div 
              className={`w-4 h-4 mr-3 ml-5 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
            </div>
          </div>
        </Link>       
      ),
    }),
    columnHelper.accessor('contacts', {
      header: 'Contactos',
      id: 'contacts',
      cell: ({row}) => (
        <NumberContacts numContacts={row.original.contacts} />       
      ),
    }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'rfc',
      cell: ({row}) => (
        <Link href={`/clients/${row.original.id}/profile`}>
          <p className="py-2">{row.original.rfc}</p>
        </Link>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'account',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}/profile`}>
          <p className="py-2">{row.original.account}</p>
        </Link>
      )
    }),
    columnHelper.accessor('currentbalance', {
      header: 'Saldo actual',
      id: 'currentbalance',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}/profile`}>
          <p className="py-2">{row.original.currentbalance}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar cliente.." />
    </>
  )
}