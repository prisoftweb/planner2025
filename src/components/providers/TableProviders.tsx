'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import IconText from "./IconText";
import { TableProvider } from "@/interfaces/Providers";
import DeleteProvider from "./DeleteProvider";
import NumberContacts from "./NumberContacts";
import { RemoveProvider } from "@/app/api/routeProviders";
import RemoveElement from "../RemoveElement";
import { useProviderStore } from "@/app/store/providerStore";
import { showToastMessageError } from "../Alert";

export default function TableProviders({data, token}:
          {data:TableProvider[], token:string}){
  
  const columnHelper = createColumnHelper<any>();

  const {updateProviderStore, providerStore} = useProviderStore();

  const delProvider = async(id: string) => {
    try {
      const arrProvs = providerStore.filter(prov => prov._id !== id);
      updateProviderStore(arrProvs);
      //updateHaveDeleteReport(true);
    } catch (error) {
      showToastMessageError('Error al quitar proveedor de la tabla!!');
      //console.log('Error al eliminar');
      //console.log('catch function => ', error);
    }
  }
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      maxSize: 10,
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex items-center gap-x-2">
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
      ),
    }),
    columnHelper.accessor('suppliercredit', {
      header: 'Accion',
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center">
          <IconText text={row.original.name} size="w-8 h-8" sizeText="" />
          <div 
            className={`w-4 h-4 mr-3 ml-5 ${row.original.suppliercredit? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          {/* <DeleteProvider provider={row.original} token={token} /> */}
          <RemoveElement id={row.original.id} name={row.original.name} token={token} 
              remove={RemoveProvider} removeElement={delProvider} />
          <NumberContacts numContacts={row.original.contacts} />
        </div>
        // <Link href={`/providers/${row.original.id}/profile`}>
          
        // </Link>       
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        // <Link href={`/providers/${row.original.id}/profile`}>
        //   <p className="py-2">{row.original.name}</p>
        // </Link>
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original.name}</p>
      )
    }),
    // columnHelper.accessor('contacts', {
    //   header: 'Contactos',
    //   id: 'contacts',
    //   cell: ({row}) => (
    //     <NumberContacts numContacts={row.original.contacts} />       
    //   ),
    // }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'rfc',
      cell: ({row}) => (
        // <Link href={`/providers/${row.original.id}/profile`}>
        //   <p className="py-2">{row.original.rfc}</p>
        // </Link>
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
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
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
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
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original.currentbalance}</p>
      )
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar proveedor.." /> 
    </>
  )
}