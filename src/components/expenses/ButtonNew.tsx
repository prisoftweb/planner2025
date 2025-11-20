'use client'
import Button from "../Button"
import { useState } from "react";
import NewExpenseContainer from "./NewExpenseContainer";
import { UsrBack } from "@/interfaces/User";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNew({token, user}: {token:string, user:UsrBack,}){
  const [newExpense, setNewExpense] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewExpense(true)}>Nuevo</Button>
          {newExpense && (
            <ContainerSideNav width="w-full sm:max-w-3xl">
              <NewExpenseContainer showForm={setNewExpense} token={token} 
                            user={user} />
            </ContainerSideNav>
          )}
    </>
  )
}