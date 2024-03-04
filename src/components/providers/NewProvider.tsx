'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import HeaderForm from "@/components/HeaderForm";
import StepperProvider from "./StepperProvider";
import ContainerStepper from "./ContainerStepper";

export default function NewProvider({showForm, token, id}: 
                  {showForm:Function, token:string, id:string}){

  return(
    <>      
      <div className="z-50 absolute top-0 bg-white p-3 right-0 h-full">
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Ingresa nuevo proveedor" 
            title="Nuevo proveedor"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <StepperProvider>
          <ContainerStepper token={token} id={id} />
        </StepperProvider>
      </div>
    </>
  )
}