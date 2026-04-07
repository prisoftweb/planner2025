import { CostsTable, Report } from "@/interfaces/Reports"
import Chip from "../providers/Chip"
import Label from "../Label"
import Table from "../Table"
import { CurrencyFormatter } from "@/app/functions/Globals"
import { createColumnHelper } from "@tanstack/react-table"
import { CostsDataToTableDataMin } from "@/app/functions/ReportsFunctions"
import DeleteElement from "../DeleteElement"
import { RemoveCost } from "@/app/api/routeCost"
import { CostReport } from "@/interfaces/Reports"
import { useEffect, useMemo, useState } from "react"
import { getCostByReportMin } from "@/app/api/routeReports"
import { useOneReportStore } from "@/app/store/reportsStore"

export default function CostsInReport({report, id, token}: 
    {report:Report, id:string, token: string}) {

  const {oneReport} = useOneReportStore();
  const total = CurrencyFormatter({
    currency: "MXN",
    value: oneReport?.total ?? 0
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

  return (
    <>
      <div className="flex w-full max-w-screen-2xl px-2 flex-wrap"
          style={{'backgroundColor': '#F8FAFC'}}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 mt-2">
          <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
            <div>
              <img src={ oneReport?.project.photo? oneReport.project.photo: '/img/projects/default.svg'} alt="logo" 
                className="w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{oneReport?.project.title}</p>
              <p className="text-slate-500">{oneReport?.project.code}</p>
              <p className="text-slate-500">{oneReport?.project.glossary?.name || "Sin condicion"}</p>
              <p className="text-slate-500">{oneReport?.project.account}</p>
              <div className="mt-3 border-t border-slate-500 pt-2">
                <p className="text-blue-500">{oneReport?.name}</p>
                <p className="text-slate-500">{oneReport?.account}</p>
              </div>
            </div>
          </div>
        
          <div className=" bg-white p-3 rounded-lg shadow-md py-2">
            <div className="flex gap-x-2 justify-between">
              <div>
                <img src={oneReport?.company.logo} alt="logo" className="w-16 h-auto" />
              </div>
              <div>
                <p className="text-slate-700">{oneReport?.company.name}</p>
                <p className="text-blue-600">{oneReport?.department.name}</p>
              </div>
              <div>
                <Chip label={oneReport?.moves[oneReport?.moves.length -1]?.condition?.name || 'sin status'}
                    color={oneReport?.moves[oneReport?.moves.length -1]?.condition?.color?? undefined}
                    darktext={oneReport?.moves[oneReport?.moves.length -1]?.condition?.darktext?? false} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 my-2">
              <div className="">
                <p className="text-slate-500">Total</p>
                <p className="text-green-600 font-semibold">{total}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Nº gastos</p>
                <p className="text-red-500 font-semibold">{oneReport?.quantity}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-white p-3 rounded-lg shadow-md py-2 ">
            <div className=" border-r-1 border-slate-700 p-2">
              <Label>Fecha</Label>
              <p className="text-lg text-blue-600 mt-2">{oneReport?.date.substring(0, 10)}</p>
            </div>
            <div className="p-2">
              <Label>Comentarios</Label>
              <p className="text-blue-600 mt-2 text-sm">{oneReport?.comment}</p>
            </div>
          </div>

        </div>

        <div className="mt-5 bg-white w-full">
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
        <Chip label={row.original.condition} darktext={row?.original?.darktext?? false}
            color={row?.original?.color?? undefined} />
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

  return (
    <div>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="buscar costo" typeTable="costReport" />
      </div>
      <div className=" block md:hidden w-full">
        <ListData data={data} />
      </div>
    </div>
  )
}

const ListData = ({data}: {data: CostsTable[]}) => {

  const total = useMemo(() => {
    return data.reduce((accum, item) => accum+=Number(item.Total.replace(/[$, M, X, N,]/g, "")), 0);
  }, [data]);

  return(
    <div>
      <p className="mt-2 text-center">Cantidad: <span className="text-blue-500 font-bold">{data.length}</span> Total gastos: <span className="text-green-600 font-bold">{CurrencyFormatter({
        currency: 'MXN',
        value: total
      })}</span></p>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[450px]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((c) => (
            <CardCost cost={c} key={c.id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardCost = ({cost}: {cost:CostsTable}) => {
  return(
    <div role="button"
      key={cost.id}
      className={`flex flex-col w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ cost?.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {cost.Proyecto}
              </h6>
              {/* <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {cost.Descripcion}
              </p> */}
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {cost.Total}
              </p>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {cost.condition}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
        {cost.Descripcion}
      </p>

    </div>
  )
}