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
          {newCollection && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40">
              <NewCatalog showForm={setNewCollection} 
                                  token={token} catalog={catalog} />
            </div>
          )}
    </>
  )
}