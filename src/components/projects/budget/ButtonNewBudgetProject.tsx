'use client'

import Button from "@/components/Button";
import { useState } from "react";
//import NewProject from "./NewProject";
import { Options } from "@/interfaces/Common";
import NewBudgetProject from "./NewBudgetProject";
import { ProjectMin } from "@/interfaces/Projects";
import { CostoCenterLV } from "@/interfaces/CostCenter";

export default function ButtonNewBudgetProject({token, user, projects}: 
                          {token:string, user:string, projects:ProjectMin[]}){
  const [newProject, setNewProject] = useState<boolean>(false);
  const handleNewProject = (value: boolean) => {
    setNewProject(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setNewProject(true)}>Nuevo</Button>
          {newProject && <NewBudgetProject showForm={handleNewProject}
                            token={token} projects={projects} user={user} />}
    </>
  )
}