import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import CompanyClient from "@/components/companies/CompanyClient";
import Header from "@/components/Header";
import { Department, DepartmentTable } from "@/interfaces/Departments";
import { getDepartments } from "../api/routeDepartments";
import ButtonNew from "@/components/departments/ButtonNew";
import TableDepartments from "@/components/departments/TableDepartments";
import { Options } from "@/interfaces/Common";
import { getCompanies } from "../api/routeCompany";
import { Company } from "@/interfaces/Companies";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let companies:Company[];
  try {
    companies = await getCompanies(token);
    if(typeof(companies)==='string'){
      return <h1 className=" text-center text-lg text-red-500">{companies}</h1>
    }
  } catch (error) {
    return <h1 className=" text-center text-lg text-red-500">{'Ocurrio un error al consultar compañias!!'}</h1>
  }
  
  if(!companies || companies.length <= 0){
    return <h1 className=" text-center text-lg text-red-500">{'Ocurrio un error al consultar compañias!!!'}</h1>
  }

  const optsCompanies:Options[] = [];
  companies.map((comp) => {
    optsCompanies.push({
      label: comp.name,
      value: comp._id
    });
  });
  
  let departments: Department[];
  try {
    departments = await getDepartments(token);
    if(typeof(departments)=== 'string'){
      return <h1 className="text-center text-red-500 text-lg">{departments}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500 text-lg">Error al consultar departamentos!!</h1>
  } 

  if(!departments || departments.length <= 0){
    return (
      <div>
        <Navigation user={user} />
        <CompanyClient option={1} >
          <WithOut img="/img/clientes.svg" subtitle="Departamentos"
            text="Aqui puedes agregar los departamentos"
            title="Departamentos">
                <ButtonNew token={token} dept={''} optionsCompany={optsCompanies} />
          </WithOut>
        </CompanyClient>
      </div>
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
      <Navigation user={user} />
      <CompanyClient option={1} >
        <div>
          <Header title="Departamentos" >
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