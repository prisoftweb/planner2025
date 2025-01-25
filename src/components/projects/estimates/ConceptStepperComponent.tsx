// import Label from "@/components/Label";
// import SelectReact from "@/components/SelectReact";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
// import TextArea from "@/components/TextArea";
// import Input from "@/components/Input";
import { useState } from "react";
// import { Options } from "@/interfaces/Common";
import FormNewConcept from "./FormNewConcept";
// import Button from "@/components/Button";
// import { showToastMessage, showToastMessageError } from "@/components/Alert";
import { IConceptEstimate, IConceptEstimateNormal } from "@/interfaces/Estimate";

export default function ConceptStepperComponent({handleConceptID, token, nextStep, 
    handleAddNewConcept, concepts}: 
  {handleConceptID:Function, token:string, nextStep:Function, handleAddNewConcept:Function, 
    concepts:IConceptEstimateNormal[]}) {

  const [showNewConcept, setShowNewConcept] = useState<boolean>(false);
  // const [bandDescription, setBandDescription] = useState<boolean>(false);
  // const [bandCode, setBandCode] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');
  
  const handleShowNewConcept = (value:boolean) => {
    setShowNewConcept(value);
  }

  let filteredConcepts = concepts;
  if(search && search !== ''){
    filteredConcepts = concepts.filter((c) => c.name.includes(search));
  }

  const handleConcept = (conceptSel: string) => {
    handleConceptID(conceptSel);
    nextStep(1);
  }
  
  return (
    <>
      {/* <div className="p-2">
        <div className="grid grid-cols-3 gap-x-1">
          <div className="col-span-2">
            <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Concepto</p></Label>
            <div className="flex gap-x-2 items-center">
              {selConcept}
              <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                onClick={() => setShowNewConcept(true)} />
            </div>
          </div>
          <div className="">
            <Label htmlFor="clave"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Clave</p></Label>
            <Input type="text" name="clave" autoFocus 
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {bandCode && (
              <p className="text-red-500">La clave es obligatoria!!!</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="descripcion"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)}></TextArea>
          {bandDescription && (
            <p className="text-red-500">La descripcion es obligatoria!!!</p>
          )}
        </div>
      </div> */}
      <div className="flex items-center gap-x-2">
        <div className="relative w-full p-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)} 
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 
              rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
              outline-0 outline-none 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={'Buscar concepto'} required ></input>
        </div>
        <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                  onClick={() => setShowNewConcept(true)} />
      </div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
            overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
          {filteredConcepts.map((conce) => (
            <div role="button"
              key={conce._id}
              className="flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300"
              onClick={() => handleConcept(conce._id)}
            >
              <div className="flex items-center ">
                <div className="grid mr-4 place-items-center">
                  <img alt="responsable" src={ '/img/users/default.jpg'}
                    className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h6
                      className="block font-sans text-lg antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                      {conce.name}
                    </h6>
                    <p className="text-slate-500 text-sm">{conce.code}</p>
                  </div>
                  <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                    {conce.description}
                  </p>
                </div>
              </div>
              {/* <div className="grid place-items-center justify-center w-28">
                <p className="block font-sans text-sm antialiased font-normal 
                    leading-normal text-gray-700">{mov.department.name}</p>
                <img alt="responsable" src={mov.department.company.logo || '/img/users/default.jpg'}
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
              </div> */}
            </div>
          ))}

        </nav>
      </div>
      {/* <div className="flex justify-center mt-2">
        <Button type="button" onClick={validationData}>Siguiente</Button>
      </div> */}
      {showNewConcept && <FormNewConcept addConcept={handleAddNewConcept} setShowForm={handleShowNewConcept} 
                              token={token} />}
    </>
  )
}
