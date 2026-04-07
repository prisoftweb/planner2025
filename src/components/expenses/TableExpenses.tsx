'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect, useRef, useMemo } from "react";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { RemoveCost, getAllCostsByConditionAndUser, CloneCost, GetCostsByUserMIN } from "@/app/api/routeCost";
import { useNewExpense } from "@/app/store/newExpense";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import { showToastMessage, showToastMessageError } from "../Alert";
import Filtering from "./ExpensesFiltered";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import RemoveElement from "../RemoveElement";
import {IoMdCopy} from 'react-icons/io';
import { CurrencyFormatter } from "@/app/functions/Globals";
import {Tooltip} from "@nextui-org/react";
import ContainerSideNav from "../ContainerSideNav";
import { propsTooltip } from "@/libs/animations";
import { IoIosLink } from "react-icons/io";
import { useTableStates } from "@/app/store/tableStates";

type Props = {
  data:ExpensesTable[], 
  token:string, 
  expenses:Expense[], 
  user: string, 
  isFilter:boolean, 
  setIsFilter:Function, 
  idValidado: string, 
  handleExpensesSelected:Function, 
  isViewReports: boolean, 
  isPending:boolean
}

export default function TableExpenses({data, token, expenses, 
  handleExpensesSelected, idValidado, user, isFilter, setIsFilter, 
  isViewReports, isPending }: Props){
  
  const columnHelper = createColumnHelper<ExpensesTable>();
  const refExpenses = useRef(expenses);
  const refFilter = useRef(false);

  const [dataExpenses, setDataExpenses] = useState(data);
  const [expensesFiltered, setExpensesFiltered] = useState<Expense[]>(expenses);
  
  const {refresh, updateRefresh, updateResponsible, isDeleteExpensesTable, 
    updateIsDeleteExpenseTable, expensesTable, updateExpensesTable} = useNewExpense();

  const cloneCost = async (id: string) => {
    try {
      const res = await CloneCost(token, id, user);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        showToastMessage('Costo copiado exitosamente!!!');
        const fetchCosts = await GetCostsByUserMIN(token, user);
        if(typeof(fetchCosts)==='string'){
          showToastMessageError("Error al actulizar tabla!!!");
        }else{
          refExpenses.current = res;
          updateExpensesTable(fetchCosts);
          const d = ExpenseDataToTableData(fetchCosts);
          setDataExpenses(d);
        }
      }
    } catch (error) {
      showToastMessageError("Ocurrio un problema al clonar costo!!!");
    }
  }
  
  const delCost = async(id: string) => {
    try {
      const arrExpenses = expensesTable.filter(exp => exp._id !== id);
      updateExpensesTable(arrExpenses);
      updateIsDeleteExpenseTable(true);
    } catch (error) {
      showToastMessageError('Error al quitar costo de la tabla!!');
    }
  }

  const handleIsFilter = (value: boolean) => {
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

  const queryParam= isPending? '?status=pending': '';

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
          <RemoveElement id={row.original.id} name={row.original.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" />
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Copiar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            <span>
              <IoMdCopy className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer hover:bg-blue-100" onClick={() => cloneCost(row.original.id)} />
            </span>
          </Tooltip>
          <div className="w-20 flex gap-x-1 items-center">
            {row.original.archivos.includes('xml') && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='XML' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <BsFiletypeXml className="w-6 h-6 text-green-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
            {row.original.archivos.includes('pdf') && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='PDF' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <BsFileEarmarkPdf className="w-6 h-6 text-green-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
            {row.original.archivos.includes('none') && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Sin archivo' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <IoAlert className="w-6 h-6 text-red-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
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
            <Chip label={row.original.condition} color={row.original.color} darktext={row.original.darktext} />
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

  if(isDeleteExpensesTable){
    const d = ExpenseDataToTableData(expensesTable);
    setExpensesFiltered(expensesTable);
    setDataExpenses(d);
    updateIsDeleteExpenseTable(false);
  }

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
        const res = await getAllCostsByConditionAndUser(token, user);
        if(typeof(res) !== 'string'){
          refExpenses.current = res;
          const d = ExpenseDataToTableData(res);
          setDataExpenses(d);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Error al actualizar tabla!!');
      }
    }
    aux();
    updateResponsible(user);
    updateRefresh(false);
  }

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
    if(d >= startDate && d <= endDate){
      return paidValidation(exp, isPaid);
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

  const providerValidation = (exp:Expense, minAmount:number, maxAmount:number, 
        startDate:number, endDate:number, providers:string[], isPaid: number) => {
    if(providers.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      if(exp.provider){
        if(typeof(exp.provider)==='string'){
          if(providers.includes(exp.provider)){
            return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
          }
        }else{
          if(providers.some((prov) => prov === exp.provider._id)){
            return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
          }
        }
      }
    }
    return false;
  }

  const costCenterValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, costcenters:string[], providers:string[], isPaid: number) => {
    if(costcenters.includes('all')){
      return providerValidation(exp, minAmount, maxAmount, startDate, endDate, providers, isPaid);
    }else{
      if(exp.costocenter){
        if(typeof(exp.costocenter)==='string'){
          if(costcenters.includes(exp.costocenter)){
            return providerValidation(exp, minAmount, maxAmount, startDate, endDate, providers, isPaid);
          }
        }else{
          if(costcenters.some((cc) => cc === (exp.costocenter._id + '/' + exp.costocenter.concept._id))){
            return providerValidation(exp, minAmount, maxAmount, startDate, endDate, providers, isPaid);
          }
        }
      }
    }
    return false;
  }

  const projectValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, projects:string[], 
                      costcenters:string[], providers:string[], isPaid: number) => {
    if(projects.includes('all')){
      return costCenterValidation(exp, minAmount, maxAmount, startDate, endDate, costcenters, providers, isPaid);
    }else{
      if(exp.project){
        if(projects.includes(exp.project._id)){
          return costCenterValidation(exp, minAmount, maxAmount, startDate, endDate, costcenters, providers, isPaid);
        }
      }
    }
    return false;
  }

  const reportValidation = (exp:Expense, minAmount:number, maxAmount:number, 
              startDate:number, endDate:number, projects:string[], 
              reports:string[], costcenters: string[], providers: string[], isPaid: number) => {
    if(reports.includes('all')){
      return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, costcenters, providers, isPaid); 
    }else{
      if(exp.report){
        if(reports.includes(exp.report._id)){
          return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, costcenters, providers, isPaid);
        }
      }
    }
    return false;
  }

  const categoriesValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                startDate:number, endDate:number, projects:string[], 
                reports:string[], categories:string[], costcenters: string[], providers: string[], isPaid: number) => {
    
    if(categories.includes('all')){
      return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, costcenters, providers, isPaid);
    }else{
      if(exp.category){
        if(categories.includes(exp.category._id)){
          return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, costcenters, providers, isPaid);
        }
      }
    }
    return false;
  }

  const typesValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  reports:string[], categories:string[], types:string[], 
                  costcenters:string[], providers: string[], isPaid: number) => {
    
    if(types.includes('all')){
      return categoriesValidation(exp, minAmount, maxAmount, startDate, endDate, 
                projects, reports, categories, costcenters, providers, isPaid);
    }else{
      if(exp.typeCFDI){
        if(types.includes(exp.typeCFDI._id)){
          return categoriesValidation(exp, minAmount, maxAmount, startDate, endDate, 
                    projects, reports, categories, costcenters, providers, isPaid);
        }
      }
    }
    return false;
  }

  const conditionValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  reports:string[], categories:string[], types:string[], 
                  conditions:string[], costcenters: string[], providers: string[], isPaid: number) => {

    if(conditions.includes('all')){
      return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
                reports, categories, types, costcenters, providers, isPaid);
    }else{
      if(conditions.includes(exp.estatus._id)){
        return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
                    reports, categories, types, costcenters, providers, isPaid);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], types:string[], 
    categories:string[], minAmount:number, maxAmount:number, 
    reports:string[], projects:string[], startDate:number, 
    endDate:number, costcenters:string[], providers: string[], isPaid: number) => {
  
    let filtered: Expense[] = [];
    refExpenses.current.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, projects, reports, categories, types, conditions, costcenters, providers, isPaid)){
        filtered.push(expense);
      }
    });

    setExpensesFiltered(filtered);
    setDataExpenses(ExpenseDataToTableData(filtered));
  }

  return(
    <>
      <div className="flex justify-end my-5">
          {isFilter && (
            <ContainerSideNav width="w-full max-w-[550px]">
              <Filtering showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} expensesFiltered={expensesFiltered} isViewReports={isViewReports}
                        />
            </ContainerSideNav>
          )}
      </div>
      
      <div className="hidden md:block w-full">
        {view}
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} delCost={delCost} queryParam={queryParam} />
      </div>
    </>
  )
}

const ListData = ({data, token, delCost, queryParam}: 
  {data: ExpensesTable[], token:string, delCost: (id: string) => Promise<void>, queryParam:string}) => {

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
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((e) => (
            <CardExpense expense={e} key={e.id} delCost={delCost} token={token} queryParam={queryParam} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardExpense = ({expense, token, delCost, queryParam}: 
  {expense:ExpensesTable, token:string, delCost: (id: string) => Promise<void>, queryParam:string}) => {
  
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
            <RemoveElement id={expense.id} name={expense.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" />
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