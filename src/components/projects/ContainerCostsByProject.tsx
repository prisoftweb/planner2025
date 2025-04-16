'use client'

// import { useEffect } from "react"
import { OneProjectMin, ICostsByProject } from "@/interfaces/Projects"
// import ProfileProject from "./ProfileProject"
// import { useOneProjectsStore } from "@/app/store/projectsStore"
// import DashboardAnalysisProject from "./DashboardAnalysisProject"

import { createColumnHelper } from "@tanstack/react-table"
import { ExpensesTable } from "@/interfaces/Expenses"
import { IoAlert } from "react-icons/io5"
import { BsFiletypeXml } from "react-icons/bs"
import { BsFileEarmarkPdf } from "react-icons/bs"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Chip from "../providers/Chip"
import Table from "../Table"
import { ExpenseDataProjectToTableDataProject } from "@/app/functions/SaveProject"

type Props = {
  project:OneProjectMin, 
  token:string, 
  user:string,
  costs: ICostsByProject[]
}

export default function ContainerCostsByProject({project, token, user, costs}: Props){

  // const {updateOneProjectStore} = useOneProjectsStore();
  
  // useEffect(() => {
  //   updateOneProjectStore(project);
  // }, []);

  const columnHelper = createColumnHelper<ExpensesTable>();

  const queryParam= `?project=${project._id}`;

  const columns = [
      columnHelper.accessor(row => row.id, {
        id: 'seleccion',
        cell: ({row}) => (
          <div className="flex gap-x-2 justify-center">
            <input type="checkbox" 
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              className="w-24 cursor-pointer"
            />
          </div>
        ),
        enableSorting:false,
        header: ({table}:any) => (
          <div className="w-8">
            <input type="checkbox"
              className="w-24 cursor-pointer"
              checked={table.getIsAllRowsSelected()}
              onClick={()=> {
                table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
              }}
            />
          </div>
        )
      }),
      columnHelper.accessor('Responsable', {
        id: 'Responsable',
        cell: ({row}) => (
          <div className="flex gap-x-1 items-center">
            <img src={row.original.Responsable.photo} className="w-10 h-auto rounded-full" alt="user" />
            <div className="w-20 flex gap-x-1 items-center">
              {row.original.archivos.includes('xml') && <BsFiletypeXml className="w-6 h-6 text-green-500" />}
              {row.original.archivos.includes('pdf') && <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />}
              {row.original.archivos.includes('none') && <IoAlert className="w-6 h-6 text-red-500" />}
            </div>
          </div>
        ),
        enableSorting:false,
        header: () => (
          <p>Responsable</p>
        )
      }),
      columnHelper.accessor('Proyecto', {
        id: 'Proyecto',
        cell: ({row}) => (
          <p className="py-2 font-semibold cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >{row.original.Proyecto}</p>
        ),
        enableSorting:false,
        header: () => (
          <p>Proyecto</p>
        )
      }),
      columnHelper.accessor('Informe', {
        header: 'Informe',
        id: 'Informe',
        cell: ({row}) => (
          <p className="py-2 font-semibold cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >{row.original.Informe}</p>
        )
      }),
      columnHelper.accessor('costcenter', {
        header: 'Centro de costos',
        id: 'Centro de costos',
        cell: ({row}) => (
          <p className="py-2 font-semibold cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >{row.original.costcenter}</p>
        )
      }),
      columnHelper.accessor('Descripcion', {
        header: 'Descripcion',
        id: 'descripcion',
        cell: ({row}) => (
          row.original.Descripcion && (
            <>
              {row.original.Descripcion.length < 100? (
                <p className="cursor-pointer" 
                  onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
                >{row.original.Descripcion}</p>
              ): (
                <p className="cursor-pointer" 
                  onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
                >{row.original.Descripcion.substring(0, 100)}</p>
              )}
            </>
          )
        ),
      }),
      columnHelper.accessor('Proveedor', {
        header: 'Proveedor',
        id: 'proveedor',
        cell: ({row}) => (
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >{row.original.Proveedor}</p>
        ),
      }),
      columnHelper.accessor('Estatus', {
        header: 'Estatus',
        id: 'estatus',
        cell: ({row}) => (
          <div className="cursor-pointer" 
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}>
              <Chip label={row.original.condition} color={row.original.color} />
          </div>
        ),
      }),
      columnHelper.accessor('Fecha', {
        header: 'Fecha',
        id: 'fecha',
        cell: ({row}) => (
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >{row.original.Fecha?.substring(0, 10) || ''}</p>
        ),
      }),
      columnHelper.accessor('Importe', {
        header: 'Importe',
        id: 'importe',
        cell: ({row}) => (
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >
            {CurrencyFormatter({
              currency: 'MXN',
              value: row.original.Importe
            })}
          </p>
        ),
      }),
      columnHelper.accessor('vat', {
        header: 'IVA',
        id: 'iva',
        cell: ({row}) => (
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >
            {CurrencyFormatter({
              currency: 'MXN',
              value: row.original.vat
            })}
          </p>
        ),
      }),
      columnHelper.accessor('discount', {
        header: 'Descuento',
        id: 'descuento',
        cell: ({row}) => (
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >
            {CurrencyFormatter({
              currency: 'MXN',
              value: row.original.discount
            })}
          </p>
        ),
      }),
      columnHelper.accessor('total', {
        header: 'Total',
        id: 'total',
        cell: ({row}) => (
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >
            {CurrencyFormatter({
              currency: "MXN",
              value: row.original.total
            })}
          </p>
        ),
      }),
      columnHelper.accessor('taxFolio', {
        header: 'Folio fiscal',
        id: 'Folio fiscal',
        cell: ({row}) => (
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
          >{row.original.taxFolio}</p>
        ),
      }),
    ]

  const dataExpenses =ExpenseDataProjectToTableDataProject(costs);

  return(
    <>
      <Table columns={columns} data={dataExpenses} placeH="Buscar gasto.." />
    </>
  )
}