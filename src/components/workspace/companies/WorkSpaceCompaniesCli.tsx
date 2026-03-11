'use client'

import ProfileAccount from "../ProfileAccount"
import CompaniesTableWorkSpace from "./CompaniesTableWorkSpace"
import { ICompanyWorkSpace, ICompanyInWorkSpace } from "@/interfaces/WorkSpaces"
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";

type WSCliProps = {
  token:string, 
  companies: ICompanyInWorkSpace[],
  workspace: IWorkSpaceMin,
  idUser:string
}

export default function WorkSpaceCompaniesCli({token, companies, workspace, idUser }: WSCliProps){

  const view = <div className="mt-3 md:mt-1 w-full lg:p-2" 
                          style={{borderColor:'#F8FAFC'}}>
                    <div className="w-full h-full sm:max-w-md md:max-w-lg ">
                      <div className="w-full max-w-lg bg-white rounded-lg shadow-md md:pl-2 px-3">
                        <div className="flex flex-wrap gap-y-3 p-3">
                          <CompaniesTableWorkSpace companiesParam={companies} token={token} idWS={workspace._id} idUSer={idUser} />
                        </div>
                      </div>
                    </div>
                </div>

  return(
    <>
      <div className={`flex`}>
        <div className="flex w-full md:px-2 flex-wrap lg:flex-nowrap" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full sm:max-w-md`}>
            <ProfileAccount workspace={workspace} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}