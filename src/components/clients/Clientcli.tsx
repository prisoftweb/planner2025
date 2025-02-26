'use client'

import Contacts from "./Contacts"
import { useState, useEffect } from "react"
import { ClientBack } from "@/interfaces/Clients"
import ProfileClient from "./ProfileClient"
import Sumary from "./Sumary"
import { Options } from "@/interfaces/Common"
import DataBasic from "./DataBasic"
import ExtraData from "./ExtraData"
import AddressClient from "./AddressClient"
import NavResponsive from "./NavResponsive"
import { Resource2 } from "@/interfaces/Roles"
import { useClientProfileStore } from "@/app/store/clientStore"

type ClientCliProps = {
  client:ClientBack, 
  token:string, 
  id:string, 
  tags:Options[], 
  clientPermissions: Resource2
}

export default function ClientCli({client, token, id, tags, clientPermissions}: ClientCliProps){

  const [opt, setOpt] = useState<number>(1);
  const handleOpt = (value: number) => {
    setOpt(value);
  }

  const {updateProfileClient} = useClientProfileStore();

  useEffect(() => {
    updateProfileClient(client);
  }, []);
  
  const view = 
      opt===2? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
          style={{borderColor:'#F8FAFC'}}>
            <DataBasic token={token} client={client} id={id} tags={tags} 
              editInfo={true} />
          </div>) : 
      (opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
              <ExtraData token={token} id={id} link={client.link? client.link: ''}
                editInfo={true} />
            </div>): 
      (opt===4? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                <AddressClient client={client} token={token} 
                  editInfo={true} />
              </div>): 
      (opt===5? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                        style={{borderColor:'#F8FAFC'}}>
                  <Contacts id={id} contacts={client.contact || []} token={token}
                    editInfo={true} />
                </div>):  (<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
                                    style={{borderColor:'#F8FAFC'}}>
                              <Sumary client={client} idCli={id} token={token} />
                          </div>)) ))
  
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (value: boolean) => {
    setOpen(value);
  }

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={handleOpen} changeOption={handleOpt} 
                option={opt} clientPermission={clientPermissions} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileClient />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}