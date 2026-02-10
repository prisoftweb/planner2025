'use client'

import { useState, useEffect } from "react"
import ProfileExpense from "@/components/expenses/ProfileExpense"
import ProfileAdvanceProvider from "./ProfileAdvanceProvider"
import { OneExpense } from "@/interfaces/Expenses"
import UpdateExpense from "@/components/expenses/UpdateExpense";
import NavResponsiveAdvance from "./NavResponsiveAdvance";
// import UpdateExtraExpense from "./UpdateExtraExpenses"
// import UpdateVoucher from "./UpdateVoucher"
import UpdateCFDI from "@/components/expenses/UpdateCFDI";
import { useNewExpense } from "@/app/store/newExpense"
// import AddCFDIRelations from "./AddCFDIRelations";
import SumaryAdvanceProvider from "./SumaryAdvanceProvider";
import TableInvoicesAndCreditNotes from "./TableInvoicesAndCreditNotes"
import { ProviderMin } from "@/interfaces/Providers"

export default function AdvanceClient({token, user, id, provider, advance}: 
  { token:string, id:string, user:string, provider:ProviderMin, advance:OneExpense}){

  const {updateCurrentExpense} = useNewExpense();
  useEffect(() => {
    updateCurrentExpense(advance);

    return () => updateCurrentExpense(null);
  }, []);

  const [opt, setOpt] = useState<number>(1);
  const [widhtPage, setWidhtPage] = useState<number>(900);

  const handleResize = () => {
    setWidhtPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
  }

   useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidhtPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  const view = (
    opt===1? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3 h-screen" 
                          style={{borderColor:'#F8FAFC'}}>
                              {/* <UpdateCFDI id={id} token={token} expense={expense} isHistory={isHistory} /> */}
                              <SumaryAdvanceProvider advance={advance} />
                        </div>) : 
    (opt===2? (<div className="mt-3 w-full flex space-x-2 flex-wrap 2xl:flex-nowrap" >
                <div className="w-full max-w-[1800px] bg-white rounded-lg shadow-md pl-2 px-3" style={{borderColor:'#F8FAFC'}}>
                  <TableInvoicesAndCreditNotes provider={provider} token={token} user={user} advance={advance}
                      ida={advance._id} pending={advance.advancesToSuppliers?.currentbalance?? 0} />
                </div>
              </div>): //max w-md antes abajo
              <div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
                      <div className=" max-w-lg">
                        {/* <UpdateExtraExpense expense={expense} id={id} 
                          isHistory={isHistory} token={token} isticket={expense.isticket}
                        /> */}
                      </div>
              </div>)
  )
  
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsiveAdvance open={open} setOpen={setOpen}
                  changeOption={setOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full px-2 flex-wrap lg:flex-nowrap space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileAdvanceProvider token={token} user={user} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}