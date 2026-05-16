'use client'
import { useState } from "react";
import Button from "../Button";
import NewCostCenter from "./NewCostCenter";
import ContainerSideNav from "../ContainerSideNav";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function ButtonNew({token, id, company}: {token:string, id:string, company:string}){
  const [varNew, setVarNew] = useState<boolean>(false);

  const handleNew = (value: boolean) => {
    setVarNew(value);
  }
  
  return(
    <>
      <div className="hidden sm:block">
        <Button type="button" onClick={() => setVarNew(true)}>Nuevo</Button>
      </div>
      <div className="flex flex-col items-center sm:hidden">
        <PlusCircleIcon onClick={() => setVarNew(true)} className={`w-6 h-6 text-slate-700 cursor-pointer`} />
        <span className="text-xs">Nuevo</span>
      </div>
        {/* {varNew && (
          <ContainerSideNav width="w-full max-w-lg">
            <NewCostCenter showForm={handleNew} token={token} costCenter={''} />
          </ContainerSideNav>
        )} */}
        <ContainerSideNav width="w-full max-w-lg" open={varNew}>
          <NewCostCenter showForm={handleNew} token={token} costCenter={''} company={company} />
        </ContainerSideNav>
    </>
  )
}