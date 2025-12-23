import Chip from "../providers/Chip";
import Label from "../Label";
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";

export default function ProfileAccount({workspace}: {workspace: IWorkSpaceMin}){

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const dateIni=new Date(workspace.validFrom?? '');
  const dateFin=new Date(workspace.validTo?? '');

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md items-center">
          <div>
            <img src={workspace?.picture?? '/img/projects/default.jpg'} alt="logo" className="w-20 rounded-2xl" />
          </div>
          <div>
            <p className="text-blue-500">{workspace.name?? ""}</p>
            <p className="text-slate-500">{workspace.email?? ""}</p>
            <p className="text-slate-500">{workspace.phoneNumber?? ""}</p>
          </div>
        </div>
        
        <div className="mt-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="">
            <Label>Estatus</Label>
            <div className="w-24">
              <Chip darktext={workspace.estatus?.darktext?? false} color={workspace.estatus.color} label={workspace.estatus.name}  />
            </div>
          </div>
          <div className="mt-3">
            <Label>Dias disponibles</Label>
            <p className="my-0 text-blue-500">28 dias</p>
          </div>
          <div className="mt-3">
            <Label>Periodo</Label>
            <p className="my-0 text-blue-500">{dateIni.getDate()} de {months[dateIni.getMonth()]} de {dateIni.getFullYear()} - {dateFin.getDate()} de {months[dateFin.getMonth()]} de {dateFin.getFullYear()}</p>
          </div>
        </div>
      </div>
    </>
  )
}