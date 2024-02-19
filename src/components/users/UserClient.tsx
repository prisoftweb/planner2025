'use client'

import Profile from "./Profile"
import ConfigUser from "./ConfigUser"
import UpdateProfile from "./UpdateProfile"
import ChangePhoto from "./ChangePhoto"
import ChangePassword from "./ChangePassword"
import { useState, useEffect } from "react"

export default function UserClient({email, name, photo, token}: 
                            {email:string, name:string, photo:string, token:string}){
  
  const [view, setView] = useState<JSX.Element>
                (<UpdateProfile departmentU="admin" emailU={email} nameU={name} rolU="user" />)

  const [opt, setOpt] = useState<number>(1);

  useEffect(() => {
    opt===2? setView(<ChangePhoto />) : 
      (opt===3? setView(<ChangePassword token={token} />): 
        (opt===4? setView(<ConfigUser />): 
          setView(<UpdateProfile departmentU="admin" emailU={email} nameU={name} rolU="user" />) ))
  }, [opt])
  
  return(
    <>
      <div className="flex px-5 bg-white mt-2">
        <div className="w-1/3 md:w-1/2 mt-5">
          <Profile email={email} name={name} photo={photo} setOption={setOpt} />
        </div>
        <div className="w-full">
          {view}
        </div>
      </div>
    </>
  )
}