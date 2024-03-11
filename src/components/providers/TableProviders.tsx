'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import IconText from "./IconText";
import { Provider, TableProvider } from "@/interfaces/Providers";
import DeleteProvider from "./DeleteProvider";
import NumberContacts from "./NumberContacts";

export default function TableProviders({data, token, numRows}:
          {data:TableProvider[], token:string, numRows:number}){
  
  const columnHelper = createColumnHelper<any>();
  //const [newUser, setNewUser] = useState<boolean>(false);

  const columns = [
    columnHelper.accessor(row => row.id, {
      maxSize: 10,
      id: 'id',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <IconText text={row.original.name} size="w-8 h-8" sizeText="" />
          <DeleteProvider provider={row.original} token={token} />
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
      ),
      //size: 2,
      //maxSize: 2
    }),
    // columnHelper.accessor(row => row.id, {
    //   id: 'icon',
    //   cell: ({row}) => (
    //     <IconText text={row.original.name} size="w-8 h-8" sizeText="" />
    //   ),
    //   enableSorting:false,
    //   header: ({table}:any) => (
    //     <p>{' '}</p>
    //   ),
    //   size: 5,
    //   maxSize: 5
    // }),
    // columnHelper.accessor(row => row.id, {
    //   id: 'action',
    //   cell: ({row}) => (
    //     // <TrashIcon className="w-6 h-6 text-red-400" />
    //     <DeleteProvider provider={row.original} token={token} />
    //   ),
    //   enableSorting:false,
    //   header: ({table}:any) => (
    //     <p>Accion</p>
    //   ),
    //   size: 5,
    //   maxSize: 5
    // }),
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
              className={`w-6 h-6 mr-3 ml-5 ${row.original.suppliercredit? 'bg-green-500': 'bg-red-500'}`}>
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
      <Table columns={columns} data={data} numRows={numRows} placeH="Buscar proveedor.." /> 
    </>
  )
}