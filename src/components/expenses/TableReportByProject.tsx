import { createColumnHelper } from "@tanstack/react-table";
import { ReportCostsByProjectOnly } from "@/interfaces/ReportsOfCosts";
import Table from "../Table";
import SearchInTable from "../SearchInTable";
import { useState, useEffect } from "react";
import { GetAllCostsGroupByProjectOnly } from "@/app/api/routeCost";
import ReportCostsByProjectOnlyPDF from "../ReportCostByProjectOnlyPDF"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF

export default function TableReportByProject({token}: {token:string}){
  
  const columnHelper = createColumnHelper<ReportCostsByProjectOnly>();
  const [data, setData] = useState<ReportCostsByProjectOnly[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      let reportProjectOnly: ReportCostsByProjectOnly[] = [];
      try {
        reportProjectOnly = await GetAllCostsGroupByProjectOnly(token);
        //console.log('reports projects page => ', costCostoCenter);
        if(typeof(reportProjectOnly)==='string'){
          return <h1>Error al consultar costos por proyecto!!</h1>
        }
      } catch (error) {
        return <h1>Error al consultar costos por proyecto!!</h1>
      }
      setData(reportProjectOnly);
    }

    fetchData();
  }, []);

  const columns = [
    // columnHelper.accessor(row => row._id, {
    //   id: 'seleccion',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-2">
    //       <input type="checkbox" 
    //         checked={row.getIsSelected()}
    //         onChange={row.getToggleSelectedHandler()}
    //         className="w-24 cursor-pointer"
    //       />
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: ({table}:any) => (
    //     <input type="checkbox"
    //       className="w-24 cursor-pointer"
    //       checked={table.getIsAllRowsSelected()}
    //       onClick={()=> {
    //         table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
    //       }}
    //     />
    //   )
    // }),
    columnHelper.accessor('project', {
      id: 'Proyecto',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.project}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('amount', {
      id: 'Monto',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.amount}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Monto</p>
      )
    }),
    columnHelper.accessor('totalCost', {
      id: 'Total',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.totalCost}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Total gastado</p>
      )
    }),
    columnHelper.accessor('porcentage', {
      id: 'Porcentaje',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": row.original.porcentage}}></div>
          </div>
          <p>{row.original.porcentage}</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Porcentaje gastado</p>
      )
    }),
  ]

  const table = data.length > 0? (
    <Table columns={columns} data={data} placeH=""  />
  ): <><h1 className="text-center text-red-500 text-lg">Cargando gastos...</h1></>

  return(
    <>
      <div className="flex justify-end gap-x-3">
        <SearchInTable placeH={"Buscar gasto.."} />
        {data.length > 0 && (
          <PDFDownloadLink document={<ReportCostsByProjectOnlyPDF reports={data} />} 
              fileName={`InformeCostosAgrupadosPorProyecto`} >
            {({loading, url, error, blob}) => 
              loading? (
                <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
              ) : (
                <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
              ) }
          </PDFDownloadLink>
        )}
      </div>
      {table}
    </>
  )
}