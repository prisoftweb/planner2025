import Chip from "../providers/Chip";
import { ClientBack } from "@/interfaces/Clients";
import Label from "../Label";

export default function ProfileClient({client}: 
                        {client:ClientBack}){

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
          <div>
            <img src={client.logo? client.logo : '/img/clients.svg'} alt="logo" className="w-20 h-20" />
          </div>
          <div>
            <p className="text-blue-500">{client.name}</p>
            <p className="text-slate-500">{client.tradename}</p>
            <p className="text-slate-500">{client.rfc}</p>
            <p className="text-slate-500">{client.regime==='Moral'? 'Persona Moral': 'Persona Fisica'}</p>
            <div className="flex gap-x-2 gap-y-2">
              {client.tags?.map((tag, index:number) => (
                <Chip label={tag} key={index} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="">
            <Label>Email</Label>
            <p className="my-0 text-blue-500">{client.email? client.email: ''}</p>
          </div>
          <div className="mt-3">
            <Label>Telefono</Label>
            <p className="my-0 text-blue-500">{client.phone? client.phone: ''}</p>
          </div>
          <div className="mt-3">
            <Label>Web</Label>
            <p className="my-0 text-blue-500">{client.link? client.link: ''}</p>
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-3 bg-white p-3 rounded-lg shadow-md py-2">
          <div>
            <Label>Direccion</Label>
            <p className="my-0 text-slate-700">{client.location.stret? client.location.stret: '' }</p>
          </div>
          <div>
            <Label>Colonia</Label>
            <p className="my-0 text-slate-700">{client.location.community? client.location.community: '' }</p>
          </div>
          <div>
            <Label>Municipio</Label>
            <p className="my-0 text-slate-700">{client.location.municipy? client.location.municipy: '' }</p>
          </div>
          <div>
            <Label>Codigo Postal</Label>
            <p className="my-0 text-slate-700">{client.location.cp? client.location.cp: '' }</p>
          </div>
          <div>
            <Label>Estado</Label>
            <p className="my-0 text-slate-700">{client.location.state? client.location.state: '' }</p>
          </div>
          <div>
            <Label>Pais</Label>
            <p className="my-0 text-slate-700">{client.location.country? client.location.country: '' }</p>
          </div>
        </div>
      </div>
      {/* <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center mt-3 ${option===1? 'bg-slate-200': ''}`}
        onClick={() => changeOption(1)}
      >
        <Squares2X2Icon className="w-4 h-4 mr-2 text-slate-500" />
        Resumen
      </div>
      <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center ${option===2? 'bg-slate-200': ''}`}
        onClick={() => changeOption(2)}  
      >
        <CalendarDaysIcon className="w-4 h-4 mr-2 text-slate-500" />
        Datos basicos
      </div>
      <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center ${option===3? 'bg-slate-200': ''}`}
        onClick={() => changeOption(3)}
      >
        <CreditCardIcon className="w-4 h-4 mr-2 text-slate-500" />
        Linea de credito
      </div>
      <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center ${option===4? 'bg-slate-200': ''}`}
        onClick={() => changeOption(4)}
      >
        <IdentificationIcon className="w-4 h-4 mr-2 text-slate-500" />
        Contactos
      </div> */}
    </>
  )
}