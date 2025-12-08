'use client'

import { useState, useEffect } from "react"
import ProfileAccount from "./ProfileAccount"
import AccountData from "./AccountData"
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces"
import { getWorkSpacesMin } from "@/app/api/routeWorkspace"
import { showToastMessageError } from "../Alert"

type WSCliProps = {
  token:string, 
  id:string, 
  workspaceParam: IWorkSpaceMin
}

export default function WorkSpaceCli({token, id, workspaceParam }: WSCliProps){

  const [workspace, setWorkspace]=useState<IWorkSpaceMin>(workspaceParam);

  const fetchWorkSpace= async () => {
    const res = await getWorkSpacesMin(token);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setWorkspace(res[res.length-1]);
    }
  }

  // const {updateProfileClient} = useClientProfileStore();

  // useEffect(() => {
  //   updateProfileClient(client);
  // }, []);
  
  // const view = 
  //     opt===2? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
  //         style={{borderColor:'#F8FAFC'}}>
  //           <DataBasic token={token} client={client} id={id} tags={tags} 
  //             editInfo={true} />
  //         </div>) : 
  //     (opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
  //                   style={{borderColor:'#F8FAFC'}}>
  //             <ExtraData token={token} id={id} link={client.link? client.link: ''}
  //               editInfo={true} />
  //           </div>): 
  //     (opt===4? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
  //                     style={{borderColor:'#F8FAFC'}}>
  //               <AddressClient client={client} token={token} 
  //                 editInfo={true} />
  //             </div>): 
  //     (opt===5? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
  //                       style={{borderColor:'#F8FAFC'}}>
  //                 <Contacts id={id} contacts={client.contact || []} token={token}
  //                   editInfo={true} />
  //               </div>):  (<div className="mt-3 w-full p-2" 
  //                                   style={{borderColor:'#F8FAFC'}}>
  //                             <div className="w-full h-full ">
  //                               <div className="w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
  //                                 <div className="flex flex-wrap gap-y-3 p-3"></div>
  //                               </div>
  //                             </div>
  //                         </div>)) ))

  const view = <div className="mt-3 w-full p-2" 
                          style={{borderColor:'#F8FAFC'}}>
                    <div className="w-full h-full ">
                      <div className="w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
                        <div className="flex flex-wrap gap-y-3 p-3">
                          <AccountData token={token} id={id} workspace={workspace} fetchWorkSpace={fetchWorkSpace} />
                        </div>
                      </div>
                    </div>
                </div>

  return(
    <>
      <div className={`flex`}>
        <div className="flex w-full px-2 flex-wrap lg:flex-nowrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileAccount workspace={workspace} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}