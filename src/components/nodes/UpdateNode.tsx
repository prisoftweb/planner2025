'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import { Options } from "@/interfaces/Common"
import { insertRelationsInNode } from "@/app/api/routeNodes"
//import SelectReact from "../SelectReact"
import { Node, NodeTable } from "@/interfaces/Nodes"
import AddElements from "../roles/AddElements"
import Input from "../Input"

export default function UpdateNode({showForm, token, departments, glossaries, 
                      workFlows, id, optDesc, optRels, node}: 
                    {showForm:Function, token:string, glossaries:Options[], 
                      departments:Options[], workFlows:Options[], id:string, 
                      optRels: Options[], optDesc: Options[], node:(NodeTable | undefined)}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  // const [department, setDepartment] = useState<string>(departments[0].value);
  // const [glossary, setGlossary] = useState<string>(glossaries[0].value);
  // const [workflow, setWorkflow] = useState<string>(workFlows[0].value);
  const [optRelations, setOptRelations] = useState<Options[]>(optRels);
  const [descriptions, setDescriptions] = useState<Options[]>(optDesc);
  const [relations, setRelations] = useState<string[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState(0);
  const refRequest = useRef(true);
  
  const deleteElement = (index:number) => {
    setIndexDelete(index);
  }
  
  const pushElement = (value: string) => {
    setRelations((relations) => [...relations, value]);
  }
  
  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  // const [showRelations, setShowRelations] = 
  //       useState<JSX.Element[]>([<AddElements DeleteElement={deleteElement} bandPlus={true} 
  //             descriptions={descriptions} opts={optRelations} pushElement={pushElement} 
  //             index={0} updateCount={updateCount} />]);
  const [showRelations, setShowRelations] = 
        useState<JSX.Element[]>([]);

  // const handleDepartment = (value:string) => {
  //   setDepartment(value);
  // }

  // const handleGlossary = (value:string) => {
  //   setGlossary(value);
  // }

  // const handleWorkflow = (value:string) => {
  //   setWorkflow(value);
  // }
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  // const [showWorkflow, setShowWorkflow] = useState<JSX.Element>(
  //               <SelectReact index={0} opts={workFlows} setValue={handleWorkflow} />)

  // const [showDept, setShowDept] = useState<JSX.Element>(
  //           <SelectReact index={0} opts={departments} setValue={handleDepartment} />)

  // const [showCondition, setShowConditions] = useState<JSX.Element>(
  //           <SelectReact index={0} opts={glossaries} setValue={handleGlossary} />)

  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  useEffect(() => {
    if((!bandDelete) || ((relations.length === showRelations.length))){
      setShowRelations((oldArray) => [...oldArray, <AddElements 
        DeleteElement={deleteElement} bandPlus={true} key={showRelations.length} 
        descriptions={descriptions} opts={optRelations} pushElement={pushElement} 
        index={showRelations.length} updateCount={updateCount} />])
    }
    setBandDelete(false);
  }, [countFiles])

  useEffect(() => {
    if(indexDelete !== -1){
      if(showRelations.length > 1){
        const arrRelations = relations;
        arrRelations.splice(indexDelete, 1);
        setRelations(arrRelations);
        
        setBandDelete(true);
        
        const arrElements = showRelations;
        arrElements.splice(indexDelete, 1);
        setShowRelations(arrElements);
      }else{
        showToastMessageError("No puedes eliminar elemento si solo hay uno!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  const saveNode = async () => {
    if(refRequest.current){
      refRequest.current = false;
      try {
        let arrRelations: any[] = [];
        relations.map((relation) => {
          arrRelations.push({
              relation
            });
        });
        const data = {
          relations: arrRelations
        }
        const res = await insertRelationsInNode(token, data, id);
        if(res === 200){
          refRequest.current = true;
          showToastMessage('Relaciones insertadas satisfactoriamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al insertar relaciones en el nodo!!!');
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
          <HeaderForm img="/img/glossary.svg" subtitle="Actualizar nodo" 
            title="Actualizar nodo"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="workflow"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Workflow</p></Label>
          {/* <Label htmlFor="workflowValue">{node?.workflow}</Label> */}
          <Input value={node?.workflow} disabled />
          {/* {showWorkflow} */}
        </div>
        <div>
          <Label htmlFor="department"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Departamento</p></Label>
          {/* <Label htmlFor="departmentValue"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">{node?.department}</p></Label> */}
          <Input value={node?.department} disabled />
          {/* {showDept} */}
        </div>
        <div>
          <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
          {/* <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">{node?.condition}</p></Label> */}
          <Input value={node?.condition} disabled />
          {/* {showCondition} */}
        </div>
        <div>
          <Label htmlFor="relations"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Relaciones</p></Label>
          {showRelations}
        </div>
        <div className="flex justify-center mt-2">
          <Button type="button" onClick={saveNode}>Guardar</Button>
        </div>
      </div>
    </>
  )
}