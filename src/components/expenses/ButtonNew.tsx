'use client'
import Button from "../Button"
import { useState } from "react";
import NewExpenseContainer from "./NewExpenseContainer";
import { UsrBack } from "@/interfaces/User";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNew({token, user, company}: {token:string, user:UsrBack, company:string}){
  const [newExpense, setNewExpense] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewExpense(true)}>Nuevo</Button>
        <ContainerSideNav width="w-full sm:max-w-3xl" open={newExpense}>
          <NewExpenseContainer showForm={setNewExpense} token={token} 
                        user={user} company={company}  />
        </ContainerSideNav>
    </>
  )
}