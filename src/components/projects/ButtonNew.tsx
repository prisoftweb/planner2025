'use client'
import Button from "../Button"
import { useState } from "react";
import NewProject from "./NewProject";
import { Options } from "@/interfaces/Common";

export default function ButtonNew({token, optClients, optCategories, 
                            optTypes, user, optCompanies}: 
                          {token:string, optClients:Options[], user:string,
                            optCategories:Options[], optTypes:Options[],
                            optCompanies: Options[]}){
  const [newProject, setNewProject] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewProject(true)}>Nuevo</Button>
          {newProject && <NewProject showForm={setNewProject} optTypes={optTypes} 
                          token={token} optClients={optClients} 
                          optCategories={optCategories} user={user} 
                           optCompanies={optCompanies} />}
    </>
  )
}