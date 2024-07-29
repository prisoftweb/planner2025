'use client'
import Button from "../Button"
import { useState } from "react";
import NewExpenseContainer from "./NewExpenseContainer";
import { Options } from "@/interfaces/Common";
import { ReportParse } from "@/interfaces/Reports";
import { UsrBack } from "@/interfaces/User";

export default function ButtonNew({token, user}: {token:string, user:UsrBack,}){
  const [newExpense, setNewExpense] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewExpense(true)}>Nuevo</Button>
          {newExpense && <NewExpenseContainer showForm={setNewExpense} token={token} 
                            user={user} />}
    </>
  )
}