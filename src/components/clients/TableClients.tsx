'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import NumberContacts from "../providers/NumberContacts";
import { TableClient } from "@/interfaces/Clients";
//import DeleteClient from "./DeleteClient";
import { useClientStore } from "@/app/store/clientStore";
import { useEffect } from "react";
import RemoveElement from "../RemoveElement";
import { removeClient } from "@/app/api/routeClients";

export default function TableClients({data, token}:
                        {data:TableClient[], token:string}){
  
  const columnHelper = createColumnHelper<TableClient>();
  const {clients, setClients, deleteClient} = useClientStore();

  useEffect(() => {
    setClients(data);
  }, []);

  const delClient = (id:string) => {
    deleteClient(id);
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
          {/* <IconText size="w-6 h-6" sizeText="text-sm" text={row.original.name} /> */}
          <img src={row.original.logo} alt="logo" className="w-10 h-auto" />
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
          <div 
            className={`w-4 h-4  ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          {/* <DeleteClient client={row.original} token={token} /> */}
          <RemoveElement id={row.original.id} name={row.original.name} token={token}
            remove={removeClient} removeElement={delClient} />
          <NumberContacts numContacts={row.original.contacts} />
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
        // <Link href={`/clients/${row.original.id}/profile`}>
        //   <p className="py-2">{row.original.name}</p>
        // </Link>
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.name}</p>
      )
    }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'rfc',
      cell: ({row}) => (
        // <Link href={`/clients/${row.original.id}/profile`}>
        //   <p className="py-2">{row.original.rfc}</p>
        // </Link>
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.rfc}</p>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        // <Link href={`/providers/${row.original.id}/profile`}>
        //   <p className="py-2">{row.original.account}</p>
        // </Link>
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.account}</p>
      )
    }),
    columnHelper.accessor('currentbalance', {
      header: 'Saldo actual',
      id: 'saldo',
      cell: ({row}) => (
        // <Link href={`/providers/${row.original.id}/profile`}>
        //   <p className="py-2">{row.original.currentbalance}</p>
        // </Link>
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.currentbalance}</p>
      )
    }),
  ]

  let table: JSX.Element = <></>;
  if(clients.length > 0){
    table = <Table columns={columns} data={clients} placeH="Buscar cliente.." />
  }else{
    table = <Table columns={columns} data={data} placeH="Buscar cliente.." />
  }
  
  return(
    <>
      {table}
    </>
  )
}