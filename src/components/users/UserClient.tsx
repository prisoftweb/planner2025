'use client'

import Profile from "./Profile"
import ConfigUser from "./ConfigUser"
import UpdateProfile from "./UpdateProfile"
import ChangePhoto from "./ChangePhoto"
import ChangePassword from "./ChangePassword"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import NavResponsive from "./NavResponsive"

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
  
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <Profile email={user.email} option={opt} name={user.name} photo={user.photo} 
              setOption={setOpt} />
          </div>
          <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
            {view}
          </div>
        </div>
      </div>
      
      {/* <div className="flex space-x-2 px-1 mt-3 flex-wrap" 
        style={{'backgroundColor': '#F8FAFC'}}>
        <div className="w-full max-w-md lg:max-w-xs ">
          <ProfileProvider option={opt} provider={provider} setOption={setOpt} />
        </div>
        {view}
      </div> */}
    </>
    //   <div className={``}>
    //     <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
    //         style={{'backgroundColor': '#F8FAFC'}}>
    //       <div className={`w-full max-w-md`}>
    //         <Profile email={user.email} option={opt} name={user.name} photo={user.photo} 
    //           setOption={setOpt} />
    //       </div>
    //       <div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
    //         style={{borderColor:'#F8FAFC'}}>
    //           {view}
    //       </div>
    //     </div>
    //   </div>
    // </>
  )
}