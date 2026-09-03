'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { User, UsrBack } from "@/interfaces/User";
import RemoveElement from "../RemoveElement";
import NewUser from "./NewUser";
import Button from "../Button";
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import { DataUsersToTableData } from "@/app/functions/UsersFunctions";
import { removeUser } from "@/app/api/routeUser";
import { useUserStore } from "@/app/store/userStore";
import { ResponsiveHeader as Header } from "../Header";
import { useTableStates } from "@/app/store/tableStates";
import ContainerSideNav from "../ContainerSideNav";

export default function TableUsers({token, optionsDepartments, roles}:
  {token:string, optionsDepartments:Options[], roles:Options[]}){
  
  //Este elemento es para crear las columnas de la tabla, le pasamos la interface para que sepa que columnas se requieren aunque no es obligatorio cubrir todas las columnas
  const columnHelper = createColumnHelper<User>();
  const [newUser, setNewUser] = useState<boolean>(false); // variable para abrir el sidenav de nuevo usuario
  const {pushUser, users, deleteUser} = useUserStore(); //se importan metodos del store de usuarios

  //handle para cambiar valor de estado, aunque se puede no se recomienda pasar directamente el set a otro componente hijo
  const handleClickNew = (value:boolean) => {
    setNewUser(value);
  }

  const addUser = (usr: UsrBack) => {
    pushUser(usr);
  }

  const delUser = (id: string) => {
    deleteUser(id);
  }

  //aqui se hace un parse de los datos como vienen del backend a como los manipulamos en la tabla
  const data = DataUsersToTableData(users);

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Seleccion', // identificador de la columna, en la opcion para ocultar o mostrar asi es como aparecera
      cell: ({row}) => ( // En cell va el contenido de la celda 
        <input type="checkbox" 
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting:false,
      header: ({table}:any) => ( // El header es el encabezado de la tabla
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
      {/* Componente que muestra el encabezado de la pagina y se le pasa como hijo un componente que traiga la funcionalidad requerida, que lo normal son botones para agregar un nuevo elemento */}
      <Header title="Usuarios" placeHolder="Buscar usuario..">
        <>
          <Button type="button" onClick={() => setNewUser(true)}>Nuevo</Button>
            {/* {newUser && <NewUser showForm={handleClickNew} optionsDepartments={optionsDepartments} 
                        token={token} roles={roles} addUser={addUser} />} */}
          <ContainerSideNav width="w-full max-w-sm" open={newUser}>
            <NewUser showForm={handleClickNew} optionsDepartments={optionsDepartments} 
                        token={token} roles={roles} addUser={addUser} />
          </ContainerSideNav>
        </>
      </Header>
      <div className="hidden md:block w-full mt-5">
        {/* Esta es la tabla que recibe las columnas y los datos de la tabla, dentro lo unico que cambia es cuando se requiere una funcionalidad al  seleccionar como seleccionar facturas y esperar que se pinte en el encabezado el acumulado, porque al ser de diferentes tipos de datos los campos varian */}
        <Table columns={columns} data={data} placeH="Buscar usuario..." />
      </div>
      <div className="block md:hidden mt-5">
        <ListData data={data} token={token} delUser={delUser} />
      </div>
    </>
  )
}

const ListData = ({data, token, delUser}: {data: User[], token:string, delUser: (id: string) => void}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  let filterData; 
  if(search.trim() === ''){
    filterData=data;
  }else{
    const d=data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    filterData=d;
  }

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((u) => (
            <CardUser user={u} key={u.id} token={token} delUser={delUser} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardUser = ({user, token, delUser }: 
  {user:User, token:string, delUser: (id: string) => void }) => {

  return(
    <div role="button"
      key={user.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ user?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <RemoveElement token={token} id={user.id} 
                name={user.name} remove={removeUser} removeElement={delUser} />
          {/* <DeleteElement id={user.id} name={user.name} remove={RemoveCompany} token={token} />
          <TooltipContainerIcon label="Eliminar">
            <TrashIcon className="text-red-500 w-6 h-6 hover:bg-blue-100 cursor-pointer" />
          </TooltipContainerIcon> */}
        </div>
        
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            onClick={() => window.location.replace(`/users/${user.id}/profile?opt=1`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {user.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600 break-all">
                {user.email}
              </p>
            </div>
            <div className="text-right w-32">
              <p className="block font-sans text-lg sm:text-2xl antialiased font-normal leading-normal text-blue-600">
                {user.department}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}