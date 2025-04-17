'use client'

import { useState, useEffect } from "react"
import { FullBudget } from "@/interfaces/BudgetProfile"
import { useOneBudget } from "@/app/store/budgetProject"
import NavResponsive from "./NavResponsive"
import ProfileBudget from "./ProfileBudget"
import ButtonNewBudget from "./ButtonNewBudget"
import { CostCenter } from "@/interfaces/CostCenter"
import Header from "@/components/HeaderPage";

export default function BudgetCli({budget, token, id, user, costoCenters, projectQuery}: 
  {budget: FullBudget, token:string, id:string, user: string, 
    costoCenters: CostCenter[], projectQuery:string | undefined}){

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
      <Header title={budget.title} previousPage={projectQuery? `/projects/${projectQuery}/budgets`: "/projects/budget"}>
        <ButtonNewBudget handleNewBudget={handleNewBudget} openNewBudget={newBudget} 
          token={token} user={user} costoCenters={costoCenters} id={id} />
      </Header>
      <div className={`flex mt-5`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={handleOpen} changeOption={handleOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full px-2 space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full`}>
            <ProfileBudget budget={oneBudget} token={token} id={id} user={user} />
          </div>
        </div>
      </div>
    </>
  )
}