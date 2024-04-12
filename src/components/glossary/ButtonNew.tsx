'use client'
import Button from "../Button"
import { useState } from "react";
import NewGlossary from "./NewGlossary";
import { GlossaryTable } from "@/interfaces/Glossary";

export default function ButtonNew({token, glossary}: 
                                  {token:string, glossary: (GlossaryTable | string)}){
  const [NewList, setNewList] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewList(true)}>Nuevo</Button>
          {NewList && <NewGlossary showForm={setNewList} token={token} glossary={glossary} />}
    </>
  )
}