'use client'

import { useEffect } from "react"
import { useListsStore } from "@/app/store/listStore"
import { Catalog } from "@/interfaces/Catalogs";
import WithOut from "../WithOut";
import { Glossary } from "@/interfaces/Glossary";
import CompanyClient from "../companies/CompanyClient";
import { StatusTable } from "@/interfaces/Status";
import { Options } from "@/interfaces/Common";
import NavTab from "@/components/companies/NavTab";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import SearchInTable from "@/components/SearchInTable";
import TableStatus from "./TableStatuses";
import ButtonNew from "@/components/status/ButtonNew";

export default function CatalogClient({catalogs, token, descGlossaries, glosariesOptions}: 
    {token:string, catalogs:Catalog[], glosariesOptions:Options[], descGlossaries:Options[] }) {

  const {listsStore, updateListsStore} = useListsStore();

  useEffect(() => {
    updateListsStore(catalogs);
  }, []);

  if(!listsStore || listsStore.length <= 0){
    return (
      <>
        <CompanyClient option={5} >
          <WithOut img="/img/clientes.svg" subtitle="Estatus"
            text="Aqui puedes agregar los estatus a los catalogos"
            title="Estatus">
                <></>
                {/* <ButtonNew catalogOptions={catalogOptions} token={token}
          descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} /> */}
          </WithOut>
        </CompanyClient>
      </>
    )
  }

  const table: StatusTable[] = [];
  
  const catalogOptions:Options[] = [];
  listsStore.map((cat) => {
    catalogOptions.push({
      label: cat.name,
      value: cat._id
    });
    let statuses = '';
    let arrStatuses: string[] = [];
    let arrColors: string[] = [];
    console.log('cat catclient => ', cat);
    cat.condition?.map((cond) => {
      statuses += cond.glossary.name + ', ';
      arrStatuses.push(cond.glossary.name);
      arrColors.push(cond.glossary.color || '#fff');
    });
    let categories = '';
    cat.categorys?.map((category) => {
      categories += category.glossary.name + ', ';
    });
    let types = '';
    cat.types?.map((type) => {
      types += type.glossary.name + ', ';
    });

    //console.log('arr statuses => ', arrStatuses);
    //console.log('arr colors => ', arrColors);

    table.push({
      catalog: cat.name,
      collection: cat.collection,
      id: cat._id,
      //statuses: statuses,
      statuses: {
        arrStatuses,
        arrColors
      },
      categories,
      types
    })
  });

  // const glosariesOptions:Options[] = [];
  // const descGlossaries:Options[] = [];
  // glosaries.map((gloss) => {
  //   glosariesOptions.push({
  //     label: gloss.name,
  //     value: gloss._id
  //   });
  //   descGlossaries.push({
  //     label: gloss.description,
  //     value: gloss.id
  //   })
  // });

  return(
    <>
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
            <div className="mt-5">
              <TableStatus  data={table}  token={token} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
