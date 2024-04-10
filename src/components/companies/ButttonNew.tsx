'use client'
import Button from "../Button"
import { useState } from "react";
import NewCompany from "./NewCompany";

export default function ButtonNew({token}: {token:string}){
  const [newCompany, setNewCompany] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewCompany(true)}>Nuevo</Button>
          {newCompany && <NewCompany showForm={setNewCompany} token={token} />}
    </>
  )
}