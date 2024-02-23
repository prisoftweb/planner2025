'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import IconText from "./IconText";
import { Provider, TableProvider } from "@/interfaces/Providers";
import DeleteProvider from "./DeleteProvider";

export default function TableProviders({data, token}:{data:TableProvider[], token:string}){
  
  const columnHelper = createColumnHelper<any>();
  //const [newUser, setNewUser] = useState<boolean>(false);

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'id',
      cell: ({row}) => (
        <div className="flex">
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
        // <TrashIcon className="w-6 h-6 text-red-400" />
        <DeleteProvider provider={row.original} token={token} />
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
    columnHelper.accessor('suppliercredit', {
      header: 'Credito',
      id: 'suppliercredit',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}?tab=1`}>
          <div className="flex items-center">
            <div 
              className={`w-6 h-6 mr-3 ml-5 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
            </div>
          </div>
        </Link>       
      ),
    }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'rfc',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}?tab=1`}>
          <p className="py-2">{row.original.rfc}</p>
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
    columnHelper.accessor('currentbalance', {
      header: 'Saldo actual',
      id: 'currentbalance',
      cell: ({row}) => (
        <Link href={`/providers/${row.original.id}?tab=1`}>
          <p className="py-2">{row.original.currentbalance}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} /> 
    </>
  )
}