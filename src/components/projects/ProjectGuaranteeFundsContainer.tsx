'use client'

import { useState, useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import { useOneProjectsStore } from "@/app/store/projectsStore"
import { IGuaranteeByPojectMin, ITableGuaranteeByProject } from "@/interfaces/Guarantee"
import { createColumnHelper } from "@tanstack/react-table"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Table from "../Table"
import Chip from "../providers/Chip"

type Props = {
  project:OneProjectMin, 
  token:string, 
  id:string,
  user:string
  guarantees: IGuaranteeByPojectMin[]
}

export default function ProjectGuaranteeFundsContainer({project, token, id, user, guarantees}: Props){

  // const [opt, setOpt] = useState<number>(1);
  const {updateOneProjectStore} = useOneProjectsStore();
  
  useEffect(() => {
    updateOneProjectStore(project);
  }, []);

  console.log('guarantees by project => ', guarantees);

  const columnHelper = createColumnHelper<ITableGuaranteeByProject>();
    
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          {/* <RemoveElement id={`${row.original.id}`} name={row.original.Referencia} remove={deleteCollection} 
                      removeElement={delCollection} token={token} /> */}
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
    columnHelper.accessor('user', {
      header: 'Usuario',
      id: 'usuario',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.user}</p>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.client}</p>
      ),
    }),
    columnHelper.accessor('estimate', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.estimate}</p>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.date.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('fechaGarantia', {
      header: 'Fecha de garantia',
      id: 'fecha de garantia',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original?.fechaGarantia?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('fechaPago', {
      header: 'Fecha de pago',
      id: 'fecha pago',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.fechaPago?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('fechaProgramacion', {
      header: 'Fecha de programacion',
      id: 'fecha programacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.fechaProgramacion?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('fechaRetencion', {
      header: 'Fecha retencion',
      id: 'fecha retencion',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.fechaRetencion?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        ><Chip label={row.original.status.name} color={row.original.status.color} /> </p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto de garantia',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amount
        })}</p>
      ),
    }),
    columnHelper.accessor('amountVat', {
      header: 'Monto con iva',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amountVat
        })}</p>
      ),
    }),
  ]

  const data = TransformDataGuaranteeTotable(guarantees);

  return(
    <>
      <div className={`flex w-full`}>
        <Table columns={columns} data={data} placeH="Buscar fondo de garantia" typeTable="guaranteefunds" />
      </div>
    </>
  )
}

function TransformDataGuaranteeTotable(guarantees: IGuaranteeByPojectMin[]): ITableGuaranteeByProject[] {
  return guarantees.map((guarantee) => ({
    id: guarantee._id,
    client: guarantee.client.name,
    // dateGuarantee: guarantee.dateGuarantee,
    // datePayment: guarantee.datePayment,
    date: guarantee.date.substring(0, 10),
    amount: guarantee.cost.subtotal,
    amountVat: guarantee.cost.total,
    estimate: guarantee.estimate.name,
    user: guarantee.user.name,
    status: guarantee.estatus,
    fechaGarantia: guarantee.dateGuarantee?.substring(0, 10) || '',
    fechaPago: guarantee.datePayment?.substring(0, 10) || '',
    fechaProgramacion: guarantee.dateProgramming?.substring(0, 10) || '',
    fechaRetencion: ''
  }));
}