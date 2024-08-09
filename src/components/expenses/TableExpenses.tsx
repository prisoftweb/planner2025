'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { RemoveCost } from "@/app/api/routeCost";
import { useNewExpense } from "@/app/store/newExpense";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import { getAllCostsByCondition } from "@/app/api/routeCost";
import { showToastMessage, showToastMessageError } from "../Alert";
import Filtering from "./ExpensesFiltered";
import { Options } from "@/interfaces/Common";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
// import { insertConditionInCost } from "@/app/api/routeCost";
//import Button from "../Button";

export default function TableExpenses({data, token, expenses, 
                            handleExpensesSelected, idValidado, user, isFilter, setIsFilter, 
                        isViewReports }:
                        {data:ExpensesTable[], token:string, expenses:Expense[], 
                        user: string, isFilter:boolean, setIsFilter:Function, 
                        idValidado: string, handleExpensesSelected:Function, 
                        isViewReports: boolean}){
  
  const columnHelper = createColumnHelper<ExpensesTable>();
  const refExpenses = useRef(expenses);
  const refFilter = useRef(false);

  //const [filtering, setFiltering] = useState<boolean>(false);
  //const [filter, setFilter] = useState<boolean>(false);
  const [dataExpenses, setDataExpenses] = useState(data);
  const [expensesFiltered, setExpensesFiltered] = useState<Expense[]>(expenses);
  //const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  // const [expensesSelected, setExpensesSelected] = useState<ExpensesTable[]>([]);

  const {refresh, updateRefresh, updateResponsible} = useNewExpense();

  //console.log('is filter => ', isFilter);
  const handleIsFilter = (value: boolean) => {
    // console.log('value is filter => ', value);
    if(value){
      if(!refFilter.current){
        refFilter.current = true;
        setDataExpenses(ExpenseDataToTableData(refExpenses.current));
      }
    }else{
      refFilter.current = false;
    }
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
          <DeleteElement id={row.original.id} name={row.original.Descripcion} 
            remove={RemoveCost} token={token} colorIcon="text-slate-500 hover:text-slate-300" />
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
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="py-2 font-semibold">{row.original.Proyecto}</p>
        // </Link>
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
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
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="py-2 font-semibold">{row.original.Informe}</p>
        // </Link>
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.Informe}</p>
      )
    }),
    columnHelper.accessor('costcenter', {
      header: 'Centro de costos',
      id: 'Centro de costos',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="py-2 font-semibold">{row.original.costcenter}</p>
        // </Link>
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.costcenter}</p>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   {row.original.Descripcion.length < 100? (
        //     <p className="">{row.original.Descripcion}</p>
        //   ): (
        //     <p className="">{row.original.Descripcion.substring(0, 100)}</p>
        //   )}
        // </Link>
        row.original.Descripcion.length < 100? (
          <p className="cursor-pointer" 
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
          >{row.original.Descripcion}</p>
        ): (
          <p className="cursor-pointer" 
            onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
          >{row.original.Descripcion.substring(0, 100)}</p>
        )
      ),
    }),
    columnHelper.accessor('Proveedor', {
      header: 'Proveedor',
      id: 'proveedor',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="">{row.original.Proveedor}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.Proveedor}</p>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <Chip label={row.original.condition} color={row.original.color} />
        // </Link>
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}>
            <Chip label={row.original.condition} color={row.original.color} />
        </div>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="">{row.original.Importe}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.Importe}</p>
      ),
    }),
    columnHelper.accessor('vat', {
      header: 'IVA',
      id: 'iva',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="">{row.original.vat}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.vat}</p>
      ),
    }),
    columnHelper.accessor('discount', {
      header: 'Descuento',
      id: 'descuento',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="">{row.original.discount}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.discount}</p>
      ),
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      id: 'total',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="">{row.original.total}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.total}</p>
      ),
    }),
    columnHelper.accessor('taxFolio', {
      header: 'Folio fiscal',
      id: 'Folio fiscal',
      cell: ({row}) => (
        // <Link href={`/expenses/${row.original.id}/profile`}>
        //   <p className="">{row.original.taxFolio}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile`)}
        >{row.original.taxFolio}</p>
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
    "Folio fiscal": false,
  }

  // const handleExpensesSelected = (value: ExpensesTable[]) => {
  //   setExpensesSelected(value);
  // }

  // const [view, setView] = useState<JSX.Element>(<Table columns={columns} data={dataExpenses} selectFunction={handleExpensesSelected}
  //               placeH="Buscar gasto.." typeTable='cost' initialColumns={initialVisibilityColumns} />);
  const view = <Table columns={columns} data={dataExpenses} selectFunction={handleExpensesSelected}
                placeH="Buscar gasto.." typeTable='cost' initialColumns={initialVisibilityColumns} />
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

  if(refresh){
    const aux = async () =>{
      try {
        const res = await getAllCostsByCondition(token);
        //const res = await GetCostsMIN(token);
        //console.log('res');
        if(typeof(res) !== 'string'){
          refExpenses.current = res;
          const d = ExpenseDataToTableData(res);
          if(d.length > 0){
            //
          }
          setDataExpenses(d);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        console.log('catch table expenses => ', error);
        showToastMessageError('Error al actualizar tabla!!');
      }
    }
    aux();
    updateResponsible(user);
    console.log('refresh user => ', user);
    updateRefresh(false);
  }

  // const changeConditionInCost = async () => {
  //   //
  //   if(expensesSelected.length > 0){
  //     const filter: string[] = [];
  //     expensesSelected.map((row) => {
  //       filter.push(row.id);
  //     })
  //     const data = {
  //       condition: {
  //         glossary: idValidado,
  //         user
  //       },
  //       filter,
  //     }

  //     try {
  //       const res = await insertConditionInCost(token, data);
  //       if(res===200){
  //         showToastMessage('Costos actualizados satisfactoriamente!!!');
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 500);
  //       }else{
  //         showToastMessageError(res);
  //       }
  //     } catch (error) {
  //       showToastMessageError('Ocurrio un problema al actualizar condicion!!');
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if(filter){
  //     console.log('data exp ', dataExpenses);
  //     setView(<></>);
  //     setTimeout(() => {
  //       // const total = da
  //       setView(<Table columns={columns} data={dataExpenses} selectFunction={handleExpensesSelected}
  //         placeH="Buscar gasto.." typeTable='cost' initialColumns={initialVisibilityColumns} />);
  //     }, 100);
  //     setFilter(false);
  //   }
  // }, [filter]);

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

  const providerValidation = (exp:Expense, minAmount:number, maxAmount:number, 
        startDate:number, endDate:number, providers:string[]) => {
          //console.log('providers => ', providers);
    if(providers.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
    }else{
    //console.log('cost center filter => ', costcenters);
      if(exp.provider){
        if(typeof(exp.provider)==='string'){
          if(providers.includes(exp.provider)){
            return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
          }
        }else{
          if(providers.some((prov) => prov === exp.provider._id)){
            return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
          }
        }
      }
    }
    return false;
  }

  const costCenterValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, costcenters:string[], providers:string[]) => {
    if(costcenters.includes('all')){
      //return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
      return providerValidation(exp, minAmount, maxAmount, startDate, endDate, providers);
    }else{
      //console.log('cost center filter => ', costcenters);
      if(exp.costocenter){
        if(typeof(exp.costocenter)==='string'){
          if(costcenters.includes(exp.costocenter)){
            //return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
            return providerValidation(exp, minAmount, maxAmount, startDate, endDate, providers);
          }
        }else{
          // if(exp.costocenter.categorys.every((cat) => costcenters.includes(cat._id))){
          //   return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
          // }
          // if(costcenters.includes(exp.costocenter.concept.id)){
          //console.log('concept cc => ', exp.costocenter.concept._id);
          if(costcenters.some((cc) => cc === (exp.costocenter._id + '/' + exp.costocenter.concept._id))){
            //console.log('entrooo???');
            //return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
            return providerValidation(exp, minAmount, maxAmount, startDate, endDate, providers);
          }
        }
      }
    }
    return false;
  }

  const projectValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, projects:string[], 
                      costcenters:string[], providers:string[]) => {
    if(projects.includes('all')){
      //return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
      return costCenterValidation(exp, minAmount, maxAmount, startDate, endDate, costcenters, providers);
    }else{
      if(exp.project){
        if(projects.includes(exp.project._id)){
          return costCenterValidation(exp, minAmount, maxAmount, startDate, endDate, costcenters, providers);
          //return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
        }
      }
    }
    return false;
  }

  const reportValidation = (exp:Expense, minAmount:number, maxAmount:number, 
              startDate:number, endDate:number, projects:string[], 
              reports:string[], costcenters: string[], providers: string[]) => {
    if(reports.includes('all')){
      return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, costcenters, providers); 
    }else{
      if(exp.report){
        if(reports.includes(exp.report._id)){
          return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, costcenters, providers);
        }
      }
    }
    return false;
  }

  const categoriesValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                startDate:number, endDate:number, projects:string[], 
                reports:string[], categories:string[], costcenters: string[], providers: string[]) => {
    
    if(categories.includes('all')){
      return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, costcenters, providers);
    }else{
      if(exp.category){
        if(categories.includes(exp.category._id)){
          return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, costcenters, providers);
        }
      }
    }
    return false;
  }

  const typesValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  reports:string[], categories:string[], types:string[], 
                  costcenters:string[], providers: string[]) => {
    
    if(types.includes('all')){
      return categoriesValidation(exp, minAmount, maxAmount, startDate, endDate, 
                projects, reports, categories, costcenters, providers);
    }else{
      if(exp.typeCFDI){
        if(types.includes(exp.typeCFDI._id)){
          return categoriesValidation(exp, minAmount, maxAmount, startDate, endDate, 
                    projects, reports, categories, costcenters, providers);
        }
      }
    }
    return false;
  }

  const conditionValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  reports:string[], categories:string[], types:string[], 
                  conditions:string[], costcenters: string[], providers: string[]) => {

    if(conditions.includes('all')){
      return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
                reports, categories, types, costcenters, providers);
    }else{
      // if(!exp.condition.every((cond) => !conditions.includes(cond.glossary._id))){
      //   return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
      //               reports, categories, types, costcenters);
      // }
      if(conditions.includes(exp.estatus._id)){
        return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
                    reports, categories, types, costcenters, providers);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], types:string[], 
    categories:string[], minAmount:number, maxAmount:number, 
    reports:string[], projects:string[], startDate:number, 
    endDate:number, costcenters:string[], providers: string[]) => {
  
    let filtered: Expense[] = [];
    refExpenses.current.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, projects, reports, categories, types, conditions, costcenters, providers)){
        filtered.push(expense);
      }
    });

    //console.log(filtered);
    //setFilteredExpenses(filtered);
    setExpensesFiltered(filtered);
    setDataExpenses(ExpenseDataToTableData(filtered));
    //setFilter(true);
  }

  return(
    <>
      <div className="flex justify-end my-5">
        {/* <Button type="button" onClick={() => setFiltering(!filtering)}>Filtrar</Button> */}
        {/* <GiSettingsKnobs onClick={() => setFiltering(!filtering)}
          className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
        /> */}
          {isFilter && <Filtering showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} expensesFiltered={expensesFiltered} isViewReports={isViewReports}
                        />}
      </div>
      {/* <Button onClick={changeConditionInCost}>Validar</Button> */}
      {view}
    </>
  )
}