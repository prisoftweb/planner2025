'use client'
import { useState } from "react";
import NewProvider from "./NewProvider";
import Button from "../Button";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNewProvider({token, id}: {token:string, id:string}){
  const [newProvider, setNewProvider] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewProvider(true)}>Nuevo</Button>
        {/* {newProvider && (
          <div className={`fixed inset-0 bg-black bg-opacity-40  z-40 ${newProvider ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <NewProvider showForm={setNewProvider} token={token} id={id} user={id} />
          </div>
        )} */}
        {/* <div className={`fixed inset-0 bg-black bg-opacity-40 z-40 
                        transition-opacity duration-300
                        ${newProvider ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <NewProvider showForm={setNewProvider} token={token} id={id} user={id} open={newProvider} />
          </div> */}
        <ContainerSideNav width="w-full sm:max-w-lg" open={newProvider}>
          <NewProvider showForm={setNewProvider} token={token} id={id} user={id} open={newProvider} />
        </ContainerSideNav>
    </>
  )
}