'use client'
import Button from "../Button"
import { useState } from "react";
import NewStatus from "./NewStatus";
import { Options } from "@/interfaces/Common";
import { InsertCategoryInCatalog, InsertConditionInCatalog, InsertTypeInCatalog } from "@/app/api/routeCatalogs";
import { FireIcon, TagIcon, Battery50Icon } from "@heroicons/react/24/solid";
import {Tooltip} from "@nextui-org/react";

export default function ButtonNew({token, catalogOptions, descGlossaries, glosariesOptions, opt}:
                                  {token:string, catalogOptions:Options[], glosariesOptions:Options[], 
                                    descGlossaries:Options[], opt:number}){
  const [newStatus, setNewStatus] = useState<boolean>(false);
  const [newType, setNewType] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);

  let props = {
    variants: {
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      }
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      }
    },
    },
  }

  let button;

  switch(opt){
    case 1: 
      button = (
        <>
          <div className=" hidden sm:block"><Button type="button" onClick={() => setNewType(true)}>Nuevo tipo</Button></div>
          <Tooltip closeDelay={0} delay={100} motionProps={props} 
            className="text-blue-500 bg-white" content='Estatus'
            placement="right"  
          >
              <FireIcon className="w-10 h-10 sm:hidden cursor-pointer" onClick={() => setNewType(true)} />
          </Tooltip>
        </>
      )
    break;
    case 2: 
      button = (
        <>
          <div className=" hidden sm:block"><Button type="button" onClick={() => setNewCategory(true)}>Nueva categoria</Button></div>
          <TagIcon className="w-10 h-10 sm:hidden cursor-pointer" onClick={() => setNewCategory(true)} />
        </>
      )
    break;
    case 3: 
      button = (
        <>
          <div className=" hidden sm:block"><Button type="button" onClick={() => setNewStatus(true)}>Nuevo status</Button></div>
          <Battery50Icon className="w-10 h-10 sm:hidden cursor-pointer" onClick={() => setNewStatus(true)} />
        </>
      )
    break;
  }

  return(
    <>
      {button}
      {newType && <NewStatus showForm={setNewType} token={token} opt={opt}
                  catalogOptions={catalogOptions} descGlossaries={descGlossaries} 
                  glosariesOptions={glosariesOptions} insertFunction={InsertTypeInCatalog} />}
      {newCategory && <NewStatus showForm={setNewCategory} token={token} opt={opt}
                  catalogOptions={catalogOptions} descGlossaries={descGlossaries} 
                  glosariesOptions={glosariesOptions} insertFunction={InsertCategoryInCatalog} />}
      {newStatus && <NewStatus showForm={setNewStatus} token={token} opt={opt}
                  catalogOptions={catalogOptions} descGlossaries={descGlossaries} 
                  glosariesOptions={glosariesOptions} insertFunction={InsertConditionInCatalog} />}
    </>
  )
}