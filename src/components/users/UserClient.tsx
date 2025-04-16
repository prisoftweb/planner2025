'use client'

import Profile from "./Profile"
import ConfigUser from "./ConfigUser"
import UpdateProfile from "./UpdateProfile"
import ChangePhoto from "./ChangePhoto"
import ChangePassword from "./ChangePassword"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import NavResponsive from "./NavResponsive"
import { UsrBack } from "@/interfaces/User"
import { useUserStore } from "@/app/store/userStore"

export default function UserClient({user, token, departments, optQuery, optsRole}: 
  {user:UsrBack, token:string, departments:Options[], optQuery: number, optsRole:Options[]}){
  
  const [opt, setOpt] = useState<number>(optQuery);
  const [open, setOpen] = useState<boolean>(false);
  const {updateUser, name, _id, department, email, photo, role, status, __v, 
      createAt, passwordChangedAt, rol} = useUserStore();

  const handleOpenNav = (value: boolean) => {
    setOpen(value);
  }

  const usr: UsrBack = {
    __v,
    _id,
    createAt,
    department,
    email,
    name,
    passwordChangedAt,
    photo,
    rol,
    status, 
    role
  }

  const handleChangeOpt = (value:number) => {
    setOpt(value);
  }

  useEffect(() => {
    updateUser(user);
  }, []);

  let view: JSX.Element;
  
  opt===2? view = (<ChangePhoto id={user._id} token={token} />) : 
      (opt===3? view = (<ChangePassword token={token} name={user.name} id={user._id} />): 
        (opt===4? view = (<ConfigUser token={token} user={user} status={usr.name ===''? user.status: usr.status} />): 
          view = (<UpdateProfile departments={departments} user={usr.name ===''? user: usr} 
                      token={token} optsRoles={optsRole} />) ))

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
            <Profile />
          </div>
          <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
            {view}
          </div>
        </div>
      </div>  
    </>
  )
}