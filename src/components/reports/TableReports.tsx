'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import Link from "next/link";
import { useState, useEffect } from "react";
//import Filtering from "./Filtering";
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import { Report, ReportTable } from "@/interfaces/Reports";
import Chip from "../providers/Chip";
import { RemoveReport } from "@/app/api/routeReports";

export default function TableReports({data, token, reports, optCategories, 
                          optTypes, optConditions}:
                        {data:ReportTable[], token:string, 
                          reports: Report[], optCategories: Options[], 
                          optTypes: Options[], optConditions: Options[]}){
  
  const columnHelper = createColumnHelper<ReportTable>();

  // const [filtering, setFiltering] = useState<boolean>(false);
  // const [filter, setFilter] = useState<boolean>(false);
  const [dataReports, setDataReports] = useState(data);

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
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
    columnHelper.accessor('Responsible', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsible} className="w-12 h-auto rounded-full" alt="responsable" />
          <DeleteElement id={row.original.id} name={row.original.Report} remove={RemoveReport} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsables</p>
      )
    }),
    columnHelper.accessor(row => row.Report, {
      id: 'Reporte',
      cell: ({row}) => (
        <Link href={`/reports/${row.original.id}/profile`}>
          <div className="flex gap-x-1 items-center">
            <p>{row.original.Report}</p>
          </div>
        </Link>
      ),
      enableSorting:false,
      header: () => (
        <p>Reporte</p>
      )
    }),
    columnHelper.accessor('Project', {
      header: 'Proyecto',
      id: 'Proyecto',
      cell: ({row}) => (
        <Link href={`/reports/${row.original.id}/profile`}>
          <div className="flex gap-x-1 items-center">
            <p>{row.original.Project}</p>
          </div>
        </Link>
      )
    }),
    columnHelper.accessor('Company', {
      header: 'Empresa/Depto',
      id: 'Departamento',
      cell: ({row}) => (
        <Link href={`/reports/${row.original.id}/profile`}>
          <div className="flex gap-x-1 items-center">
            <img src={row.original.Company} className="w-12 h-auto" alt="compania" />
            <p>{row.original.Depto}</p>
          </div>
        </Link>
      )
    }),
    columnHelper.accessor('Status', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <Link href={`/reports/${row.original.id}/profile`}>
          <Chip label={row.original.Status} />
        </Link>
      ),
    }),
    columnHelper.accessor('NºGastos', {
      header: 'NºGastos',
      id: 'NºGastos',
      cell: ({row}) => (
        <Link href={`/reports/${row.original.id}/profile`}>
          <p className="">{row.original.NºGastos}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Total',
      id: 'Total',
      cell: ({row}) => (
        <Link href={`/reports/${row.original.id}/profile`}>
          <p className="">{row.original.Total}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'Fecha',
      cell: ({row}) => (
        <Link href={`/reports/${row.original.id}/profile`}>
          <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
        </Link>
      ),
    }),
  ]
  
  const [view, setView] = useState<JSX.Element>(<Table columns={columns} data={dataReports} placeH="Buscar informe.." />);
  
  return(
    <>
      {view}
    </>
  )
}