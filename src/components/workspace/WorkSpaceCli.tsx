'use client'

import { useState } from "react"
import ProfileAccount from "./ProfileAccount"
import AccountData from "./AccountData"
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces"
import { getWorkSpacesMin } from "@/app/api/routeWorkspace"
import { showToastMessageError } from "../Alert"

type WSCliProps = {
  token:string, 
  id:string, 
  workspaceParam: IWorkSpaceMin,
  idUser: string
}

export default function WorkSpaceCli({token, id, workspaceParam, idUser }: WSCliProps){

  const [workspace, setWorkspace]=useState<IWorkSpaceMin>(workspaceParam);

  const fetchWorkSpace= async () => {
    const res = await getWorkSpacesMin(token);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setWorkspace(res[res.length-1]);
    }
  }

  const view = <div className="mt-3 w-full p-2" 
                          style={{borderColor:'#F8FAFC'}}>
                    <div className="w-full h-full ">
                      <div className="w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
                        <div className="flex flex-wrap gap-y-3 p-3">
                          <AccountData token={token} id={id} workspace={workspace} 
                            fetchWorkSpace={fetchWorkSpace} idUser={idUser} />
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