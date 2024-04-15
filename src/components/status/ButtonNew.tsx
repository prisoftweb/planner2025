'use client'
import Button from "../Button"
import { useState } from "react";
import NewStatus from "./NewStatus";
import { Options } from "@/interfaces/Common";
import { InsertCategoryInCatalog, InsertConditionInCatalog, InsertTypeInCatalog } from "@/app/api/routeCatalogs";

export default function ButtonNew({token, catalogOptions, descGlossaries, glosariesOptions, opt}:
                                  {token:string, catalogOptions:Options[], glosariesOptions:Options[], 
                                    descGlossaries:Options[], opt:number}){
  const [newStatus, setNewStatus] = useState<boolean>(false);
  const [newType, setNewType] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);

  let button;

  switch(opt){
    case 1: 
      button = <Button type="button" onClick={() => setNewType(true)}>Nuevo tipo</Button>
    break;
    case 2: 
      button = <Button type="button" onClick={() => setNewCategory(true)}>Nueva categoria</Button>
    break;
    case 3: 
      button = <Button type="button" onClick={() => setNewStatus(true)}>Nuevo status</Button>
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