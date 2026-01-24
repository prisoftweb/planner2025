// import Card from "../Card"
import { EnvelopeIcon, CursorArrowRaysIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid"
// import { Provider } from "@/interfaces/Providers"
// import CardContact from "../CardContact"
// import { ICostTOTALPendingPAYGroupByPROVIDER } from "@/interfaces/Providers"
import { MoneyFormatter } from "@/app/functions/Globals"
import { OneExpense } from "@/interfaces/Expenses"

export default function SumaryAdvanceProvider({advance}:{advance:OneExpense}){
  
  return(
    <div className="w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
      {/* <div className="mt-5">
        <h1 className="text-2xl text-slate-600 font-semibold">Resumen de proveedor</h1>
        <p className="text-slate-400 text-sm">Saldos pendientes y linea de credito del proveedor</p>
      </div> */}
      <div className="flex justify-center flex-wrap gap-y-2 mt-3">
        <div className="w-72 p-1">
          <Card p1={'Anticipo' } 
            p2={MoneyFormatter(advance.cost.total?? 0)}
            color="text-black" >
              <EnvelopeIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1={'Aplicado a anticipo' } 
            p2={MoneyFormatter((advance.cost.total?? 0) - (advance.advancesToSuppliers?.currentbalance?? 0))}
            color="text-red-700" >
              <EnvelopeIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1={'Saldo actual' } 
            p2={MoneyFormatter(advance.advancesToSuppliers?.currentbalance?? 0)}
            color="text-green-700" >
              <EnvelopeIcon className="w-8 h-8" />
          </Card>
        </div>
      </div>  
    </div>
  )
}

export function Card({children, p1, p2, color}:
  {children:JSX.Element, p1:string, p2:string, color:string}){

  return(
    <>
      <div className="bg-white p-1">
        <div className="flex items-center text-2xl sm:text-4xl my-2">
          <div className="bg-sky-700 p-2 mr-5 text-white rounded-lg">
            {children}
          </div>
          <div>
            <p className="font-bold text-slate-600 text-lg">{p1}</p>
            <p className={`${color} font-bold`}>{p2}</p>
            {/* <p className="text-sky-700">{p2}</p> */}
          </div>
        </div>
      </div>
    </>
  )
}