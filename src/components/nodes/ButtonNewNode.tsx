'use client'
import Button from "../Button"
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import NewNode from "./NewNode";
import ContainerSideNav from "../ContainerSideNav";

type ButtonProps={
  token:string, 
  user:string, 
  glossaries:Options[], 
  departments:Options[], 
  workFlows:Options[], 
  descGlossaries:Options[]
}

export default function ButtonNewNode({token, user, departments, 
  glossaries, workFlows, descGlossaries}: ButtonProps ){
  const [newNode, setNewNode] = useState<boolean>(false);

  const handleClick = (value: boolean) => {
    setNewNode(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => handleClick(true)}>Nuevo</Button>
          {newNode && (
            <ContainerSideNav width="w-full max-w-md">
              <NewNode showForm={handleClick} token={token} 
                          departments={departments} glossaries={glossaries} 
                          workFlows={workFlows} descGlossaries={descGlossaries} />
            </ContainerSideNav>
          )}
    </>
  )
}