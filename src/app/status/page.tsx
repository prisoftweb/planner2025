import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCatalogs } from "../api/routeCatalogs";
import { Catalog } from "@/interfaces/Catalogs";
import { Options } from "@/interfaces/Common";
import CompanyClient from "@/components/companies/CompanyClient";
import ButtonNew from "@/components/status/ButtonNew";
import { getGlossaries } from "../api/routeGlossary";
import { Glossary } from "@/interfaces/Glossary";
import Header from "@/components/Header";
import { StatusTable } from "@/interfaces/Status";
import TableStatus from "@/components/status/TableStatuses";
import NavTab from "@/components/companies/NavTab";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import SearchInTable from "@/components/SearchInTable";

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

  if(!catalogs || catalogs.length <= 0){
    return (
      <div>
        <Navigation user={user} />
        <CompanyClient option={5} >
          <WithOut img="/img/clientes.svg" subtitle="Estatus"
            text="Aqui puedes agregar los estatus a los catalogos"
            title="Estatus">
                <></>
                {/* <ButtonNew catalogOptions={catalogOptions} token={token}
          descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} /> */}
          </WithOut>
        </CompanyClient>
      </div>
    )
  }

  const table: StatusTable[] = [];
  
  const catalogOptions:Options[] = [];
  catalogs.map((cat) => {
    catalogOptions.push({
      label: cat.name,
      value: cat._id
    });
    let statuses = '';
    cat.condition.map((cond) => {
      statuses += cond.glossary.name + ', ';
    });
    let categories = '';
    cat.categorys.map((category) => {
      categories += category.glossary.name + ', ';
    });
    let types = '';
    cat.types.map((type) => {
      types += type.glossary.name + ', ';
    });
    table.push({
      catalog: cat.name,
      collection: cat.collection,
      id: cat._id,
      statuses: statuses,
      categories,
      types
    })
  });

  let glosaries: Glossary[];

  try {
    glosaries = await getGlossaries(token);
    if(typeof(glosaries)==='string'){
      return <h1 className="text-red-500 text-center text-lg">{glosaries}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-center text-lg">Ocurrio un error al consultar glosarios!!</h1>
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
      {/* <CompanyClient option={5}>
        <div>
          <Header title="Catalogos" placeHolder="Buscar catalogo.." >
            <div className="flex gap-x-2">
              <ButtonNew catalogOptions={catalogOptions} token={token} opt={1}
                descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
              <ButtonNew catalogOptions={catalogOptions} token={token} opt={2}
                descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
              <ButtonNew catalogOptions={catalogOptions} token={token} opt={3}
                descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
            </div>
          </Header>
          <div className="mt-5">
            <TableStatus  data={table}  token={token} />
          </div>
        </div>
      </CompanyClient> */}
      <div className="w-full pl-10 pt-2 sm:pt-3 md:pt-5 pr-2 sm:pr-3 md:pr-5 lg:pr-10">  
        <div className="flex mt-5 gap-x-3">
          <NavTab option={5} />
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link href={'/'}>
                  <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
                </Link>
                <p className="text-xl ml-4 font-medium">Catalogos</p>
              </div>
              {/* <ButtonNewProvider id={id} token={token} /> */}
              <div className="flex gap-x-3 gap-y-2 flex-wrap md:flex-nowrap">
                <SearchInTable placeH='Buscar catalogo..' />
                <div >
                  {/* {children} */}
                  <div className="flex gap-x-2">
                    <ButtonNew catalogOptions={catalogOptions} token={token} opt={1}
                      descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                    <ButtonNew catalogOptions={catalogOptions} token={token} opt={2}
                      descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                    <ButtonNew catalogOptions={catalogOptions} token={token} opt={3}
                      descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                  </div>
                </div>
              </div>
            </div>
            {/* <Header title="Catalogos" placeHolder="Buscar catalogo.." >
              <div className="flex gap-x-2">
                <ButtonNew catalogOptions={catalogOptions} token={token} opt={1}
                  descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                <ButtonNew catalogOptions={catalogOptions} token={token} opt={2}
                  descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                <ButtonNew catalogOptions={catalogOptions} token={token} opt={3}
                  descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
              </div>
            </Header> */}
            <div className="mt-5">
              <TableStatus  data={table}  token={token} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}