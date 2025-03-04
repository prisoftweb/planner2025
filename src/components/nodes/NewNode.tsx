'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import { Options } from "@/interfaces/Common"
import { createNode } from "@/app/api/routeNodes"
import SelectReact from "../SelectReact"
import SelectReactWithDescription from "../SelectReactWithDescription"

export default function NewNode({showForm, token, departments, glossaries, 
                          workFlows, descGlossaries}: 
  {showForm:Function, token:string, glossaries:Options[], departments:Options[], 
    workFlows:Options[], descGlossaries:Options[]}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [department, setDepartment] = useState<string>(departments[0].value);
  const [glossary, setGlossary] = useState<string>(glossaries[0].value);
  const [workflow, setWorkflow] = useState<string>(workFlows[0].value);
  const refRequest = useRef(true);

  const handleDepartment = (value:string) => {
    setDepartment(value);
  }

  const handleGlossary = (value:string) => {
    setGlossary(value);
  }

  const handleWorkflow = (value:string) => {
    setWorkflow(value);
  }
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  const saveNode = async () => {
    if(refRequest.current){
      refRequest.current = false;
      try {
        const data = {
          workflow,
          department,
          glossary
        }
        const res = await createNode(token, data);
        if(res === 201){
          refRequest.current = true;
          showToastMessage('Nodo creado satisfactoriamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al crear workflow!!!');
      }
    }else{
      showToastMessageError('Ya hay una peticion en proceso..!!!');
    }
  }

  return(
    <>
      <div className="z-10 top-16 w-full max-w-md absolute bg-white space-y-5 p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/glossary.svg" subtitle="Agregar nuevo nodo" 
            title="Agregar nuevo nodo"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="workflow"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Workflow</p></Label>
          <SelectReact index={0} opts={workFlows} setValue={handleWorkflow} />
        </div>
        <div>
          <Label htmlFor="department"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Departamento</p></Label>
          <SelectReact index={0} opts={departments} setValue={handleDepartment} />
        </div>
        <div>
          <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
          <SelectReactWithDescription index={0} opts={glossaries} 
              setValue={handleGlossary} descriptions={descGlossaries} />
        </div>
        <div className="flex justify-center mt-2">
          <Button type="button" onClick={saveNode}>Guardar</Button>
        </div>
      </div>
    </>
  )
}