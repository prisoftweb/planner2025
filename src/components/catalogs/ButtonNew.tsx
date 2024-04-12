'use client'
import Button from "../Button"
import { useState } from "react";
import NewCatalog from "./NewCatalog";
import { CatalogTable } from "@/interfaces/Catalogs";

export default function ButtonNew({token, catalog}: {token:string, catalog: (CatalogTable | string)}){
  const [newCollection, setNewCollection] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewCollection(true)}>Nuevo</Button>
          {newCollection && <NewCatalog showForm={setNewCollection} 
                                  token={token} catalog={catalog} />}
    </>
  )
}