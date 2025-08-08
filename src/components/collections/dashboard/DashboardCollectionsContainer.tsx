'use client'

import { useState, useEffect } from "react"
import { CurrencyFormatter } from "@/app/functions/Globals";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import { IGuaranteeGroupByClient } from "@/interfaces/Guarantee";
// import NewDonutChartComponent from "../projects/dashboard/NewDonutChartComponent";
import NewDonutChartComponent from "@/components/projects/dashboard/NewDonutChartComponent";
import { DonutChartJS } from "@/interfaces/DashboardProjects";
import Label from "@/components/Label";
import { ITotalInvoiceByClient, ITotalInvoicesByProject } from "@/interfaces/Invoices";
import { BarChartComponent } from "@/components/projects/dashboard/BarChartComponent";

interface OptionsDashboard {
  label: string,
  cobro: number
}

export default function DashboardCollectionsContainer({token, user, totalClients, totalProjects}: 
  {token:string, user:string, totalProjects: ITotalInvoicesByProject[], totalClients: ITotalInvoiceByClient[]}) {

  // const [guaranteesByClient, setGuaranteesByClient]=useState<IGuaranteeGroupByClient[]>([]);
  
  const [widthPage, setWidthPage] = useState<number>(900);

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

  // const updateTotal = async (dateI:string, dateF:string, arrStatuses:string[]) => {

  //   const res = await getGuaranteesResumeByProjectMin(token, dateI, dateF, arrStatuses);
  //   if(typeof(res)==='string'){
  //     showToastMessageError(res);
  //   }else{
  //     setGuarantees(res);
  //     setFilteredGuarantees(res);
  //   }

  //   const resTotal = await getGuaranteesGroupByStatus(token, dateI, dateF, arrStatuses);
  //   if(typeof(resTotal)==='string'){
  //     showToastMessageError(resTotal);
  //   }else{
  //     setAmountTotalByStatuses(resTotal);
  //   }

  //   const resCobrar = await getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'POR COBRAR');
  //   if(typeof(resCobrar)==='string'){
  //     showToastMessageError(resCobrar);
  //   }else{
  //     setPorCobrar(resCobrar[0]);
  //   }

  //   const resRecuperado = await getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'RECUPERADO');
  //   if(typeof(resRecuperado)==='string'){
  //     showToastMessageError(resRecuperado);
  //   }else{
  //     setRecuperar(resRecuperado[0]);
  //   }

  //   const guaranteesClient = await getGuaranteesGroupByClientAndDateAndStatus(token, dateI, dateF, arrStatuses);
  //   if(typeof(guaranteesClient)==='string'){
  //     showToastMessageError(guaranteesClient);
  //   }else{
  //     setGuaranteesByClient(guaranteesClient);
  //   }

  //   const guaranteesYear = await getGuaranteesGroupByYear(token, dateI, dateF, arrStatuses);
  //   if(typeof(guaranteesYear)==='string'){
  //     showToastMessageError(guaranteesYear);
  //   }else{
  //     setGuaranteeByYear(guaranteesYear);
  //   }

  //   const guaranteebyStatus = await getAllTOTALGuaranteeFundsResumeByDateAndStatus(token, dateI, dateF, arrStatuses);
  //   if(typeof(guaranteebyStatus)==='string'){
  //     showToastMessageError(guaranteebyStatus);
  //   }else{
  //     setGuaranteeByStatus(guaranteebyStatus);
  //   }
  // }

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

  totalClients.map((prj) => {
    titles.push(prj.client);
    values.push(prj.totalBilled);
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
  
  totalProjects.map((prj) => {
    dataCollectionProjects.push({
      cobro: prj.totalBilled,
      label: prj.project
    });
  });

  return (
    <>
      {/* <div className="grid grid-cols-4 gap-x-3">
        <Card amount={guaranteeByStatus?.guarantee?.subtotal || 0} title="FONDO DE GARANTIA" />
        <div className="p-3 gap-x-3 col-span-3 grid grid-cols-5 bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Recuperado</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: recuperar?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Por cobrar</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: porCobrar?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Vencido</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: vencido?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Retenido</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: retenido?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Programado</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: programado?.total || 0
            })}</p>
          </div>
        </div>
      </div> */}
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">COBRANZA </p>
        </div>
      </div>
      {widthPage > 1080 && filterElemnts}
      <div className="mt-5 grid grid-cols-2 gap-x-5">
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
          <div className="mt-3">
            <NewDonutChartComponent data={totalInvoiceClient} />
          </div>
        </div>
      </div>
    </>
  )
}

export const Card = ({amount, title}: {title:string, amount:number}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      {/* {children} */}
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