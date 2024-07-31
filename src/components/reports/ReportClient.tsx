'use client'

import { useState, useEffect } from "react"
import NavResponsive from "./NavResponsive"
import { Options } from "@/interfaces/Common"
import DataReports from "./DataReports"
import { Report, CostReport, ReportMin } from "@/interfaces/Reports"
import CostsInReport from "./CostsInReport"
//import { Expense } from "@/interfaces/Expenses"
import { Node } from "@/interfaces/Nodes"
import { UsrBack } from "@/interfaces/User"

export default function ReportClient({report, token, id, user, 
                                node}: 
                            {report:Report, token:string, id:string, 
                              user:UsrBack, node:Node }){
  
  //const [view, setView] = useState<JSX.Element>(<></>)

  const [opt, setOpt] = useState<number>(1);
  
  // useEffect(() => {
  //   opt===2? setView(<CostsInReport report={report} costs={expenses} />) : 
  //                 setView(<DataReports companies={companies} costs={expenses}
  //                             departments={departments} projects={projects} 
  //                   token={token} report={report} user={user} node={node} />)
  // }, [opt, ])
  let view:JSX.Element = <></>;
  opt===2? view =(<CostsInReport id={id} token={token} report={report} />) : 
                  view =(<DataReports id={id} token={token} report={report} user={user} node={node} />)
  
  const [open, setOpen] = useState<boolean>(false);
  
  const handeleOpen = (value:boolean) => {
    setOpen(value);
  }

  const handleOpt = (value:number) => {
    setOpt(value);
  }

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={handeleOpen} changeOption={handleOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          {/* <div className={`w-full max-w-md`}>
            <ProfileReport />
          </div> */}
          {view}
        </div>
      </div>
    </>
  )
}