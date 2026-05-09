import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import CompanyClient from "@/components/companies/CompanyClient";
// import Header from "@/components/Header";
import { ResponsiveHeader } from "@/components/Header";
import ButtonNew from "@/components/glossary/ButtonNew";
import TableGlossary from "@/components/glossary/TableGlossary";
import {getGlossaries} from "../api/routeGlossary";
import { Glossary, GlossaryTable } from "@/interfaces/Glossary";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let glossaries: Glossary[] = await getGlossaries(token);
  
  if(typeof(glossaries)=== 'string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500 text-lg">{glossaries}</h1>
        </div>
      </>
    )
  }

  const table: GlossaryTable[] = [];

  glossaries.map((gloss) => {
    table.push({
      color: gloss.color || '#fff',
      description: gloss.description,
      id: gloss._id,
      name: gloss.name  
    })
  });

  return(
    <>
      <Navigation user={user} token={token} />
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