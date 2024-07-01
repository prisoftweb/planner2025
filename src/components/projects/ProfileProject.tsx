import Label from "../Label";
import { Project } from "@/interfaces/Projects";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default function ProfileProject({project}: 
                        {project:Project}){

  const amount = CurrencyFormatter({
    currency: "MXN",
    value: project.amount
  });

  const amountGuarantee = CurrencyFormatter({
    currency: "MXN",
    value: project.guaranteefund.amount? parseFloat(project.guaranteefund.amount): 0
  })

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
          <div>
            <img src={project.photo? project.photo : '/img/projects/default.svg'} alt="logo" 
              className="max-w-28 h-auto" />
          </div>
          <div>
            <p className="text-blue-500">{project.title}</p>
            <p className="text-slate-500">{project.code}</p>
            <p className="text-slate-500">{project.glossary? project.glossary.name: ''}</p>
            <p className="text-slate-500">{project.account}</p>
          </div>
        </div>
        
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="flex gap-x-2">
            <div>
              <img src={project.client? project.client.logo : '/img/clients.svg'} alt="logo" className="w-20 h-20" />
            </div>
            <div>
              <p className="text-slate-500">{'Cliente'}</p>
              <p className="text-blue-500">{project.client? project.client.name: ''}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 my-2">
            <div className="">
              <p className="text-slate-500">Monto de obra</p>
              <p className="text-green-600">{amount}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Costo de obra</p>
              <p>{''}</p>
            </div>
          </div>
          <div className="my-2">
            <p className="text-slate-500">Fecha ({project.datets.substring(0, 10)})</p>
          </div>
        </div>
        
        <div className="my-2 mt-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-r-1 border-gray-700">
              <p className="text-slate-500">Fondo de garantia</p>
              <p className="text-blue-600">{project.guaranteefund.porcentage? project.guaranteefund.porcentage: ''}</p>
            </div>
            <div>
              <p className="text-slate-500">Monto</p>
              <p className="text-blue-600">{amountGuarantee}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-x-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="mt-3">
            <Label>Direccion</Label>
            <p className="my-0 text-slate-700">{project.location?.stret? project.location?.stret: '' }</p>
          </div>
          <div className="mt-3">
            <Label>Colonia</Label>
            <p className="my-0 text-slate-700">{project.location?.community? project.location?.community: '' }</p>
          </div>
          <div className="mt-3">
            <Label>Municipio</Label>
            <p className="my-0 text-slate-700">{project.location?.municipy? project.location?.municipy: '' }</p>
          </div>
          <div className="mt-3">
            <Label>Codigo Postal</Label>
            <p className="my-0 text-slate-700">{project.location?.cp? project.location?.cp: '' }</p>
          </div>
          <div className="mt-3">
            <Label>Estado</Label>
            <p className="my-0 text-slate-700">{project.location?.state? project.location?.state: '' }</p>
          </div>
          <div className="mt-3">
            <Label>Pais</Label>
            <p className="my-0 text-slate-700">{project.location?.country? project.location?.country: '' }</p>
          </div>
        </div>
      </div>
    </>
  )
}