'use client'
import Button from "../Button"
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import NewNode from "./NewNode";

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
            <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
              <NewNode showForm={handleClick} token={token} 
                          departments={departments} glossaries={glossaries} 
                          workFlows={workFlows} descGlossaries={descGlossaries} />
            </div>
          )}
    </>
  )
}