import { CostsTable, Report } from "@/interfaces/Reports"
import Chip from "../providers/Chip"
import Label from "../Label"
import Table from "../Table"
import { CurrencyFormatter } from "@/app/functions/Globals"
import { createColumnHelper } from "@tanstack/react-table"
//import { Expense } from "@/interfaces/Expenses"
import { CostsDataToTableDataMin } from "@/app/functions/ReportsFunctions"
import DeleteElement from "../DeleteElement"
import { RemoveCost } from "@/app/api/routeCost"
import { CostReport } from "@/interfaces/Reports"
import { useEffect, useState } from "react"
import { getCostByReportMin } from "@/app/api/routeReports"

export default function CostsInReport({report, id, token}: 
    {report:Report, id:string, token: string}) {

  //console.log('costs in report => ', costs);
  //const costs: Expense[] = getCosts();
  const total = CurrencyFormatter({
    currency: "MXN",
    value: report.total
  });
  
  const [costsReport, setCostReport] = useState<CostReport[]>([]);

  useEffect(() => {
    const fetchCosts = async () => {
      let costsRep:CostReport[] = [];
      try {
        costsRep = await getCostByReportMin(id, token);
        if(typeof(costsRep)==='string')
          return <h1 className="text-center text-lg text-red-500">{costsRep}</h1>
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los costos del reporte!</h1>
      }
      setCostReport(costsRep);
    }
    fetchCosts();
  }, []);
  
  const data = CostsDataToTableDataMin(costsReport);

  console.log('costs min in report', data);
  
  return (
    <>
      <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
        <div className="grid grid-cols-3 gap-x-3 mt-2">
          <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
            <div>
              <img src={ report.project.photo? report.project.photo: '/img/projects/default.svg'} alt="logo" 
                className="w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{report.project.title}</p>
              <p className="text-slate-500">{report.project.code}</p>
              <p className="text-slate-500">{report.project.glossary.name}</p>
              <p className="text-slate-500">{report.project.account}</p>
              <div className="mt-3 border-t border-slate-500 pt-2">
                <p className="text-blue-500">{report.name}</p>
                <p className="text-slate-500">{report.account}</p>
              </div>
            </div>
          </div>
          
          <div className=" bg-white p-3 rounded-lg shadow-md py-2">
            <div className="flex gap-x-2 justify-between">
              <div>
                <img src={report.company.logo} alt="logo" className="w-16 h-auto" />
              </div>
              <div>
                <p className="text-slate-700">{report.company.name}</p>
                <p className="text-blue-600">{report.department.name}</p>
              </div>
              <div>
                <Chip label={report.moves[report.moves.length -1]?.condition?.name || 'sin status'} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 my-2">
              <div className="">
                <p className="text-slate-500">Total</p>
                <p className="text-green-600 font-semibold">{total}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Nº gastos</p>
                <p className="text-red-500 font-semibold">{report.quantity}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-white p-3 rounded-lg shadow-md py-2 ">
            <div className=" border-r-1 border-slate-700 p-2">
              <Label>Fecha</Label>
              <p className="text-lg text-blue-600 mt-2">{report.date.substring(0, 10)}</p>
            </div>
            <div className="p-2">
              <Label>Comentarios</Label>
              <p className="text-blue-600 mt-2 text-sm">{report.comment}</p>
            </div>
          </div>

        </div>

        <div className="mt-5 bg-white">
          <CostsTableInReport data={data} />
        </div>

      </div>
    </>
  )
}

function CostsTableInReport({data}: {data: CostsTable[]}){
  
  const columnHelper = createColumnHelper<CostsTable>();
  
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
    columnHelper.accessor('Responsable', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsable.photo} className="w-6 h-auto rounded-full" alt="user" />
          <DeleteElement id={row.original.id} name={row.original.Descripcion} remove={RemoveCost} token={''} />
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
        <p className="py-2 font-semibold">{row.original.Proyecto}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <p className="">{row.original.Descripcion}</p>
      ),
    }),
    columnHelper.accessor('Proveedor', {
      header: 'Proveedor',
      id: 'proveedor',
      cell: ({row}) => (
        <p className="">{row.original.Proveedor}</p>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Chip label={row.original.condition} />
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Total',
      id: 'Total',
      cell: ({row}) => (
        <p className="">{row.original.Total}</p>
      ),
    }),
  ]

  console.log('cost table in report data => ', data);
  return (
    <Table columns={columns} data={data} placeH="buscar costo" />
  )

}