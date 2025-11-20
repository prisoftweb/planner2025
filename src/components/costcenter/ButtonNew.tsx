'use client'
import { useState } from "react";
import Button from "../Button";
import NewCostCenter from "./NewCostCenter";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNew({token, id}: {token:string, id:string}){
  const [varNew, setVarNew] = useState<boolean>(false);

  const handleNew = (value: boolean) => {
    setVarNew(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setVarNew(true)}>Nuevo</Button>
        {varNew && (
          <ContainerSideNav width="w-full max-w-lg">
            <NewCostCenter showForm={handleNew} token={token} costCenter={''} />
          </ContainerSideNav>
        )}
    </>
  )
}