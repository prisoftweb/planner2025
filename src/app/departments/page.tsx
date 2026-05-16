import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getDepartments } from "../api/routeDepartments";
import { Options } from "@/interfaces/Common";
import { getCompanies } from "../api/routeCompany";
import ContainerDepartment from "@/components/departments/ContainerDepartment";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [companies, departments] = await Promise.all([
    getCompanies(token), 
    getDepartments(token)
  ]);
  
  if(typeof(companies)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md:p-5 lg:p-10">
          <h1 className=" text-center text-lg text-red-500">{companies}</h1>
        </div>
      </>
    )
  }
  
  if(!companies || companies.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md:p-5 lg:p-10">
          <h1 className=" text-center text-lg text-red-500">{'Ocurrio un error al consultar compañias!!!'}</h1>
        </div>
      </>
    )
  }

  const optsCompanies:Options[] = [];
  companies.map((comp:any) => {
    optsCompanies.push({
      label: comp.name,
      value: comp._id
    });
  });
  
  if(typeof(departments)=== 'string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md:p-5 lg:p-10">
          <h1 className="text-center text-red-500 text-lg">{departments}</h1>
        </div>
      </>
    )
  } 

  return(
    <>
      <Navigation user={user} token={token} />
      <ContainerDepartment departments={departments} optsCompanies={optsCompanies} 
          token={token} company={user.profile} />
    </>
  )
}