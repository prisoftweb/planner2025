'use client'
import Button from "../Button"
import { useState } from "react";
import NewGlossary from "./NewGlossary";
import { GlossaryTable } from "@/interfaces/Glossary";
import ContainerSideNav from "../ContainerSideNav";

type buttonProps={
  token:string, 
  glossary: (GlossaryTable | string)
}

export default function ButtonNew({token, glossary}: buttonProps ){
  const [NewList, setNewList] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewList(true)}>Nuevo</Button>
          {NewList && (
            <ContainerSideNav width="w-full max-w-sm">
              <NewGlossary showForm={setNewList} token={token} glossary={glossary} />
            </ContainerSideNav>
            // <div className="fixed inset-0 z-40 flex">
            //   <div className="fixed inset-0 bg-black bg-opacity-40">
            //     <NewGlossary showForm={setNewList} token={token} glossary={glossary} />
            //   </div>
            // </div>
          )}
    </>
  )
}