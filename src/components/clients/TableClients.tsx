'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import NumberContacts from "../providers/NumberContacts";
import { TableClient } from "@/interfaces/Clients";
import { useClientStore } from "@/app/store/clientStore";
import { useEffect } from "react";
import RemoveElement from "../RemoveElement";
import { removeClient } from "@/app/api/routeClients";

type TableClientsProps = {
  data:TableClient[], 
  token:string, 
  selectPermission:boolean, 
  deletePermission: boolean
}

export default function TableClients({data, token, deletePermission, selectPermission}: TableClientsProps){
  
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
          {selectPermission && (
            <input type="checkbox" 
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          )}
          <img src={row.original.logo} alt="logo" className="w-10 h-auto" />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => {
        selectPermission? (
          <input type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onClick={()=> {
              table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
            }}
          />
        ): <></>
      }
    }),
    columnHelper.accessor('status', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center gap-x-1">
          <div 
            className={`w-4 h-4  ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          {deletePermission && (
            <RemoveElement id={row.original.id} name={row.original.name} token={token}
              remove={removeClient} removeElement={delClient} />
          )}
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
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.name}</p>
      )
    }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'rfc',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.rfc}</p>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.account}</p>
      )
    }),
    columnHelper.accessor('currentbalance', {
      header: 'Saldo actual',
      id: 'saldo',
      cell: ({row}) => (
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