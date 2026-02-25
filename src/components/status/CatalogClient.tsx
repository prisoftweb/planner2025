'use client'

import { useEffect, useState } from "react"
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
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";
import { BsType } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";

export default function CatalogClient({catalogs, token, descGlossaries, glosariesOptions}: 
    {token:string, catalogs:Catalog[], glosariesOptions:Options[], descGlossaries:Options[] }) {

  const {listsStore, updateListsStore} = useListsStore();

  const [optFilter, setOptFilter]=useState<number>(1);

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
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
                    placement="right" className="text-black bg-white rounded-md border border-slate-400">
                  <Link href={'/'}>
                    <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-slate-100" >
                      <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                    </div>
                  </Link>
                </Tooltip>
                <p className="text-xl ml-4 font-medium">Catalogos</p>
              </div>
              <div className="mt-2 sm:mt-0 sm:flex gap-x-3 gap-y-2 flex-wrap md:flex-nowrap">
                <SearchInTable placeH='Buscar catalogo..' />
                <div className="mt-2 sm:mt-0" >
                  <div className="flex gap-x-2">
                    <ButtonNew catalogOptions={catalogOptions} token={token} opt={1}
                      descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                    <ButtonNew catalogOptions={catalogOptions} token={token} opt={2}
                      descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                    <ButtonNew catalogOptions={catalogOptions} token={token} opt={3}
                      descGlossaries={descGlossaries} glosariesOptions={glosariesOptions} />
                    <div className="flex md:hidden gap-x-3 items-center w-full justify-end">
                      <TooltipContainerIcon label="Estatus">
                        <GrStatusInfo className="w-6 h-6 text-slate-600 cursor-pointer" onClick={() => setOptFilter(1)} />
                      </TooltipContainerIcon>
                      <TooltipContainerIcon label="Categorias">
                        <MdCategory className="w-6 h-6 text-slate-600 cursor-pointer" onClick={() => setOptFilter(2)} />
                      </TooltipContainerIcon>
                      <TooltipContainerIcon label="Tipos">
                        <BsType className="w-6 h-6 text-slate-600 cursor-pointer" onClick={() => setOptFilter(3)} />
                      </TooltipContainerIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <TableStatus data={table} token={token} optFilter={optFilter} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
