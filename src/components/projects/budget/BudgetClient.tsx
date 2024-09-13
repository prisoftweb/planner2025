'use client'

import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { OneProjectMin } from "@/interfaces/Projects"
// import DataBasic from "./DataBasic"
// import ExtraData from "./ExtraData"
// import Address from "./Address"
// import GuaranteeProject from "./GuaranteeProject"
// import ProfileProject from "./ProfileProject"
// import ProgressProject from "./ProgressProject"

import { FullBudget } from "@/interfaces/BudgetProfile"
import { useOneBudget } from "@/app/store/budgetProject"
import NavResponsive from "./NavResponsive"
import ProfileBudget from "./ProfileBudget"

export default function BudgetCli({budget, token, id}: 
                            {budget: FullBudget, token:string, id:string}){

  const [opt, setOpt] = useState<number>(1);
  const {updateOneBudget} = useOneBudget();
  
  useEffect(() => {
    updateOneBudget(budget);
  }, []);

  const view = (
    opt===1? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
              
            </div>) : 
      (opt===2? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                
              </div>):
        <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
              style={{borderColor:'#F8FAFC'}}>
        
        </div> 
      )
  )
  
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (value: boolean) => {
    setOpen(value);
  }

  const handleOpt = (value: number) => {
    setOpt(value);
  }

  return(
    <>
      <div className={`flex mt-5`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={handleOpen} changeOption={handleOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full px-2 flex-wrap space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          {/* <div className={`w-full max-w-md`}> */}
          <div className={`w-full`}>
            {/* <ProfileProject project={project} /> */}
            <ProfileBudget budget={budget} />
          </div>
          {/* {view} */}
        </div>
      </div>
    </>
  )
}