'use client'

import { useEffect } from "react"
import ProfileExpense from "./ProfileExpense"
import { OneExpense } from "@/interfaces/Expenses"
import { useNewExpense } from "@/app/store/newExpense"
import StatusCostComponent from "./StatusCostComponent"

export default function ExpenseStatusClient({token, user, id, expense, isHistory=false}: 
                            { token:string, id:string, user:string, 
                              expense:OneExpense, isHistory?:boolean}){

  const {updateCurrentExpense} = useNewExpense();
  useEffect(() => {
    updateCurrentExpense(expense);

    return () => updateCurrentExpense(null);
  }, []);

  return(
    <>
      <div className={`flex`}>
        <div className="flex w-full max-w-5xl px-2 flex-wrap lg:flex-nowrap space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileExpense expense={expense} />
          </div>
          <div className="mt-3 w-full p-2 md:max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
              <div className=" max-w-lg">
                <StatusCostComponent cost={expense._id} token={token} />
              </div>
          </div>
        </div>
      </div>
    </>
  )
}