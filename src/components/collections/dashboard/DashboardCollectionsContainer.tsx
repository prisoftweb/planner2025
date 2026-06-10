'use client'

import { useState, useEffect } from "react"
import { CurrencyFormatter } from "@/app/functions/Globals";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import NewDonutChartComponent from "@/components/projects/dashboard/NewDonutChartComponent";
import { DonutChartJS } from "@/interfaces/DashboardProjects";
import Label from "@/components/Label";
import { ITotalInvoiceByClient, ITotalInvoicesByProjectDashboardCollection, 
  ITotalPaymentByDateAndStatus, ITotalPendingByDateAndStatus, 
  ITotalAccountReceivablesByClientResumen, ITotalEstimatesPendingByClient,
  IAllTOTALPENDINGPAYMENTSByProject, IAllsProjectsMINAndNEConditionANDNoExistsEstimate, IAllTOTALPENDINGBillingByProject } from "@/interfaces/Invoices";
import { BarChartComponent } from "@/components/projects/dashboard/BarChartComponent";
import { getTotalAccountReceivablesByProject, getTotalAccountReceivablesByClient, 
  getTotalAccountReceivablesPaymentByDateAndStatus, getTotalAccountReceivablesPendingByDateAndStatus, 
  getTotalAccountReceivablesByClientResumen, getTotalEstimatesPendingByClient, 
  getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN, 
  getAllTOTALPENDINGPAYMENTSByProjectMINRESUME, getAllTOTALPENDINGBillingANDPENDINGEstimatesByProjectACUMULATED } from "@/app/api/routeInvoices";
import { showToastMessageError } from "@/components/Alert";
import { BsCash } from "react-icons/bs";
import { IAmountTotalGuaranteesByDateAndStatus } from "@/interfaces/Guarantee";
import { getTotalGuaranteesByDateAndStatus } from "@/app/api/routeGuarantee";
import { BarChartTwoInOneCollections } from "./BarChartTwoInOneCollections";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadPendingCollectionsPDF from "./DownloadPendingCollectionsPDF";
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadPendingCollectionsByClientPDF from "./DownloadPendingCollectionsByClientPDF";
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";
import { getDate } from "@/libs/dates";

export interface DataProjectsByType {
  client: string
  issues: Issue[]
}

export interface Issue {
  status: any
  value: number
  percentage: number
}

function transformProjectsTypesToDataChart(dataCollections: ITotalAccountReceivablesByClientResumen[][], pendingCli:ITotalEstimatesPendingByClient[]){
  const res: DataProjectsByType[] = [];
  
  for (let i = 0; i < dataCollections.length; i++) {
    const cli = pendingCli.find((cli) => cli.c === dataCollections[i][0].client);
    if(cli){
      dataCollections[i].push({
        client: cli.client,
        pendingPayment: cli.pendingEstimated,
        type: "FACTURADO POR ESTIMAR",
        quantity: cli.pendingEstimated
      });
    }
  }

  dataCollections.map((arrData) => {
    const r: Issue[] = [];
    if(Array.isArray(arrData) && arrData.length > 0){
      arrData.map((prj) => {
        r.push({
          percentage: 22,
          status: prj?.type,
          value: prj?.pendingPayment?? 0
        });
      });
      res.push({
        client: arrData[0].client,
        issues: r,
      });
    }
  });

  return res;
}

interface OptionsDashboard {
  label: string,
  cobro: number
}

type DataPendingProject = {
  label: string,
  "POR COBRAR": number,
  "POR FACTURAR": number,
}

export default function DashboardCollectionsContainer({token, user, totalClients, totalProjects, totalPay, 
  totalPen, resC, toalPrjRes, toalCliRes, totalEstimatesPen, totalEstimatesCli, totalPendingBillingByPrj, company}: 
  {token:string, user:string, totalProjects: ITotalInvoicesByProjectDashboardCollection[], 
    totalClients: ITotalInvoiceByClient[], totalPay: ITotalPaymentByDateAndStatus[], 
    totalPen: ITotalPendingByDateAndStatus[], resC: IAmountTotalGuaranteesByDateAndStatus, 
    toalPrjRes: IAllTOTALPENDINGPAYMENTSByProject[], toalCliRes: ITotalAccountReceivablesByClientResumen[], 
    totalEstimatesPen: IAllsProjectsMINAndNEConditionANDNoExistsEstimate[], 
    totalEstimatesCli: ITotalEstimatesPendingByClient[], totalPendingBillingByPrj: IAllTOTALPENDINGBillingByProject[], 
    company:string}) {

  const [totalCollectionsProjects, setTotalCollectionsProjects]=useState<ITotalInvoicesByProjectDashboardCollection[]>(totalProjects);
  const [totalCollectionsClients, setTotalCollectionsClients]=useState<ITotalInvoiceByClient[]>(totalClients);
  const [totalPaymentByDate, setTotalPaymentByDate]=useState<ITotalPaymentByDateAndStatus[]>(totalPay);
  const [totalPending, setTotalPending]=useState<ITotalPendingByDateAndStatus[]>(totalPen);
  const [totalAccountByPrjRes, setTotalAccountByPrjRes]=useState<IAllTOTALPENDINGPAYMENTSByProject[]>(toalPrjRes);
  const [totalAccountByCliRes, setTotalAccountByCliRes]=useState<ITotalAccountReceivablesByClientResumen[]>(toalCliRes);
  const [totalEstimatesPendingCli, setTotalEstimatesPendingCli] = useState<ITotalEstimatesPendingByClient[]>(totalEstimatesCli);
  const [totalPendingBillingPjr, setTotalPendingBillingPjr] = useState<IAllTOTALPENDINGBillingByProject[]>(totalPendingBillingByPrj);

  const [satCompany, setSatCompany]=useState<Company>();

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDate = (dateI: Date, dateF: Date) => {
    updateDashboard(getDate(dateI), getDate(dateF));
  }

  useEffect(() => {
    const fetch = async () => {
      const [rescomp] = await Promise.all([
        getCompany(token, company),
      ]);
      
      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        setSatCompany(rescomp);
      }
    }

    fetch();
  }, []);

  const updateDashboard = async (dateI:string, dateF:string) => {

    const [totprj, totcli, totPay, totPen, resCobrar, totalCliRes, totEstPen, totEstPenCli, 
      totalPenPayPjr, pendingBilling] = await Promise.all([
      getTotalAccountReceivablesByProject(token, dateI, dateF),
      getTotalAccountReceivablesByClient(token, dateI, dateF), 
      getTotalAccountReceivablesPaymentByDateAndStatus(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString()), 
      getTotalAccountReceivablesPendingByDateAndStatus(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString()), 
      getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'POR COBRAR'), 
      getTotalAccountReceivablesByClientResumen(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString()), 
      getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString()), 
      getTotalEstimatesPendingByClient(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString()), 
      getAllTOTALPENDINGPAYMENTSByProjectMINRESUME(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString()), 
      getAllTOTALPENDINGBillingANDPENDINGEstimatesByProjectACUMULATED(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())),
    ]);

    if(typeof(totprj)==='string'){
      showToastMessageError(totprj);
    }else{
      setTotalCollectionsProjects(totprj);
    }
  
    if(typeof(totcli)==='string'){
      showToastMessageError(totcli);
    }else{
      setTotalCollectionsClients(totcli);
    }

    if(typeof(totPay)==='string'){
      showToastMessageError(totPay);
    }else{
      setTotalPaymentByDate(totPay);
    }

    if(typeof(totPen)==='string'){
      showToastMessageError(totPen);
    }else{
      setTotalPending(totPen);
    }

    if(typeof(totalCliRes)==='string'){
      showToastMessageError(totalCliRes);
    }else{
      setTotalAccountByCliRes(totalCliRes);
    }

    if(typeof(totEstPenCli)==='string'){
      showToastMessageError(totEstPenCli);
    }else{
      setTotalEstimatesPendingCli(totEstPenCli);
    }
    
    if(typeof(totalPenPayPjr)==='string'){
      showToastMessageError(totalPenPayPjr);
    }else{
      setTotalAccountByPrjRes(totalPenPayPjr);
    }

    if(typeof(pendingBilling)==='string'){
      showToastMessageError(pendingBilling);
    }else{
      setTotalPendingBillingPjr(pendingBilling);
    }
  }

  let filterElemnts = <div className="flex gap-x-4 justify-end items-center">
                <div>
                  <DateRangePicker 
                    className='mt-2'
                    placeholder='Seleccione un rango de fechas'
                    onValueChange={(e) => {
                      setRangeDate(e);
                      if(e.from && e.to){
                        handleDate(e.from, e.to);
                      }
                    }}
                    value={rangeDate}
                    locale={es}
                  />
                </div>
              </div>;

  const titles:string[]=[];
  const values: number[] = [];

  Array.isArray(totalCollectionsClients) && totalCollectionsClients?.map((prj) => {
    titles.push(prj.client);
    values.push(prj.fullyCharged);
  });

  const totalInvoiceClient: DonutChartJS = {
    labels: titles,
    datasets: [
      {
        label: 'Proyectos',
        data: values,
        backgroundColor:[ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'],
        hoverOffset: 4
      }
    ]
  };

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const colorRandom = getRandomInt(10);

  const dataCollectionProjects: OptionsDashboard[] = [];
  
  Array.isArray(totalCollectionsProjects) && totalCollectionsProjects.map((prj) => {
    dataCollectionProjects.push({
      cobro: prj.fullyCharged,
      label: prj.project
    });
  });

  const dataPendingProyect: DataPendingProject[] = [];
  Array.isArray(totalAccountByPrjRes) && totalAccountByPrjRes.map((prj) => {
    dataPendingProyect.push({
      label: prj.project,
      "POR COBRAR": prj.pendingPayment || 0,
      "POR FACTURAR": prj.pendingBilling
    });    
  });

  const groupedByClient = totalAccountByCliRes?.reduce((acc: any, prj) => {
        const client = prj.client;
        (acc[client] = acc[client] || []).push(prj);
        return acc;
    }, {});
  
  const resultArray: ITotalAccountReceivablesByClientResumen[][] = Object.values(groupedByClient);

  const resParse = transformProjectsTypesToDataChart(resultArray, totalEstimatesPendingCli);

  return (
    <>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">COBRANZA </p>
        </div>
        <div className="flex items-center gap-x-3 justify-end">
          {filterElemnts}
          {satCompany && (
            <PDFDownloadLink document={<DownloadPendingCollectionsPDF collections={totalAccountByPrjRes} token={token} 
                  pendingBilling={Array.isArray(totalPendingBillingPjr) && totalPendingBillingPjr.length > 0? totalPendingBillingPjr[0]?.acumPendingBilling: 0} 
                  pendingPayment={Array.isArray(totalPending) && totalPending.length > 0? totalPending[0].total: 0} 
                  date={rangeDate?.to?.toISOString().substring(0, 10) || ''} satCompany={satCompany} 
                  totalProjects={totalPaymentByDate.length > 0? totalPaymentByDate[0].total: 0} />} 
                fileName={`Cobranza pendiente por proyecto ${rangeDate.from?.toISOString().substring(0, 10)}-${rangeDate.to?.toISOString().substring(0, 10)}`} >
              {({loading, url, error, blob}) => 
                loading? (
                  <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                ) : (
                  <TooltipContainerIcon label="Descargar PDF">
                    <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                  </TooltipContainerIcon>
                ) }
            </PDFDownloadLink>
          )}

          {satCompany && (
            <PDFDownloadLink document={<DownloadPendingCollectionsByClientPDF collections={totalAccountByCliRes} 
              token={token} satCompany={satCompany} 
                  pendingBilling={totalPendingBillingPjr.length > 0? totalPendingBillingPjr[0].acumPendingBilling: 0} 
                  pendingPayment={totalPending.length > 0? totalPending[0].total: 0} 
                  date={rangeDate?.to?.toISOString().substring(0, 10) || ''} 
                  totalProjects={totalPaymentByDate.length > 0? totalPaymentByDate[0].total: 0} />} 
                fileName={`Cobranza pendiente por cliente ${rangeDate.from?.toISOString().substring(0, 10)}-${rangeDate.to?.toISOString().substring(0, 10)}`} >
              {({loading, url, error, blob}) => 
                loading? (
                  <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                ) : (
                  <TooltipContainerIcon label="Descargar PDF">
                    <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                  </TooltipContainerIcon>
                ) }
            </PDFDownloadLink>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3 mt-3">
        <Card amount={ Array.isArray(totalPaymentByDate) && totalPaymentByDate.length > 0? totalPaymentByDate[0].total: 0 } title="TOTAL PAGADO">
          <BsCash className="w-6 h-6 text-slate-600" />
        </Card>
        <Card amount={ Array.isArray(totalPending) && totalPending.length > 0? totalPending[0]?.total?? 0: 0 } title="POR COBRAR">
          <BsCash className="w-6 h-6 text-slate-600" />
        </Card>
        <Card amount={ Array.isArray(totalPendingBillingByPrj) && totalPendingBillingPjr.length > 0? totalPendingBillingPjr[0]?.acumPendingBilling?? 0: 0 } title="POR FACTURAR">
          <BsCash className="w-6 h-6 text-slate-600" />
        </Card>
      </div> 
      
      <div className="mt-5 md:flex items-center gap-x-3">
        <div className="md:w-1/2 lg:w-4/6">
          <Label>SALDOS PENDIENTES POR PROYECTO</Label>
          <div className="mt-3">
            <BarChartComponent 
              colors={['red', 'blue']}
              categories={['POR COBRAR', 'POR FACTURAR']}
              data={dataPendingProyect}
            />
          </div>
        </div>
        <div className="mt-3 md:mt-0 md:w-1/2 lg:w-2/6">
          <Label>SALDOS PENDIENTES POR CLIENTE</Label>
          <div className="mt-3">
            <BarChartTwoInOneCollections 
              data={resParse}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-5 md:flex items-center gap-x-3">
        <div className="md:w-1/2 lg:w-4/6">
          <Label>COBRANZA POR PROYECTO</Label>
          <div className="mt-3">
            <BarChartComponent 
              colors={[colors[colorRandom]]}
              categories={['cobro']}
              data={dataCollectionProjects}
            />
          </div>
        </div>
        <div className="mt-3 md:mt-0 md:w-1/2 lg:w-2/6">
          <Label>COBRANZA X CLIENTE</Label>
          <div className="mt-3 w-full max-w-96">
            <NewDonutChartComponent data={totalInvoiceClient} />
          </div>
        </div>
      </div>
    </>
  )
}

export const Card = ({amount, title, children}: {title:string, amount:number, children:JSX.Element}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      {children}
      <div>
        <p className="text-slate-600">{title}</p>
        <p className="text-xl font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: amount
        })}</p>
      </div>
    </div>
  )
}