'use client'

import NewWorkSpace from "@/components/workspace/NewWorkSpace"
import CodeWorkSpaceValidation from "@/components/workspace/CodeWorkSpaceValidation"
import NewCompanyWorkSpace from "@/components/workspace/NewCompanyWorkSpace"
import AddAddressDataCompany from "@/components/workspace/AddAddressDataCompany"
import { useState } from "react"
import { IWorkSpace } from "@/interfaces/WorkSpaces"
import { Company } from "@/interfaces/Companies"
import { UsrBack } from "@/interfaces/User"

export default function ContainerNewWorkSpace() {

  const [index, setIndex]=useState<number>(1);
  const [emailUser, setEmailUser]=useState<string>();
  const [workSpaceData, setWorkSpaceData]=useState<IWorkSpace>();
  const [companyData, setCompanyData]=useState<Company>();
  const [userData, setUserData]=useState<UsrBack>();

  const handleIndex=(value:number) => {
    setIndex(value);
  }

  const handleEmail= (value:string) => {
    setEmailUser(value);
  }

  const handleWorkSpaceData= (value:IWorkSpace) => {
    setWorkSpaceData(value);
  }

  const handleCompanyData= (value:Company) => {
    setCompanyData(value);
  }

  const handleUserData= (value:UsrBack) => {
    setUserData(value);
  }

  const view = index==2 && emailUser? (
    <CodeWorkSpaceValidation handleIndex={handleIndex} emailUser={emailUser} />
  ): index==3? (
    <>
      {workSpaceData && userData && <NewCompanyWorkSpace handleIndex={handleIndex} workspace={workSpaceData} 
                            handleCompany={handleCompanyData} user={userData} />}
    </>
  ): index==4? (
    <>
      {companyData && userData && <AddAddressDataCompany handleIndex={handleIndex} company={companyData} user={userData} />}
    </>
  ): (
    <NewWorkSpace handleIndex={handleIndex} handleEmail={handleEmail} handleWorkSpace={handleWorkSpaceData} 
        handleUser={handleUserData} />
  )

  return (
    <div>{view}</div>
  )
}
