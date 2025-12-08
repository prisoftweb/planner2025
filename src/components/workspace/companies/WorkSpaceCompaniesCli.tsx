'use client'

import { useState, useEffect } from "react"
import ProfileAccount from "../ProfileAccount"
import CompaniesTableWorkSpace from "./CompaniesTableWorkSpace"
import { ICompanyWorkSpace } from "@/interfaces/WorkSpaces"
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";

type WSCliProps = {
  token:string, 
  id:string,
  companies: ICompanyWorkSpace[],
  workspace: IWorkSpaceMin
}

export default function WorkSpaceCompaniesCli({token, id, companies, workspace }: WSCliProps){

  const [opt, setOpt] = useState<number>(1);
  const handleOpt = (value: number) => {
    setOpt(value);
  }

  const view = <div className="mt-3 w-full p-2" 
                          style={{borderColor:'#F8FAFC'}}>
                    <div className="w-full h-full ">
                      <div className="w-full max-w-[1800px] bg-white rounded-lg shadow-md pl-2 px-3">
                        <div className="flex flex-wrap gap-y-3 p-3">
                          <CompaniesTableWorkSpace companiesParam={companies} token={token} />
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