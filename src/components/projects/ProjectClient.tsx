'use client'

import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { Project } from "@/interfaces/Projects"
import DataBasic from "./DataBasic"
import NavResponsive from "./NavResponsive"
import ExtraData from "./ExtraData"
import Address from "./Address"
import GuaranteeProject from "./GuaranteeProject"
import ProfileProject from "./ProfileProject"

export default function ProjectCli({project, token, id, optCategories, optClients, 
                             optTypes}: 
                            {project:Project, token:string, id:string,
                              optClients:Options[], optCategories:Options[], 
                              optTypes:Options[]}){

  const [view, setView] = useState<JSX.Element>
                (<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md
                  pl-2" style={{borderColor:'#F8FAFC'}}>
                    <DataBasic token={token} id={id} project={project} />
                </div>)

  const [opt, setOpt] = useState<number>(1);
  
  useEffect(() => {
    opt===1? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
                  <DataBasic token={token} id={id} project={project} />
                </div>) : 
      (opt===2? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                    <ExtraData optCategories={optCategories} optClients={optClients} 
                        // optCompanies={optCompanies} 
                        id={id} optTypes={optTypes} token={token} project={project} />
                  </div>): 
        (opt===3? setView(<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                            style={{borderColor:'#F8FAFC'}}>
                      <Address token={token} id={id} project={project} />
                    </div>): 
          (opt===4? setView(<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                              style={{borderColor:'#F8FAFC'}}>
                        <GuaranteeProject id={id} token={token} project={project} />
                      </div>):  setView(<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
                                          style={{borderColor:'#F8FAFC'}}>
                                    <DataBasic token={token} id={id} project={project} />
                                </div>)) ))
  }, [opt, ])
  
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} />
          </div>
        </div>
        <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileProject project={project} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}