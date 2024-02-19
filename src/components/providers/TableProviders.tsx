'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
//import { User } from "@/interfaces/User";
//import DeleteUser from "./DeleteUser";
//import NewUser from "./NewUser";
//import Button from "../Button";
import { useState } from "react";
import Link from "next/link";
//import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import IconText from "./IconText";

export default function TableProviders({data, token}:{data:any, token:string}){
  
  const columnHelper = createColumnHelper<any>();
  const [newUser, setNewUser] = useState<boolean>(false);

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'id',
      cell: ({row}) => (
        <div className="flex">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          {/* <DeleteUser token={token} user={row.original} /> */}
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
      id: 'icon',
      cell: ({row}) => (
        <IconText text={row.original.name.substring(0, 2)} />
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <p>{' '}</p>
      )
    }),
    columnHelper.accessor(row => row.id, {
      id: 'action',
      cell: ({row}) => (
        <TrashIcon className="w-6 h-6 text-red-400" />
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <p>Accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'name',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}?tab=1`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    columnHelper.accessor('profile', {
      header: 'Perfil / Estado',
      id: 'profile',
      cell: ({row}) => (
        <Link href={`/users/${row.original.id}?tab=1`}>
          <div className="flex items-center">
            <div 
              className={`w-6 h-6 mr-3 ml-5 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
            </div>
          </div>
        </Link>       
      ),
    }),
    columnHelper.accessor('RFC', {
      header: 'RFC',
      id: 'RFC',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}?tab=1`}>
          <p className="py-2">{row.original.RFC}</p>
        </Link>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'account',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}?tab=1`}>
          <p className="py-2">{row.original.account}</p>
        </Link>
      )
    }),
    columnHelper.accessor('currentmount', {
      header: 'Saldo actual',
      id: 'currentmount',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}?tab=1`}>
          <p className="py-2">{row.original.currentmount}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      {/* <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <Link href={'/'}>
            <ArrowLeftIcon className="w-8 h-8 text-slate-600" />
          </Link>
          <p className="ml-3 text-2xl">Usuarios</p>
        </div>
        <Button type="button" onClick={() => setNewUser(true)}>Nuevo</Button>
        {newUser && <NewUser showForm={setNewUser} />}
      </div> */}
      <Table columns={columns} data={data} /> 
    </>
  )
}