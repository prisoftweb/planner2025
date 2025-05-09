import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import SearchInTable from "../SearchInTable";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { CurrencyFormatter } from "@/app/functions/Globals";
import { ReportByCostcenterCategory } from '@/interfaces/CostCenter'
import { GetCostsGroupByCostoCenterCategory } from "@/app/api/routeCost";
import ReportCostByCategory from "../ReportCostByCategory";

export default function TableReportByCategory({token}: {token:string}){
  
  const columnHelper = createColumnHelper<ReportByCostcenterCategory>();
  const [data, setData] = useState<ReportByCostcenterCategory[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      let costCostoCenterCategory: ReportByCostcenterCategory[] = [];
      try {
        costCostoCenterCategory = await GetCostsGroupByCostoCenterCategory(token);
        if(typeof(costCostoCenterCategory)==='string'){
          return <h1>Error al consultar costos por centro de costos!!</h1>
        }
      } catch (error) {
        return <h1>Error al consultar costos por centro de costos!!</h1>
      }
      setData(costCostoCenterCategory);
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
      id: 'Categoria',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.costocenter}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Categoria</p>
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
    // columnHelper.accessor('', {
    //   id: 'Porcentaje',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-1 items-center">
    //       <div className="w-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    //         <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
    //           style={{"width": row.original.porcentage}}></div>
    //       </div>
    //       <p>{row.original.porcentage} %</p>
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: () => (
    //     <p>Porcentaje gastado</p>
    //   )
    // }),
  ]

  const table = data.length > 0? (
    <Table columns={columns} data={data} placeH=""  />
  ): <><h1 className="text-center text-red-500 text-lg">Cargando gastos...</h1></>

  return(
    <>
      <div className="flex justify-end gap-x-3 mt-7 items-center">
        <SearchInTable placeH={"Buscar gasto.."} />
        {data.length > 0 && (
          <PDFDownloadLink document={<ReportCostByCategory costsCostCenter={data} />} 
              fileName={`InformeCostosAgrupadosCategoria`} >
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