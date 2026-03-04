import { createColumnHelper } from "@tanstack/react-table";
import { ReportCostsByProjectOnly } from "@/interfaces/ReportsOfCosts";
import Table from "../Table";
import SearchInTable from "../SearchInTable";
import { useState, useEffect, useMemo } from "react";
import { GetAllCostsGroupByProjectOnly } from "@/app/api/routeCost";
import ReportCostsByProjectOnlyPDF from "../ReportCostByProjectOnlyPDF"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { CurrencyFormatter } from "@/app/functions/Globals";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";
import { useTableStates } from "@/app/store/tableStates";

export default function TableReportByProject({token}: {token:string}){
  
  const columnHelper = createColumnHelper<ReportCostsByProjectOnly>();
  const [data, setData] = useState<ReportCostsByProjectOnly[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      let reportProjectOnly: ReportCostsByProjectOnly[] = [];
      try {
        reportProjectOnly = await GetAllCostsGroupByProjectOnly(token);
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
          <p>{CurrencyFormatter({
            currency: 'MXN',
            value: row.original.amount,
          })}</p>          
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
    columnHelper.accessor('porcentage', {
      id: 'Porcentaje',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <div className="w-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": row.original.porcentage}}></div>
          </div>
          <p>{row.original.porcentage} %</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Porcentaje gastado</p>
      )
    }),
  ]

  const table = data.length > 0? (
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="" />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} />
      </div>
    </>
  ): <><h1 className="text-center text-red-500 text-lg">Cargando gastos...</h1></>

  return(
    <>
      <div className="flex justify-end gap-x-3 mt-7 items-center">
        <SearchInTable placeH={"Buscar gasto.."} />
        {data.length > 0 && (
          <TooltipContainerIcon label="Descargar PDF" >
            <PDFDownloadLink document={<ReportCostsByProjectOnlyPDF reports={data} />} 
                fileName={`InformeCostosAgrupadosPorProyecto`} >
              {({loading, url, error, blob}) => 
                loading? (
                  <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                ) : (
                  <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                ) }
            </PDFDownloadLink>
          </TooltipContainerIcon>
        )}
      </div>
      <div className="mt-3">
        {table}
      </div>
    </>
  )
}

const ListData = ({data, token}: {data: ReportCostsByProjectOnly[], token:string}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.project.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[450px]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((c, index:number) => (
            <CardData data={c} key={index} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardData = ({data, token}: 
  {data:ReportCostsByProjectOnly, token:string}) => {
  
  return(
    <div role="button"
      key={data.project}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ '/img/costs/costs.svg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={node.id} name={node.department} remove={removeNode} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: data.amount,
                })}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: data.totalCost,
                })} gastado
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {data.porcentage}%  
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {/* {node.condition} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}