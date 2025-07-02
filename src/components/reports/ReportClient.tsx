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
import NavTab from "@/components/reports/NavTab";
import ProfileReport from "./ProfileReport"

export default function ReportClient({report, token, id, user, node, dates}: 
  {report:Report, token:string, id:string, user:UsrBack, node:Node, dates: DateReport[] }){
  const [opt, setOpt] = useState<number>(1);

  const {updateOneReportStore, oneReport} = useOneReportStore();

  useEffect(() => {
    updateOneReportStore(report);

    return () => updateOneReportStore(undefined);
  }, []);
 
  const handleSend = () => {}
  
  let view:JSX.Element = <></>;
  if(oneReport){
    opt===3? view =(<div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
                      style={{'backgroundColor': '#F8FAFC'}}>
                      <div className={`w-full max-w-md`}>
                        <ProfileReport report={report} send={handleSend} token={token}
                          user={user} id={id} dates={dates} isSendReport={false} />
                      </div>
                    </div>) : 
      opt===2?  view =(<DataReports id={id} token={token} report={report} user={user} 
                          node={node} dates={dates} />):
        opt===4?  view =(<CostsInReport id={id} token={token} report={report} />): 
                  view = (<NuevoComponente id={id} token={token} report={report} />)
  }
  
  // const [open, setOpen] = useState<boolean>(false);
  
  // const handeleOpen = (value:boolean) => {
  //   setOpen(value);
  // }

  const handleOpt = (value:number) => {
    setOpt(value);
  }

  return(
    <>
      <NavTab setTab={handleOpt} tab={opt} />
      <div>
        {view}
      </div>
      {/* <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={handeleOpen} changeOption={handleOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          {view}
        </div>
      </div> */}
    </>
  )
}