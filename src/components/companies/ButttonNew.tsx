'use client'
import Button from "../Button"
import { useState } from "react";
import NewCompany from "./NewCompany";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNew({token}: {token:string}){
  const [newCompany, setNewCompany] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewCompany(true)}>Nuevo</Button>
          {/* {newCompany && (
            <ContainerSideNav width="w-full max-w-xs">
              <NewCompany showForm={setNewCompany} token={token} />
            </ContainerSideNav>
            // <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
            //   <NewCompany showForm={setNewCompany} token={token} />
            // </div>
          )} */}
      <ContainerSideNav width="w-full max-w-xs" open={newCompany} >
        <NewCompany showForm={setNewCompany} token={token} />
      </ContainerSideNav>
    </>
  )
}