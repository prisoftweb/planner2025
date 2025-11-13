'use client'
import Button from "../Button"
import { useState } from "react";
import NewCatalog from "./NewCatalog";
import { CatalogTable } from "@/interfaces/Catalogs";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNew({token, catalog}: {token:string, catalog: (CatalogTable | string)}){
  const [newCollection, setNewCollection] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewCollection(true)}>Nuevo</Button>
          {newCollection && (
            <ContainerSideNav width="w-full max-w-xs">
              <NewCatalog showForm={setNewCollection} 
                                  token={token} catalog={catalog} />
            </ContainerSideNav>
          )}
    </>
  )
}