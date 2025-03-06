'use client'

import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import SearchInTable from "../SearchInTable"
import { GiSettingsKnobs } from "react-icons/gi"
import { useState } from "react"
import TableCostsDetailProvider from "./TableCostsDetailProvider"
import { DetailExpensesTableProvider } from "@/interfaces/Providers"
import { CostPayment } from "@/interfaces/Payments"
import { OnePayment } from "@/interfaces/Payments"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Chip from "./Chip"
import { ProgressCircle } from "@tremor/react"

import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs"
import ReportPaymentPDF from "./ReportPaymentPDF"
import { UsrBack } from "@/interfaces/User"
import { ProviderMin } from "@/interfaces/Providers"

export default function ContainerTableDetailsExpenseProvider({data, token, expenses, user, 
    provider, payment}:
  {data:DetailExpensesTableProvider[], token:string, expenses:CostPayment[], 
    user: UsrBack, provider: ProviderMin, payment: OnePayment}) {

  const [filter, setFilter] = useState<boolean>(false);
  
  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

  console.log('payment => ', payment);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center my-2">
          <ArrowReturn link={`/providers/${provider._id}/payments`} />
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
              
              <PDFDownloadLink document={<ReportPaymentPDF costs={data} provider={provider}
                                            payment={payment} user={user} />} fileName={`${provider.name}.pdf`} >
              {/* <PDFDownloadLink document={<AttachedPDF report={report} />} fileName={`FF-ANEXO-1-${report.name}`} > */}
                {({loading, url, error, blob}) => 
                  loading? (
                    <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informe' 
                        placement="right" className="text-blue-500 bg-white">
                      <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                      {/* // <button type="button">Loading document...</button> */}
                    </Tooltip>
                  ) : (
                    <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informe' 
                        placement="right" className="text-blue-500 bg-white">
                      <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                    </Tooltip>
                    // <button type="button">Download now!</button>
                  ) }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-x-3 gap-y-3">
        <div className="bg-white col-span-3 p-3">
          <div className="flex gap-x-2 items-center">
            <IconText text={provider?.name || ''} size="w-8 h-8" sizeText="" />
            <div>
              <p className="text-sm text-slate-500">{provider.rfc}</p>
              <p className="text-sm text-blue-500">{provider.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2 mt-2">
            <div>
              <p className="text-sm text-slate-500">Monto pagado</p>
              <p className="text-sm text-green-500">{CurrencyFormatter({
                currency: 'MXN',
                value: payment.payout
              })}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Pendiente por pagar</p>
              <p className="text-sm text-red-500">{CurrencyFormatter({
                currency: 'MXN',
                value: payment.pending
              })}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Total de facturas</p>
              <p className="text-sm text-blue-500">{payment.costs.length} documentos</p>
            </div>
          </div>
        </div>

        <div className="bg-white col-span-2 p-3">
        <div>
            <p className="text-sm text-slate-500">Fecha</p>
            <p className="text-sm text-blue-500">{payment.date.substring(0, 10)}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-2 mt-2">
            <div>
              <p className="text-sm text-slate-500">Rango</p>
              <p className="text-sm text-blue-500">{'agregar rango'}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Comentarios</p>
              <p className="text-xs text-blue-500">{payment.notes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white col-span-1 p-3">
          <div className="mb-2">
            <Chip label="Pagado" color="#0f0" />
          </div>
          <ProgressCircle value={(payment.payout / (payment.payout + payment.pending)) * 100}>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {((payment.payout / (payment.payout + payment.pending)) * 100).toFixed(2)}%
            </span>
          </ProgressCircle>
        </div>

      </div>
      <TableCostsDetailProvider token={token} expenses={expenses} isFilter={filter} setIsFilter={handleFilter}
        user={user._id} data={data} />
    </div>
  )
}
