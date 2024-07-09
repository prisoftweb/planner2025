'use client'
import { useState } from "react";
import Button from "../Button";
import NewClient from "./NewClient";
import { Options } from "@/interfaces/Common";

export default function ButtonNewClient({token, id, tags}: 
                              {token:string, id:string, tags:Options[]}){

  const [newClient, setNewClient] = useState<boolean>(false);

  const handleClick = (value:boolean) => {
    setNewClient(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setNewClient(true)}>Nuevo</Button>
        {newClient && <NewClient tags={tags} showForm={handleClick} id={id} token={token} />}
    </>
  )
}