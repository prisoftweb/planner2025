import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import SearchInTable from "../SearchInTable";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { CurrencyFormatter } from "@/app/functions/Globals";
import { ReportByCostcenter } from "@/interfaces/CostCenter";
import { GetCostsGroupByCostoCenterConcept } from "@/app/api/routeCost";
import ReportCostByCostCenter from "../ReportCostByCostCenter";

export default function TableReportByConcept({token}: {token:string}){
  
  const columnHelper = createColumnHelper<ReportByCostcenter>();
  const [data, setData] = useState<ReportByCostcenter[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      let costCostoCenter: ReportByCostcenter[] = [];
      try {
        costCostoCenter = await GetCostsGroupByCostoCenterConcept(token);
        if(typeof(costCostoCenter)==='string'){
          return <h1>Error al consultar costos por centro de costos!!</h1>
        }
      } catch (error) {
        return <h1>Error al consultar costos por centro de costos!!</h1>
      }
      setData(costCostoCenter);
    }

    fetchData();
  }, []);

  const columns = [
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
    columnHelper.accessor('type', {
      id: 'Tipo',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.type}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Tipo</p>
      )
    }),
    columnHelper.accessor('costocenter', {
      id: 'Concepto',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.costocenter.concept}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Concepto</p>
      )
    }),
    columnHelper.accessor('totalCost', {
      id: 'Total',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{CurrencyFormatter({
            currency: 'MXN',
            value: row.original.totalCost
          })}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Total gastado</p>
      )
    }),
    columnHelper.accessor('quantity', {
      id: 'Cantidad',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.quantity}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Cantidad</p>
      )
    }),
  ]

  const table = data.length > 0? (
    <Table columns={columns} data={data} placeH=""  />
  ): <><h1 className="text-center text-red-500 text-lg">Cargando gastos...</h1></>

  return(
    <>
      <div className="flex justify-end gap-x-3 mt-7 items-center">
        <SearchInTable placeH={"Buscar gasto.."} />
        {data.length > 0 && (
          <PDFDownloadLink document={<ReportCostByCostCenter costsCostCenter={data} />} 
              fileName={`InformeCostosAgrupadosPorConcepto`} >
            {({loading, url, error, blob}) => 
              loading? (
                <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
              ) : (
                <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
              ) }
          </PDFDownloadLink>
        )}
      </div>
      <div className="mt-3">
        {table}
      </div>
    </>
  )
}