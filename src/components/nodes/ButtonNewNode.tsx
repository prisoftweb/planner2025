'use client'
import Button from "../Button"
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import NewNode from "./NewNode";

export default function ButtonNewNode({token, user, departments, 
              glossaries, workFlows}: 
          {token:string, user:string, glossaries:Options[], 
            departments:Options[], workFlows:Options[]}){
  const [newNode, setNewNode] = useState<boolean>(false);

  const handleClick = (value: boolean) => {
    setNewNode(value);
  }
  

  return(
    <>
      <Button type="button" onClick={() => handleClick(true)}>Nuevo</Button>
          {newNode && <NewNode showForm={handleClick} token={token} 
                          departments={departments} glossaries={glossaries} 
                          workFlows={workFlows} />}
    </>
  )
}