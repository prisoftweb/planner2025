'use client'

import { useState } from "react"
import NavResponsive from "./NavResponsive"
import { Report, DateReport } from "@/interfaces/Reports"
import CostsInReport from "./CostsInReport"
import { UsrBack } from "@/interfaces/User"
import DataHistoryReports from "./DataHistoryReports"

export default function ReportHistoryClient({report, user, id, token, dates}: 
  {report:Report, user:UsrBack, id:string, token:string, dates:DateReport[] }){

  const [opt, setOpt] = useState<number>(1);
  
  let view:JSX.Element = <></>;
  opt===2? view =(<CostsInReport report={report} id={id} token={token} />) : 
                  view =(<DataHistoryReports report={report} user={user} id={id} token={token} dates={dates} />)

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
          {view}
        </div>
      </div>
    </>
  )
}