'use client'
import Button from "../Button"
import { useState } from "react";
import NewExpenseContainer from "./NewExpenseContainer";
import { UsrBack } from "@/interfaces/User";

export default function ButtonNew({token, user}: {token:string, user:UsrBack,}){
  const [newExpense, setNewExpense] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewExpense(true)}>Nuevo</Button>
          {newExpense && (
            <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
              <NewExpenseContainer showForm={setNewExpense} token={token} 
                            user={user} />
            </div>
          )}
    </>
  )
}