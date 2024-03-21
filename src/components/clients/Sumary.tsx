import { ClientBack } from "@/interfaces/Clients";
//import CardContact from "../providers/CardContact";
import CardContactClient from "./CardContactClient";
import Card from "../providers/Card";
import { ChatBubbleBottomCenterIcon, CursorArrowRaysIcon } from "@heroicons/react/24/solid";

export default function Sumary({client, token, idCli}: 
                            {client:ClientBack, token:string, idCli:string}){
  
  let showContacts: JSX.Element[] =[];
  
  if(client.contact){
    client.contact.map((contact, index) => {
      showContacts.push(<CardContactClient token={token} contact={contact} key={index} idCli={idCli} />)
    })
  }

  return(
    <div className="w-full">
      <div className="mt-0">
        <h1 className="text-2xl text-slate-600 font-semibold">Resumen de cliente</h1>
        <p className="text-slate-400 text-sm">Proyectos, extras y estimaciones</p>
        <div className="flex flex-wrap gap-x-3 mt-3 gap-y-2">
          {showContacts}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-72 p-1">
          <Card p1="PROYECTOS" p2={"12"} 
            p3={`de historial de proyectos`}
            link="" >
              <ChatBubbleBottomCenterIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="SALDO PENDIENTE" p2={"$198,278.44"} 
            p3={`de saldo pendiente de cobrar`}
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8" />
          </Card>
        </div>
      </div>
    </div>
  )
}