'use client'
import Button from "../Button"
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import NewRelation from "./NewRelation";

export default function ButtonNewRelation({token, user, nodes, glossaries}: 
          {token:string, user:string, glossaries:Options[], nodes:Options[]}){
  const [newRelation, setNewRelation] = useState<boolean>(false);

  const handleClick = (value: boolean) => {
    setNewRelation(value);
  }
  

  return(
    <>
      <Button type="button" onClick={() => handleClick(true)}>Nuevo</Button>
          {newRelation && <NewRelation showForm={handleClick} token={token} 
                          nodes={nodes} glossaries={glossaries} />}
    </>
  )
}