import { ClientBack } from "@/interfaces/Clients";
import CardContacts from "../CardContacts";
// import Card from "../providers/Card";
import { ChatBubbleBottomCenterIcon, CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import DeleteContactClient from "./DeleteContactClient";
import Link from "next/link";

export default function Sumary({client, token, idCli}: {client:ClientBack, token:string, idCli:string}){
  
  // let showContacts: JSX.Element[] =[];
  
  // if(client.contact){
  //   client.contact.map((contact, index) => {
  //     showContacts.push(<CardContacts contact={contact} token={token} key={index}>
  //                         <DeleteContactClient contact={contact} token={token} idCli={idCli} />
  //                       </CardContacts>)
  //   })
  // }

  return(
    <div className="w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
      {/* <div className="mt-0">
        <h1 className="text-2xl text-slate-600 font-semibold">Resumen de cliente</h1>
        <p className="text-slate-400 text-sm">Proyectos, extras y estimaciones</p>
        <div className="flex flex-wrap gap-x-3 mt-3 gap-y-2">
          {showContacts}
        </div>
      </div> */}
      <div className="flex flex-wrap">
        <div className="w-72 p-1">
          <Card p1="PROYECTOS" p2={"12"} 
            p3={`de historial de proyectos`}
            link="" >
              <ChatBubbleBottomCenterIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="PAGADO" p2={"$198,278.44"} 
            p3={`de cuentas pagadas`}
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="POR COBRAR" p2={"$198,278.44"} 
            p3={`pendiente de cobrar`}
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8" />
          </Card>
        </div>
        <div className="w-72 p-1">
          <Card p1="POR FACTURAR" p2={"$198,278.44"} 
            p3={`por facturar`}
            link="" >
              <CursorArrowRaysIcon className="w-8 h-8" />
          </Card>
        </div>
      </div>
    </div>
  )
}

export function Card({link, p1, p2, p3, children}: {children:JSX.Element, link:string, p1:string, p2:string, p3:string}) {
  return(
    <div className="bg-white p-1 shadow-lg shadow-slate-600 mt-2 rounded-xl">
      <p>{p1}</p>
      <div className="flex items-center text-2xl sm:text-4xl my-2">
        <div className="bg-sky-700 p-2 mr-5 text-white rounded-lg">
          {children}
        </div>
        <p className="text-sky-700">{p2}</p>
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