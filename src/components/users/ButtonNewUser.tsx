'use client'
import { useState } from "react";
import Button from "../Button";
import NewUser from "./NewUser";
import { Options } from "@/interfaces/Common";

export default function ButtonNewUser({token, optionsDepartments, roles}: 
  {token:string, optionsDepartments:Options[], roles:Options[]}){
  const [newUser, setNewUser] = useState<boolean>(false);
  
  const handleNewUser = () => {
    window.location.reload();
  }

  return(
    <>
      <Button type="button" onClick={() => setNewUser(true)}>Nuevo</Button>
        {newUser && <NewUser showForm={setNewUser} optionsDepartments={optionsDepartments} 
          token={token} roles={roles} addUser={() => handleNewUser} />}
    </>
  )
}