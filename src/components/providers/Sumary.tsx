import Card from "./Card"
import { EnvelopeIcon, CursorArrowRaysIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid"
import { Provider } from "@/interfaces/Providers"
import CardContact from "./CardContact"

export default function Sumary({provider, token}:{provider:Provider, token:string}){
  
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  
  let showContacts: JSX.Element[] =[];
  
  if(provider.contact){
    provider.contact.map((contact, index) => {
      showContacts.push(<CardContact token={token} contact={contact} key={index} idProv={provider._id} />)
    })
  }

  return(
    <div className="w-full">
      <div className="mt-5">
        <h1 className="text-2xl text-slate-600 font-semibold">Resumen de proveedor</h1>
        <p className="text-slate-400 text-sm">Saldos pendientes y linea de credito del proveedor</p>
        <div className="flex flex-wrap gap-x-3 mt-3 gap-y-2">
          {showContacts}
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-y-2 mt-3">
        <div className="w-72 p-1">
          <Card p1={'SALDO ACTUAL' + ' ( ' + 
            new Date(provider.tradeline.date? provider.tradeline.date: '').getDay() + ' de ' +
            months[new Date(provider.tradeline.date? provider.tradeline.date: '').getMonth()] + ')'} 
            p2={"$" + provider.tradeline.currentbalance?.toLocaleString('en')} p3="Saldo actual calculado solo en facturas pendientes de pago"
            link="" >
              <EnvelopeIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="SALDO DISPONIBLE" p2={"$"+ ((provider.tradeline?.creditlimit || 0) - (provider.tradeline?.currentbalance || 0)).toLocaleString('en')} 
            p3={`intereses cobrados del ${provider.tradeline.percentoverduedebt}% del saldo actual`}
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="LINEA DISPONIBLE" p2={"$" + provider.tradeline.creditlimit?.toLocaleString('en')}
            p3={`Linea actual disponible con ${provider.name}`}
            link="" >
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
          </Card>
        </div>
      </div>  
    </div>
  )
}