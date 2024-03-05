import Card from "./Card"
import { EnvelopeIcon, CursorArrowRaysIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid"
import { Provider } from "@/interfaces/Providers"
import CardContact from "./CardContact"

export default function Sumary({provider}:{provider:Provider}){
  
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  
  let showContacts: JSX.Element[] =[];
  
  if(provider.contact){
    provider.contact.map((contact) => {
      let p = contact.phoneNumber? contact.phoneNumber[0].phoneformat : '';
      showContacts.push(<CardContact name={contact.name} phone={p} />)
    })
  }

  return(
    <div className="w-full ">
      <div className="mt-5">
        <h1 className="text-2xl text-slate-600 font-semibold">Resumen de proveedor</h1>
        <p className="text-slate-400 text-sm">Saldos pendientes y linea de credito del proveedor</p>
        {/* <div className="flex items-center mt-5">
          <img src="/nuevoIcono.jpg" alt="profile" className="w-16 h-16" />
          <div className="ml-3">
            <p className="text-sm text-slate-600 font-semibold">{provider.name}</p>
            <p className="text-xs text-slate-400">pancho.lopez@plaforama.mx</p>
            <p className="text-xs text-slate-400">pancho@gmail.com</p>
            <p className="text-xs text-slate-400">52+ 444 429 7227</p>
          </div>
        </div> */}
        <div className="flex flex-wrap gap-x-3 mt-3">
          {showContacts}
        </div>
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="w-1/2 p-5">
          <Card p1={'SALDO ACTUAL' + ' ( ' + 
            new Date(provider.tradeline.date? provider.tradeline.date: '').getDay() + ' de ' +
            months[new Date(provider.tradeline.date? provider.tradeline.date: '').getMonth()] + ')'} 
            p2={"$" + provider.tradeline.currentbalance?.toLocaleString('en')} p3="Saldo actual calculado solo en facturas pendientes de pago"
            link="" >
              <EnvelopeIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-1/2 p-5">
          <Card p1="INTERES DE DEUDA VENCIDA" p2={"$8,278.44"} 
            p3={`intereses cobrados del ${provider.tradeline.percentoverduedebt}% de la deuda vencida`}
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-1/2">
          <Card p1="LINEA DISPONIBLE" p2={`$ ${provider.tradeline.creditlimit?.toLocaleString('en')}`}
            p3={`Linea actual disponible con ${provider.name}`}
            link="" >
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
          </Card>
        </div>
      </div>  
    </div>
  )
}