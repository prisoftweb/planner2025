import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import SearchInTable from "../SearchInTable";
import { useState, useEffect, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF

import { CurrencyFormatter } from '@/app/functions/Globals'
import { ReportByProject, CostGroupByType } from '@/interfaces/ReportsOfCosts'
import { GetCostsGroupByProject, GetCostsGroupByType, getAllCostsGroupByProjectsAndTypesByDate } from "@/app/api/routeCost";
import ReportCostByProjects from "../ReportCostByProjects";
import { useTableStates } from "@/app/store/tableStates";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { showToastMessageError } from "../Alert";
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";

export default function TableReportByType({token, company}: {token:string, company:string}){
  
  // const columnHelper = createColumnHelper<ReportByProject>();
  // const [data, setData] = useState<ReportByProject[]>([]);
  const columnHelper = createColumnHelper<CostGroupByType>();
  const [dataType, setDataType] = useState<CostGroupByType[]>([]);

  const [satCompany, setSatCompany]=useState<Company>();

  useEffect(() => {
    const fetch = async () => {
      const [rescomp] = await Promise.all([
        getCompany(token, company),
      ]);
      
      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        setSatCompany(rescomp);
      }
    }

    fetch();
  }, []);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const fetch = async (dateIni:string, dateFinal:string) => {
    const res = await getAllCostsGroupByProjectsAndTypesByDate(token, dateIni, dateFinal);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setDataType(res);
    }
  }

  useEffect(() => {
    // const fetchData = async() => {
    //   const [reportsProject, costTypes] = await Promise.all([
    //     GetCostsGroupByProject(token),
    //     GetCostsGroupByType(token)
    //   ]);
      
    //   if(typeof(reportsProject)==='string'){
    //     return <h1>Error al consultar costos por proyecto!!</h1>
    //   }

    //   if(typeof(costTypes)==='string'){
    //     return <h1>Error al consultar costos por tipo!!</h1>
    //   }

    //   console.log('reports proyect => ', reportsProject);
    //   setData(reportsProject);
    //   setDataType(costTypes);
    // }

    // fetchData();
    fetch((rangeDate?.from?.toISOString().substring(0, 10) || ''), (rangeDate?.to?.toISOString().substring(0, 10) || ''));
  }, []);

  const handleDate = (dateI: Date, dateF: Date) => {
    fetch((dateI?.toISOString().substring(0, 10) || ''), (dateF?.toISOString().substring(0, 10) || ''));
  }

  const columns = [
    // columnHelper.accessor('project.user._id', {
    //   id: 'Responsable',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-1 items-center">
    //       <img src={row.original.project?.user?.photo?? '/img/projects/default.svg'} alt={row.original?.project?.title?? 'proyecto'} 
    //         className="w-12 h-auto rounded-full"
    //       />          
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: () => (
    //     <p>Foto</p>
    //   )
    // }),
    columnHelper.accessor('project', {
      id: 'Proyecto',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{row.original.project?? 'proyecto'}</p>          
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
          <p>{row.original?.type}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Tipo</p>
      )
    }),
    // columnHelper.accessor('totalCost', {
    //   id: 'Monto',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-1 items-center">
    //       <p>{CurrencyFormatter({
    //         currency: 'USD',
    //         value: row.original?.totalCost ?? 0
    //       })}</p>          
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: () => (
    //     <p>Monto</p>
    //   )
    // }),
    columnHelper.accessor('totalCost', {
      id: 'Total',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <p>{CurrencyFormatter({
                  currency: 'USD',
                  value: row.original?.totalCost?? 0
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
          <p>{row.original?.quantity}</p>          
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Cantidad</p>
      )
    }),
    columnHelper.accessor('porcentage', {
      id: 'Porcentaje',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <div className="w-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": row.original?.porcentage }}></div>
          </div>
          <p>{row.original?.porcentage} %</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Porcentaje gastado</p>
      )
    }),
  ]

  const table = dataType.length > 0? (
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={dataType} placeH=""  />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={dataType} token={token} />
      </div>
    </>
  ): <><h1 className="text-center text-red-500 text-lg">Cargando gastos...</h1></>

  // const table=<></>;

  return(
    <>
      <div className="flex justify-end gap-x-3 mt-7 items-center flex-wrap md:flex-nowrap gap-y-2">
        <SearchInTable placeH={"Buscar gasto.."} />
        <div>
          <DateRangePicker 
            className=''
            placeholder='Seleccione un rango de fechas'
            onValueChange={(e) => {
              setRangeDate(e);
              if(e.from && e.to){
                handleDate(e.from, e.to);
              }
            }}
            value={rangeDate}
            locale={es}
          />
        </div>
        {dataType.length > 0 && satCompany && (
          <PDFDownloadLink document={<ReportCostByProjects costsByTypes={dataType} dateFinal={rangeDate?.to ?? new Date()} dateIni={rangeDate?.from?? new Date()} satCompany={satCompany} />} 
              fileName={`Resumen de costos por Tipos`} >
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

const ListData = ({data, token}: {data: CostGroupByType[], token:string}) => {

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
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-317px)]">
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
  {data:CostGroupByType, token:string}) => {
  
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
                {data.type}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {data.project}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: data.totalCost,
                })}  
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {data.porcentage}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}