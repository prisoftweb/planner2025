import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCatalogs } from "../api/routeCatalogs";
import { Catalog } from "@/interfaces/Catalogs";
import { Options } from "@/interfaces/Common";
import CompanyClient from "@/components/companies/CompanyClient";
import ButtonNew from "@/components/status/ButtonNew";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let catalogs: Catalog[];

  try {
    catalogs = await getCatalogs(token);
    if(typeof(catalogs)==='string'){
      return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-center text-lg">Ocurrio un error al consultar catalogos!!</h1>
  }

  const catalogOptions:Options[] = [];
  catalogs.map((cat) => {
    catalogOptions.push({
      label: cat.name,
      value: cat._id
    })
  });

  return(
    <>
      <Navigation user={user} />
      <CompanyClient option={5}>
        <ButtonNew catalogOptions={catalogOptions} token={token} />
      </CompanyClient>
    </>
  )
}