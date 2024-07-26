'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { useNewExpense } from "@/app/store/newExpense";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import { GetCosts } from "@/app/api/routeCost";
import { showToastMessageError } from "../Alert";
import Filtering from "./ExpensesFiltered";
import { Options } from "@/interfaces/Common";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo

export default function TableHistoryExpenses({data, token, expenses, 
                            optCategories, optConditions, optTypes, 
                            optProjects, optReports, isFilter, setIsFilter, 
                          optCostCenterFilter, isViewReports}:
                        {data:ExpensesTable[], token:string, 
                        optCategories:Options[], optTypes:Options[], 
                        optConditions:Options[], expenses:Expense[], 
                        optReports:Options[], optProjects:Options[], 
                        isFilter:boolean, setIsFilter:Function, 
                        optCostCenterFilter:Options[], isViewReports: boolean}){
  
  const columnHelper = createColumnHelper<ExpensesTable>();

  //const [filtering, setFiltering] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [dataExpenses, setDataExpenses] = useState(data);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  const {refresh, updateRefresh} = useNewExpense();

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
          {row.original.archivos.includes('xml') && <BsFiletypeXml className="w-6 h-6 text-green-500" />}
          {row.original.archivos.includes('pdf') && <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />}
          {row.original.archivos.includes('none') && <IoAlert className="w-6 h-6 text-red-500" />}
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
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.Proyecto}</p>
        </Link>
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
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.Informe}</p>
        </Link>
      )
    }),
    columnHelper.accessor('costcenter', {
      header: 'Centro de costos',
      id: 'Centro de costos',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.costcenter}</p>
        </Link>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          {row.original.Descripcion.length < 100? (
            <p className="">{row.original.Descripcion}</p>
          ): (
            <p className="">{row.original.Descripcion.substring(0, 100)}</p>
          )}
        </Link>
      ),
    }),
    columnHelper.accessor('Proveedor', {
      header: 'Proveedor',
      id: 'proveedor',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="">{row.original.Proveedor}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <Chip label={row.original.condition} color={row.original.color} />
        </Link>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="">{row.original.Importe}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('vat', {
      header: 'IVA',
      id: 'iva',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="">{row.original.vat}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('discount', {
      header: 'Descuento',
      id: 'descuento',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="">{row.original.discount}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      id: 'total',
      cell: ({row}) => (
        <Link href={`/expenses/history/${row.original.id}/profile`}>
          <p className="">{row.original.total}</p>
        </Link>
      ),
    }),
  ]
  
  const initialVisibilityColumns: any = {
    seleccion: true,
    Responsable: true, 
    Proyecto: true, 
    Informe: true, 
    "Centro de costos": true, 
    descripcion: true, 
    proveedor: true, 
    estatus: true, 
    fecha: true, 
    importe: true,
    iva: false,
    descuento: false,
    total: false,
  }

  const [view, setView] = useState<JSX.Element>(<Table columns={columns} data={dataExpenses} 
                placeH="Buscar gasto.." typeTable='cost' initialColumns={initialVisibilityColumns} />);
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

  useEffect(() => {
    if(refresh){
      const aux = async () =>{
        try {
          const res = await GetCosts(token);
          //console.log('res');
          if(typeof(res) !== 'string'){
            const d = ExpenseDataToTableData(res);
            setDataExpenses(d);
            setView(<></>);
            setTimeout(() => {
              setView(<Table columns={columns} data={d} 
                    placeH="Buscar gasto.." typeTable='cost' initialColumns={initialVisibilityColumns} />);
            }, 500);
          }else{
            showToastMessageError(res);
          }
        } catch (error) {
          console.log('catch table expenses => ', error);
          showToastMessageError('Error al actualizar tabla!!');
        }
      }
      aux();
      updateRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if(filter){
      //console.log('data exp ', dataExpenses);
      setView(<></>);
      setTimeout(() => {
        // const total = da
        setView(<Table columns={columns} data={dataExpenses} 
          placeH="Buscar gasto.." typeTable='cost' initialColumns={initialVisibilityColumns} />);
      }, 100);
      setFilter(false);
    }
  }, [filter]);

  const dateValidation = (exp:Expense, startDate:number, endDate:number) => {
    let d = new Date(exp.date).getTime();
    //console.log('get time ', d);
    if(d >= startDate && d <= endDate){
      return true;
    }
    return false;
  }

  const amountValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number) => {
    if(exp.cost?.subtotal >= minAmount && exp.cost?.subtotal <= maxAmount){
      return dateValidation(exp, startDate, endDate);
    }
    return false;
  }

  const costCenterValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, costcenters:string[]) => {
    if(costcenters.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
    }else{
      if(exp.costocenter){
        // if(typeof(exp.costocenter)==='string'){
        //   if(costcenters.includes(exp.costocenter)){
        //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
        //   }
        // }else{
        //   // if(exp.costocenter.categorys.every((cat) => costcenters.includes(cat._id))){
        //   //   return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
        //   // }
        //   if(costcenters.includes(exp.costocenter.category)){
        //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
        //   }
        // }
        if(typeof(exp.costocenter)==='string'){
          if(costcenters.includes(exp.costocenter)){
            return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
          }
        }else{
          if(costcenters.some((cc) => cc === exp.costocenter.concept._id)){
            return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
          }else{
            // console.log('elseee');
            // console.log('concept id => ', exp.costocenter.concept._id);
            // console.log('all cost centers  => ', costcenters);
          }
        }
      }
    }
    return false;
  }

  const projectValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, projects:string[], 
                      costcenters:string[]) => {
    if(projects.includes('all')){
      //return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
      return costCenterValidation(exp, minAmount, maxAmount, startDate, endDate, costcenters);
    }else{
      if(exp.project){
        if(projects.includes(exp.project._id)){
          return costCenterValidation(exp, minAmount, maxAmount, startDate, endDate, costcenters);
          //return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
        }
      }
    }
    return false;
  }

  const reportValidation = (exp:Expense, minAmount:number, maxAmount:number, 
              startDate:number, endDate:number, projects:string[], 
              reports:string[], costcenters: string[]) => {
    if(reports.includes('all')){
      return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, costcenters); 
    }else{
      if(exp.report){
        if(reports.includes(exp.report._id)){
          return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, costcenters);
        }
      }
    }
    return false;
  }

  const categoriesValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                startDate:number, endDate:number, projects:string[], 
                reports:string[], categories:string[], costcenters: string[]) => {
    
    if(categories.includes('all')){
      return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, costcenters);
    }else{
      if(exp.category){
        if(categories.includes(exp.category._id)){
          return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, costcenters);
        }
      }
    }
    return false;
  }

  const typesValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  reports:string[], categories:string[], types:string[], 
                  costcenters:string[]) => {
    
    if(types.includes('all')){
      return categoriesValidation(exp, minAmount, maxAmount, startDate, endDate, 
                projects, reports, categories, costcenters);
    }else{
      if(exp.typeCFDI){
        if(types.includes(exp.typeCFDI._id)){
          return categoriesValidation(exp, minAmount, maxAmount, startDate, endDate, 
                    projects, reports, categories, costcenters);
        }
      }
    }
    return false;
  }

  const conditionValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  reports:string[], categories:string[], types:string[], 
                  conditions:string[], costcenters: string[]) => {

    if(conditions.includes('all')){
      return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
                reports, categories, types, costcenters);
    }else{
      // if(!exp.condition.every((cond) => !conditions.includes(cond.glossary._id))){
      //   return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
      //               reports, categories, types, costcenters);
      // }
      if(conditions.includes(exp.estatus._id)){
        return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
                    reports, categories, types, costcenters);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], types:string[], 
    categories:string[], minAmount:number, maxAmount:number, 
    reports:string[], projects:string[], startDate:number, 
    endDate:number, costcenters:string[]) => {
  
    let filtered: Expense[] = [];
    expenses.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, projects, reports, categories, types, conditions, costcenters)){
        filtered.push(expense);
      }
    });

    //console.log(filtered);
    setFilteredExpenses(filtered);
    
    setDataExpenses(ExpenseDataToTableData(filtered));
    setFilter(true);
  }

  return(
    <>
      <div className="flex justify-end my-5">
        {isFilter && <Filtering showForm={setIsFilter} optCategories={optCategories} 
                        optTypes={optTypes} optConditions={optConditions} 
                        FilterData={filterData} maxAmount={maxAmount} 
                        optProjects={optProjects} optReports={optReports}
                        optCostCenterFilter={optCostCenterFilter} minAmount={minAmount}
                        expensesFiltered={filteredExpenses} isViewReports={isViewReports} />}
      </div>
      {view}
    </>
  )
}