'use client'

import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
//import NavResponsive from "../projects/NavResponsive"
import ProfileExpense from "./ProfileExpense"
import { Expense } from "@/interfaces/Expenses"
import UpdateExpense from "@/components/expenses/UpdateExpense";
import NavResponsive from "./NavResponsive"
import UpdateExtraExpense from "./UpdateExtraExpenses"
import UpdateVoucher from "./UpdateVoucher"
import UpdateCFDI from "./UpdateCFDI"

export default function ExpenseClient({token, user, id, expense, optCostCenter, 
                                        optGlossaries, optProjects, optProviders, 
                                        optResponsibles
                                      }: 
                            { token:string, id:string, user:string, 
                              expense:Expense, optCostCenter:Options[],
                              optGlossaries:Options[], optProviders:Options[], 
                              optResponsibles:Options[], optProjects:Options[]}){

  const [view, setView] = useState<JSX.Element>
                (<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md
                  pl-2" style={{borderColor:'#F8FAFC'}}>
                    <div className=" max-w-md">
                      <UpdateExpense id={id} optCostCenter={optCostCenter} 
                        token={token} user={user} expense={expense} />
                    </div>
                </div>)

  const [opt, setOpt] = useState<number>(1);
  
  useEffect(() => {
    opt===1? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
                  <div className=" max-w-md">
                    <UpdateExpense id={id} optCostCenter={optCostCenter} 
                      token={token} user={user} expense={expense} />
                  </div>
                </div>) : 
      (opt===2? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                            <div className=" max-w-md">
                              <UpdateExtraExpense expense={expense} id={id} 
                                optCostCenter={optCostCenter} optGlossaries={optGlossaries} 
                                optProjects={optProjects} optProviders={optProviders} 
                                optResponsibles={optResponsibles} token={token} user={user} />
                            </div>
                  </div>): 
        (opt===3? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                            style={{borderColor:'#F8FAFC'}}>
                              <UpdateVoucher id={id} token={token} expense={expense} />
                            </div>): 
            (opt===4? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                                style={{borderColor:'#F8FAFC'}}>
                                    <UpdateCFDI id={id} token={token} expense={expense} />
                              </div>): 
                    setView(<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
                              style={{borderColor:'#F8FAFC'}}>
                                <div className=" max-w-md">
                                  <UpdateExpense id={id} optCostCenter={optCostCenter} 
                                    token={token} user={user} expense={expense} />
                                </div>
                            </div>))))
  }, [opt, ])
  
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
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