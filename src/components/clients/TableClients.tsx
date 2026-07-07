'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { TableClient } from "@/interfaces/Clients";
import { useClientStore } from "@/app/store/clientStore";
import { useEffect, useMemo, useState } from "react";
import RemoveElement from "../RemoveElement";
import { removeClient } from "@/app/api/routeClients";
import { Badge } from "@mui/material";
import { useTableStates } from "@/app/store/tableStates";
import DownloadClientsReportPDF from "./DownloadClientsReportPDF";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Tooltip } from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import { BsFileEarmarkPdf } from "react-icons/bs";
import CardListComponent from "../CardListComponent";
import { ClientBack } from "@/interfaces/Clients";
import { Company } from "@/interfaces/Companies";
import { ResponsiveHeaderClient } from "../Header";
import ButtonNewClient from "./ButtonNewClient";
import { Options } from "@/interfaces/Common";
import Label from "../Label";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type TableClientsProps = {
  data:TableClient[], 
  token:string, 
  clientsData:ClientBack[],
  company:Company,
  user:string,
  tags:Options[],
  permissions:IPermissionsAndComponents
}

export default function TableClients({data, token, clientsData, company, tags, user, permissions}: 
  TableClientsProps){
  
  const columnHelper = createColumnHelper<TableClient>();
  const {clients, setClients, deleteClient} = useClientStore();
  const [isActive, setIsActive]=useState<boolean>(true);

  useEffect(() => {
    setClients(data);
  }, []);

  console.log('clients data => ', clientsData);

  const handleDownload = async () => {
    const dataActive=clientsData.filter(c => c.status===isActive);
    const blob = await pdf(
      <DownloadClientsReportPDF
        // clients={clientsData}
        clients={dataActive}
        satCompany={company}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Clientes.pdf';
    link.click();

    URL.revokeObjectURL(url);
  };

  const delClient = (id:string) => {
    deleteClient(id);
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {permissions.permission.select && (
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
        permissions.permission.select? (
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
          {permissions.permission.delete && (
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
    columnHelper.accessor('taxregime', {
      header: 'Regimen / Persona',
      id: 'regimen',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original?.taxregime?? ''} {' / '} {row.original?.regime?? ''}</p>
      )
    }),
    columnHelper.accessor('taxprofile', {
      header: 'Perfil fiscal',
      id: 'perfil',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original?.taxprofile}</p>
      )
    }),
    columnHelper.accessor('location', {
      header: 'Direccion',
      id: 'direccion',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original?.location}</p>
      )
    }),
    columnHelper.accessor('phone', {
      header: 'Telefono',
      id: 'telefono',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
        >{row.original?.phone}</p>
      )
    }),
    // columnHelper.accessor('account', {
    //   header: 'Cuenta',
    //   id: 'cuenta',
    //   cell: ({row}) => (
    //     <p className="py-2 cursor-pointer"
    //       onClick={() => window.location.replace(`/clients/${row.original.id}/profile`)}
    //     >{row.original.account}</p>
    //   )
    // }),
  ]

  let table: JSX.Element = <></>;
  if(clients.length > 0){
    const dataActive=clients.filter(c => c.status===isActive);
    table = (
      <>
        <div className="hidden md:block w-full">
          {/* <Table columns={columns} data={clients} placeH="Buscar cliente.." /> */}
          <Table columns={columns} data={dataActive} placeH="Buscar cliente.." />
        </div>
        <div className="block md:hidden w-full">
          {/* <ListData data={clients} token={token} delClient={delClient} /> */}
          <ListData data={dataActive} token={token} delClient={delClient} />
        </div>
      </>
    )
  }else{
    const dataActive=data.filter(c => c.status===isActive);
    table = (
      <>
        <div className="hidden md:block w-full">
          {/* <Table columns={columns} data={data} placeH="Buscar cliente.." /> */}
          <Table columns={columns} data={dataActive} placeH="Buscar cliente.." />
        </div>
        <div className="block md:hidden w-full">
          {/* <ListData data={data} token={token} delClient={delClient} /> */}
          <ListData data={dataActive} token={token} delClient={delClient} />
        </div>
      </>
    )
  }
  
  return(
    <>
      <ResponsiveHeaderClient title="Clientes" placeHolder="Buscar cliente.." >
        <div className="flex items-center gap-x-5 justify-end">
          {permissions.permission.filter && (
            <div className="inline-flex items-center">
              <Label>Activos</Label>  
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input checked={isActive} 
                  onClick={() => setIsActive(!isActive)} id="active" type="checkbox"
                  // onChange={() => console.log('')}
                  className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                    appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                    peer-checked:border-green-500 peer-checked:before:bg-green-500
                    border border-slate-300" />
                <label htmlFor="active"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                  <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"></div>
                </label>
              </div>
            </div>
          )}
          {permissions.permission.print && (
            <Tooltip
            closeDelay={0}
            delay={100}
            motionProps={propsTooltip}
            content="Informe"
            placement="right"
            className="text-blue-500 bg-white rounded-md border border-slate-400"
          >
            <button onClick={handleDownload}>
              <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
            </button>
          </Tooltip>
          )}
          {permissions.permission.create && (
            <ButtonNewClient id={user} token={token} tags={tags} company={company._id} />
          )}
        </div>
      </ResponsiveHeaderClient>
      <div className="mt-5">
        {permissions.permission.readfull && (
          table
        )}
      </div>
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
            // <CardListComponent element={c} keyID={c.id} token={token} image={ c?.logo ?? '/img/users/default.jpg'}
            //   title={c.name} subtitle={c?.abbreviation} nameElement={d?.name} removeElement={removeClient}
            //   key={c.id} />
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
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {client.rfc}
              </p>
            </div>
            <div className="text-right w-24 sm:w-auto">
              {/* <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600 break-words">
                
              </p> */}
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