'use client'
import Button from "../Button"
import { useState } from "react";
import NewReport from "./NewReport";
import { Options } from "@/interfaces/Common";

export default function ButtonNew({token, companies, departments, 
                        projects, condition, user}: 
                      {token:string, departments:Options[], 
                        companies:Options[], projects:Options[], 
                        user:string, condition:string
                      }){
  const [newReport, setNewReport] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewReport(true)}>Nuevo</Button>
          {newReport && <NewReport showForm={setNewReport} 
                                  token={token} projects={projects}
                                  companies={companies} departments={departments} 
                                  condition={condition} user={user}
                        />}
    </>
  )
}