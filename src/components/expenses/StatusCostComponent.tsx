import TimelineComponent from "../projects/TimeLineComponent"
import HeaderForm from "../HeaderForm"
import { useState, useEffect } from "react"
import { ITimeLineProject } from "@/interfaces/Projects"
import { getTimeLineCost } from "@/app/api/routeCost"
import { showToastMessageError } from "../Alert"

export default function StatusCostComponent({cost, token}: {token:string, cost:string}) {
  const [statusCost, setStatusCost] = useState<ITimeLineProject[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTimeLineCost(token, cost);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          setStatusCost(res);
        }
      } catch (error) {
        showToastMessageError('Error al consultar linea de tiempo!!!');        
      }
    }
    fetch();
  }, []);

  return (
    <>
      <HeaderForm img="/img/projects.svg" subtitle="Linea de tiempo de un costo" 
        title="Estatus de costo"
      />
      <div className="mt-4 max-w-sm rounded-lg space-y-5">
        <TimelineComponent timeLine={statusCost} />
      </div>
    </>
  )
}
