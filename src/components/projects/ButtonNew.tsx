'use client'
import Button from "../Button"
import { useState } from "react";
import NewProject from "./NewProject";
import { Options } from "@/interfaces/Common";

type Props = {
  token:string, 
  optClients:Options[], 
  user:string,
  optCategories:Options[], 
  optTypes:Options[],
  optCompanies: Options[], 
  condition: string
}

export default function ButtonNew({token, optClients, optCategories, 
  optTypes, user, optCompanies, condition}: Props){

  const [newProject, setNewProject] = useState<boolean>(false);
  const handleNewProject = (value: boolean) => {
    setNewProject(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setNewProject(true)}>Nuevo</Button>
        {newProject && <NewProject showForm={handleNewProject} optTypes={optTypes} 
                        token={token} optClients={optClients} 
                        optCategories={optCategories} user={user} 
                          optCompanies={optCompanies} condition={condition} />}
    </>
  )
}