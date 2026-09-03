import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import SearchInTable from "../SearchInTable";
import { useState, useEffect, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { CurrencyFormatter } from "@/app/functions/Globals";
import { ReportByCostcenter } from "@/interfaces/CostCenter";
import { GetCostsGroupByCostoCenterConcept, getAllCostsGroupByCOSTOCENTERConceptByDate } from "@/app/api/routeCost";
import ReportCostByCostCenter from "../ReportCostByCostCenter";
import { useTableStates } from "@/app/store/tableStates";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { showToastMessageError } from "../Alert";
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";

export default function TableReportByConcept({token, company}: {token:string, company:string}){
  
  const columnHelper = createColumnHelper<ReportByCostcenter>();
  const [data, setData] = useState<ReportByCostcenter[]>([]);

  const [satCompany, setSatCompany]=useState<Company>();

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

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

  const fetch = async (dateIni:string, dateFinal:string) => {
    const res = await getAllCostsGroupByCOSTOCENTERConceptByDate(token, dateIni, dateFinal);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setData(res);
    }
  }

  useEffect(() => {
    // const fetchData = async() => {
    //   let costCostoCenter: ReportByCostcenter[] = [];
    //   try {
    //     costCostoCenter = await GetCostsGroupByCostoCenterConcept(token);
    //     if(typeof(costCostoCenter)==='string'){
    //       return <h1>Error al consultar costos por centro de costos!!</h1>
    //     }
    //   } catch (error) {
    //     return <h1>Error al consultar costos por centro de costos!!</h1>
    //   }
    //   setData(costCostoCenter);
    // }

    // fetchData();
    fetch((rangeDate?.from?.toISOString().substring(0, 10) || ''), (rangeDate?.to?.toISOString().substring(0, 10) || ''));
  }, []);

  const handleDate = (dateI: Date, dateF: Date) => {
    fetch((dateI?.toISOString().substring(0, 10) || ''), (dateF?.toISOString().substring(0, 10) || ''));
  }

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
            currency: 'USD',
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
        {data.length > 0 && satCompany && (
          <PDFDownloadLink document={<ReportCostByCostCenter costsCostCenter={data} dateFinal={rangeDate?.to ?? new Date()} dateIni={rangeDate?.from?? new Date()} satCompany={satCompany} />} 
              fileName={`Resumen de costos por Centro de costos`} >
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

const ListData = ({data, token}: {data: ReportByCostcenter[], token:string}) => {

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
  {data:ReportByCostcenter, token:string}) => {
  
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
                {data.costocenter.concept}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {data.project}  
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: data.totalCost,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}