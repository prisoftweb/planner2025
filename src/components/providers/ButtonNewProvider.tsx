'use client'
import { useState } from "react";
import NewProvider from "./NewProvider";
import Button from "../Button";

export default function ButtonNewProvider(){
  const [newProvider, setNewProvider] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewProvider(true)}>Nuevo</Button>
        {newProvider && <NewProvider showForm={setNewProvider} />}
    </>
  )
}