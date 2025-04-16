import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";

import CompanyClient from "@/components/companies/CompanyClient";
import Header from "@/components/Header";
import ButtonNew from "@/components/glossary/ButtonNew";
import TableGlossary from "@/components/glossary/TableGlossary";
import {getGlossaries} from "../api/routeGlossary";
import { Glossary, GlossaryTable } from "@/interfaces/Glossary";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let glossaries: Glossary[];
  try {
    glossaries = await getGlossaries(token);
    if(typeof(glossaries)=== 'string'){
      return(
        <>
          <h1 className="text-center text-red-500 text-lg">{glossaries}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <h1 className="text-center text-red-500 text-lg">Error al consultar glosarios!!</h1>
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
  })

  return(
    <>
      <Navigation user={user} />
      <CompanyClient option={4} >
        <div>
          <Header title="Glosarios" placeHolder="Buscar glosario.." >
            <ButtonNew token={token} glossary={''} />
          </Header>
          <div className="mt-5">
            <TableGlossary data={table} token={token} glossaries={glossaries} />
          </div>
        </div>
      </CompanyClient>
    </>
  )
}