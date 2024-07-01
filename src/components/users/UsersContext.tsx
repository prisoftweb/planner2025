'use client'

import { Options } from "@/interfaces/Common"
import TableUsers from "./TableUsers"
import { useUserStore } from "@/app/store/userStore"
import { UsrBack } from "@/interfaces/User";
import { useEffect } from "react";

export default function UsersConstext({departments, optionsRoles, token, users}: 
                        {token:string, departments:Options[], 
                          optionsRoles:Options[], users:UsrBack[]}){

  const {setUsers} = useUserStore();
  //setUsers(users);
  useEffect(() => {
    setUsers(users);
  }, []);

  return(
    <TableUsers token={token} departments={departments} roles={optionsRoles} />
  )
}