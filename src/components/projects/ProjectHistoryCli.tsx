'use client'

import { useState, useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import NavResponsive from "./NavResponsive"
import DataBasicHistory from "./DataBasicHistory"
import ExtraDataHistory from "./ExtraDataHistory"
import AddressHistory from "./AddressHistory"
import GuaranteeHistoryProject from "./GuaranteeHistoryProject"
import ProgressHistoryProject from "./ProgressHistoryProject"
import ProfileHistoryProject from "./ProfileHistoryProject"
import DashboardProfileProject from "./DashboardProfileProject"
import { useOneProjectsStore } from "@/app/store/projectsStore"

export default function ProjectHistoryCli({project, id, token}: 
  {project:OneProjectMin, token: string, id:string}){

  const {updateOneProjectStore} = useOneProjectsStore();

  useEffect(() => {
    updateOneProjectStore(project);
  }, []);
  
  const [opt, setOpt] = useState<number>(1);

  const view = (
    opt===1? (<div className="mt-3 w-full max-w-2xl bg-white rounded-lg shadow-md pl-2 px-3" 
      style={{borderColor:'#F8FAFC'}}>
        <DashboardProfileProject token={token} id={id} />
      </div>) : 
(opt===2? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
          <DataBasicHistory project={project} />
        </div>): 
(opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                  style={{borderColor:'#F8FAFC'}}>
            <ExtraDataHistory project={project} />
          </div>): 
(opt===4? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
              <AddressHistory project={project} />
            </div>):  
  (opt === 5? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                            <GuaranteeHistoryProject project={project} />                                  
                      </div> ) :
    (opt === 6? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                        <ProgressHistoryProject project={project} />                                  
                  </div> ) : 
          (<div className="mt-3 w-full max-w-2xl p-2 bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                <DashboardProfileProject token={token} id={id} />
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
        <div className="flex w-full px-2 flex-wrap space-x-2" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileHistoryProject project={project} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}