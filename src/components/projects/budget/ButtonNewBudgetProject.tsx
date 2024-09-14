'use client'

import Button from "@/components/Button";
import { useState } from "react";
//import NewProject from "./NewProject";
import { Options } from "@/interfaces/Common";
import NewBudgetProject from "./NewBudgetProject";
import { ProjectMin } from "@/interfaces/Projects";
import { CostoCenterLV } from "@/interfaces/CostCenter";

export default function ButtonNewBudgetProject({token, optClients, optCategories, 
                            optTypes, user, optCompanies, condition, projects, costoCentersLV}: 
                          {token:string, optClients:Options[], user:string,
                            optCategories:Options[], optTypes:Options[],
                            optCompanies: Options[], condition: string, projects:ProjectMin[], 
                            costoCentersLV: CostoCenterLV[]}){
  const [newProject, setNewProject] = useState<boolean>(false);
  const handleNewProject = (value: boolean) => {
    setNewProject(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setNewProject(true)}>Nuevo</Button>
          {newProject && <NewBudgetProject showForm={handleNewProject} optTypes={optTypes} 
                          token={token} optClients={optClients} projects={projects}
                          optCategories={optCategories} user={user} costoCentersLV={costoCentersLV}
                           optCompanies={optCompanies} condition={condition} />}
    </>
  )
}