'use client'

import { useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import { useOneProjectsStore } from "@/app/store/projectsStore"
import DashboardAnalysisProject from "./DashboardAnalysisProject"

type Props = {
  project:OneProjectMin, 
  token:string, 
  id:string,
  user:string,
  company:string
}

export default function ContainerProjectAnalysis({project, token, id, user, company}: Props){

  const {updateOneProjectStore} = useOneProjectsStore();
  
  useEffect(() => {
    updateOneProjectStore(project);
  }, []);

  return(
    <>
      <div className={`flex`}>
        <DashboardAnalysisProject token={token} id={id} project={project} company={company} />
      </div>
    </>
  )
}