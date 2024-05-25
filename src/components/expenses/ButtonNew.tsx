'use client'
import Button from "../Button"
import { useState } from "react";
import NewExpenseContainer from "./NewExpenseContainer";
import { Options } from "@/interfaces/Common";

export default function ButtonNew({token, user, optCostCenter, optProviders, 
                              optResponsibles, optGlossaries, optProjects, 
                              optCategories, optConditions, optTypes}: 
                          {token:string, user:string, optCostCenter:Options[],
                            optProviders:Options[], optResponsibles:Options[],
                            optGlossaries:Options[], optProjects:Options[], 
                            optCategories:Options[], optTypes:Options[], 
                            optConditions:Options[]}){
  const [newExpense, setNewExpense] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewExpense(true)}>Nuevo</Button>
          {newExpense && <NewExpenseContainer showForm={setNewExpense} token={token} 
                            user={user} optCostCenter={optCostCenter} 
                            optProviders={optProviders} optResponsibles={optResponsibles}
                            optGlossaries={optGlossaries} optProjects={optProjects} 
                            optCategories={optCategories} optConditions={optConditions}
                            optTypes={optTypes}  
                        />}
    </>
  )
}