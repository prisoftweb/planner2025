'use client'

import { OneProjectMin, ICostsByProject } from "@/interfaces/Projects"
import { createColumnHelper } from "@tanstack/react-table"
import { ExpensesTable } from "@/interfaces/Expenses"
import { IoAlert } from "react-icons/io5"
import { BsFiletypeXml } from "react-icons/bs"
import { BsFileEarmarkPdf } from "react-icons/bs"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Chip from "../providers/Chip"
import Table from "../Table"
import { ExpenseDataProjectToTableDataProject } from "@/app/functions/SaveProject"
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadCostsProjectPDF from "./DownloadCostsProjectPDF"
import SearchInTable from "../SearchInTable"
import { useTableStates } from "@/app/store/tableStates"
import { useMemo } from "react"
// import NewDonutChartComponent from "./dashboard/NewDonutChartComponent"

// interface OptionsDashboard {
//   label: string,
//   costo: number
// }

import { DonutChartJS } from '@/interfaces/DashboardProjects';

type Props = {
  project:OneProjectMin, 
  token:string, 
  user:string,
  costs: ICostsByProject[],
  costsConcepts?: DonutChartJS, 
  costsCategories?: DonutChartJS,
}

export default function ContainerCostsByProject({project, token, user, costs, costsCategories, costsConcepts}: Props){

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
              <Chip label={row.original.condition} color={row.original.color} darktext={row.original?.darktext?? false} />
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
      {/* <div className="flex justify-end">
        <PDFDownloadLink document={<DownloadCostsProjectPDF costs={costs} project={project} />} 
            fileName={`Costos detalles-${project.title}`} >
          {({loading, url, error, blob}) => 
            loading? (
              <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
            ) : (
              <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
            ) }
        </PDFDownloadLink>
      </div> */}

      {/* <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-5">
        <div className="w-full max-w-md">
          <NewDonutChartComponent data={costsCategories} />
        </div>
        <div className="w-full max-w-md">
          <NewDonutChartComponent data={costsConcepts} />
        </div>
      </div>*/}

      {/* <div className="flex w-full max-w-2xl justify-end mt-5 gap-x-2 items-center"> */}
      <div className="flex w-full justify-end mt-5 gap-x-2 items-center">
        <SearchInTable placeH="Buscar gasto.." />
        
        <PDFDownloadLink document={<DownloadCostsProjectPDF costs={costs} project={project} />} 
            fileName={`Costos detalles-${project.title}`} >
          {({loading, url, error, blob}) => 
            loading? (
              <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
            ) : (
              <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
            ) }
        </PDFDownloadLink>
      </div> 
      
      <div className="hidden xl:block w-full">
        <Table columns={columns} data={dataExpenses} placeH="Buscar gasto.." typeTable="cost" />
      </div>
      <div className="block xl:hidden w-full">
        <ListData data={dataExpenses} queryParam={queryParam} />
      </div>
    </>
  )
}

const ListData = ({data, queryParam}: 
  {data: ExpensesTable[], queryParam:string}) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.Descripcion.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl mt-3 rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((e) => (
            <CardExpense expense={e} key={e.id} queryParam={queryParam} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardExpense = ({expense, queryParam}: 
  {expense:ExpensesTable, queryParam:string}) => {
  
  return(
    <div role="button"
      key={expense.id}
      className={`flex flex-col w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
      onClick={() => window.location.replace(`/expenses/${expense.id}/profile${queryParam}`)}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ expense.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            {/* <RemoveElement id={expense.id} name={expense.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {expense.Proyecto}
              </h6>
              {/* <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {expense.Descripcion}
              </p> */}
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: expense.Importe
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {expense.Informe}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
        {expense.Descripcion}
      </p>

    </div>
  )
}