'use client'

import { useState, useEffect } from "react"
import DataReports from "./DataReports"
import { Report, DateReport } from "@/interfaces/Reports"
import CostsInReport from "./CostsInReport"
import { Node } from "@/interfaces/Nodes"
import { UsrBack } from "@/interfaces/User"
import NuevoComponente from "./NuevoComponente"
import { useOneReportStore } from "@/app/store/reportsStore"
import NavTab from "@/components/reports/NavTab";
import ProfileReport from "./ProfileReport"
import Selectize from "../Selectize"
import ArrowReturn from "../ArrowReturn"
import { Options } from "@/interfaces/Common"

export default function ReportClient({report, token, id, user, node, dates, optReports}: 
  {report:Report, token:string, id:string, user:UsrBack, node:Node|any, dates: DateReport[], optReports: Options[] }){
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

  const handleOpt = (value:number) => {
    setOpt(value);
  }

  return(
    <>
      <NavTab setTab={handleOpt} tab={opt} />

      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center my-2 ml-2 sm:ml-0">
          <ArrowReturn link="/reports" />
          <p className="text-xl ml-4 font-medium">{report.name}</p>
        </div>
        <div className="ml-2 sm:ml-0 w-full max-w-md">
          <Selectize options={optReports} routePage="reports" subpath="/profile" />
        </div>
      </div>

      <div>
        {view}
      </div>
    </>
  )
}