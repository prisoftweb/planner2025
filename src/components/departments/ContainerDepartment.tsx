'use client'

import { useDepartmentStore } from "@/app/store/departmentStore";
import { useEffect } from "react";
import { Department, DepartmentTable } from "@/interfaces/Departments";
import CompanyClient from "../companies/CompanyClient";
import WithOut from "../WithOut";
import ButtonNew from "./ButtonNew";
import { Options } from "@/interfaces/Common";
import TableDepartments from "./TableDepartments";
import { ResponsiveHeader as Header } from "@/components/Header";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type DeptProps={
  departments:Department[], 
  token:string, 
  optsCompanies:Options[],
  company:string,
  permissions:IPermissionsAndComponents
}

export default function ContainerDepartment({departments, optsCompanies, token, company, permissions}: DeptProps ) {

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
              <>
                {permissions.permission.create && (
                  <ButtonNew token={token} dept={''} optionsCompany={optsCompanies} company={company} />
                )}
              </>
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
        <div className="absolute sm:static left-2 sm:left-0 mt-4 sm:mt-0 w-full">
          <Header title="Departamentos" placeHolder="Buscar departamento.." >
            <>
              {permissions.permission.create && (
                <ButtonNew optionsCompany={optsCompanies} dept={''} token={token} company={company} />
              )}
            </>
          </Header>
          <div className="mt-5">
            <TableDepartments data={table} optionsCompany={optsCompanies} token={token} company={company} permissions={permissions} />
          </div>
        </div>
      </CompanyClient>
    </>
  )
}
