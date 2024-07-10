'use client'
import { useState } from "react";
import Button from "../Button";
import NewCostCenter from "./NewCostCenter";

export default function ButtonNew({token, id}: {token:string, id:string}){
  const [varNew, setVarNew] = useState<boolean>(false);

  const handleNew = (value: boolean) => {
    setVarNew(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setVarNew(true)}>Nuevo</Button>
        {varNew && <NewCostCenter showForm={handleNew} token={token} costCenter={''} />}
    </>
  )
}