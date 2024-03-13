'use client'
import { useState } from "react";
import Button from "../Button";
import NewClient from "./NewClient";

export default function ButtonNewClient({token, id}: {token:string, id:string}){
  const [newClient, setNewClient] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewClient(true)}>Nuevo</Button>
        {newClient && <NewClient showForm={setNewClient} id={id} token={token} />}
    </>
  )
}