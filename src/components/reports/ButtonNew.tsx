'use client'
import Button from "../Button"
import { useState } from "react";
import NewReport from "./NewReport";
import { Options } from "@/interfaces/Common";

type Props = {
  token:string, 
  departments:Options[], 
  companies:Options[], 
  projects:Options[], 
  user:string, 
  condition:string
}

export default function ButtonNew({token, companies, departments, 
  projects, condition, user}: Props){
  const [newReport, setNewReport] = useState<boolean>(false);

  const handleNewReport = (value: boolean) => {
    setNewReport(value);
  }
  
  return(
    <>
      <Button type="button" onClick={() => setNewReport(true)}>Nuevo</Button>
          {newReport && <NewReport showForm={handleNewReport} 
                                  token={token} projects={projects}
                                  companies={companies} departments={departments} 
                                  condition={condition} user={user}
                        />}
    </>
  )
}