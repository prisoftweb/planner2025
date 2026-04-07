'use client'

import { es } from "date-fns/locale"
import { BarChartComponent } from "@/components/projects/dashboard/BarChartComponent"
import { CostsByProvider, ProviderWithTradeLine, TotalCostsByProvidersTradeLine, 
  TotalPayments, ITotalCostPendingPaymentByProviderEstatusMIN, ITotalCostPaymentProvider } from "@/interfaces/DasboardProviders";
import { TableDashboardProviders, ITotalPendingPaymentProvider } from "@/interfaces/DasboardProviders";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import CardDashboardProvider from "./CardDashboardProvider";
import Chip from "../Chip";
import { GrServices } from "react-icons/gr";
import { TbBrandCashapp } from "react-icons/tb";
import { BsReceiptCutoff } from "react-icons/bs";
import { LuTicket } from "react-icons/lu";
import { MoneyFormatter } from "@/app/functions/Globals";
import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import { useState } from "react";
import { getTotalPendingPaymentsProvider, getAllCostsGroupByPROVIDERWithoutTRADELINE, 
  getAllCostsTOTALGroupByPROVIDERTRADELINE, getAllProvidersWithTradeLine, 
  getTotalPayments, getTotalCostPendingPaymentByProviderEstatusMIN, 
  getTotalCostPendingPaymentByProvidersMIN, getTotalCostApplyPaymentByProvidersTradelineMIN } from "@/app/api/routeDashboardProviders";
import { showToastMessageError } from "@/components/Alert";
import IconText from "../IconText";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { LineChartComponent } from "@/components/projects/dashboard/LineChartComponent";
import { DonutPendingPaymentProvidersChartComponent } from "@/components/projects/dashboard/DonutChartComponent";

interface OptionsBarChart {
  label: string,
  costo: number
}

interface OptionsDashboardStatus {
  label: string,
  percentaje: number
  total: number,
  // count: number
}

type DashProps={
  totalCost: ITotalCostPaymentProvider[], 
  providersTradeLine: ITotalCostPendingPaymentByProviderEstatusMIN[], 
  costsProviderWithTradeLine: CostsByProvider[], 
  costsProvider: CostsByProvider[], 
  // data: TableDashboardProviders[], 
  totalPayments: TotalPayments,
  pendingPay: ITotalPendingPaymentProvider[],
  pendingPayProv: ITotalCostPendingPaymentByProviderEstatusMIN[],
  token:string
}

export default function DashboardContainer({costsProvider, costsProviderWithTradeLine, 
  providersTradeLine, totalCost, totalPayments, pendingPay, token, pendingPayProv}: DashProps) {

  const [pendingPaymentProv, setPendingPaymentProv] = useState<ITotalPendingPaymentProvider[]>(pendingPay);
  const [totalPendingPayment, setTotalPendingProvider] = useState<ITotalCostPendingPaymentByProviderEstatusMIN[]>(providersTradeLine);
  const [totalPendingPaymentCircle, setTotalPendingProviderCicle] = useState<ITotalCostPendingPaymentByProviderEstatusMIN[]>(pendingPayProv);
  const [totalCostProviderState, setTotalCostProviderState] = useState<ITotalCostPaymentProvider[]>(totalCost);

  console.log('providers list => ', providersTradeLine);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  // const pendingText = MoneyFormatter(totalCost[0].totalCost);
  const totalPaymentsProv = MoneyFormatter(totalPayments.totalPayout);

  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const dataProvidersTradeLine: OptionsBarChart[] = [];
  const categoriesProvidersTradeline: string[] = [];

  costsProviderWithTradeLine.map((prov) => {
    dataProvidersTradeLine.push({
      costo: prov.totalCost,
      label: prov.provider
    });
    categoriesProvidersTradeline.push(prov.provider);
  });

  const dataAllProviders: OptionsBarChart[] = [];
  const categoriesAllProviders: string[] = [];

  costsProvider.map((prov) => {
    dataAllProviders.push({
      costo: prov.totalCost,
      label: prov.provider
    });
    categoriesAllProviders.push(prov.provider);
  });

  const fetchData = async (dateS: string, dateE: string) => {
    // const data = await getTotalPendingPaymentsProvider(token, dateS, dateE);
    // if(typeof(data) !== 'string'){
    //   setPendingPaymentProv(data);
    // }else{
    //   showToastMessageError(data);
    // }

    const [totalCost, providersTradeLine, costsProviderWithTradeLine, costsProvider, 
          totalPayments, penddingPayment, penddingPaymentProv] = await Promise.all([
        getTotalCostApplyPaymentByProvidersTradelineMIN(token, dateS, dateE),
        // getAllProvidersWithTradeLine(token),
        getTotalCostPendingPaymentByProviderEstatusMIN(token, dateS, dateE),
        getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'true', dateS, dateE),
        getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'false', dateS, dateE),
        getTotalPayments(token),
        getTotalPendingPaymentsProvider(token, dateS, dateE),
        getTotalCostPendingPaymentByProvidersMIN(token, dateS, dateE)
      ]);

    if(typeof(totalCost)==='string'){
      showToastMessageError(totalCost);
    }else{
      setTotalCostProviderState(totalCost);
    }
  
    if(typeof(providersTradeLine)==='string'){
      showToastMessageError(providersTradeLine);
    }else{
      setTotalPendingProvider(providersTradeLine);
    }
  
    if(typeof(costsProviderWithTradeLine)==='string'){
      showToastMessageError(costsProviderWithTradeLine);
    }
  
    if(typeof(costsProvider)==='string'){
      showToastMessageError(costsProvider)
    }
  
    // if(typeof(totalPayments)==='string'){
    //   showToastMessageError(totalPayments)
    // }
  
    if(typeof(penddingPayment)==='string'){
      showToastMessageError(penddingPayment);
    }else{
      setPendingPaymentProv(penddingPayment);
    }

    if(typeof(penddingPaymentProv)==='string'){
      showToastMessageError(penddingPaymentProv);
    }else{
      setTotalPendingProviderCicle(penddingPaymentProv);
    }
  }

  const dataPendingPayment: OptionsDashboardStatus[] = [];
  const categoriesPending: string[] = [];

  totalPendingPaymentCircle.map((prj) => {
    dataPendingPayment.push({
      percentaje: prj.porcentageTotal,
      label: prj.provider,
      total: prj.totalPendingPayment
    });
    categoriesPending.push(prj.provider);
  });

  return (
    <>
      <div className="flex justify-end">
        <DateRangePicker 
          className='mt-2'
          placeholder='Seleccione un rango de fechas'
          onValueChange={(e) => {
            setRangeDate(e);
            if(e.from && e.to){
              fetchData(getDate(e.from), getDate(e.to));
            }
          }}
          value={rangeDate}
          locale={es}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3 mt-2">
        <div className="p-1 bg-white">
          <CardDashboardProvider p1={'TOTAL PAGADO'} 
            p2={totalCostProviderState?.length > 0? MoneyFormatter(totalCostProviderState[0].cosTotal): '0'} p3="intereses cobrados de un % de la decuda vencida"
            link="" textColor="text-blue-700" textLink="Ver detalles" valueTooltip={true} >
              <LuTicket className="w-8 h-8" />
          </ CardDashboardProvider>
        </div>
        
        <div className="p-1 bg-white">
          <CardDashboardProvider p1={'TOTAL PROVEEDORES'} 
            p2={totalPendingPayment.length.toString()} p3="accede a ver los proveedores con credito"
            link="" textColor="text-violet-900" textLink="Ver aqui" >
              <GrServices className="w-8 h-8" />
          </CardDashboardProvider>
        </div>

        <div className="p-1 bg-white">
          {/* <CardDashboardProvider p1={'TOTAL CUENTAS POR PAGAR (CXP)'} 
            p2={pendingText } p3="Saldo actual calculado solo en facturas pendientes de pago"
            link="" textColor="text-blue-700	" textLink="Ver detalles" valueTooltip={true} >
              <TbBrandCashapp className="w-8 h-8" />
          </CardDashboardProvider> */}
          <CardDashboardProvider p1={'TOTAL CUENTAS POR PAGAR (CXP)'} 
            p2={ MoneyFormatter(pendingPaymentProv && pendingPaymentProv.length > 0? pendingPaymentProv[0].cosTotal: 0) } p3="Saldo actual calculado solo en facturas pendientes de pago"
            link="" textColor="text-blue-700	" textLink="Ver detalles" valueTooltip={true} >
              <TbBrandCashapp className="w-8 h-8" />
          </CardDashboardProvider>
        </div>

        <div className="p-1 bg-white">
          {/* <CardDashboardProvider p1={'FACTURAS POR PAGAR (CXP)'} 
            p2={totalCost[0].quantity.toString()} p3="s Consulta las facturas pendientes de pago de todos los proveedores"
            link="" textColor="text-emerald-300" textLink="Detalles" >
              <BsReceiptCutoff className="w-8 h-8" />
          </CardDashboardProvider> */}
          <CardDashboardProvider p1={'FACTURAS POR PAGAR (CXP)'} 
            p2={pendingPaymentProv && pendingPaymentProv.length > 0? pendingPaymentProv[0].quantity.toString(): '0'} p3="Consulta las facturas pendientes de pago de todos los proveedores"
            link="" textColor="text-emerald-300" textLink="Detalles" >
              <BsReceiptCutoff className="w-8 h-8" />
          </CardDashboardProvider>
        </div>
      </div>
      
      <div className="flex gap-x-5 flex-wrap lg:flex-nowrap">
        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5 mt-5 w-full lg:w-2/3">
          <h1>GASTOS CON PROVEEDORES</h1>
          <BarChartComponent categories={['costo']} colors={colors} data={dataAllProviders} />    
        </div>
        <div className="bg-white border w-full lg:w-1/3 border-slate-100 shadow-lg shadow-slate-500 p-5 mt-5">
          <h1>GASTOS CON PROVEEDORES CON CREDITO</h1>
          {/* <BarChartComponent categories={['costo']} colors={colors} data={dataProvidersTradeLine} />     */}
          <LineChartComponent colors={colors} dataProjectsTop={dataProvidersTradeLine} />
        </div>
      </div>

      <div className="flex gap-x-5 flex-wrap lg:flex-nowrap">
        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5 mt-5 w-full md:w-1/2 2xl:w-1/3">
          *<h1>SALDOS PENDIENTES DE PAGO</h1>
          <DonutPendingPaymentProvidersChartComponent data={dataPendingPayment} colors={colors} category="percentaje"
                      categories={categoriesPending}  />
        </div>

        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5 mt-5 w-full md:w-1/2 2xl:w-1/3">
          <h1>SALDOS DE PROVEEDORES PENDIENTES DE PAGAR</h1>
          {/* <TableDashboardProviderComponent data={data} />     */}
          <ListCardPendingPaymentProviders data={totalPendingPayment} />
        </div>
      </div>
    </>
  )
}

export function ListCardPendingPaymentProviders({data}: {data: ITotalCostPendingPaymentByProviderEstatusMIN[]}){
  
  return(
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
      <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-[calc(100vh-149px)]
          overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
        {data.map((prov, index:number) => (
          <div role="button"
            key={index}
            className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
              outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
              focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
              active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 `}
            // onClick={() => handleProjectSel(prj._id, prj.title)}
          >
            <div className="flex items-center w-full ">
              <div className="grid mr-4 place-items-center">
                {/* <img alt="responsable" src={ prj.photo? prj.photo : '/img/projects/default.svg'}
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
                <IconText size="h-12 w-12" text={prov.provider} sizeText="" />
              </div>
              <div className="w-full">
                <div className="flex gap-x-3 justify-between items-center w-full">
                  <h6
                    className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                    {prov.provider}
                  </h6>
                  <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: prov.totalPendingPayment
                    })}
                  </p>
                </div>
                <div className="flex gap-x-3 justify-between items-center w-full">
                  <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                  {prov.provider}
                  </p>
                  <Chip label={prov.condition.status} color={prov.condition.color}
                      darktext={prov?.condition?.darktext?? false} width="w-40" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </nav>
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