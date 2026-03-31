'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
// import NumberContacts from "../providers/NumberContacts";
import { TableClient } from "@/interfaces/Clients";
import { useClientStore } from "@/app/store/clientStore";
import { useEffect, useMemo } from "react";
import RemoveElement from "../RemoveElement";
import { removeClient } from "@/app/api/routeClients";
import { Badge } from "@mui/material";
import { useTableStates } from "@/app/store/tableStates";

type TableClientsProps = {
  data:TableClient[], 
  token:string, 
  selectPermission:boolean, 
  deletePermission: boolean
}

export default function TableClients({data, token, deletePermission, selectPermission}: TableClientsProps){
  
  const columnHelper = createColumnHelper<TableClient>();
  const {clients, setClients, deleteClient} = useClientStore();

  useEffect(() => {
    setClients(data);
  }, []);

  const delClient = (id:string) => {
    deleteClient(id);
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {selectPermission && (
            <input type="checkbox" 
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          )}
          <Badge color="secondary" badgeContent={row.original.contacts}>
            <img src={row.original.logo} alt="logo" className="w-10 h-auto" />
          </Badge>
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => {
        selectPermission? (
          <input type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onClick={()=> {
              table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
            }}
          />
        ): <></>
      }
    }),
    columnHelper.accessor('status', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center gap-x-1">
          <div 
            className={`w-4 h-4  ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          {deletePermission && (
            <RemoveElement id={row.original.id} name={row.original.name} token={token}
              remove={removeClient} removeElement={delClient} />
          )}
          {/* <NumberContacts numContacts={row.original.contacts} /> */}
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.name}</p>
      )
    }),
    columnHelper.accessor('tradename', {
      header: 'Nombre Comercial',
      id: 'nombrecomercial',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.tradename}</p>
      )
    }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'rfc',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.rfc}</p>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original.account}</p>
      )
    }),
    // columnHelper.accessor('currentbalance', {
    //   header: 'Saldo actual',
    //   id: 'saldo',
    //   cell: ({row}) => (
    //     <p className="py-2 cursor-pointer"
    //       onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
    //     >{row.original.currentbalance}</p>
    //   )
    // }),
  ]

  let table: JSX.Element = <></>;
  if(clients.length > 0){
    table = (
      <>
        <div className="hidden md:block w-full">
          <Table columns={columns} data={clients} placeH="Buscar cliente.." />
        </div>
        <div className="block md:hidden w-full">
          <ListData data={clients} token={token} delClient={delClient} />
        </div>
      </>
    )
  }else{
    table = (
      <>
        <div className="hidden md:block w-full">
          <Table columns={columns} data={data} placeH="Buscar cliente.." />
        </div>
        <div className="block md:hidden w-full">
          <ListData data={data} token={token} delClient={delClient} />
        </div>
      </>
    )
  }
  
  return(
    <>
      {table}
    </>
  )
}

const ListData = ({data, token, delClient }: 
  {data: TableClient[], token:string, delClient: (id: string) => void }) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.tradename.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((c) => (
            <CardClient client={c} key={c.id} token={token} delClient={delClient} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardClient = ({client, token, delClient }:
  {client:TableClient, token:string, delClient: (id: string) => void }) => {
  
  return(
    <div role="button"
      key={client.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center gap-y-1">
          <Badge color="secondary" badgeContent={client.contacts}>
            <img alt="responsable" src={ client?.logo ?? '/img/users/default.jpg'}
              className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          </Badge>
          
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            {/* <div 
              className={`rounded-md text-white bg-gray-600 text-center
              uppercase w-6 h-6 flex items-center justify-center`}>
              <p className={`text-xs uppercase `} >{client.code.toString()}</p>
            </div> */}

            <RemoveElement id={client.id} name={client.name} token={token}
              remove={removeClient} removeElement={delClient} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            onClick={() => window.location.replace(`/clients/${client.id}/profile`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {client.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {client.tradename}
              </p>
            </div>
            <div className="text-right w-24 sm:w-auto">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600 break-words">
                {client.rfc}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {client.account}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}