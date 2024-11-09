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
                        isViewReports, idProv }:
                        {data:HistoryExpensesTable[], token:string, expenses:Expense[], 
                        user: string, isFilter:boolean, setIsFilter:Function, 
                        handleExpensesSelected:Function, idProv:string, 
                        isViewReports: boolean}){
  
  const columnHelper = createColumnHelper<HistoryExpensesTable>();
  const refExpenses = useRef(expenses);
  const refFilter = useRef(false);

  const [dataExpenses, setDataExpenses] = useState(data);
  const [expensesFiltered, setExpensesFiltered] = useState<Expense[]>(expenses);
  
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
  ]
  
  // const initialVisibilityColumns: any = {
  //   seleccion: true,
  //   Responsable: true, 
  //   Proyecto: true, 
  //   Informe: true, 
  //   "Centro de costos": true, 
  //   descripcion: true, 
  //   proveedor: true, 
  //   estatus: true, 
  //   fecha: true, 
  //   importe: true,
  //   iva: false,
  //   descuento: false,
  //   total: false,
  //   "Folio fiscal": false,
  // }

  const view = <Table columns={columns} data={dataExpenses} selectFunction={handleExpensesSelected}
                placeH="Buscar gasto.." typeTable="costProvider" />
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);
  
  useEffect(() => {
    const expenseM = expenses.reduce((previous, current) => {
      return current.cost?.subtotal > previous.cost?.subtotal ? current : previous;
    });
    const expenseMin = expenses.reduce((previous, current) => {
      return current.cost?.subtotal < previous.cost?.subtotal ? current : previous;
    });
    setMaxAmount(expenseM.cost?.subtotal);
    setMinAmount(expenseMin.cost?.subtotal > 0? 0: expenseMin.cost?.subtotal || 0);
  }, [])

  const paidValidation = (exp:Expense, isPaid:number) => {
    if(isPaid===1){
      return true;
    }else{
      if(isPaid===2){
        if(exp.ispaid){
          return true;
        }
        return false;
      }else{
        if(!exp.ispaid){
          return true;
        }
        return false;
      }
    }
  }

  const dateValidation = (exp:Expense, startDate:number, endDate:number, isPaid: number) => {
    let d = new Date(exp.date).getTime();
    //console.log('get time ', d);
    if(d >= startDate && d <= endDate){
      return paidValidation(exp, isPaid);
      //return true;
    }
    return false;
  }

  const amountValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number, isPaid: number) => {
    if(exp.cost?.subtotal >= minAmount && exp.cost?.subtotal <= maxAmount){
      return dateValidation(exp, startDate, endDate, isPaid);
    }
    return false;
  }

  // const projectValidation = (exp:Expense, minAmount:number, maxAmount:number, 
  //                     startDate:number, endDate:number, projects:string[], 
  //                     isPaid: number) => {
  //   if(projects.includes('all')){
  //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //   }else{
  //     if(exp.project){
  //       if(projects.includes(exp.project._id)){
  //         return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //       }
  //     }
  //   }
  //   return false;
  // }

  // const reportValidation = (exp:Expense, minAmount:number, maxAmount:number, 
  //             startDate:number, endDate:number, projects:string[], 
  //             reports:string[], isPaid: number) => {
  //   if(reports.includes('all')){
  //     return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, isPaid); 
  //   }else{
  //     if(exp.report){
  //       if(reports.includes(exp.report._id)){
  //         return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, isPaid);
  //       }
  //     }
  //   }
  //   return false;
  // }

  const conditionValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, conditions:string[], isPaid: number) => {

    if(conditions.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      // if(!exp.condition.every((cond) => !conditions.includes(cond.glossary._id))){
      //   return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
      //               reports, categories, types, costcenters);
      // }
      if(conditions.includes(exp.estatus._id)){
        return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
    startDate:number, endDate:number, isPaid: number) => {
  
    let filtered: Expense[] = [];
    refExpenses.current.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, conditions, isPaid)){
        filtered.push(expense);
      }
    });

    setExpensesFiltered(filtered);
    setDataExpenses(ExpenseDataToTableHistoryProviderData(filtered));
  }

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