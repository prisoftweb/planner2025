'use client'

import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { OneProjectMin } from "@/interfaces/Projects"
import DataBasic from "./DataBasic"
import NavResponsive from "./NavResponsive"
import ExtraData from "./ExtraData"
import Address from "./Address"
import GuaranteeProject from "./GuaranteeProject"
import ProfileProject from "./ProfileProject"
import ProgressProject from "./ProgressProject"
import { useOneProjectsStore } from "@/app/store/projectsStore"
import DashboardProfileProject from "./DashboardProfileProject"
import StatusProjectComponent from "./StatusProjectComponent"

export default function ProjectStatusContainer({project, token, id, optCategories, optClients, 
                             optTypes, optConditions, user}: 
                            {project:OneProjectMin, token:string, id:string,
                              optClients:Options[], optCategories:Options[], 
                              optTypes:Options[], optConditions:Options[],
                              user:string}){

  const [opt, setOpt] = useState<number>(1);
  const {updateOneProjectStore} = useOneProjectsStore();
  
  useEffect(() => {
    updateOneProjectStore(project);
  }, []);

  const view = (
    opt===1? (<div className="mt-3 w-full md:max-w-2xl lg:w-full bg-white rounded-lg shadow-md pl-2 px-3" 
      style={{borderColor:'#F8FAFC'}}>
        {/* <DashboardProfileProject token={token} id={id} /> */}
        <StatusProjectComponent />
      </div>) : 
(opt===2? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
              <DataBasic token={token} id={id} project={project} 
                optConditions={optConditions} user={user} />
        </div>): 
(opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                  style={{borderColor:'#F8FAFC'}}>
              <ExtraData optCategories={optCategories} optClients={optClients} 
                id={id} optTypes={optTypes} token={token} project={project} />
          </div>): 
(opt===4? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
                <Address token={token} id={id} project={project} />  
            </div>):  
  (opt === 5? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                            <GuaranteeProject id={id} token={token} project={project} />                                  
                      </div> ) :
    (opt === 6? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
                    <ProgressProject id={id} project={project} token={token} user={user} />                                  
              </div> ) : 
          (<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                <DataBasic token={token} id={id} project={project} 
                  optConditions={optConditions} user={user} />
            </div>)) ))))
  )
  
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      <div className={`flex`}>
        <div className={`bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} />
          </div>
        </div>
        {/* <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2"  */}
        <div className="flex w-full px-2 flex-wrap space-x-2"
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