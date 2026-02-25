'use client'

import { ExpensesTableProvider } from "@/interfaces/Providers"
import TableCostsProvider from "./TableCostsProvider"
import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import { Provider } from "@/interfaces/Providers"
import SearchInTable from "../SearchInTable"
import { useState, useEffect } from "react"
import { PaymentProvider, IPaymentResumeProvider } from "@/interfaces/Payments"
import WithOut from "../WithOut"
import { showToastMessageError } from "../Alert"
import { getPaymentsProvider } from "@/app/api/routePayments"
import TooltipFilterIcon from "../tooltipIcons/TooltipFilterIcon"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadPaymentsResumeProviderPDF from "./DownloadPaymentsResumeProviderPDF"
import { Tooltip } from "@nextui-org/react"
import { propsTooltip } from "@/libs/animations"
import { getAllPaymentsByProviderMIN } from "@/app/api/routeProviders"

type Props = {
  data:ExpensesTableProvider[], 
  token:string, 
  expenses:PaymentProvider[], 
  user: string, 
  provider: Provider
}

export default function ContainerTableExpensesProvider({data, token, expenses, user, 
  provider}: Props) {

  const [filter, setFilter] = useState<boolean>(false);
  const [stateExpenses, setStateExpenses] = useState<PaymentProvider[]>(expenses);

  const [dataReport, setDataReport]=useState<IPaymentResumeProvider[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllPaymentsByProviderMIN(provider._id, token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setDataReport(res);
      }
    }
    fetch();
  }, []);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  const updateStateExpenses = async () => {
    try {
      const res = await getPaymentsProvider(token, provider._id);
      if(typeof(res) === 'string'){
        showToastMessageError('Error al actulizar tabla!!!');
      }else{
        setStateExpenses(res);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al actualizar tabla!!!');
    }
  }

  if(stateExpenses.length <= 0){
    return (
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
           <WithOut img="/img/payments/payments.svg" subtitle="Pagos"
            text="Aqui puedes ver los pagos que se han realizado del proveedor"
            title="Pagos">
              <></>
          </WithOut>
        </div>
    )
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
              <TooltipFilterIcon handleFilter={handleFilter} />
            </div>
          </div>
          {dataReport.length > 0 && (
            <div className="flex justify-end">
              <PDFDownloadLink document={<DownloadPaymentsResumeProviderPDF payments={dataReport} provider={provider} />} fileName={`Pagos ${provider.name}`} >
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
          )}
        </div>
      </div>
      <TableCostsProvider token={token} expenses={expenses} isFilter={filter}
        setIsFilter={handleFilter} user={user} data={data} idProv={provider._id} 
        udpateTable={updateStateExpenses} />
    </div>
  )
}
