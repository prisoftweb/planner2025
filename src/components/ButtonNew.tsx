'use client'
import { useState } from "react";
//import NewProvider from "./NewProvider";
//import Button from "../Button";
import Button from "./Button";

export default function ButtonNewProvider({token, id}: {token:string, id:string}){
  const [varNew, setVarNew] = useState<boolean>(false);
  
  return(
    <>
      {/* <Button type="button" onClick={() => setVarNew(true)}>Nuevo</Button>
        {varNew && <NewProvider showForm={setVarNew} token={token} id={id} />} */}
    </>
  )
}