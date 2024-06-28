'use client'

import Profile from "./Profile"
import ConfigUser from "./ConfigUser"
import UpdateProfile from "./UpdateProfile"
import ChangePhoto from "./ChangePhoto"
import ChangePassword from "./ChangePassword"
import { useState } from "react"
import { Options } from "@/interfaces/Common"
import NavResponsive from "./NavResponsive"
import { UsrBack } from "@/interfaces/User"

export default function UserClient({user, token, departments, optQuery, optsRole}: 
                  {user:UsrBack, token:string, departments:Options[], 
                    optQuery: number, optsRole:Options[]}){
  
  // const [view, setView] = useState<JSX.Element>
  //               (<UpdateProfile departments={departments} user={user} 
  //                     token={token} optsRoles={optsRole} />)

  const [opt, setOpt] = useState<number>(optQuery);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenNav = (value: boolean) => {
    setOpen(value);
  }

  const handleChangeOpt = (value:number) => {
    setOpt(value);
  }

  let view: JSX.Element;
  
  opt===2? view = (<ChangePhoto id={user._id} token={token} />) : 
      (opt===3? view = (<ChangePassword token={token} name={user.name} id={user._id} />): 
        (opt===4? view = (<ConfigUser token={token} user={user} status={user.status} />): 
          view = (<UpdateProfile departments={departments} user={user} 
                      token={token} optsRoles={optsRole} />) ))

  // opt===2? setView(<ChangePhoto id={user._id} token={token} />) : 
  //     (opt===3? setView(<ChangePassword token={token} name={user.name} id={user._id} />): 
  //       (opt===4? setView(<ConfigUser token={token} user={user} status={user.status} />): 
  //         setView(<UpdateProfile departments={departments} user={user} 
  //                     token={token} optsRoles={optsRole} />) ))

  // useEffect(() => {
  //   opt===2? setView(<ChangePhoto id={user._id} token={token} />) : 
  //     (opt===3? setView(<ChangePassword token={token} name={user.name} id={user._id} />): 
  //       (opt===4? setView(<ConfigUser token={token} user={user} status={user.status} />): 
  //         setView(<UpdateProfile departments={departments} user={user} 
  //                     token={token} optsRoles={optsRole} />) ))
  // }, [opt])

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={handleOpenNav} changeOption={handleChangeOpt} option={opt} />
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
    </>
  )
}