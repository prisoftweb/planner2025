import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import { OneProjectMin } from "@/interfaces/Projects";
import Chip from "@/components/providers/Chip";

import { getCollectionsMin, deleteCollection } from "@/app/api/routeCollections";
import { ICollectionMin, ITableCollection } from "@/interfaces/Collections";
import { CollectionDataToTableData } from "@/app/functions/CollectionsFunctions";

export default function TableCollectionsComponent({token, project}:{token:string, project:OneProjectMin}) {

  const [collections, setCollections] = useState<ICollectionMin[]>([]);

  useEffect(() => {
    const fetch = async() => {
      const res = await getCollectionsMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setCollections(res);
      }
    }

    fetch();
  }, []);

  if(collections.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center">
          <p className="text-5xl mt-20 font-bold">Cobranza</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            >Gestiona las cuentas por cobrar,
            recuperacion de cobranza y mas
            desde Planner</p>
          <img src="/img/estimates/invoices.svg" alt="image" className="w-60 h-auto" />
        </div>
      </>
    )
  }

  const delCollection = (id:string) => {
    showToastMessage('Cobro eliminado satisfactoriamente!!!');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const columnHelper = createColumnHelper<ITableCollection>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {/* <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          /> */}
          <RemoveElement id={`${row.original.id}`} name={row.original.Referencia} remove={deleteCollection} 
                      removeElement={delCollection} token={token} />
        </div>
      ),
      size: 300,
      enableSorting:false,
      header: ({table}:any) => (
        // <input type="checkbox"
        //   checked={table.getIsAllRowsSelected()}
        //   onClick={()=> {
        //     table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
        //   }}
        // />
        <p>Accion</p>
      )
    }),
    columnHelper.accessor('Referencia', {
      header: 'Referencia',
      id: 'referencia',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.Referencia}</p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.Fecha.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('Cuenta', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.Cuenta}</p>
      ),
    }),
    columnHelper.accessor('Estimacion', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.Estimacion}</p>
      ),
    }),
    columnHelper.accessor('Facturas', {
      header: 'Facturas',
      id: 'facturas',
      cell: ({row}) => (
        <div>
          {row.original.Facturas.map((f) => (
            <Chip label={f.invoices.folio} color={'#466'} key={f._id} />
          ))}
        </div>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Chip label={row.original.status.name} color={row.original.status.color} />
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Importe
        })}</p>
      ),
    }),
  ]

  const data = CollectionDataToTableData(collections);

  return (
    <>
      <Table columns={columns} data={data} placeH="buscar cobro" />
    </>
  )
}
