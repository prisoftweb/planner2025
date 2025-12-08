import Chip from "../providers/Chip";
import Label from "../Label";
import { useClientProfileStore } from "@/app/store/clientStore";
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";

export default function ProfileAccount({workspace}: {workspace: IWorkSpaceMin}){
  // const {clientProfile} = useClientProfileStore();

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
          <div>
            <img src={'/img/projects/default.jpg'} alt="logo" className="w-20 h-20" />
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
            <p className="my-0 text-blue-500">{workspace.validFrom}  - {workspace.validTo}</p>
          </div>
        </div>
      </div>
    </>
  )
}