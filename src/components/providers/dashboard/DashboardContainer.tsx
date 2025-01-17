'use client'

import { BarChartComponent } from "@/components/projects/dashboard/BarChartComponent"
// import { getAllCostsGroupByPROVIDERWithoutTRADELINE, getAllCostsTOTALGroupByPROVIDERTRADELINE, getAllProvidersWithTradeLine } from "@/app/api/routeDashboardProviders";
import { CostsByProvider, ProviderWithTradeLine, TotalCostsByProvidersTradeLine, TotalPayments } from "@/interfaces/DasboardProviders";
// import { CurrencyFormatter } from "@/app/functions/Globals";
// import DonutChartProviderComponent from "./DonutChartProviderComponent";
import { TableDashboardProviders } from "@/interfaces/DasboardProviders";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import CardDashboardProvider from "./CardDashboardProvider";
// import { EnvelopeIcon, CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import Chip from "../Chip";
import { GrServices } from "react-icons/gr";
import { TbBrandCashapp } from "react-icons/tb";
import { BsReceiptCutoff } from "react-icons/bs";
import { LuTicket } from "react-icons/lu";
import { MoneyFormatter } from "@/app/functions/Globals";

interface OptionsDashboard {
  label: string,
  saldo: number
}

interface OptionsBarChart {
  label: string,
  costo: number
}

export default function DashboardContainer({costsProvider, costsProviderWithTradeLine, 
    providersTradeLine, totalCost, data, totalPayments}: 
  {totalCost: TotalCostsByProvidersTradeLine[], providersTradeLine: ProviderWithTradeLine[], 
    costsProviderWithTradeLine: CostsByProvider[], costsProvider: CostsByProvider[], data: TableDashboardProviders[], totalPayments: TotalPayments}) {

  let pending = 0;
  // let countProviders = 0;
  let totalPending = 0;
  providersTradeLine.map((p) => {
    // pending+=p.tradeline?.currentbalance? (p.tradeline?.creditlimit - p.tradeline?.currentbalance <= 0? 1: 0): 0;
    // countProviders+= p.tradeline?.currentbalance? (p.tradeline?.currentbalance > 0? 1: 0) : 0;
    // totalPending+= p.tradeline?.currentbalance? (p.tradeline?.creditlimit - p.tradeline?.currentbalance): 0
    pending+=p.tradeline?.currentbalance? (p.tradeline?.creditlimit - p.tradeline?.currentbalance): 0;
  })

  // const pendingText = CurrencyFormatter({
  //   currency: 'USD',
  //   // value: pending
  //   value: totalCost[0].totalCost
  // });

  const pendingText = MoneyFormatter(totalCost[0].totalCost);
  const totalPaymentsProv = MoneyFormatter(totalPayments.totalPayout);

  // const totalPendingText = CurrencyFormatter({
  //   currency: 'USD',
  //   value: totalPending
  // });

  // console.log('pending => ', pending);

  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  // const dataProvidersTradeLine: OptionsDashboard[] = [];
  // const categoriesProvidersTradeline: string[] = [];

  // providersTradeLine.map((prov) => {
  //   dataProvidersTradeLine.push({
  //     saldo: prov.tradeline?.currentbalance? prov.tradeline?.currentbalance: 0,
  //     label: prov.name
  //   });
  //   categoriesProvidersTradeline.push(prov.name);
  // });

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

  console.log('total cost => ', totalCost);

  return (
    <>
      {/* <div className="flex gap-x-4">
        <div className="shadow-md shadow-slate-500 p-2 bg-white">
          <p className="text-xl text-center font-bold">{providersTradeLine.length}</p>
          <p className="text-md text-center font-semibold">proveedores</p>
          <p className="text-md text-red-500 text-center font-semibold">{'Con credito >'}</p>
        </div>
        <div className="shadow-md shadow-slate-500 p-2 bg-white">
          <p className="text-xl text-center font-bold">CxP</p>
          <p className="text-md text-center font-semibold">{pendingText}</p>
          <p className="text-md text-red-500 text-center font-semibold">{'Por pagar >'}</p>
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3">
        <div className="p-1 bg-white">
          <CardDashboardProvider p1={'TOTAL PAGADO'} 
            p2={totalPaymentsProv} p3="intereses cobrados de un % de la decuda vencida"
            link="" textColor="text-blue-700" textLink="Ver detalles" valueTooltip={true} >
              <LuTicket className="w-8 h-8" />
          </ CardDashboardProvider>
        </div>
        
        <div className="p-1 bg-white">
          <CardDashboardProvider p1={'TOTAL PROVEEDORES'} 
            p2={providersTradeLine.length.toString()} p3="accede a ver los proveedores con credito"
            link="" textColor="text-violet-900" textLink="Ver aqui" >
              <GrServices className="w-8 h-8" />
          </CardDashboardProvider>
        </div>

        <div className="p-1 bg-white">
          <CardDashboardProvider p1={'TOTAL CUENTAS POR PAGAR (CXP)'} 
            p2={pendingText } p3="Saldo actual calculado solo en facturas pendientes de pago"
            link="" textColor="text-blue-700	" textLink="Ver detalles" valueTooltip={true} >
              <TbBrandCashapp className="w-8 h-8" />
          </CardDashboardProvider>
        </div>

        <div className="p-1 bg-white">
          <CardDashboardProvider p1={'FACTURAS POR PAGAR (CXP)'} 
            p2={totalCost[0].quantity.toString()} p3="s Consulta las facturas pendientes de pago de todos los proveedores"
            link="" textColor="text-emerald-300" textLink="Detalles" >
              <BsReceiptCutoff className="w-8 h-8" />
          </CardDashboardProvider>
        </div>
      </div>
      {/* <div className="mt-10 flex">
        <div className="bg-white w-1/2 border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>Por pagar</p>
          </div>
          <DonutChartProviderComponent data={dataProvidersTradeLine} colors={colors} category="saldo"
              categories={categoriesProvidersTradeline}  />
        </div>
        <div className="w-1/3"></div>
      </div> */}
      <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5 mt-3">
        <h1>SALDOS DE PROVEEDORES CON LINEA DE CREDITO</h1>
        <BarChartComponent categories={['costo']} colors={colors} data={dataProvidersTradeLine} />    
      </div>
      <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5 mt-5">
        <h1>SALDOS DE PROVEEDORES</h1>
        <BarChartComponent categories={['costo']} colors={colors} data={dataAllProviders} />    
      </div>

      <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5 mt-5">
        <h1>PROVEEDORES CUENTAS POR PAGAR (CXP)</h1>
        <TableDashboardProviderComponent data={data} />    
      </div>
    </>
  )
}


export function TableDashboardProviderComponent({data}: {data: TableDashboardProviders[]}){
  const columnHelper = createColumnHelper<TableDashboardProviders>();

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
    columnHelper.accessor('name', {
      id: 'Nombre',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >{row.original.name}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Nombre</p>
      )
    }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'RFC',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >{row.original.rfc}</p>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'Cuenta',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >{row.original.account}</p>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <>
          {row.original.status && 
            <Chip label={row.original.status.name? row.original.status.name: 'Sin estatus' } color={row.original.status.color} />}
        </>
      ),
    }),
    columnHelper.accessor('currentBalance', {
      header: 'Saldo actual',
      id: 'Saldo',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >
          {/* {CurrencyFormatter({
            currency: 'MXN',
            value: row.original.currentBalance
          })} */}
          {MoneyFormatter(row.original.currentBalance)}
        </p>
      ),
    }),
  ];

  return <Table columns={columns} data={data} placeH="Buscar proveedor.." />
}