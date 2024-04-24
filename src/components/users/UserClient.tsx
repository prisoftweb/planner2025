'use client'

import Profile from "./Profile"
import ConfigUser from "./ConfigUser"
import UpdateProfile from "./UpdateProfile"
import ChangePhoto from "./ChangePhoto"
import ChangePassword from "./ChangePassword"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"

export default function UserClient({user, token, departments, optQuery, optsRole}: 
                  {user:any, token:string, departments:any, 
                    optQuery: number, optsRole:Options[]}){
  
  const [view, setView] = useState<JSX.Element>
                (<UpdateProfile departments={departments} user={user} 
                      token={token} optsRoles={optsRole} />)

  const [opt, setOpt] = useState<number>(optQuery);

  useEffect(() => {
    opt===2? setView(<ChangePhoto id={user._id} token={token} />) : 
      (opt===3? setView(<ChangePassword token={token} name={user.name} id={user._id} />): 
        (opt===4? setView(<ConfigUser token={token} user={user} status={user.status} />): 
          setView(<UpdateProfile departments={departments} user={user} 
                      token={token} optsRoles={optsRole} />) ))
  }, [opt])
  
  return(
    <>
      

      <div className={``}>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2 bg-slate-200">
          <div className={`w-full max-w-md`}>
            <Profile email={user.email} option={opt} name={user.name} photo={user.photo} setOption={setOpt} />
          </div>
          <div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
              {view}
          </div>
        </div>
      </div>
    </>
  )
}