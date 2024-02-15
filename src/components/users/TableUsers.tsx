'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { User } from "@/interfaces/User";
import DeleteUser from "./DeleteUser";
import NewUser from "./NewUser";
import Button from "../Button";
import { useState } from "react";

export default function TableUsers({data, token}:{data:User[], token:string}){
  
  const columnHelper = createColumnHelper<User>();
  const [newUser, setNewUser] = useState<boolean>(false);

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'id',
      cell: ({row}) => (
        <div className="flex">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <DeleteUser token={token} user={row.original} />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <input type="checkbox" 
          checked={table.getIsAllRowsSelected()}
          onClick={()=> {
            table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
          }}
        />
      )
    }),
    columnHelper.accessor('photo', {
      header: 'Foto',
      id: 'photo',
      cell: ({row}) => (
        <img src={row.original.photo} 
          className="w-12 h-12 rounded-full" 
          onClick={() => console.log(row.original.photo)} alt="profile" />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'name'
    }),
    columnHelper.accessor('profile', {
      header: 'Perfil / Estado',
      id: 'profile',
      cell: ({row}) => (
        <div className="flex items-center">
          <div 
            className={`w-6 h-6 mr-3 ${row.original.profile.status? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          <p>{row.original.profile.role}</p>
        </div>       
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Correo',
      id: 'email'
    }),
  ]
  
  return(
    <>
      <div className="flex justify-end">
        <Button type="button" onClick={() => setNewUser(true)}>Nuevo</Button>
        {newUser && <NewUser showForm={setNewUser} />}
      </div>
      <Table columns={columns} data={data} /> 
    </>
  )
}