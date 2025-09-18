'use client'

import Button from "@/components/Button";
import { useState } from "react";
import NewBudgetProject from "./NewBudgetProject";
import { ProjectMin } from "@/interfaces/Projects";

export default function ButtonNewBudgetProject({token, user, projects}: 
                          {token:string, user:string, projects:ProjectMin[]}){
  const [newProject, setNewProject] = useState<boolean>(false);
  const handleNewProject = (value: boolean) => {
    setNewProject(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setNewProject(true)}>Nuevo</Button>
          {newProject && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40">
              <NewBudgetProject showForm={handleNewProject}
                            token={token} projects={projects} user={user} />
            </div>
          )}
    </>
  )
}