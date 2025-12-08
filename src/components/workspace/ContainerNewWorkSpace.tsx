'use client'

import NewWorkSpace from "@/components/workspace/NewWorkSpace"
import CodeWorkSpaceValidation from "@/components/workspace/CodeWorkSpaceValidation"
import NewCompanyWorkSpace from "@/components/workspace/NewCompanyWorkSpace"
import AddAddressDataCompany from "@/components/workspace/AddAddressDataCompany"
import { useState } from "react"

export default function ContainerNewWorkSpace() {

  const [index, setIndex]=useState<number>(1);
  const [emailUser, setEmailUser]=useState<string>();

  const handleIndex=(value:number) => {
    setIndex(value);
  }

  const handleEmail= (value:string) => {
    setEmailUser(value);
  }

  const view = index==2 && emailUser? (
    <CodeWorkSpaceValidation handleIndex={handleIndex} emailUser={emailUser} />
  ): index==3? (
    <NewCompanyWorkSpace handleIndex={handleIndex} />
  ): index==4? (
    <AddAddressDataCompany handleIndex={handleIndex} />
  ): (
    <NewWorkSpace handleIndex={handleIndex} handleEmail={handleEmail} />
  )

  return (
    <div>{view}</div>
  )
}
