'use client'
// import { cookies } from "next/headers"
import UserClient from "./UserClient";
import { getDepartmentsLV } from "@/app/api/routeDepartments";
import { getRolesLV } from "@/app/api/routeRoles";
import { UsrBack } from "@/interfaces/User";
// import NavTab from "@/components/users/NavTab";
import { useState, useEffect } from "react";
import { Options } from "@/interfaces/Common";
import { showToastMessageError } from "../Alert";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function TabUser({user, opt, token, permissions}: 
  {user:UsrBack, opt: number, token:string, permissions:IPermissionsAndComponents}){
  
  // const cookieStore = cookies();
  // const token: string = cookieStore.get('token')?.value || '';
  const [optionsDepartments, setOptionsDepartments] = useState<Options[]>([]);
  const [optsRole, setOptsRole] = useState<Options[]>([]);
  // const [error, setError] = useState<string>('');

  // consulta intermedia para consultas las opciones de deptartamentos y roles
  useEffect(() => {
    const fetchData = async () => {
      const [departments, roles] = await Promise.all([
        getDepartmentsLV(token),
        getRolesLV(token)
      ]);
      if(typeof(departments) === 'string'){
        showToastMessageError(departments);
      }else{
        setOptionsDepartments(departments);
      }
      if(typeof(roles) === 'string'){
        showToastMessageError(roles);
      }else{
        setOptsRole(roles);
      } 
    }
    fetchData();
  }, []);

  return(
    <>
      {/* <div className="mt-3">
        <NavTab idUser={params.id} tab={'1'} />
        <NavTab idUser={''} tab={'1'} />
      </div> */}
      <UserClient user={user} token={token} departments={optionsDepartments} 
        optsRole={optsRole} optTab={opt} permissions={permissions} />
    </>
  )
}