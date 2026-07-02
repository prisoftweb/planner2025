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
import { IConditionProject } from "@/interfaces/Projects"
import { getConditionsProject } from "@/app/api/routeProjects"
import { showToastMessageError } from "../Alert"
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function ProjectHistoryCli({project, id, token, permissions}: 
  {project:OneProjectMin, token: string, id:string, permissions:IPermissionsAndComponents}){

  const {updateOneProjectStore} = useOneProjectsStore();

  useEffect(() => {
    updateOneProjectStore(project);
  }, []);
  
  const [opt, setOpt] = useState<number>(1);

  const [conditions, setConditions] = useState<IConditionProject[]>([]);
    
  useEffect(() => {
    updateOneProjectStore(project);
    const fetchConditions = async () => {
      const res = await getConditionsProject(token, id);
      if (typeof(res) !== 'string') {
        setConditions(res);
      } else {
        showToastMessageError(res);
      }
    };
    fetchConditions();
  }, []);

  console.log('permissions => ', permissions);

  const view = (
    opt===1? (<div className="mt-3 w-full max-w-2xl bg-white rounded-lg shadow-md pl-2 px-3" 
      style={{borderColor:'#F8FAFC'}}>
        {permissions.components.includes("dashboard") && (
          <DashboardProfileProject token={token} id={id} conditions={conditions} />
        )}
      </div>) : 
(opt===2? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
          {permissions.components.includes("basicadata") && (
            <DataBasicHistory project={project} />
          )}
        </div>): 
(opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                  style={{borderColor:'#F8FAFC'}}>
            {permissions.components.includes("extradata") && (
              <ExtraDataHistory project={project} />
            )}
          </div>): 
(opt===4? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
              {permissions.components.includes("address") && (
                <AddressHistory project={project} />
              )}
            </div>):  
  (opt === 5? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                            {permissions.components.includes("guarantee") && (
                              <GuaranteeHistoryProject project={project} />
                            )}                                  
                      </div> ) :
    (opt === 6? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                        {permissions.components.includes("advance") && (
                          <ProgressHistoryProject project={project} />
                        )}                                  
                  </div> ) : 
          (<div className="mt-3 w-full max-w-2xl p-2 bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                {permissions.components.includes("dashboard") && (
                  <DashboardProfileProject token={token} id={id} conditions={conditions} />
                )}
            </div>)) ))))
  )
  
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
      <div className="lg:hidden mt-2">
        <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} permission={permissions} />
      </div>
      <div className={`flex`}>
        <div className={`bg-white hidden lg:block ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} permission={permissions} />
          </div>
        </div>
        <div className="flex w-full px-2 flex-wrap ${opt===1? 'xl:flex-nowrap xl:space-x-2': 'md:flex-nowrap md:space-x-2'}" 
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full sm:max-w-md`}>
            <ProfileHistoryProject project={project} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}