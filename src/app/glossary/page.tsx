import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import CompanyClient from "@/components/companies/CompanyClient";
import { ResponsiveHeader } from "@/components/Header";
import ButtonNew from "@/components/glossary/ButtonNew";
import TableGlossary from "@/components/glossary/TableGlossary";
import {getGlossaries} from "../api/routeGlossary";
import { Glossary, GlossaryTable } from "@/interfaces/Glossary";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  // let glossaries: Glossary[] = await getGlossaries(token);

  const perm=((user.rol?._id?? '') + ('/providers/id%2Fadvances'));
  
  console.log('per => ', perm);

  const [resresource, glossaries] = await Promise.all([
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getGlossaries(token),
    // getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, perm),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  // if(typeof(rescomponents) === "string"){
  //   return(
  //     <>
  //       <Navigation user={user} token={token} resources={resresource} />
  //       <ComponentError page={`/catalogs`} message={rescomponents} />
  //     </>
  //   )
  // }
  
  if(typeof(glossaries)=== 'string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500 text-lg">{glossaries}</h1>
        </div> */}
        <ComponentError page="/glossary" message={glossaries} />
      </>
    )
  }

  const table: GlossaryTable[] = [];

  glossaries.map((gloss:Glossary) => {
    table.push({
      color: gloss.color || '#fff',
      description: gloss.description,
      id: gloss._id,
      name: gloss.name  
    })
  });

  // const result = {
  //   permission: rescomponents[0]?.permission ?? {},
  //   components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  // };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <CompanyClient option={4} >
        <div className="absolute sm:static left-2 sm:left-0 mt-4 sm:mt-0 w-full">
          <ResponsiveHeader title="Glosarios" placeHolder="Buscar glosario.." >
            <ButtonNew token={token} glossary={''} />
          </ResponsiveHeader>
          <div className="mt-5">
            <TableGlossary data={table} token={token} glossaries={glossaries} />
          </div>
        </div>
      </CompanyClient>
    </>
  )
}