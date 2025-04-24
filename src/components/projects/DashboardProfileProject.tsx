import HeaderForm from "../HeaderForm"
import { useOneProjectsStore } from "@/app/store/projectsStore";
import { ProgressCircle } from "@tremor/react";
import { useEffect, useState } from "react";
import { getDashboardProjectCostoCenters } from "@/app/api/routeProjects";
import { ProjectCostoCenters } from "@/interfaces/DashboardProjects";
import DonutChartComponent from "./dashboard/DonutChartComponent";
import { showToastMessageError } from "../Alert";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function DashboardProfileProject({token, id}: {token:string, id: string}){
  
  const {oneProjectStore} = useOneProjectsStore();
  const [costoCenters, setCostoCenters] = useState<ProjectCostoCenters[]>([]);

  useEffect(() => {
    const fetch = async () => {
      
      const resCostoC = await getDashboardProjectCostoCenters(token, id);
      if(typeof(resCostoC) !== 'string'){
        setCostoCenters(resCostoC);
      }else{
        showToastMessageError(resCostoC)
      }

    };

    fetch();
  }, []);

  if(!oneProjectStore){
    return <></>;
  }

  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const dataCostoCenters: OptionsDashboard[] = [];
  const categoriesCostoCenters: string[] = [];

  costoCenters.map((prj) => {
    dataCostoCenters.push({
      costo: prj.porcentage,
      label: prj.costocenter.concept
    });
    categoriesCostoCenters.push(prj.costocenter.concept);
  });
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Graficos del proyecto" 
        title="Analisis del proyecto"
      />
      <div className="mt-4 rounded-lg space-y-5">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 items-start">
          <div className="p-3 w-full flex flex-col justify-center">
            <p className="mb-2">AVANCE DE PROYECTO</p>
            <ProgressCircle 
              value={oneProjectStore.progress}
              radius={100}
              strokeWidth={12}
            >
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {oneProjectStore.progress}%
                </span>
            </ProgressCircle>
          </div>

          <div className="p-3">
            <p className="mb-2">CENTRO DE COSTOS</p>
            <DonutChartComponent data={dataCostoCenters} colors={colors} category="costo"
              categories={categoriesCostoCenters}  />
          </div>
        </div>
      </div>  
    </div>
  )
}