'use client'

import { useState } from "react"
import NavTab from "./NavTab";
import TabUser from "./TabUsers";
import { UsrBack } from "@/interfaces/User";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function ContainerProfileUser({token, user, permissions}:{user:UsrBack, token:string, permissions:IPermissionsAndComponents}) {

  const [tab, setTab] = useState<number>(1);

  const handleTab = (numTab: number) => {
    setTab(numTab);
  }

  console.log('permissions => ', permissions);

  let view: JSX.Element;
  if(tab===1 || tab===2 || tab===3 || tab===5){
    view = <TabUser user={user} opt={tab} token={token} permissions={permissions} />
  }else{
    view = <>Creando....</>
  }

  return (
    <>
      <div className="mt-3">
        <NavTab tab={tab} handleTab={handleTab} permissions={permissions} />
      </div>
      {/* <TabUser user={user} opt={tab} token={token} /> */}
      {view}
    </>
  )
}
