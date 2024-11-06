'use client'

import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
//import NavResponsive from "../projects/NavResponsive"
import ProfileExpense from "./ProfileExpense"
import { OneExpense } from "@/interfaces/Expenses"
import UpdateExpense from "@/components/expenses/UpdateExpense";
import NavResponsive from "./NavResponsive"
import UpdateExtraExpense from "./UpdateExtraExpenses"
import UpdateVoucher from "./UpdateVoucher"
import UpdateCFDI from "./UpdateCFDI"
import { useNewExpense } from "@/app/store/newExpense"

export default function ExpenseClient({token, user, id, expense, isHistory=false}: 
                            { token:string, id:string, user:string, 
                              expense:OneExpense, isHistory?:boolean}){

  const {updateCurrentExpense} = useNewExpense();
  useEffect(() => {
    console.log('new expense => ', expense);
    updateCurrentExpense(expense);

    return () => updateCurrentExpense(null);
  }, []);

  const [opt, setOpt] = useState<number>(1);

  const view = (
    opt===1? (<div className="mt-3 w-full max-w-xl bg-white rounded-lg shadow-md pl-2 px-3" 
      style={{borderColor:'#F8FAFC'}}>
        <div className=" max-w-2xl">
          <UpdateExpense id={id} token={token} expense={expense} 
            isticket={expense.isticket} isHistory={isHistory} />
        </div>
      </div>) : 
    (opt===2? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
                      <div className=" max-w-lg">
                        <UpdateExtraExpense expense={expense} id={id} 
                          isHistory={isHistory} token={token}
                        />
                      </div>
            </div>): 
    (opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                        <UpdateVoucher id={id} token={token} expense={expense} isHistory={isHistory} />
                      </div>): 
      (opt===4? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                              <UpdateCFDI id={id} token={token} expense={expense} isHistory={isHistory} />
                        </div>): 
              (<div className="mt-3 w-full p-2 md:max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                        style={{borderColor:'#F8FAFC'}}>
                          <div className=" max-w-lg">
                            <UpdateExpense id={id} token={token} expense={expense} 
                              isticket={expense.isticket} isHistory={isHistory}  />
                          </div>
                      </div>))))
  )

  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} 
                  changeOption={setOpt} option={opt} isticket={expense.isticket} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap lg:flex-nowrap space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            {/* <ProfileProject project={project} /> */}
            <ProfileExpense expense={expense} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}