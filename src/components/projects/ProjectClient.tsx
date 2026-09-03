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
import UpdateDateGuaranteeComponent from "./UpdateDateGuaranteeComponent"
import { getConditionsProject } from "@/app/api/routeProjects"
import { IConditionProject } from "@/interfaces/Projects"
import { showToastMessageError } from "../Alert"
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type Props = {
  project:OneProjectMin, 
  token:string, 
  id:string,
  optClients:Options[], 
  optCategories:Options[], 
  optTypes:Options[], 
  optConditions:Options[],
  user:string,
  permissions:IPermissionsAndComponents
}

export default function ProjectCli({project, token, id, optCategories, optClients, 
  optTypes, optConditions, user, permissions}: Props){

  const [opt, setOpt] = useState<number>(1);
  const {updateOneProjectStore} = useOneProjectsStore();

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

  const view = (
    opt===1? (<div className="mt-3 w-full max-w-2xl md:max-w-full bg-white rounded-lg shadow-md pl-2 px-3" 
      style={{borderColor:'#F8FAFC'}}>
        {permissions.components.includes('dashboard') && (
          <DashboardProfileProject token={token} id={id} conditions={conditions} />
        )}
      </div>) : 
(opt===2? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>
              {permissions.components.includes('basicadata') && (
                <DataBasic token={token} id={id} project={project} optConditions={optConditions} user={user} />
              )}
        </div>): 
(opt===3? (<div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                  style={{borderColor:'#F8FAFC'}}>
              {permissions.components.includes('extradata') && (
                <ExtraData optCategories={optCategories} optClients={optClients} id={id} optTypes={optTypes} token={token} project={project} />
              )}
          </div>): 
(opt===4? (<div className="mt-3 w-full max-w-lg bg-white rounded-lg shadow-md pl-2 px-3" 
                    style={{borderColor:'#F8FAFC'}}>
                {permissions.components.includes('address') && (
                  <Address token={token} id={id} project={project} />
                )}  
            </div>):  
  (opt === 5? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
                          style={{borderColor:'#F8FAFC'}}>
                            {permissions.components.includes('guarantee') && (
                              <GuaranteeProject id={id} token={token} project={project} />
                            )}                                  
                      </div> ) :
    (opt === 6? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
                    {permissions.components.includes('advance') && (
                      <ProgressProject id={id} project={project} token={token} user={user} />
                    )}                                  
              </div> ) :
      opt === 7? ( <div className="mt-3 w-full max-w-md bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
                    <UpdateDateGuaranteeComponent id={id} project={project} token={token} user={user} />                                  
              </div> ) : 
          (<div className="mt-3 w-full p-2 md:w-1/2 bg-white rounded-lg shadow-md pl-2 px-3" 
                      style={{borderColor:'#F8FAFC'}}>
                {permissions.components.includes('basicadata') && (
                  <DataBasic token={token} id={id} project={project} optConditions={optConditions} user={user} />
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
        <div className={`hidden lg:block bg-white ${open? 'w-full  max-w-48': 'w-12'}`} >
          <div className={`mt-0 h-full ${open? 'w-full max-w-60': 'w-12'} bg-white`}>
            <NavResponsive open={open} setOpen={setOpen} changeOption={setOpt} option={opt} permission={permissions} />
          </div>
        </div>
        <div className={`flex w-full px-2 flex-wrap ${opt===1? 'xl:flex-nowrap xl:space-x-2': 'md:flex-nowrap md:space-x-2'}  `}
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full sm:max-w-md`}>
            <ProfileProject project={project} />
          </div>
          {view}
        </div>
      </div>
    </>
  )
}