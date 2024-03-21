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

export default function ClientCli({client, token, id, tags}: 
                            {client:ClientBack, token:string, id:string, tags:Options[]}){

  const [view, setView] = useState<JSX.Element>
                (<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md
                  pl-2" style={{borderColor:'#F8FAFC'}}>
                    <Sumary client={client} idCli={id} token={token} />
                </div>)

  const [opt, setOpt] = useState<number>(1);
  
  useEffect(() => {
    console.log('opt == ', opt)
    opt===2? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
                  <DataBasic token={token} client={client} id={id} tags={tags} />
                </div>) : 
      (opt===3? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                    <ExtraData token={token} id={id} link={client.link? client.link: ''} />
                  </div>): 
        (opt===4? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                            style={{borderColor:'#F8FAFC'}}>
                      <AddressClient client={client} token={token} />
                    </div>): 
          (opt===5? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                              style={{borderColor:'#F8FAFC'}}>
                        <Contacts id={id} contacts={client.contact || []} token={token} />
                      </div>):  setView(<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
                                          style={{borderColor:'#F8FAFC'}}>
                                    <Sumary client={client} idCli={id} token={token} />
                                </div>)) ))
  }, [opt, ])
  
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      {/* <div className="flex px-2 mt-3 flex-wrap lg:border-r-8 pr-2 space-x-2 bg-slate-200" style={{borderColor:'#F8FAFC'}}>
        <div className={`w-full max-w-md lg:max-w-xs flex ${open? 'flex-wrap': ''}`}>
          <div className={`mt-3 bg-white rounded-lg shadow-md pl-2 px-3 ${open? 'w-full': ''}`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} />
          </div>
          <ProfileClient client={client} />
        </div>
        {view}
      </div> */}
      <div className="flex px-2 mt-3 flex-wrap lg:border-r-8 pr-2 space-x-2 bg-slate-200" style={{borderColor:'#F8FAFC'}}>
        {/* <div className={`w-full max-w-lg lg:max-w-md flex ${open? 'flex-wrap md:flex-nowrap': ''}`}> */}
        <div className={`w-full max-w-lg flex ${open? 'flex-wrap md:flex-nowrap': ''}`}>
          <div className={`mt-3 mr-2 bg-white rounded-lg shadow-md pl-2 px-3 ${open? 'w-full max-w-40': ''}`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} />
          </div>
          <ProfileClient client={client} />
        </div>
        {view}
      </div>
    </>
  )
}