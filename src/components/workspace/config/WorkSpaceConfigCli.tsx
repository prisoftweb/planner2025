'use client'

import { useState } from "react"
import ProfileAccount from "../ProfileAccount"
import ConfigData from "./ConfigData"
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";

type WSCliProps = {
  token:string, 
  id:string,
  workspace: IWorkSpaceMin 
}

export default function WorkSpaceConfigCli({token, id, workspace }: WSCliProps){

  // const [opt, setOpt] = useState<number>(1);
  // const handleOpt = (value: number) => {
  //   setOpt(value);
  // }

  const view = <div className="mt-3 w-full p-2" 
                          style={{borderColor:'#F8FAFC'}}>
                    <div className="w-full h-full ">
                      <div className="w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
                        <div className="flex flex-wrap gap-y-3 p-3">
                          <ConfigData token={token} id={id} workspace={workspace} />
                        </div>
                      </div>
                    </div>
                </div>

  return(
    <>
      <div className={`flex`}>
        <div className="flex w-full px-2 flex-wrap lg:flex-nowrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileAccount workspace={workspace} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}