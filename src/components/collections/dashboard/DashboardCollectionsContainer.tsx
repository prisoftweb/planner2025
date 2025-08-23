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
  ITotalPaymentByDateAndStatus, ITotalPendingByDateAndStatus, ITotalAccountReceivablesByProjectResumen, 
  ITotalAccountReceivablesByClientResumen, ITotalEstimatesPendingByProject, ITotalEstimatesPendingByClient,
  IAllTOTALPENDINGPAYMENTSByProject, IAllsProjectsMINAndNEConditionANDNoExistsEstimate } from "@/interfaces/Invoices";
import { BarChartComponent } from "@/components/projects/dashboard/BarChartComponent";
import { getTotalAccountReceivablesByProject, getTotalAccountReceivablesByClient, 
  getTotalAccountReceivablesPaymentByDateAndStatus, getTotalAccountReceivablesPendingByDateAndStatus, 
  getTotalAccountReceivablesByProjectResumen, getTotalAccountReceivablesByClientResumen, 
  getTotalEstimatesPendingByProject, getTotalEstimatesPendingByClient, 
  getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN, 
  getAllTOTALPENDINGPAYMENTSByProjectMINRESUME } from "@/app/api/routeInvoices";
import { showToastMessageError } from "@/components/Alert";
import { BsCash } from "react-icons/bs";
import { IAmountTotalGuaranteesByDateAndStatus } from "@/interfaces/Guarantee";
import { getTotalGuaranteesByDateAndStatus } from "@/app/api/routeGuarantee";
import { BarChartTwoInOneCollections } from "./BarChartTwoInOneCollections";

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
  console.log('dataCollections => ', dataCollections);

  console.log('pendingCli => ', pendingCli);

  for (let i = 0; i < dataCollections.length; i++) {
    const cli = pendingCli.find((cli) => cli.c === dataCollections[i][0].client);
    if(cli){
      console.log('cli => ', cli);
      dataCollections[i].push({
        client: cli.client,
        pendingPayment: cli.pendingEstimated,
        type: "FACTURADO POR ESTIMAR",
        quantity: cli.pendingEstimated
      });
    }
  }

  console.log('new dataCollections => ', dataCollections);

  dataCollections.map((arrData) => {
    const r: Issue[] = [];
    arrData.map((prj) => {
      // const cli = pendingCli.find((cli) => cli.client === prj.client);
      r.push({
        percentage: 22,
        status: prj.type,
        value: prj.pendingPayment
      });
    });
    res.push({
      client: arrData[0].client,
      issues: r,
    });
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

type DataPendingClient = {
  label: string,
  "FACTURADO POR PAGAR": number,
  "FACTURADO POR ESTIMAR": number,
}

export default function DashboardCollectionsContainer({token, user, totalClients, totalProjects, totalPay, 
  totalPen, resC, toalPrjRes, toalCliRes, totalEstimatesPen, totalEstimatesCli}: 
  {token:string, user:string, totalProjects: ITotalInvoicesByProjectDashboardCollection[], 
    totalClients: ITotalInvoiceByClient[], totalPay: ITotalPaymentByDateAndStatus[], 
    totalPen: ITotalPendingByDateAndStatus[], resC: IAmountTotalGuaranteesByDateAndStatus, 
    toalPrjRes: IAllTOTALPENDINGPAYMENTSByProject[], toalCliRes: ITotalAccountReceivablesByClientResumen[], 
    totalEstimatesPen: IAllsProjectsMINAndNEConditionANDNoExistsEstimate[], totalEstimatesCli: ITotalEstimatesPendingByClient[]}) {

  const [totalCollectionsProjects, setTotalCollectionsProjects]=useState<ITotalInvoicesByProjectDashboardCollection[]>(totalProjects);
  const [totalCollectionsClients, setTotalCollectionsClients]=useState<ITotalInvoiceByClient[]>(totalClients);
  const [totalPaymentByDate, setTotalPaymentByDate]=useState<ITotalPaymentByDateAndStatus[]>(totalPay);
  const [totalPending, setTotalPending]=useState<ITotalPendingByDateAndStatus[]>(totalPen);
  const [widthPage, setWidthPage] = useState<number>(900);
  const [porCobrar, setPorCobrar]=useState<IAmountTotalGuaranteesByDateAndStatus>(resC);
  const [totalAccountByPrjRes, setTotalAccountByPrjRes]=useState<IAllTOTALPENDINGPAYMENTSByProject[]>(toalPrjRes);
  const [totalAccountByCliRes, setTotalAccountByCliRes]=useState<ITotalAccountReceivablesByClientResumen[]>(toalCliRes);
  const [totalEstimatesPending, setTotalEstimatesPending] = useState<IAllsProjectsMINAndNEConditionANDNoExistsEstimate[]>(totalEstimatesPen);
  const [totalEstimatesPendingCli, setTotalEstimatesPendingCli] = useState<ITotalEstimatesPendingByClient[]>(totalEstimatesCli);


  console.log('total parameter => ', totalEstimatesPen);
  // const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
  //   from: new Date('2024-01-01'),
  //   to: new Date('2025-04-30'),
  // });
  
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleResize = () => {
    setWidthPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  // useEffect(() => {
  //   updateTotal(getDate(rangeDate?.from ?? new Date('2024-01-01')),
  //               getDate(rangeDate?.to ?? new Date('2025-04-30')),
  //               ["6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5", "6840deda0c901d22c05dead1"]);
  // }, []);

  const handleDate = (dateI: Date, dateF: Date) => {
    //actualizar total con el rango de fechas
    // updateTotal(getDate(dateI), getDate(dateF), statuses);
    updateDashboard(getDate(dateI), getDate(dateF));
  }

  // const addStatus = (status:string) => {
  //   const newStatus = [...statuses, status];
  //   setStatuses(newStatus);
  //   if(rangeDate.from && rangeDate.to){
  //     handleFilter(rangeDate.from, rangeDate.to, newStatus);
  //   }else{
  //     showToastMessageError('Seleccione un rango de fechas para filtrar');
  //   }
  // }

  // const deleteStatus = (status:string) => {
  //   const newStatus = statuses.filter((s) => s !== status);
  //   setStatuses(newStatus);
  //   if(rangeDate.from && rangeDate.to){
  //     handleFilter(rangeDate.from, rangeDate.to, newStatus);
  //   }else{
  //     showToastMessageError('Seleccione un rango de fechas para filtrar');
  //   }
  // }

  // const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
  //   updateTotal(getDate(dateS), getDate(dateE), arrStatuses);
  // }

  const updateDashboard = async (dateI:string, dateF:string) => {

    let totalPrjs: ITotalInvoicesByProjectDashboardCollection[] =  await getTotalAccountReceivablesByProject(token, dateI, dateF);
    let totalClis: ITotalInvoiceByClient[] = await getTotalAccountReceivablesByClient(token, dateI, dateF);
    let totalPay: ITotalPaymentByDateAndStatus[] = await getTotalAccountReceivablesPaymentByDateAndStatus(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
    let totalPen: ITotalPendingByDateAndStatus[] = await getTotalAccountReceivablesPendingByDateAndStatus(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
    const resCob = await getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'POR COBRAR');
    const resTotCli: ITotalAccountReceivablesByClientResumen[] = await getTotalAccountReceivablesByClientResumen(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
    const resEstPen: IAllsProjectsMINAndNEConditionANDNoExistsEstimate[] = await getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
    const resEstCli: ITotalEstimatesPendingByClient[] = await getTotalEstimatesPendingByClient(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
    const resTotPenPjr: IAllTOTALPENDINGPAYMENTSByProject[] = await getAllTOTALPENDINGPAYMENTSByProjectMINRESUME(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());

    const [totprj, totcli, totPay, totPen, resCobrar, totalCliRes, totEstPen, totEstPenCli, totalPenPayPjr] = await Promise.all([
      totalPrjs, totalClis, totalPay, totalPen, resCob, resTotCli, resEstPen, resEstCli, resTotPenPjr
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

    if(typeof(resCobrar)==='string'){
      showToastMessageError(resCobrar);
    }else{
      setPorCobrar(resCobrar[0]);
    }

    if(typeof(totalCliRes)==='string'){
      showToastMessageError(totalCliRes);
    }else{
      setTotalAccountByCliRes(totalCliRes);
    }

    if(typeof(totEstPen)==='string'){
      showToastMessageError(totEstPen);
    }else{
      setTotalEstimatesPending(totEstPen);
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
  }

  let filterElemnts = <div className="flex gap-x-4 justify-end items-center">
                {/* <ChipStatus id="6827d56d936cac5913f94ad5" addStatus={addStatus} removeStatus={deleteStatus} title="Vencidos" />
                <ChipStatus id="6827d64a936cac5913f94ad9" addStatus={addStatus} removeStatus={deleteStatus} title="Por cobrar" />
                <ChipStatus id="6827d5c2936cac5913f94ad7" addStatus={addStatus} removeStatus={deleteStatus} title="Recuperado" />
                <ChipStatus id="6827d67b936cac5913f94adb" addStatus={addStatus} removeStatus={deleteStatus} title="Programado" />
                <ChipStatus id="6840deda0c901d22c05dead1" addStatus={addStatus} removeStatus={deleteStatus} title="Retenido" /> */}
                <div>
                  {/* <Label htmlFor='date'>Fecha</Label> */}
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

  // const DataGuaranteesClient = [];
  const titles:string[]=[];
  const values: number[] = [];

  totalCollectionsClients.map((prj) => {
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
  
  totalCollectionsProjects.map((prj) => {
    dataCollectionProjects.push({
      cobro: prj.fullyCharged,
      label: prj.project
    });
  });

  console.log('tot estiamtes exist => ', totalEstimatesPending);
  console.log('totalAccountByPrjRes => ', totalAccountByPrjRes);
  const dataPendingProyect: DataPendingProject[] = [];
  // console.log('totalAccountByPrjRes => ', totalAccountByPrjRes);
  // console.log('totalEstimatesPending => ', totalEstimatesPending);
  totalAccountByPrjRes.map((prj) => {
    // const prjCB = prjControlBudgeted.find((pr) => pr.title === prj.title);
    // const prjS = prjSpent.find((pr) => pr.title === prj.title);
    // const prjP = prjPayments.find((pr) => pr.project === prj.title);

    const prjEst = totalEstimatesPending.find((pr) => pr.project === prj.project);

    console.log('pjr est => ', prjEst);
    
    // console.log('pjr pending => ', prj.pendingPayment);
    dataPendingProyect.push({
      label: prj.project,
      "POR COBRAR": prj.pendingPayment || 0,
      // "POR FACTURAR": prjEst ? prjEst.pendingPayment : 0
      "POR FACTURAR": prj.pendingBilling
    });    
  });
  // console.log('dataPendingProyect => ', dataPendingProyect);

  const groupedByClient = toalCliRes.reduce((acc: any, prj) => {
        const client = prj.client;
        (acc[client] = acc[client] || []).push(prj);
        return acc;
    }, {});

  // console.log('total cli => ', toalCliRes);
  // console.log('Grouped by client:', groupedByClient);
  
  const resultArray: ITotalAccountReceivablesByClientResumen[][] = Object.values(groupedByClient);

  console.log('Result array:', resultArray);

  const resParse = transformProjectsTypesToDataChart(resultArray, totalEstimatesPendingCli);

  console.log('resParse => ', resParse);

  resParse

  return (
    <>
      <div className="grid grid-cols-3 gap-x-3">
        <Card amount={ totalPaymentByDate.length > 0? totalPaymentByDate[0].total: 0 } title="TOTAL PAGADO">
          <BsCash className="w-6 h-6 text-slate-600" />
        </Card>
        <Card amount={ totalPending.length > 0? totalPending[0].total: 0 } title="POR COBRAR">
          <BsCash className="w-6 h-6 text-slate-600" />
        </Card>
        <Card amount={ porCobrar?.total || 0 } title="FONDO DE GARANTIA POR COBRAR">
          <BsCash className="w-6 h-6 text-slate-600" />
        </Card>
      </div> 
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">COBRANZA </p>
        </div>
        {filterElemnts}
      </div>
      {/* {widthPage > 1080 && filterElemnts} */}
      <div className="mt-5 flex items-center gap-x-3">
        <div className="w-4/6">
          <Label>SALDOS PENDIENTES POR PROYECTO</Label>
          <div className="mt-3">
            <BarChartComponent 
              colors={['red', 'blue']}
              categories={['POR COBRAR', 'POR FACTURAR']}
              data={dataPendingProyect}
            />
          </div>
        </div>
        <div className="w-2/6">
          <Label>SALDOS PENDIENTES POR CLIENTE</Label>
          <div className="mt-3">
            <BarChartTwoInOneCollections 
              data={resParse}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-5">
        {/* <div>
          <Label>SALDOS PENDIENTES POR PROYECTO</Label>
          <div className="mt-3">
            <BarChartComponent 
              colors={['red', 'blue']}
              categories={['FACTURADO POR COBRAR', 'FACTURADO POR ESTIMAR']}
              data={dataPendingProyect}
            />
          </div>
        </div>
        <div>
          <Label>SALDOS PENDIENTES POR CLIENTE</Label>
          <div className="mt-3">
            <BarChartTwoInOneCollections 
              data={resParse}
            />
          </div>
        </div> */}
        <div>
          <Label>COBRANZA POR PROYECTO</Label>
          <div className="mt-3">
            <BarChartComponent 
              colors={[colors[colorRandom]]}
              categories={['cobro']}
              data={dataCollectionProjects}
            />
          </div>
        </div>
        <div>
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

function getDate(date: Date){
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`;
  }else{
    return `${year}-${month}-${day}`;
  }
}