import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getDepartments } from "../api/routeDepartments";
import { Options } from "@/interfaces/Common";
import { getCompanies } from "../api/routeCompany";
import ContainerDepartment from "@/components/departments/ContainerDepartment";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const perm=((user.rol?._id?? '') + ('/providers/id%2Fadvances'));
  
  console.log('per => ', perm);

  const [companies, departments, resresource, rescomponents] = await Promise.all([
    getCompanies(token), 
    getDepartments(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'departments', ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/catalogs`} message={rescomponents} />
      </>
    )
  }
  
  if(typeof(companies)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md:p-5 lg:p-10">
          <h1 className=" text-center text-lg text-red-500">{companies}</h1>
        </div> */}
        <ComponentError page="/departments" message={companies} />
      </>
    )
  }
  
  if(!companies || companies.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md:p-5 lg:p-10">
          <h1 className=" text-center text-lg text-red-500">{'Ocurrio un error al consultar compañias!!!'}</h1>
        </div> */}
        <ComponentError page="/departments" message={'Ocurrio un error al consultar compañias!!!'} />
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
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md:p-5 lg:p-10">
          <h1 className="text-center text-red-500 text-lg">{departments}</h1>
        </div> */}
        <ComponentError page="/departments" message={departments} />
      </>
    )
  } 

  // const result = {
  //   permission: rescomponents[0]?.permission ?? {},
  //   components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  // };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerDepartment departments={departments} optsCompanies={optsCompanies} 
          token={token} company={user.profile} />
    </>
  )
}