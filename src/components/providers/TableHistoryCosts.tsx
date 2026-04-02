'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { Expense } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import { HistoryExpensesTable } from "@/interfaces/Providers";
import FilteringExpensesProvider from "./FilteredExpensesHistoryProvider";
import ContainerSideNav from "../ContainerSideNav";
import { Tooltip } from "@nextui-org/react";
import { IoIosLink } from "react-icons/io";
import { propsTooltip } from "@/libs/animations";
import { useState } from "react";

type Props = {
  data:HistoryExpensesTable[], 
  token:string, 
  expenses:Expense[], 
  user: string, 
  isFilter:boolean, 
  setIsFilter:Function, 
  handleExpensesSelected: (value: HistoryExpensesTable[]) => void, 
  idProv:string, 
  isViewReports: boolean, 
  filterData: Function, 
  minAmount: number, 
  maxAmount: number
}

export default function TableHistoryCosts({data, token, expenses, 
  handleExpensesSelected, user, isFilter, setIsFilter, isViewReports, idProv, 
  filterData, maxAmount, minAmount }: Props){
  
  const columnHelper = createColumnHelper<HistoryExpensesTable>();
  
  const handleIsFilter = (value: boolean) => {
    setIsFilter(value);
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2 justify-center">
          {row.original.Estatus._id !== '67318a51ceaf47ece0d3aa72' && 
            row.original.Estatus._id !== '661eade6f642112488c85fad' &&
            row.original.Estatus._id !== '661eaa71f642112488c85f59' &&
            row.original.Estatus._id !== '661eaa4af642112488c85f56' && (
            <input type="checkbox" 
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              className="w-24 cursor-pointer"
            />
          )}
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
            <div className={`${row.original.isPaid? 'bg-green-500': 'bg-red-500'} w-3 h-3 rounded-full`}></div>
            {row.original.isCfdisRelations && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='CFDI relacionado' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <IoIosLink className="w-6 h-6 text-green-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
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
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
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
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
        >{row.original.Informe}</p>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        row.original.Descripcion.length < 100? (
          <p className="cursor-pointer" 
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
          >{row.original.Descripcion}</p>
        ): (
          <p className="cursor-pointer" 
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
          >{row.original.Descripcion.substring(0, 100)}</p>
        )
      ),
    }),
    columnHelper.accessor('code', {
      header: 'Codigo',
      id: 'codigo',
      cell: ({row}) => (
        <div> 
          <p>{row.original.code}</p>
        </div>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}>
            <Chip label={row.original.Estatus.name} color={row.original.Estatus.color}
                darktext={row.original?.Estatus?.darktext?? false} />
        </div>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('daysExpired', {
      header: 'Dias vigentes',
      id: 'dias',
      cell: ({row}) => (
        <p className={`cursor-pointer ${row.original.daysExpired! < 0 ? 'text-red-500' : 'text-green-500'}`}
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
        >{row.original.daysExpired}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
        >{row.original.Importe}</p>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Total',
      id: 'total',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
        >{row.original.Total}</p>
      ),
    }),
    columnHelper.accessor('folio', {
      header: 'Folio',
      id: 'folio',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
        >{row.original.folio}</p>
      ),
    }),
    columnHelper.accessor('folioFiscal', {
      header: 'Folio fiscal',
      id: 'folio fiscal',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}
        >{row.original.folioFiscal}</p>
      ),
    }),
  ]
  
  const initialVisibilityColumns: any = {
    seleccion : true,
    Responsable : true, 
    Proyecto : true, 
    Informe : true, 
    descripcion : true,
    pagado : true, 
    estatus : true, 
    fecha : true, 
    importe : true, 
    total : true, 
    folio : false, 
    "folio fiscal" : false,
  }

  const view = <Table columns={columns} data={data} selectFunction={handleExpensesSelected}
                placeH="Buscar gasto.." typeTable="costProvider" initialColumns={initialVisibilityColumns} />
  
  return(
    <>
      <div className="flex justify-end my-5">
          {/* {isFilter && <FilteringExpensesProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} />} */}
          {isFilter && (
            <ContainerSideNav width="w-full max-w-md" open={isFilter}>
              <FilteringExpensesProvider showForm={handleIsFilter}  
                            FilterData={filterData} maxAmount={maxAmount} 
                            minAmount={minAmount} token={token} />
            </ContainerSideNav>
          )}
      </div>
      
      <div className="hidden xl:block w-full">
        {view}
      </div>
      <div className="block xl:hidden w-full">
        <ListData data={data} idProv={idProv} handleExpensesSelected={handleExpensesSelected} />
      </div>
    </>
  )
}

const ListData = ({data, idProv, handleExpensesSelected}: 
  {data: HistoryExpensesTable[], idProv:string, handleExpensesSelected: (value: HistoryExpensesTable[]) => void}) => {

  // const [dataReports, setDataReports] = useState(data);
  const [expensesSelected, setExpensesSelected] = useState<HistoryExpensesTable[]>([]);

  const selectCard = (expense: HistoryExpensesTable) => {
    // if(expensesSelected.some((exp) => exp.id === expense.id)){
    //   const exp = expensesSelected.filter((exp) => exp.id !== expense.id);
    //   setExpensesSelected(exp);
    //   handleExpensesSelected(exp);
    // }else{
    //   const exp = [...expensesSelected, expense];
    //   setExpensesSelected(exp);
    //   handleExpensesSelected(exp);
    // }
  }

  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((e) => (
            <CardInvoices expense={e} key={e.id} idProv={idProv} expensesSelected={expensesSelected} selectCard={selectCard} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardInvoices = ({expense, idProv, expensesSelected, selectCard }: 
  {expense:HistoryExpensesTable, idProv:string, expensesSelected: HistoryExpensesTable[], selectCard: (expense: HistoryExpensesTable) => void }) => {

  return(
    <div role="button"
      key={expense.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        ${expensesSelected.some((exp) => exp.id === expense.id)? 'bg-blue-400': 'bg-white'} `}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ expense.Responsable?.photo ?? '/img/users/default.jpg'}
            // onClick={() => selectCard(expense)}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={expense.id} name={expense.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            onClick={() => window.location.replace(`/expenses/${expense.id}/profile?prov=${idProv}`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {expense.Proyecto}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {expense.Descripcion}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {expense.Importe}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                <Chip label={expense.Estatus.name} color={expense.Estatus.color}
                    darktext={expense?.Estatus?.darktext?? false} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}