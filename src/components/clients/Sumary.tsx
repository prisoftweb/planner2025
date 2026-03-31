import { ITotalProjectsByClient, ITotalCollectionsByClient, ITotalPendingBillingByClient, 
  ITotalPaymentClient } from "@/interfaces/Clients";
import { ChatBubbleBottomCenterIcon, CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MoneyFormatter } from "@/app/functions/Globals";
import { FcBusiness } from "react-icons/fc";
import { BsCashCoin } from "react-icons/bs";
import { PiInfoThin } from "react-icons/pi";
import { MdAccountBalanceWallet } from "react-icons/md";

export default function Sumary({totalprj, totalColl, totalPenBil, totalpay}: 
  {totalprj:ITotalProjectsByClient, totalColl:ITotalCollectionsByClient, 
    totalPenBil:ITotalPendingBillingByClient, totalpay:ITotalPaymentClient[]}){

  return(
    <div className="w-full sm:max-w-md bg-white rounded-lg shadow-md md:pl-2 px-3">
      <div className="flex flex-wrap gap-y-3 p-3">
        {/* <div className="w-72 p-1">
          <div className="bg-white p-3 shadow-lg shadow-slate-600 mt-2 rounded-xl">
            <p>PROYECTOS</p>
            <div className="flex items-center text-2xl sm:text-4xl my-2">
              <div className="bg-sky-700 p-2 mr-5 text-white rounded-lg">
                <ChatBubbleBottomCenterIcon className="w-8 h-8" />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sky-700 text-2xl">{totalprj?.projects?? 0}</p>
                <p className="text-sky-700">{MoneyFormatter(totalprj?.totalAmountTotal?? 0)}</p>
              </div>
            </div>
            <div className="inline">
              <Link href={""} className="">
                <p className="inline mr-2 text-blue-500 text-xs">Ver detalles</p>
              </Link>
              <p className="inline text-xs">de historial de proyectos</p>
            </div>
          </div> */}
        {/* </div>         
        </div>*/}
        <NewCardDashboard colorIcon="bg-sky-300" text1={totalprj?.projects || 0} text2={MoneyFormatter(totalprj?.totalAmountTotal || 0)} 
            title="Proyectos" styleT1="text-xl text-sky-300 font-bold" styleT2="text-lg text-red-500 font-bold"> 
          <FcBusiness className="w-6 h-6 text-white" />
        </NewCardDashboard>
        {/* <div className="w-72 p-1">
          <Card p1="PAGADO" p2={totalpay.length > 0 ? MoneyFormatter(totalpay[0]?.totalCharged?? 0) : 
            MoneyFormatter(0)} 
            p3={`de cuentas pagadas`} color="text-purple-600"
            link="" >
              <BsCashCoin className="w-8 h-8 text-purple-600" />
          </Card>
        </div> */}
        <NewCardDashboard colorIcon="bg-purple-600" text1={totalpay.length > 0 ? MoneyFormatter(totalpay[0]?.totalCharged?? 0) : 
          MoneyFormatter(0)} text2={""} 
            title="PAGADO" styleT1="text-xl text-purple-600 font-bold" styleT2="text-lg text-red-500 font-bold"> 
          <BsCashCoin className="w-6 h-6 text-white" />
        </NewCardDashboard>
        {/* <div className="w-72 p-1">
          <Card p1="POR COBRAR" p2={MoneyFormatter(totalColl?.pendingPayment)} 
            p3={`pendiente de cobrar`} color="text-red-600"
            link="" >
              <PiInfoThin className="w-8 h-8 text-red-600" />
          </Card>
        </div> */}
        <NewCardDashboard colorIcon="bg-red-600" text1={MoneyFormatter(totalColl?.pendingPayment)} text2={""} 
            title="POR COBRAR" styleT1="text-xl text-red-600 font-bold" styleT2="text-lg text-red-500 font-bold"> 
          <PiInfoThin className="w-6 h-6 text-white" />
        </NewCardDashboard>

        {/* <div className="w-72 p-1">
          <Card p1="POR FACTURAR" p2={MoneyFormatter(totalPenBil?.pendingEstimated?? 0)} 
            p3={`por facturar`} color="text-yellow-500"
            link="" >
              <MdAccountBalanceWallet className="w-8 h-8 text-yellow-500" />
          </Card>
        </div> */}
        <NewCardDashboard colorIcon="bg-yellow-500" text1={MoneyFormatter(totalPenBil?.pendingEstimated?? 0)} text2={""} 
            title="POR FACTURAR" styleT1="text-xl text-yellow-500 font-bold" styleT2="text-lg text-red-500 font-bold"> 
          <MdAccountBalanceWallet className="w-6 h-6 text-white" />
        </NewCardDashboard>
      </div>
    </div>
  )
}

export function Card({link, p1, p2, p3, children, color}: 
  {children:JSX.Element, link:string, p1:string, p2:string, p3:string, color:string}) {
  return(
    <div className="bg-white p-3 shadow-lg shadow-slate-600 mt-2 rounded-xl">
      <p>{p1}</p>
      <div className="flex items-center text-2xl sm:text-4xl my-2">
        <div className="bg-sky-700 p-2 mr-5 text-white rounded-lg">
          {children}
        </div>
        <p className={``}>{p2}</p>
      </div>
      <div className="inline">
        <Link href={link} className="">
          <p className="inline mr-2 text-blue-500 text-xs">Ver detalles</p>
        </Link>
        <p className="inline text-xs">{p3}</p>
      </div>
    </div>
  )
}

export function NewCardDashboard ({title, children, text1, text2, styleT1, styleT2, colorIcon}: 
    {title: string, children: React.JSX.Element, text1: string| number, text2: string| number, 
      styleT1: string, styleT2: string, colorIcon: string}){
  return(
    <div className="w-full border border-slate-300 bg-white rounded-xl p-3 h-full">
      <div className="flex gap-x-2 items-center">
        <div className={`rounded-full p-2 ${colorIcon}`}>
          {children}
        </div>
        <div className="w-full">
          <p className='text-xs text-slate-600 mt-2 px-2 font-semibold'>{title}</p>
          <div className="flex items-center justify-between mt-1">
            <p className={`${styleT1}`}>{text1}</p>
            <p className={`${styleT2}`}>{text2}</p>
          </div>
        </div>
      </div>
    </div>
  )
}