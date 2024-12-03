'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect, useRef } from "react";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
// import { useNewExpense } from "@/app/store/newExpense";
// import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
// import { showToastMessage, showToastMessageError } from "../Alert";
// import Filtering from "./ExpensesFiltered";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import { ExpenseDataToTableHistoryProviderData } from "@/app/functions/providersFunctions";
import { HistoryExpensesTable } from "@/interfaces/Providers";
//import Filtering from "../expenses/ExpensesFiltered";
import FilteringExpensesProvider from "./FilteredExpensesHistoryProvider";

export default function TableHistoryCosts({data, token, expenses, 
                            handleExpensesSelected, user, isFilter, setIsFilter, 
                        isViewReports, idProv, filterData, maxAmount, minAmount }:
                        {data:HistoryExpensesTable[], token:string, expenses:Expense[], 
                        user: string, isFilter:boolean, setIsFilter:Function, 
                        handleExpensesSelected:Function, idProv:string, 
                        isViewReports: boolean, filterData: Function, minAmount: number, maxAmount: number}){
  
  const columnHelper = createColumnHelper<HistoryExpensesTable>();
  const refExpenses = useRef(expenses);
  const refFilter = useRef(false);

  // const [dataExpenses, setDataExpenses] = useState(data);
  // const [expensesFiltered, setExpensesFiltered] = useState<Expense[]>(expenses);
  
  const handleIsFilter = (value: boolean) => {
    // if(value){
    //   if(!refFilter.current){
    //     refFilter.current = true;
    //     setDataExpenses(ExpenseDataToTableData(refExpenses.current));
    //   }
    // }else{
    //   refFilter.current = false;
    // }
    setIsFilter(value);
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2 justify-center">
          {row.original.Estatus._id !== '67318a51ceaf47ece0d3aa72' && 
              row.original.Estatus._id !== '67378f77d846bbd16e1a8714' && (
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
    columnHelper.accessor('isPaid', {
      header: 'Pagado',
      id: 'pagado',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}>
            <Chip label={row.original.isPaid? 'Pagado': 'No pagado'} color={row.original.isPaid? '#0f0': '#f00'} />
        </div>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?prov=${idProv}`)}>
            <Chip label={row.original.Estatus.name} color={row.original.Estatus.color} />
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
  // const [maxAmount, setMaxAmount] = useState<number>(0);
  // const [minAmount, setMinAmount] = useState<number>(0);

  return(
    <>
      <div className="flex justify-end my-5">
        {/* <Button type="button" onClick={() => setFiltering(!filtering)}>Filtrar</Button> */}
        {/* <GiSettingsKnobs onClick={() => setFiltering(!filtering)}
          className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
        /> */}
          {isFilter && <FilteringExpensesProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} />}
      </div>
      {/* <Button onClick={changeConditionInCost}>Validar</Button> */}
      {view}
    </>
  )
}