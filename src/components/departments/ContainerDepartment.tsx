'use client'

import { useDepartmentStore } from "@/app/store/departmentStore";
import { useEffect } from "react";
import { Department, DepartmentTable } from "@/interfaces/Departments";
import CompanyClient from "../companies/CompanyClient";
import WithOut from "../WithOut";
import ButtonNew from "./ButtonNew";
import { Options } from "@/interfaces/Common";
import TableDepartments from "./TableDepartments";
import Header from "@/components/Header";

export default function ContainerDepartment({departments, optsCompanies, token}: 
  {departments:Department[], token:string, optsCompanies:Options[]}) {

  const {departmentStore, updateDepartmentStore} = useDepartmentStore();

  useEffect(() => {
    updateDepartmentStore(departments);
  }, []);

  if(!departmentStore || departmentStore.length <= 0){
    return (
      <CompanyClient option={1} >
        <WithOut img="/img/clientes.svg" subtitle="Departamentos"
          text="Aqui puedes agregar los departamentos"
          title="Departamentos">
              <ButtonNew token={token} dept={''} optionsCompany={optsCompanies} />
        </WithOut>
      </CompanyClient>
    )
  }

  const table: DepartmentTable[] = [];

  departments.map((dept) => {
    table.push({
      id: dept._id,
      name: dept.name,
      abbreviation: dept.abbr? dept.abbr : 'SA',
      company: {
        id: dept.company._id,
        logo: dept.company.logo
      }
    })
  })

  return(
    <>
      <CompanyClient option={1} >
        <div>
          <Header title="Departamentos" placeHolder="Buscar departamento.." >
            <ButtonNew optionsCompany={optsCompanies} dept={''} token={token} />
          </Header>
          <div className="mt-5">
            <TableDepartments data={table} optionsCompany={optsCompanies} token={token} />
          </div>
        </div>
      </CompanyClient>
    </>
  )
}
