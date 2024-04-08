'use client'
import { useState } from "react";
import Button from "../Button";
import NewUser from "./NewUser";
import { Options } from "@/interfaces/Common";

export default function ButtonNewUser({token, id, departments, roles}: 
    {token:string, id:string, departments:any, roles:Options[]}){
  const [newUser, setNewUser] = useState<boolean>(false);
  
      console.log('new user = ', roles);

  return(
    <>
      <Button type="button" onClick={() => setNewUser(true)}>Nuevo</Button>
        {newUser && <NewUser showForm={setNewUser} departments={departments} 
          token={token} roles={roles} />}
    </>
  )
}