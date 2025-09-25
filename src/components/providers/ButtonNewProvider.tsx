'use client'
import { useState } from "react";
import NewProvider from "./NewProvider";
import Button from "../Button";

export default function ButtonNewProvider({token, id}: {token:string, id:string}){
  const [newProvider, setNewProvider] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewProvider(true)}>Nuevo</Button>
        {newProvider && (
          <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
            <NewProvider showForm={setNewProvider} token={token} id={id} user={id} />
          </div>
        )}
    </>
  )
}