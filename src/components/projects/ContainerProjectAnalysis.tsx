'use client'

import { useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import { useOneProjectsStore } from "@/app/store/projectsStore"
import DashboardAnalysisProject from "./DashboardAnalysisProject"
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type Props = {
  project:OneProjectMin, 
  token:string, 
  id:string,
  user:string,
  company:string,
  permissions:IPermissionsAndComponents
}

export default function ContainerProjectAnalysis({project, token, id, user, company, permissions}: Props){

  const {updateOneProjectStore} = useOneProjectsStore();
  
  useEffect(() => {
    updateOneProjectStore(project);
  }, []);

  // console.log('permissions => ', permissions);

  return(
    <>
      <div className={`flex`}>
        <DashboardAnalysisProject token={token} id={id} project={project} company={company} permissions={permissions} />
      </div>
    </>
  )
}