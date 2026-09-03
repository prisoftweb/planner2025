import Label from "@/components/Label";
import Chip from "@/components/providers/Chip";
import { Company } from "@/interfaces/Companies";

export default function ProfileCompany({company}: {company: Company}){

  // const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  // const dateIni=new Date(workspace.validFrom?? '');
  // const dateFin=new Date(workspace.validTo?? '');

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md items-center">
          <div>
            <img src={company?.logo?? '/img/projects/default.jpg'} alt="logo" className="w-20 rounded-2xl" />
          </div>
          <div>
            <p className="text-blue-500">{company.name?? ""}</p>
            <p className="text-slate-500">{company.email?? ""}</p>
            <p className="text-slate-500">{company.phoneNumber?? ""}</p>
          </div>
        </div>
        
        <div className="mt-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="">
            <Label>Calle</Label>
            <p className="my-0 text-blue-500">{company.location?.stret}</p>
          </div>
          <div className="mt-3">
            <Label>Colonia</Label>
            <p className="my-0 text-blue-500">{company.location?.community}</p>
          </div>
          <div className="mt-3">
            <Label>Notas</Label>
            <p className="my-0 text-blue-500">{company.location?.addressref}</p>
          </div>
        </div>
      </div>
    </>
  )
}