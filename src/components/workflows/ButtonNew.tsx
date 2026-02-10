'use client'
import Button from "../Button"
import { useState } from "react";
import NewWorkFlow from "./NewWorkFlow";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNew({token, user}: {token:string, user:string}){
  const [newWorkFlow, setNewWorkFlow] = useState<boolean>(false);
  
  const handleClick = (value:boolean) => {
    setNewWorkFlow(value);
  }
  return(
    <>
      <Button type="button" onClick={() => handleClick(true)}>Nuevo</Button>
          {/* {newWorkFlow && (
            <ContainerSideNav width="w-full max-w-md">
              <NewWorkFlow showForm={handleClick} token={token} workFlow={''} />
            </ContainerSideNav>
            // <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
            //   <NewWorkFlow showForm={handleClick} token={token} workFlow={''} />
            // </div>
          )} */}
      <ContainerSideNav width="w-full max-w-md" open={newWorkFlow} >
        <NewWorkFlow showForm={handleClick} token={token} workFlow={''} />
      </ContainerSideNav>
    </>
  )
}