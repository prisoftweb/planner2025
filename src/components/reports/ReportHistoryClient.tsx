'use client'

import { useState, useEffect } from "react"
import { Report, DateReport } from "@/interfaces/Reports"
import CostsInReport from "./CostsInReport"
import { UsrBack } from "@/interfaces/User"
import DataHistoryReports from "./DataHistoryReports"
import NavTab from "@/components/reports/NavTab";
import ProfileReport from "./ProfileReport"
import NuevoComponente from "./NuevoComponente"
import ArrowReturn from "../ArrowReturn"
import { Options } from "@/interfaces/Common"
import Selectize from "../Selectize"
import { useOneReportStore } from "@/app/store/reportsStore"

export default function ReportHistoryClient({report, user, id, token, dates, optReports}: 
  {report:Report, user:UsrBack, id:string, token:string, dates:DateReport[], optReports: Options[] }){

  const [opt, setOpt] = useState<number>(1);

  const {updateOneReportStore, oneReport} = useOneReportStore();
  
  useEffect(() => {
    updateOneReportStore(report);

    return () => updateOneReportStore(undefined);
  }, []);
  
  let view:JSX.Element = <></>;

  const handleSend = () => {}

  opt===3? view =(<div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
                      style={{'backgroundColor': '#F8FAFC'}}>
                      <div className={`w-full max-w-md`}>
                        <ProfileReport report={report} send={handleSend} token={token}
                          user={user} id={id} dates={dates} isSendReport={false} />
                      </div>
                    </div>) : 
      opt===2?  view =(<DataHistoryReports id={id} token={token} report={report} user={user} 
                        dates={dates} />):
        opt===4?  view =(<CostsInReport id={id} token={token} report={report} />): 
                  view = (<NuevoComponente id={id} token={token} report={report} />)

  const handleOpt = (value:number) => {
    setOpt(value);
  }

  return(
    <>
      <NavTab setTab={handleOpt} tab={opt} />

      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center my-2">
          <ArrowReturn link="/reports/history" />
          <p className="text-xl ml-4 font-medium">{report.name}</p>
        </div>
        <Selectize options={optReports} routePage="reports/history" subpath="" />
      </div>

      {view}
    </>
  )
}