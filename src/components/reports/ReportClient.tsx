'use client'

import { useState, useEffect } from "react"
import NavResponsive from "./NavResponsive"
import DataReports from "./DataReports"
import { Report, DateReport } from "@/interfaces/Reports"
import CostsInReport from "./CostsInReport"
import { Node } from "@/interfaces/Nodes"
import { UsrBack } from "@/interfaces/User"
import NuevoComponente from "./NuevoComponente"
import { useOneReportStore } from "@/app/store/reportsStore"

export default function ReportClient({report, token, id, user, 
                                node, dates}: 
                            {report:Report, token:string, id:string, 
                              user:UsrBack, node:Node, dates: DateReport[] }){
  const [opt, setOpt] = useState<number>(1);

  const {updateOneReportStore, oneReport} = useOneReportStore();

  useEffect(() => {
    updateOneReportStore(report);

    return () => updateOneReportStore(undefined);
  }, []);
  
  let view:JSX.Element = <></>;
  if(oneReport){
    opt===3? view =(<CostsInReport id={id} token={token} report={report} />) : 
      opt===2?  view =(<DataReports id={id} token={token} report={report} user={user} 
                          node={node} dates={dates} />): 
                  view = (<NuevoComponente id={id} token={token} report={report} />)
  }
  
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