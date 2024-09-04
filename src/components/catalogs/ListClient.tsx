'use client'

import { useEffect } from "react"
import { useListsStore } from "@/app/store/listStore"
import { Catalog, CatalogTable } from "@/interfaces/Catalogs"
import CompanyClient from "../companies/CompanyClient"
import Header from "@/components/Header";
import TableCatalogs from "./TableCatalogs"
import ButtonNew from "./ButtonNew"
import WithOut from "../WithOut"

export default function ListClient({lists, token}: {lists:Catalog[], token:string}) {

  const {listsStore, updateListsStore} = useListsStore();

  useEffect(() => {
    updateListsStore(lists);
  }, []);

  if(!listsStore || listsStore.length <= 0){
    return(
      <CompanyClient option={3} >
        <WithOut img="/img/clientes.svg" subtitle="Catalogos"
          text="Aqui puedes agregar los catalogos"
          title="Catalogos">
              <ButtonNew token={token} catalog={''} />
        </WithOut>
      </CompanyClient>
    )
  }

  const table: CatalogTable[] = [];

  listsStore.map((cat) => {
    table.push({
      id: cat._id,
      name: cat.name,
      collection: cat.collection
    })
  })

  return (
    <CompanyClient option={3} >
      <div>
        <Header title="Catalogos" placeHolder="Buscar Catalogo.." >
          <ButtonNew token={token} catalog={''} />
        </Header>
        <div className="mt-5">
          <TableCatalogs  data={table}  token={token} />
        </div>
      </div>
    </CompanyClient>
  )
}