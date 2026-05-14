'use client'
import { useState } from "react";
import Button from "../Button";
import NewClient from "./NewClient";
import { Options } from "@/interfaces/Common";
import ContainerSideNav from "../ContainerSideNav";

export default function ButtonNewClient({token, id, tags, company}: 
  {token:string, id:string, tags:Options[], company:string}){

  const [newClient, setNewClient] = useState<boolean>(false);

  const handleClick = (value:boolean) => {
    setNewClient(value);
  }
  // console.log('tags button => ', tags);
  return(
    <>
      <Button type="button" onClick={() => setNewClient(true)}>Nuevo</Button>
        {/* {newClient && (
          <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
            <NewClient tags={tags} showForm={handleClick} id={id} token={token} />
          </div>
        )} */}
        <ContainerSideNav width="w-full sm:max-w-2xl" open={newClient}>
          <NewClient tags={tags} showForm={handleClick} id={id} token={token} company={company} />
        </ContainerSideNav>
    </>
  )
}