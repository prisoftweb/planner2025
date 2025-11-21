import { ITotalProjectsByClient, ITotalCollectionsByClient, ITotalPendingBillingByClient } from "@/interfaces/Clients";
import { ChatBubbleBottomCenterIcon, CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MoneyFormatter } from "@/app/functions/Globals";

export default function Sumary({totalprj, totalColl, totalPenBil}: 
  {totalprj:ITotalProjectsByClient, totalColl:ITotalCollectionsByClient, 
    totalPenBil:ITotalPendingBillingByClient}){

  return(
    <div className="w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
      <div className="flex flex-wrap">
        <div className="w-72 p-1">
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
          </div>
        </div>
        <div className="w-72 p-1">
          <Card p1="PAGADO" p2={"$198,278.44"} 
            p3={`de cuentas pagadas`} color="text-purple-600"
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8 text-purple-600" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="POR COBRAR" p2={MoneyFormatter(totalColl?.pendingPayment)} 
            p3={`pendiente de cobrar`} color="text-red-600"
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8 text-red-600" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="POR FACTURAR" p2={MoneyFormatter(totalPenBil?.pendingEstimated?? 0)} 
            p3={`por facturar`} color="text-yellow-500"
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8 text-yellow-500" />
          </Card>
        </div>
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