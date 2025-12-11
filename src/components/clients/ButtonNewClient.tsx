'use client'
import { useState } from "react";
import Button from "../Button";
import NewClient from "./NewClient";
import { Options } from "@/interfaces/Common";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNewClient({token, id, tags}: {token:string, id:string, tags:Options[]}){

  const [newClient, setNewClient] = useState<boolean>(false);

  const handleClick = (value:boolean) => {
    setNewClient(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setNewClient(true)}>Nuevo</Button>
        {/* {newClient && (
          <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
            <NewClient tags={tags} showForm={handleClick} id={id} token={token} />
          </div>
        )} */}
        <ContainerSideNav width="w-full sm:max-w-2xl" open={newClient}>
          <NewClient tags={tags} showForm={handleClick} id={id} token={token} />
        </ContainerSideNav>
    </>
  )
}