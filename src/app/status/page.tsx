import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCatalogs } from "../api/routeCatalogs";
import { Options } from "@/interfaces/Common";
import { getGlossaries } from "../api/routeGlossary";

import CatalogClient from "@/components/status/CatalogClient";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [catalogs, glosaries] = await Promise.all([
    getCatalogs(token), 
    getGlossaries(token)
  ]);

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div>
      </>
    )
  }

  if(typeof(glosaries)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-center text-lg">{glosaries}</h1>
        </div>
      </>
    )
  }

  const glosariesOptions:Options[] = [];
  const descGlossaries:Options[] = [];
  glosaries.map((gloss:any) => {
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
      <Navigation user={user} token={token} />
      <CatalogClient catalogs={catalogs} token={token} 
          descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
    </>
  )
}