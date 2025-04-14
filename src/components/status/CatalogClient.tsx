'use client'

import { useEffect } from "react"
import { useListsStore } from "@/app/store/listStore"
import { Catalog } from "@/interfaces/Catalogs";
import WithOut from "../WithOut";
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

    table.push({
      catalog: cat.name,
      collection: cat.collection,
      id: cat._id,
      statuses: {
        arrStatuses,
        arrColors
      },
      categories,
      types
    })
  });

  return(
    <>
      <div className="w-full pl-10 pt-2 sm:pt-3 md:pt-5 pr-2 sm:pr-3 md:pr-5 lg:pr-10">  
        <div className="flex mt-5 gap-x-3">
          <NavTab option={5} />
          <div className="">
            <div className="sm:flex gap-x-3 md:justify-between flex-wrap md:flex-nowrap items-center">
              <div className="flex items-center">
                <Link href={'/'}>
                  <div className="p-1 border border-slate-400 bg-white rounded-md" >
                    <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
                  </div>
                </Link>
                <p className="text-xl ml-4 font-medium">Catalogos</p>
              </div>
              <div className="sm:flex gap-x-3 gap-y-2 flex-wrap md:flex-nowrap">
                <SearchInTable placeH='Buscar catalogo..' />
                <div className="mt-2 sm:mt-0" >
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
