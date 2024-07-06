'use client'
//import { XMarkIcon } from "@heroicons/react/24/solid"
//import HeaderForm from "@/components/HeaderForm";
import StepperProvider from "./StepperProvider";
//import ContainerStepper from "./ContainerStepper";
import NewProviderContainer from "./NewProviderContainer";

export default function NewProvider({showForm, token, id}: 
                  {showForm:Function, token:string, id:string}){

  return(
    <>    
    {/* <div className="z-50 absolute top-16 bg-white p-3 right-0 h-full">   */}
      {/* <div className="relative top-0 overflow-y-auto bg-white p-3 right-0 h-screen "> */}
      {/* <div className="z-50 absolute top-16 bg-white p-3 right-0 h-full">
        <div className="flex justify-between">
          <HeaderForm img="/img/provider.svg" subtitle="Ingresa nuevo proveedor" 
            title="Nuevo proveedor"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer " onClick={() => showForm(false)} />
        </div>
        <StepperProvider>
          <ContainerStepper token={token} id={id} />
        </StepperProvider>
      </div> */}
      
      <StepperProvider >
        <NewProviderContainer id={id} showForm={showForm} token={token} />
      </StepperProvider>
    
      {/* </div> */}
    </>
  )
}