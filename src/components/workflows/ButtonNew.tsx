'use client'
import Button from "../Button"
import { useState } from "react";
import NewWorkFlow from "./NewWorkFlow";

export default function ButtonNew({token, user}: {token:string, user:string}){
  const [newWorkFlow, setNewWorkFlow] = useState<boolean>(false);
  
  const handleClick = (value:boolean) => {
    setNewWorkFlow(value);
  }
  return(
    <>
      <Button type="button" onClick={() => handleClick(true)}>Nuevo</Button>
          {newWorkFlow && <NewWorkFlow showForm={handleClick} 
                                  token={token} workFlow={''} />}
    </>
  )
}