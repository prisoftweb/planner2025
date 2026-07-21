'use client'

import { Options } from "@/interfaces/Common"
import TableUsers from "./TableUsers"
import { useUserStore } from "@/app/store/userStore"
import { UsrBack } from "@/interfaces/User";
import { useEffect } from "react";

//Componente intermedio para actualizar en el estado global los usuarios que fueron recibidos de la peticion en el page
export default function UsersConstext({departments, optionsRoles, token, users}: 
  {token:string, departments:Options[], optionsRoles:Options[], users:UsrBack[]}){

  //se importa setusers y con un usefect para que al cargar componente se actualice el estado de users
  const {setUsers} = useUserStore();
  useEffect(() => {
    setUsers(users);
  }, []);

  return(
    <TableUsers token={token} optionsDepartments={departments} roles={optionsRoles} />
  )
}