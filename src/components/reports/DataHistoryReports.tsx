import ProfileReport from "./ProfileReport"
//import { Options } from "@/interfaces/Common"
import { Report, DateReport } from "@/interfaces/Reports"
import { useState } from "react"
import SendReport from "./SendReport"
import { UsrBack } from "@/interfaces/User"
import HistoryReportData from "./HistoryReportData"

export default function DataHistoryReports({report, user, id, token, dates}:
                              {report:Report, user:UsrBack, id:string, 
                                token:string, dates: DateReport[] }) {
  
  const [isSend, setIsSend] = useState<boolean>(false);

  const handleSend = (value: boolean) => {
    setIsSend(value);
  }

  return (
    <>
      <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
        style={{'backgroundColor': '#F8FAFC'}}>
        <div className={`w-full max-w-md`}>
          <ProfileReport report={report} send={handleSend} token={token}
            user={user} id={id} dates={dates} />
        </div>
        <div className="mt-3 w-full md:w-1/2 xl:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
          style={{borderColor:'#F8FAFC'}}>
            <HistoryReportData report={report} />
        </div>
      </div>
      {isSend && <SendReport report={report} send={handleSend} 
                    token='' user={user._id} node={undefined} isClose={false} />}
    </>
  )
}
