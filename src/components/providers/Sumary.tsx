import Card from "./Card"
import { EnvelopeIcon, CursorArrowRaysIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid"

export default function Sumary(){
  return(
    <div className="w-full ">
      <div className="mt-5">
        <h1 className="text-2xl text-slate-600 font-semibold">Resumen de proveedor</h1>
        <p className="text-slate-400 text-sm">Saldos pendientes y linea de credito del proveedor</p>
        <div className="flex items-center mt-5">
          <img src="/nuevoIcono.jpg" alt="profile" className="w-16 h-16" />
          <div className="ml-3">
            <p className="text-sm text-slate-600 font-semibold">Francisco Lopez Leyva</p>
            <p className="text-xs text-slate-400">pancho.lopez@plaforama.mx</p>
            <p className="text-xs text-slate-400">pancho@gmail.com</p>
            <p className="text-xs text-slate-400">52+ 444 429 7227</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="w-1/2 p-5">
          <Card p1="SALDO ACTUAL (22 DE MAR)" p2="$76,980.54" 
            p3="Saldo actual calculado solo en facturas pendientes de pago"
            link="" >
              <EnvelopeIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-1/2 p-5">
          <Card p1="INTERES DE DEUDA VENCIDA" p2="$8,278.44" 
            p3="intereses cobrados del 5% de la deuda vencida"
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-1/2">
          <Card p1="LINEA DISPONIBLE" p2="$423,019.46" 
            p3="Linea actual disponible con Plaforama "
            link="" >
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
          </Card>
        </div>
      </div>  
    </div>
  )
}