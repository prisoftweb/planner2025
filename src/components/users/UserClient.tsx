'use client'

import Profile from "./Profile"
import ConfigUser from "./ConfigUser"
import UpdateProfile from "./UpdateProfile"
import ChangePhoto from "./ChangePhoto"
import ChangePassword from "./ChangePassword"
import { useState, useEffect } from "react"

export default function UserClient({user, token, departments, optQuery}: 
                  {user:any, token:string, departments:any, optQuery: number}){
  
  const [view, setView] = useState<JSX.Element>
                (<UpdateProfile departments={departments} user={user} token={token} />)

  const [opt, setOpt] = useState<number>(optQuery);

  useEffect(() => {
    opt===2? setView(<ChangePhoto id={user._id} token={token} />) : 
      (opt===3? setView(<ChangePassword token={token} name={user.name} id={user._id} />): 
        (opt===4? setView(<ConfigUser token={token} user={user} status={user.status} />): 
          setView(<UpdateProfile departments={departments} user={user} token={token} />) ))
  }, [opt])
  
  return(
    <>
      {/* <div className="flex bg-white mt-3 flex-wrap gap-x-7"> */}
      <div className="flex px-1 bg-white mt-3 flex-wrap lg:border-r-8 pr-2" style={{borderColor:'#F8FAFC'}}>
        {/* <div className="w-full max-w-xs"> */}
        <div className="w-full max-w-md lg:max-w-xs">
          <Profile email={user.email} option={opt} name={user.name} photo={user.photo} setOption={setOpt} />
        </div>
        {/* <div className="w-full max-w-md mt-3"> */}
        <div className="mt-3 w-full max-w-md border-t-8 lg:border-t-0 lg:border-l-8 pl-2" 
          style={{borderColor:'#F8FAFC'}}>  
            {view}
        </div>
      </div>
    </>
  )
}