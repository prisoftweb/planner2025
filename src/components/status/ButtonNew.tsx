'use client'
import Button from "../Button"
import { useState } from "react";
import NewStatus from "./NewStatus";
import { Options } from "@/interfaces/Common";

export default function ButtonNew({token, catalogOptions}:
                                  {token:string, catalogOptions:Options[]}){
  const [newStatus, setNewStatus] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewStatus(true)}>Nuevo</Button>
          {newStatus && <NewStatus showForm={setNewStatus} token={token}
              catalogOptions={catalogOptions} />}
    </>
  )
}