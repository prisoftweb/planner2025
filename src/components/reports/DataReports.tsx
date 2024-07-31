import ProfileReport from "./ProfileReport"
import UpdateReport from "./UpdateReport"
import { Options } from "@/interfaces/Common"
import { Report, CostReport } from "@/interfaces/Reports"
import { useState, useRef } from "react"
import SendReport from "./SendReport"
import { Node } from "@/interfaces/Nodes"
//import { Expense } from "@/interfaces/Expenses"
import { UsrBack } from "@/interfaces/User"

export default function DataReports({token, report, user, node, id}:
                              {token:string, report:Report, 
                                user:UsrBack, node:Node, id:string }) {
  
  const [isSend, setIsSend] = useState<boolean>(false);
  const refClose = useRef(false);
  //const [isClose, setIsClose] = useState<boolean>(false);

  const handleSend = (value: boolean, valueClose: boolean) => {
    refClose.current = valueClose;
    console.log('handle send close ', valueClose);
    setIsSend(value);
    //setIsClose(valueClose);
  }

  return (
    <>
      <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
        style={{'backgroundColor': '#F8FAFC'}}>
        <div className={`w-full max-w-md`}>
          <ProfileReport report={report} send={handleSend} token={token}
            user={user} id={id} />
        </div>
        <div className="mt-3 w-full md:w-1/2 xl:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
          style={{borderColor:'#F8FAFC'}}>
            <UpdateReport token={token} report={report} />
        </div>
      </div>
      {isSend && <SendReport report={report} send={handleSend} 
                    token={token} user={user._id} node={node} isClose={refClose.current} />}
    </>
  )
}
