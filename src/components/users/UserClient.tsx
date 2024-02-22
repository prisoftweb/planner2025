'use client'

import Profile from "./Profile"
import ConfigUser from "./ConfigUser"
import UpdateProfile from "./UpdateProfile"
import ChangePhoto from "./ChangePhoto"
import ChangePassword from "./ChangePassword"
import { useState, useEffect } from "react"

export default function UserClient({user, token, departments}: 
                  {user:any, token:string, departments:any}){
  
  const [view, setView] = useState<JSX.Element>
                (<UpdateProfile departments={departments} user={user} token={token} />)

  const [opt, setOpt] = useState<number>(1);

  useEffect(() => {
    opt===2? setView(<ChangePhoto id={user._id} token={token} />) : 
      (opt===3? setView(<ChangePassword token={token} name={user.name} id={user._id} />): 
        (opt===4? setView(<ConfigUser token={token} user={user} status={user.status} />): 
          setView(<UpdateProfile departments={departments} user={user} token={token} />) ))
  }, [opt])
  
  return(
    <>
      <div className="flex px-5 bg-white mt-2">
        <div className="w-1/3 md:w-1/2 mt-5">
          <Profile email={user.email} name={user.name} photo={user.photo} setOption={setOpt} />
        </div>
        <div className="w-full">
          {view}
        </div>
      </div>
    </>
  )
}