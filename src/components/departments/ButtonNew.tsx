'use client'
import Button from "../Button"
import { useState } from "react";
import NewDepartment from "./NewDepartment";
import { Options } from "@/interfaces/Common";
import { DepartmentTable } from "@/interfaces/Departments";
import ContainerSideNav from "../ContainerSideNav";

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
          {newCompany && (
            <ContainerSideNav width="w-full max-w-sm">
              <NewDepartment showForm={setNewCompany} token={token} 
                            OptionsCompany={optionsCompany} dept={dept} />
            </ContainerSideNav>
            // <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
            //   <NewDepartment showForm={setNewCompany} token={token} 
            //                 OptionsCompany={optionsCompany} dept={dept} />
            // </div>
          )}
    </>
  )
}