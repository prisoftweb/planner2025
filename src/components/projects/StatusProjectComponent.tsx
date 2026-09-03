import TimelineComponent from "./TimeLineComponent"
import HeaderForm from "../HeaderForm"
import { useState, useEffect } from "react"
import { ITimeLineProject } from "@/interfaces/Projects"
import { getTimeLineProject } from "@/app/api/routeProjects"
import { showToastMessageError } from "../Alert"

export default function StatusProjectComponent({project, token}: {token:string, project:string}) {
  const [statusProject, setStatusProject] = useState<ITimeLineProject[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTimeLineProject(token, project);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          setStatusProject(res);
        }
      } catch (error) {
        showToastMessageError('Error al consultar linea de tiempo!!!');        
      }
    }
    fetch();
  }, []);

  return (
    <>
      <HeaderForm img="/img/projects.svg" subtitle="Linea de tiempo de un proyecto" 
        title="Estatus de proyecto"
      />
      <div className="mt-4 max-w-sm rounded-lg space-y-5">
        <TimelineComponent timeLine={statusProject} />
      </div>
    </>
  )
}
