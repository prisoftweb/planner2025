'use client'
import TableExpenses from "./TableExpenses"
import ButtonNew from "./ButtonNew"
import { Options } from "@/interfaces/Common"
import { ExpensesTable, Expense } from "@/interfaces/Expenses"
import { ReportParse } from "@/interfaces/Reports"
import { useState, useEffect } from "react"
import { GiSettingsKnobs } from "react-icons/gi"
import TableHistoryExpenses from "./TableHistoryExpenses"
import SearchInTable from "../SearchInTable"
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import Button from "../Button"
import { showToastMessage, showToastMessageError } from "../Alert"
import { insertConditionInCost } from "@/app/api/routeCost"

import { useOptionsExpense, useNewExpense } from "@/app/store/newExpense"

import { getCostoCentersLV } from "@/app/api/routeCostCenter";
import { CostoCenterLV, } from "@/interfaces/CostCenter";
import { getProvidersLV, getProvidersSATLV } from "@/app/api/routeProviders";
import { getUsersLV } from "@/app/api/routeUser";
import { getProjectsLV } from "@/app/api/routeProjects";
import { getCatalogsByNameAndCategory, getCatalogsByNameAndCondition, getCatalogsByNameAndType } from "@/app/api/routeCatalogs";
import { GetVatsLV } from "@/app/api/routeCost"
import { GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, GetAllReportsWithUSERAndNEConditionMIN
 } from "@/app/api/routeReports";
import { UsrBack } from "@/interfaces/User"
import WithOut from "../WithOut"

import { getAllCostsByConditionAndUser } from "@/app/api/routeCost"
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions"

export default function ContainerClient({data, token, expenses, 
                    user, isHistory=false, isViewReports, isViewUser=false}:
  {data:ExpensesTable[], token:string, expenses:Expense[], user:UsrBack, isHistory?:boolean, 
    isViewReports: boolean, isViewUser?: boolean}){

  const { categories, conditions, costCenterOpt, projects, providers, responsibles, types, 
    updateCategories, updateConditions, updateCostC, updateProjects, updateProviders,
    updateReportsOptions, updateResponsibles, updateTypes, updateVats, updateProvidersSAT, 
    updateReports} = useOptionsExpense();

  const [idVal, setIdVal] = useState<string>('');
  const [tableData, setTableData] = useState<ExpensesTable[]>(data);

  const {expensesTable, updateExpensesTable, updateResponsible, refresh, updateRefresh} = useNewExpense();

  if(expensesTable.length <= 0 && expenses.length > 0){
    updateExpensesTable(expenses);
  }

  useEffect(() => {
    const fetchApis = async () => {
      let costcenters: CostoCenterLV[];
      try {
        costcenters = await getCostoCentersLV(token);
        if(typeof(costcenters)==='string'){
          return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
      }

      const optCostCenter:Options[]= [];
      costcenters.map((costcenter) => {
        optCostCenter.push({
          label: costcenter.label || 'sin categoria',
          value: costcenter.categoryid + '/' + costcenter.value
        });
      });

      let optProviders:Options[]= [];
      try {
        optProviders = await getProvidersLV(token);
        if(typeof(optProviders)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optProviders}</h1>
        }
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores!!</h1>
      }

      let optProvidersSAT:Options[]= [];
      try {
        optProvidersSAT = await getProvidersSATLV(token);
        if(typeof(optProvidersSAT)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optProvidersSAT}</h1>
        }
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores del sat!!</h1>
      }

      let optResponsibles:Options[]= [];
      try {
        optResponsibles = await getUsersLV(token);
        if(typeof(optResponsibles)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optResponsibles}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los usuarios!!</h1>
      }

      let optProjects:Options[];
      try {
        optProjects = await getProjectsLV(token);
        if(typeof(optProjects)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
      }

      let optCategories: Options[] = [];
      try {
        optCategories = await getCatalogsByNameAndCategory(token, 'cost');
        if(typeof(optCategories)==='string') return <h1 className="text-red-500 text-center text-lg">{optCategories}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      let optTypes: Options[] = [];
      try {
        optTypes = await getCatalogsByNameAndType(token, 'cost');
        if(typeof(optTypes)==='string') return <h1 className="text-red-500 text-center text-lg">{optTypes}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      let optConditions: Options[] = [];
      try {
        optConditions = await getCatalogsByNameAndCondition(token, 'cost');
        if(typeof(optConditions)==='string') return <h1 className="text-red-500 text-center text-lg">{optConditions}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      let optVats: Options[];
      try {
        optVats = await GetVatsLV(token);
        if(typeof(optVats)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optVats}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los ivas!!</h1>
      }
      
      let reps: ReportParse[];
      try {
        if(typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')){
          reps = await GetAllReportsWithUSERAndNEConditionMIN(token, user._id);
        }else{
          reps = await GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id);
        }
        
        if(typeof(reps)==='string'){
          return <h1 className="text-center text-lg text-red-500">{reps}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los reportes!!</h1>
      }

      const opReports:Options[]= [];
      reps.map((rep) => {
        const r = {
          label: rep.name,
          value: rep._id
        }
        opReports.push(r);
      });

      const val = optConditions.find((cond) => cond.label.toLowerCase().includes('validado'))?.value || '';
      setIdVal(val);

      updateCostC(optCostCenter);
      updateProviders(optProviders);
      updateResponsibles(optResponsibles);
      updateProjects(optProjects);
      updateCategories(optCategories);
      updateTypes(optTypes);
      updateConditions(optConditions);
      updateVats(optVats);
      updateReports(reps);
      updateReportsOptions(opReports);
      updateProvidersSAT(optProvidersSAT);
    }
    fetchApis();

    updateResponsible(user._id);
  }, []);

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<ExpensesTable[]>([]);
  const handleFilter = (value: boolean) => {
    setIsFilter(value);
  }

  const handleExpensesSelected = (value: ExpensesTable[]) => {
    setExpensesSelected(value);
  }

  const changeConditionInCost = async () => {
    if(expensesSelected.length > 0){
      const filter: string[] = [];
      expensesSelected.map((row) => {
        filter.push(row.id);
      })
      const data = {
        condition: {
          glossary: idVal,
          user
        },
        filter,
      }

      try {
        const res = await insertConditionInCost(token, data);
        if(res===200){
          showToastMessage('Costos actualizados satisfactoriamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar condicion!!');
      }
    }
  }

  const finishCost = async () => {
    if(expensesSelected.length > 0){
      const filter: string[] = [];
      expensesSelected.map((row) => {
        filter.push(row.id);
      })
      const paidData = {
        condition: {
          glossary: "67318a51ceaf47ece0d3aa72",
          user
        },
        filter,
      }
      const data = {
        condition: {
          glossary: "661eade6f642112488c85fad",
          user
        },
        filter,
      }

      try {
        const paidExpenses = await insertConditionInCost(token, paidData);
        if(typeof(paidExpenses)==='string'){
          showToastMessageError(paidExpenses);
        }else{
          const res = await insertConditionInCost(token, data);
          if(res===200){
            showToastMessage('Costos actualizados satisfactoriamente!!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar condicion!!');
      }
    }
  }

  const conciliationCost = async () => {
    if(expensesSelected.length > 0){
      const filter: string[] = [];
      expensesSelected.map((row) => {
        filter.push(row.id);
      })
      const data = {
        condition: {
          glossary: '661eaa71f642112488c85f59',
          user
        },
        filter,
      }

      try {
        const res = await insertConditionInCost(token, data);
        if(res===200){
          showToastMessage('Costos actualizados satisfactoriamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar condicion!!');
      }
    }
  }

  if(refresh && expenses.length <= 0 && expensesTable.length <= 0){
    const aux = async () =>{
      try {
        const res = await getAllCostsByConditionAndUser(token, user._id);
        if(typeof(res) !== 'string'){
          const d = ExpenseDataToTableData(res);
          setTableData(d);
          updateExpensesTable(res);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Error al actualizar tabla!!');
      }
    }
    aux();
    updateRefresh(false);
  }

  if( expenses.length <= 0 && expensesTable.length <= 0){
    const view = isHistory? <WithOut img="/img/costs/gastos.svg" subtitle="Historial de Gastos"
    text="El historial de gastos actualmente esta vacio!!!"
    title="Historial de Gastos">
      <></>
  </WithOut> : (isViewUser? <WithOut img="/img/costs/gastos.svg" subtitle="Gastos en proceso"
              text="Aqui se mostraran los gastos que aun estan en proceso!!!"
              title="Gastos en proceso">
                <></>
            </WithOut>: <WithOut img="/img/costs/gastos.svg" subtitle="Gastos"
              text="Agrega el costo de mano de obra,
                    caja chica o proveedor desde esta
                    seccion a un determinado proyecto"
              title="Gastos">
                <ButtonNew token={token} user={user} />
            </WithOut>);
    return (
      <>
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          {view}
        </div>
      </>
    )
  }

  let isExpensesValidates = true;
  if(typeof(user.department)!=='string' && user.department.name.toLowerCase().includes('soporte')){
    if(expensesSelected.length > 0){
      const find = expensesSelected.find((e) => !e.condition.toLowerCase().includes('validado'));
      if(find){
        isExpensesValidates=false;
      }
    }else{
      isExpensesValidates=false;
    }
  }else{
    isExpensesValidates=false;
  }

  const viewTable = 
    isHistory? (
      <TableHistoryExpenses  token={token} isViewReports={isViewReports}
        expenses={expenses} isFilter={isFilter} setIsFilter={setIsFilter}
        data={tableData}
      />
    ): isViewUser? (
      <TableExpenses token={token} handleExpensesSelected={handleExpensesSelected}
        expenses={expensesTable.length > 0? expensesTable: expenses} isFilter={isFilter} setIsFilter={handleFilter}
        idValidado={idVal} user={user._id} isViewReports={isViewReports}
        data={tableData} isPending={isViewUser}
      />
    ): (
      <TableExpenses token={token} handleExpensesSelected={handleExpensesSelected}
        expenses={expensesTable.length > 0? expensesTable: expenses} isFilter={isFilter} setIsFilter={handleFilter}
        idValidado={idVal} user={user._id} isViewReports={isViewReports}
        data={tableData} isPending={isViewUser}
      />
    )
  
  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">{isHistory? 'Historial de Gastos': (isViewUser? 'Gastos en proceso': 'Gastos')}</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 ${isHistory? '': 'flex-wrap-reverse sm:flex-nowrap'} w-full justify-end`}>
          <SearchInTable placeH={"Buscar gasto.."} />
          <div className={`${isHistory? '': 'w-72'}`}>
            <div className="flex gap-x-4 justify-end items-center">
              {categories.length > 0 && 
                conditions.length > 0 && costCenterOpt.length > 0 && 
                projects.length > 0 && providers.length > 0 && responsibles.length > 0 && 
                types.length > 0 && (
                  <GiSettingsKnobs onClick={() => handleFilter(true)}
                    className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
                  />
              )}  
              <>
                {!isHistory && !isViewUser && (
                  <>
                    {expensesSelected.length > 0 && (
                      <Button onClick={conciliationCost}>Conciliar</Button>
                    )}
                  </>
                )}
                {isViewUser && !isExpensesValidates && (
                  <>
                    {expensesSelected.length > 0 && (
                      <Button onClick={changeConditionInCost}>Validar</Button>
                    )}
                  </>
                )}
                {isViewUser && isExpensesValidates && (
                  <>
                    {expensesSelected.length > 0 && (
                      <Button onClick={finishCost}>Finalizar</Button>
                    )}
                  </>
                )}
                {!isHistory && !isViewUser && (
                  <ButtonNew token={token} user={user} />
                )}
              </>
            </div>
          </div>
        </div>
      </div>
      {viewTable}
    </div>
  )
}