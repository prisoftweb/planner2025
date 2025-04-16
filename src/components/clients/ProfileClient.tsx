import Chip from "../providers/Chip";
import Label from "../Label";
import { useClientProfileStore } from "@/app/store/clientStore";

export default function ProfileClient(){
  const {clientProfile} = useClientProfileStore();

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
          <div>
            <img src={clientProfile?.logo? clientProfile?.logo : '/img/clients.svg'} alt="logo" className="w-20 h-20" />
          </div>
          <div>
            <p className="text-blue-500">{clientProfile?.name}</p>
            <p className="text-slate-500">{clientProfile?.tradename}</p>
            <p className="text-slate-500">{clientProfile?.rfc}</p>
            <p className="text-slate-500">{clientProfile?.regime==='Moral'? 'Persona Moral': 'Persona Fisica'}</p>
            <div className="flex gap-x-2 gap-y-2">
              {clientProfile?.tags?.map((tag, index:number) => (
                <Chip label={tag} key={index} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="">
            <Label>Email</Label>
            <p className="my-0 text-blue-500">{clientProfile?.email? clientProfile?.email: ''}</p>
          </div>
          <div className="mt-3">
            <Label>Telefono</Label>
            <p className="my-0 text-blue-500">{clientProfile?.phone? clientProfile?.phone: ''}</p>
          </div>
          <div className="mt-3">
            <Label>Web</Label>
            <p className="my-0 text-blue-500">{clientProfile?.link? clientProfile?.link: ''}</p>
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-3 bg-white p-3 rounded-lg shadow-md py-2">
          <div>
            <Label>Direccion</Label>
            <p className="my-0 text-slate-700">{clientProfile?.location.stret? clientProfile?.location.stret: '' }</p>
          </div>
          <div>
            <Label>Colonia</Label>
            <p className="my-0 text-slate-700">{clientProfile?.location.community? clientProfile?.location.community: '' }</p>
          </div>
          <div>
            <Label>Municipio</Label>
            <p className="my-0 text-slate-700">{clientProfile?.location.municipy? clientProfile?.location.municipy: '' }</p>
          </div>
          <div>
            <Label>Codigo Postal</Label>
            <p className="my-0 text-slate-700">{clientProfile?.location.cp? clientProfile?.location.cp: '' }</p>
          </div>
          <div>
            <Label>Estado</Label>
            <p className="my-0 text-slate-700">{clientProfile?.location.state? clientProfile?.location.state: '' }</p>
          </div>
          <div>
            <Label>Pais</Label>
            <p className="my-0 text-slate-700">{clientProfile?.location.country? clientProfile?.location.country: '' }</p>
          </div>
        </div>
      </div>
    </>
  )
}