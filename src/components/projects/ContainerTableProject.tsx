'use client'
import { useState, useEffect } from "react"
import { ProjectsTable, Project } from "@/interfaces/Projects";
import TableProjects from "@/components/projects/TableProjects";
import { Options } from "@/interfaces/Common";

export default function ContainerTableProject({data, token, projects, optCategories, 
                                        optTypes, optConditions}:
                                      {data:ProjectsTable[], token:string, 
                                        projects: Project[], optCategories: Options[], 
                                        optTypes: Options[], optConditions: Options[]}){
  
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [isTable, setIsTable] = useState<boolean>(true);
    
    const handleFilter = (value:boolean) => {
      setIsFilter(value);
    }
    
    const handleTable = (value:boolean) => {
      setIsTable(value);
    }
  const [table, setTable] = useState<JSX.Element>(<div className="mt-5">
                                        <TableProjects data={data} token={token} projects={projects} 
                                          optCategories={optCategories} optTypes={optTypes}
                                          optConditions={optConditions} isFilter={isFilter} 
                                          setIsFilter={handleFilter} isTable={isTable}
                                        />
                                      </div>);

  useEffect(() => {

  }, []);

  return(
    
    <>
      {table}
    </>
  )
}