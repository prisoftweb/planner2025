import { useState, useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects";
import FilteringEstimatesProject from "./FilteringEstimatesProject";
import { Options } from "@/interfaces/Common";
import { GiSettingsKnobs } from "react-icons/gi"
import DetailEstimateComponent from "./DetailEstimateComponent";

export default function TableEstimatesByProject({project, optConditions, optProjects}: 
  {project: OneProjectMin, optProjects: Options[], optConditions: Options[]}) {

  const [estimates, setEstimates] = useState<any[]>([]);
  const [filterEstimates, setFilterEstimates] = useState<any[]>([]);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const handleIsFilter = (value: boolean) => {
    setIsFilter(value);
  }

  useEffect(() => {

  }, []);

  const handleFilterData = (value: any) => {
    setFilterEstimates(value);
  }

  const maxAmount = 11000;

  if(estimates.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center mt-5">
          <p className="text-5xl mt-20 font-bold">Estimaciones</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            // style={{maxInlineSize: '45ch', textWrap:'balance' }}
            >Agregar una estimacion al proyecto de {project.title}</p>
          <img src="/img/projects.jpg" alt="image" className="w-60 h-auto" />
        </div>
        {/* <div className="mt-5 flex justify-between items-center bg-white">
          <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
          <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />          
        </div>
        {isFilter && <DetailEstimateComponent project={project} nomEstimate="estimacion 1" numEstimate={1} />} */}
      </>
    )
  }

  return (
    // <div className="mt-5 flex justify-between items-center bg-white">
    //   <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
      
    // </div>
    <>
      <div className="mt-5 flex justify-between items-center bg-white">
          <p className="text-blue-400">ACUMULADO DE ESTIMACIONES</p>
          <GiSettingsKnobs className="w-8 h-8 text-slate-600" onClick={() => setIsFilter(true)} />          
        </div>
        {isFilter && <FilteringEstimatesProject showForm={handleIsFilter} optConditions={optConditions} 
                                  FilterData={handleFilterData} maxAmount={maxAmount} optProjects={optProjects}  />}
    </>
  )
}
