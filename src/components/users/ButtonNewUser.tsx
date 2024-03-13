'use client'
import { useState } from "react";
import Button from "../Button";
import NewUser from "./NewUser";

export default function ButtonNewUser({token, id, departments}: 
    {token:string, id:string, departments:any}){
  const [newUser, setNewUser] = useState<boolean>(false);
  
  return(
    <>
      <Button type="button" onClick={() => setNewUser(true)}>Nuevo</Button>
        {newUser && <NewUser showForm={setNewUser} departments={departments} token={token} />}
    </>
  )
}