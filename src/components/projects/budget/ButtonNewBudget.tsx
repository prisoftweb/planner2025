'use client'
import Button from "@/components/Button";
import NewBudgetCostCenter from "./NewBudgetCostCenter";
import { CostoCenterLV, CostCenter } from "@/interfaces/CostCenter";

export default function ButtonNewBudget({ token, handleNewBudget, openNewBudget, user, 
      costoCenters, id }: 
  {token:string, handleNewBudget: Function, openNewBudget: boolean, user:string,
     costoCenters: CostCenter[], id:string }){

  return(
    <>
      <Button type="button" onClick={() => handleNewBudget(true)}>Nuevo</Button>
          {openNewBudget && <NewBudgetCostCenter closeForm={handleNewBudget} user={user}
            costoCenters={costoCenters} token={token}  id={id}/> }
    </>
  )
}