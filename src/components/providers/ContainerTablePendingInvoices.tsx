'use client'

import { HistoryExpensesTable } from "@/interfaces/Providers"
import { Expense } from "@/interfaces/Expenses"
import TableHistoryCosts from "./TableHistoryCosts"
import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import { Provider } from "@/interfaces/Providers"
import { Options } from "@/interfaces/Common"
import SearchInTable from "../SearchInTable"
import { GiSettingsKnobs } from "react-icons/gi"
import { useState } from "react"
import PaidHistoryExpenses from "./PaidHistoryExpenses"
import { TbPaywall } from "react-icons/tb"
import { GetCostsMIN } from "@/app/api/routeProviders";
import { showToastMessageError } from "../Alert"
import { ExpenseDataToTableHistoryProviderData } from "@/app/functions/providersFunctions"
import { useEffect } from "react"
import ContainerSideNav from "../ContainerSideNav"
import { getAllCostPROGByProviderMINWithoutPAY, getAllTotalAccumResumeProgramingByProviderMINWithoutPAY } from "@/app/api/routeCost"
import { IPendingPaymentResumeProviderPDF, ITotalAcumulatedPendingPaymentResumeProviderPDF } from "@/interfaces/Payments"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadPaymentsResumeProviderPDF from "./DownloadPaymentsResumeProviderPDF"
import { Tooltip } from "@nextui-org/react"
import { propsTooltip } from "@/libs/animations"
import DownloadPaymentsPendingProviderPDF from "./DownloadPaymentsPendingProviderPDf"

type Props = {
  data:HistoryExpensesTable[], 
  token:string, 
  expenses:Expense[], 
  user: string, 
  provider: Provider, 
  optTypes: Options[], 
  condition: string
}

export default function ContainerTablePendinginvoices({data, token, expenses, user, 
  provider, optTypes, condition}: Props) {

  const [filter, setFilter] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<HistoryExpensesTable[]>([]);
  const [paidExpenses, setPaidExpenses] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<HistoryExpensesTable[]>(data);
  const [costsProvider, setCostProvider] = useState<Expense[]>(expenses);
  const [currentCostsProvider, setCurrentCostProvider] = useState<Expense[]>(expenses);
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);

  const [dataReport, setDataReport]=useState<IPendingPaymentResumeProviderPDF[]>([]);
  const [totalAccum, setTotalAccum]=useState<ITotalAcumulatedPendingPaymentResumeProviderPDF[]>([]);
  
  useEffect(() => {
    const fetch = async () => {
      const [res, restot] = await Promise.all([
        getAllCostPROGByProviderMINWithoutPAY(provider._id, token),
        getAllTotalAccumResumeProgramingByProviderMINWithoutPAY(provider._id, token)
      ]);
      
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        // console.log('res 0 => ', JSON.stringify(res[0]));
        setDataReport(res);
      }

      if(typeof(restot)==='string'){
        showToastMessageError(restot);
      }else{
        // console.log('res cont => ', restot);
        setTotalAccum(restot.flat());
      }
    }
    fetch();
  }, []);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  const handlePaidExpenses = (value: boolean) => {
    setPaidExpenses(value);
  }

  const handleExpensesSelected = (value: HistoryExpensesTable[]) => {
    const noPaid = value.filter((c) => c.Estatus._id !== '67318a51ceaf47ece0d3aa72' && 
                                        c.Estatus._id !== '661eade6f642112488c85fad' &&
                                        c.Estatus._id !== '661eaa71f642112488c85f59' &&
                                        c.Estatus._id !== '661eaa4af642112488c85f56' );
    setExpensesSelected(noPaid);
  }

  const updateTable = async () => {
    let costs: Expense[];
    try {
      costs = await GetCostsMIN(token, provider._id);
      if(typeof(costs) === "string")
        showToastMessageError('Error al actualizar tabla!!!');
      else{
        const table: HistoryExpensesTable[] = ExpenseDataToTableHistoryProviderData(costs);
        setDataTable(table);
        setCurrentCostProvider(costs);
        setCostProvider(costs);
      }
    } catch (error) {
      showToastMessageError('Error al actualizar tabla!!!');  
    }
  }

  useEffect(() => {
    const expenseM = Array.isArray(expenses) && expenses.length > 0? expenses.reduce((previous, current) => {
      return current.cost?.subtotal > previous.cost?.subtotal ? current : previous;
    }): {cost: {subtotal: 0}};
    const expenseMin = Array.isArray(expenses) && expenses.length > 0? expenses.reduce((previous, current) => {
      return current.cost?.subtotal < previous.cost?.subtotal ? current : previous;
    }): {cost: {subtotal: 0}};
    setMaxAmount(expenseM.cost?.subtotal || 0);
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

  const conditionValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, conditions:string[], isPaid: number) => {

    if(conditions.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      if(conditions.includes(exp.estatus._id)){
        return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
    startDate:number, endDate:number, isPaid: number) => {

    let filtered: Expense[] = [];
    currentCostsProvider.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, conditions, isPaid)){
        filtered.push(expense);
      }
    });

    setCostProvider(filtered);
    setDataTable(ExpenseDataToTableHistoryProviderData(filtered));
  }
  
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center my-2">
          <ArrowReturn link="/providers" />
          <IconText text={provider?.tradename || ''} size="w-8 h-8" sizeText="" />
          <p className="text-slate-500 mx-3">{provider.name}</p>
        </div>
        <div className="flex gap-x-2">
          <SearchInTable placeH={"Buscar gasto.."} />
          <div className={`w-24`}>
            <div className="flex gap-x-4 justify-end items-center">
              <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />
              {expensesSelected.length > 0 && (
                <TbPaywall onClick={() => handlePaidExpenses(true)}
                  className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
                />
              )}
            </div>
          </div>
          <PDFDownloadLink document={<DownloadPaymentsPendingProviderPDF costs={dataReport} 
                                          provider={provider} totalAccum={totalAccum} />} fileName={`Pendientes ${provider.name}`} >
            {({loading, url, error, blob}) => 
              loading? (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                    placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                  <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                </Tooltip>
              ) : (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                    placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                  <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                </Tooltip>
              ) }
          </PDFDownloadLink>
        </div>
      </div>
      <TableHistoryCosts token={token} handleExpensesSelected={handleExpensesSelected}
        expenses={costsProvider} isFilter={filter} setIsFilter={handleFilter}
        user={user} isViewReports={false} data={dataTable} idProv={provider._id}
        filterData={filterData} maxAmount={maxAmount} minAmount={minAmount}
      />
      {/* {paidExpenses && (
        <ContainerSideNav width="w-full max-w-5xl" open={paidExpenses}>
          <PaidHistoryExpenses dataTable={expensesSelected} token={token} condition={condition} open={paidExpenses}
            showForm={handlePaidExpenses} provider={provider} user={user} updateTable={updateTable}
            optTypes={optTypes} />
        </ContainerSideNav>
      )} */}
      <ContainerSideNav width="w-full max-w-5xl" open={paidExpenses}>
        <PaidHistoryExpenses dataTable={expensesSelected} token={token} condition={condition}
          showForm={handlePaidExpenses} provider={provider} user={user} updateTable={updateTable}
          optTypes={optTypes} open={paidExpenses} />
      </ContainerSideNav>
    </div>
  )
}
