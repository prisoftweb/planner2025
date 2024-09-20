'use client'

import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { OneProjectMin } from "@/interfaces/Projects"
// import DataBasic from "./DataBasic"
// import ExtraData from "./ExtraData"
// import Address from "./Address"
// import GuaranteeProject from "./GuaranteeProject"
// import ProfileProject from "./ProfileProject"
// import ProgressProject from "./ProgressProject"

import { FullBudget } from "@/interfaces/BudgetProfile"
import { useOneBudget } from "@/app/store/budgetProject"
import NavResponsive from "./NavResponsive"
import ProfileBudget from "./ProfileBudget"
import ButtonNewBudget from "./ButtonNewBudget"
import { CostoCenterLV } from "@/interfaces/CostCenter"
import WithOut from "@/components/WithOut"

export default function BudgetCli({budget, token, id, user, costoCentersLV}: 
  {budget: FullBudget, token:string, id:string, user: string, costoCentersLV: CostoCenterLV[]}){

  const [opt, setOpt] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [newBudget, setNewBudget] = useState<boolean>(false);

  const {updateOneBudget, oneBudget} = useOneBudget();
  
  useEffect(() => {
    updateOneBudget(budget);

    return () => updateOneBudget(null);
  }, []);

  const handleOpen = (value: boolean) => {
    setOpen(value);
  }

  const handleOpt = (value: number) => {
    setOpt(value);
  }

  const handleNewBudget = (value: boolean) => {
    setNewBudget(value);
  }

  if(!oneBudget){
    return(
      <>
        <h1 className="text-center text-5xl">Obteniedo presupuesto</h1>
      </>
    )
  }

  return(
    <>
      <div className="mt-5 flex justify-end items-center gap-x-10">
        <ButtonNewBudget handleNewBudget={handleNewBudget} openNewBudget={newBudget} 
          token={token} user={user} costoCentersLV={costoCentersLV} id={id} />
      </div>
      <div className={`flex mt-5`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={handleOpen} changeOption={handleOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full px-2 space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full`}>
            <ProfileBudget budget={oneBudget} token={token} id={id} />
          </div>
        </div>
      </div>
    </>
  )
}