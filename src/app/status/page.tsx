import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCatalogs } from "../api/routeCatalogs";
import { Catalog } from "@/interfaces/Catalogs";
import { Options } from "@/interfaces/Common";
import { getGlossaries } from "../api/routeGlossary";
import { Glossary } from "@/interfaces/Glossary";

import CatalogClient from "@/components/status/CatalogClient";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let catalogs: Catalog[];

  try {
    catalogs = await getCatalogs(token);
    if(typeof(catalogs)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Ocurrio un error al consultar catalogos!!</h1>
      </>
    )
  }

  let glosaries: Glossary[];

  try {
    glosaries = await getGlossaries(token);
    if(typeof(glosaries)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{glosaries}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Ocurrio un error al consultar glosarios!!</h1>
      </>
    )
  }

  const glosariesOptions:Options[] = [];
  const descGlossaries:Options[] = [];
  glosaries.map((gloss) => {
    glosariesOptions.push({
      label: gloss.name,
      value: gloss._id
    });
    descGlossaries.push({
      label: gloss.description,
      value: gloss.id
    })
  });

  return(
    <>
      <Navigation user={user} />
      <CatalogClient catalogs={catalogs} token={token} 
          descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
    </>
  )
}