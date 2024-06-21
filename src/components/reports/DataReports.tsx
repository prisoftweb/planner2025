import ProfileReport from "./ProfileReport"
import UpdateReport from "./UpdateReport"
import { Options } from "@/interfaces/Common"
import { Report } from "@/interfaces/Reports"
import { useState } from "react"
import SendReport from "./SendReport"
import { Node } from "@/interfaces/Nodes"
import { Expense } from "@/interfaces/Expenses"

export default function DataReports({companies, departments, projects, token,
                                 report, user, node, costs}:
                              {departments:Options[], companies:Options[], 
                                projects:Options[], token:string, report:Report, 
                                user:string, node:Node, costs:Expense[] }) {
  
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
            costs={costs} />
        </div>
        <div className="mt-3 w-full md:w-1/2 xl:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
          style={{borderColor:'#F8FAFC'}}>
            <UpdateReport companies={companies} departments={departments} 
                  projects={projects} token={token} report={report} />
        </div>
      </div>
      {isSend && <SendReport report={report} send={handleSend} 
                    token={token} user={user} node={node} />}
    </>
  )
}
