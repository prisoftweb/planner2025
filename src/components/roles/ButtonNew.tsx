'use client'
import { useState } from "react";
import Button from "../Button";
import NewRole from "./NewRole";
import NewRoute from "./NewRoute";
import NewSubPath from "./NewSubPath";
import NewComponent from "./NewComponent";

export default function ButtonNew({token, opt}: {token:string, opt:number}){
  const [newRole, setNewRole] = useState<boolean>(false);
  
  let showButton;

  switch(opt){
    case 1: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewRole showForm={setNewRole} token={token} />}
      </>
    break;
    case 2: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewRoute showForm={setNewRole} token={token} />}
      </>
    break;
    case 3: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewSubPath showForm={setNewRole} token={token} />}
      </>
    break;
    case 4: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewComponent showForm={setNewRole} token={token} />}
      </>
    break;
  }

  return(
    <>
      {showButton}
    </>
  )
}