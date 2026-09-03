import { ClientBack } from "@/interfaces/Clients"
import CardContacts from "../CardContacts";
import DeleteContactClient from "./DeleteContactClient";

export default function ShowContactasClicComponent({client, token, idCli}: 
  {client:ClientBack, token:string, idCli:string}) {

  let showContacts: JSX.Element[] =[];
  
  if(client.contact){
    client.contact.map((contact, index) => {
      showContacts.push(<CardContacts contact={contact} token={token} key={index}>
                          <DeleteContactClient contact={contact} token={token} idCli={idCli} />
                        </CardContacts>)
    })
  }

  return (
    <div className="mt-0">
      {/* <h1 className="text-2xl text-slate-600 font-semibold">Resumen de cliente</h1>
      <p className="text-slate-400 text-sm">Proyectos, extras y estimaciones</p> */}
      <div className="flex flex-wrap gap-x-3 mt-3 gap-y-2">
        {showContacts}
      </div>
    </div>
  )
}
