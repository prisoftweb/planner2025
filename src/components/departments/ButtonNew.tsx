'use client'
import Button from "../Button"
import { useState } from "react";
import NewDepartment from "./NewDepartment";
import { Options } from "@/interfaces/Common";
import { DepartmentTable } from "@/interfaces/Departments";

type ButtonNewProps = {
  token:string, 
  optionsCompany:Options[], 
  dept:(DepartmentTable | string)
}

export default function ButtonNew({token, optionsCompany, dept}: ButtonNewProps){
  const [newCompany, setNewCompany] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewCompany(true)}>Nuevo</Button>
          {newCompany && <NewDepartment showForm={setNewCompany} token={token} 
                            OptionsCompany={optionsCompany} dept={dept} />}
    </>
  )
}