import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { Department } from "@/interfaces/Departments";
import { getDepartments } from "../api/routeDepartments";
import { Options } from "@/interfaces/Common";
import { getCompanies } from "../api/routeCompany";
import { Company } from "@/interfaces/Companies";
import ContainerDepartment from "@/components/departments/ContainerDepartment";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let companies:Company[];
  try {
    companies = await getCompanies(token);
    if(typeof(companies)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className=" text-center text-lg text-red-500">{companies}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className=" text-center text-lg text-red-500">{'Ocurrio un error al consultar compañias!!'}</h1>
      </>
    )
  }
  
  if(!companies || companies.length <= 0){
    return(
      <>
        <Navigation user={user} />
        <h1 className=" text-center text-lg text-red-500">{'Ocurrio un error al consultar compañias!!!'}</h1>
      </>
    )
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
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500 text-lg">{departments}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500 text-lg">Error al consultar departamentos!!</h1>
      </>
    )
  } 

  return(
    <>
      <Navigation user={user} />
      <ContainerDepartment departments={departments} optsCompanies={optsCompanies} token={token} />
    </>
  )
}