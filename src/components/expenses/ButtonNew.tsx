'use client'
import Button from "../Button"
import { useState } from "react";
import NewExpenseContainer from "./NewExpenseContainer";
import { Options } from "@/interfaces/Common";
import { ReportParse } from "@/interfaces/Reports";

export default function ButtonNew({token, user, optCostCenter, optProviders, 
                              optResponsibles, optProjects, 
                              optCategories, optConditions, optTypes, 
                              reports, optReports, optCostCenterDeductible, 
                              idLabour, idTicket, optVats, optProvidersSAT}: 
                          {token:string, user:string, optCostCenter:Options[],
                            optProviders:Options[], optResponsibles:Options[],
                            optProjects:Options[], optConditions:Options[],
                            optCategories:Options[], optTypes:Options[], 
                            reports:ReportParse[], optReports:Options[], 
                            optCostCenterDeductible:Options[], idLabour:string, 
                            idTicket:string, optVats:Options[], optProvidersSAT:Options[] }){
  const [newExpense, setNewExpense] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewExpense(true)}>Nuevo</Button>
          {newExpense && <NewExpenseContainer showForm={setNewExpense} token={token} 
                            user={user} optCostCenter={optCostCenter} 
                            optProviders={optProviders} optResponsibles={optResponsibles}
                            optProjects={optProjects} optVats={optVats}
                            optCategories={optCategories} optConditions={optConditions}
                            optTypes={optTypes} reports={reports}
                            optReports={optReports} idLabour={idLabour} idTicket={idTicket}
                            optCostCenterDeductible={optCostCenterDeductible}
                            optProvidersSAT={optProvidersSAT}
                        />}
    </>
  )
}