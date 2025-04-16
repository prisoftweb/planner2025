'use client'

import { useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import ProfileProject from "./ProfileProject"
import { useOneProjectsStore } from "@/app/store/projectsStore"
import DashboardAnalysisProject from "./DashboardAnalysisProject"

type Props = {
  project:OneProjectMin, 
  token:string, 
  id:string,
  user:string
}

export default function ContainerProjectAnalysis({project, token, id, user}: Props){

  const {updateOneProjectStore} = useOneProjectsStore();
  
  useEffect(() => {
    updateOneProjectStore(project);
  }, []);

  return(
    <>
      <div className={`flex`}>
        <div className="flex w-full px-2 flex-wrap space-x-2"
          style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileProject project={project} />
          </div>
          <div className="mt-3 w-full md:max-w-2xl lg:w-full bg-white rounded-lg shadow-md pl-2 px-3" 
              style={{borderColor:'#F8FAFC'}}>
            <DashboardAnalysisProject token={token} id={id} />
          </div>
        </div>
      </div>
    </>
  )
}