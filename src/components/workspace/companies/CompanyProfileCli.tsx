'use client'

import { useState } from "react"
import AccountData from "../AccountData"
import { getWorkSpacesMin } from "@/app/api/routeWorkspace"
import { showToastMessageError } from "@/components/Alert"
import { Company } from "@/interfaces/Companies"
import ProfileCompany from "./ProfileCompany"
import NavProfileCompany from "@/components/workspace/companies/NavProfileCompany";
import DataBasicProfileCompany from "./DataBasicProfileCompany"
import LogosProfileCompany from "./LogosProfileCompany"
import AddressProfileCompany from "./AddressProfileCompany"
import { getCompany } from "@/app/api/routeCompany"
import BillingDataCompany from "./BillingDataCompany"

type WSCliProps = {
  token:string, 
  // id:string, 
  companyParam:Company
}

export default function CompanyProfileCli({token, companyParam }: WSCliProps){

  const [company, setCompany]=useState<Company>(companyParam);
  const [index, setIndex]=useState<number>(1);

  const handleIndex = (value:number) => {
    setIndex(value);
  }

  const fetchCompany= async () => {
    const res = await getCompany(token, company._id?? '');
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setCompany(res);
    }
  }

  // const fetchWorkSpace= async () => {
  //   const res = await getWorkSpacesMin(token);
  //   if(typeof(res)==='string'){
  //     showToastMessageError(res);
  //   }else{
  //     setCompany(res);
  //   }
  // }

  let viewComponent = <></>;
  if(index===2)
    viewComponent = <LogosProfileCompany company={company} fetchCompany={fetchCompany} token={token} />;
  else if(index===3)
    viewComponent = <AddressProfileCompany company={company} fetchCompany={fetchCompany} token={token} />;
  else if(index===4)
    viewComponent = <BillingDataCompany company={company} token={token} fetchCompany={fetchCompany} />;
  else
    viewComponent = <DataBasicProfileCompany company={company} token={token} fetchCompany={fetchCompany} />;

  const view = <div className="w-full px-2" 
                          style={{borderColor:'#F8FAFC'}}>
                    <div className="w-full h-full ">
                      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md pl-2 px-3">
                        <NavProfileCompany tab={index} handleIndex={handleIndex} />
                        <div className="flex flex-wrap gap-y-3 p-3">
                          {viewComponent}
                          {/* <AccountData token={token} id={id} workspace={workspace} fetchWorkSpace={fetchWorkSpace} /> */}
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
            <ProfileCompany company={company} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}