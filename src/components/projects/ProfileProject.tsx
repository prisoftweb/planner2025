import Label from "../Label";
import { OneProjectMin } from "@/interfaces/Projects";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { useOneProjectsStore } from "@/app/store/projectsStore";

export default function ProfileProject({project}: 
  {project:OneProjectMin}){
  
  const {oneProjectStore, updateOneProjectStore} = useOneProjectsStore();

  const amount = CurrencyFormatter({
    currency: "MXN",
    value: oneProjectStore?.amount || 0
  });

  const amountGuarantee = CurrencyFormatter({
    currency: "MXN",
    value: oneProjectStore?.guaranteefund?.amount? parseFloat(oneProjectStore.guaranteefund.amount) : 0
  });

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
          <div>
            <img src={oneProjectStore?.photo? oneProjectStore?.photo: '/img/projects/default.svg'} alt="logo" 
              className="max-w-28 h-auto" />
          </div>
          <div>
            <p className="text-blue-500">{oneProjectStore?.title || ''}</p>
            <p className="text-slate-500">{oneProjectStore?.code || ''}</p>
            <p className="text-slate-500">{oneProjectStore?.type? oneProjectStore?.type.name : ''}</p>
            <p className="text-slate-500">{oneProjectStore?.account || ''}</p>
          </div>
        </div>
        
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="flex gap-x-2">
            <div>
              <img src={ oneProjectStore?.client? oneProjectStore.client.logo: '/img/clients.svg'} alt="logo" className="w-20 h-20" />
            </div>
            <div>
              <p className="text-slate-500">{'Cliente'}</p>
              <p className="text-blue-500">{oneProjectStore?.client? oneProjectStore.client.name: ''}</p>
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
            <p className="text-slate-500">Fecha ({oneProjectStore?.date?.substring(0, 10) || 'sin fecha'})</p>
          </div>
        </div>
        
        <div className="my-2 mt-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-r-1 border-gray-700">
              <p className="text-slate-500">Fondo de garantia</p>
              {/* <p className="text-blue-600">{oneProjectStore?.progress? oneProjectStore.progress: '' || '0'}</p> */}
              <p className="text-blue-600">{oneProjectStore?.guaranteefund?.porcentage? oneProjectStore.guaranteefund.porcentage: '0' || '0'} %</p>
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
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.stret || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Colonia</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.community || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Municipio</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.municipy || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Codigo Postal</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.cp || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Estado</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.state || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Pais</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.country || '' }</p>
          </div>
        </div>
      </div>
    </>
  )
}