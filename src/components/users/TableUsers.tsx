'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { User, UsrBack } from "@/interfaces/User";
import RemoveElement from "../RemoveElement";
import NewUser from "./NewUser";
import Button from "../Button";
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import Header from "../Header";
import { DataUsersToTableData } from "@/app/functions/UsersFunctions";
import { removeUser } from "@/app/api/routeUser";
import { useUserStore } from "@/app/store/userStore";

export default function TableUsers({token, optionsDepartments, roles}:
  {token:string, optionsDepartments:Options[], roles:Options[]}){
  
  const columnHelper = createColumnHelper<User>();
  const [newUser, setNewUser] = useState<boolean>(false);
  const {pushUser, users, deleteUser} = useUserStore();

  const handleClickNew = (value:boolean) => {
    setNewUser(value);
  }

  const addUser = (usr: UsrBack) => {
    pushUser(usr);
  }

  const delUser = (id: string) => {
    deleteUser(id);
  }

  const data = DataUsersToTableData(users);

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Seleccion',
      cell: ({row}) => (
        <input type="checkbox" 
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
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
    columnHelper.accessor('profile', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center">
          <div 
            className={`w-4 h-4 mr-3 ${row.original.profile.status? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          <RemoveElement token={token} id={row.original.id} 
                name={row.original.name} remove={removeUser} removeElement={delUser} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('photo', {
      header: 'Foto',
      id: 'foto',
      cell: ({row}) => (
        <img src={row.original.photo} 
          className="w-12 h-auto rounded-full cursor-pointer" 
          onClick={() => window.location.replace(`/users/${row.original.id}/profile?opt=1`)} alt="profile" />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/users/${row.original.id}/profile?opt=1`)}
        >{row.original.name}</p>
      )
    }),
    columnHelper.accessor('department', {
      header: 'Departamento',
      id: 'departamento',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/users/${row.original.id}/profile?opt=1`)}
        >{row.original.department}</p>
      ),
    }),
    columnHelper.accessor('role', {
      header: 'Rol',
      id: 'rol',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/users/${row.original.id}/profile?opt=1`)}
        >{row.original.role}</p>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Correo',
      id: 'email',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/users/${row.original.id}/profile?opt=1`)}
        >{row.original.email}</p>
      ),
    }),
  ]
  
  return(
    <>
      <Header title="Usuarios" placeHolder="Buscar usuario..">
        <>
          <Button type="button" onClick={() => setNewUser(true)}>Nuevo</Button>
            {newUser && <NewUser showForm={handleClickNew} optionsDepartments={optionsDepartments} 
                        token={token} roles={roles} addUser={addUser} />}
        </>
      </Header>
      <div className="mt-5">
        <Table columns={columns} data={data} placeH="Buscar usuario..." />
      </div>
    </>
  )
}