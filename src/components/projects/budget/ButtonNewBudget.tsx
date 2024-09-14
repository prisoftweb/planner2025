'use client'
import Button from "@/components/Button";
import NewBudgetCostCenter from "./NewBudgetCostCenter";
import { CostoCenterLV } from "@/interfaces/CostCenter";

export default function ButtonNewBudget({ token, handleNewBudget, openNewBudget, user, 
      costoCentersLV, id }: 
  {token:string, handleNewBudget: Function, openNewBudget: boolean, user:string,
     costoCentersLV: CostoCenterLV[], id:string }){

  return(
    <>
      <Button type="button" onClick={() => handleNewBudget(true)}>Nuevo</Button>
          {openNewBudget && <NewBudgetCostCenter closeForm={handleNewBudget} user={user}
            costoCentersLV={costoCentersLV} token={token}  id={id}/> }
    </>
  )
}