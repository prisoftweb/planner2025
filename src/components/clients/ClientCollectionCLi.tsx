'use client'

import { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ITableCollectionByClientMin, ICollectionByClientMin } from "@/interfaces/Clients";
import { CurrencyFormatter, MoneyFormatter } from "@/app/functions/Globals";
import Table from "../Table";
import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { propsTooltip } from "@/libs/animations";
import DownloadCollectionByClientPDF from "./DownloadCollectionByClient";
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";
import { showToastMessageError } from "../Alert";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type ClientCliProps = {
  collections: ICollectionByClientMin[],
  client:string,
  rfc:string,
  idc:string,
  token:string,
  permissions:IPermissionsAndComponents
}

export default function ClientCollectionCli({collections, client, rfc, idc, token, permissions}: ClientCliProps){

  const [satCompany, setSatCompany]=useState<Company>();

  useEffect(() => {
    const fetch = async () => {
      const res=await getCompany(token, idc);

      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setSatCompany(res);
      }
    }

    fetch();
  }, []);

  const columnHelper = createColumnHelper<ITableCollectionByClientMin>();

  const columns = [
    columnHelper.accessor('user', {
      id: 'usuario',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          {/* <p>condition</p> */}
          <img src={row.original.user} alt="foto" className="w-8 h-8" />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Usuario</p>
      )
    }), 
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          
        >{row.original.project}</p>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      id: 'status',
      cell: ({row}) => (
        <div className={`w-5 h-5 ${row.original.status? 'bg-green-600': 'bg-red-600'}`}></div>
      ),
    }),
    columnHelper.accessor('pendingBilling', {
      header: 'Por Facturar',
      id: 'billing',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{MoneyFormatter(row.original.pendingBilling)}</p>
      ),
    }),
    columnHelper.accessor('pendingCollection', {
      header: 'Por Cobrar',
      id: 'collection',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{MoneyFormatter(row.original.pendingCollection)}</p>
      ),
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      id: 'total',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{MoneyFormatter(row.original.total)}</p>
      ),
    }),
  ]  

  const data = CollectionClientDataToTableData(collections);

  return(
    <>
      <div className="flex justify-end">
        {satCompany && permissions.permission.print && (
          <PDFDownloadLink document={<DownloadCollectionByClientPDF collections={collections} client={client} rfc={rfc} company={satCompany} />} fileName={`Cobranza ${client}`} >
            {({loading, url, error, blob}) => 
              loading? (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                    placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                  <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                </Tooltip>
              ) : (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                    placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                  <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                </Tooltip>
              ) }
          </PDFDownloadLink>
        )}
      </div>
      <div >
        {permissions.permission.readfull && (
          <>
            <div className="hidden md:block w-full">
              <Table columns={columns} data={data} placeH="buscar cobro" />
            </div>
            <div className="block md:hidden w-full">
              <ListData data={data} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

const ListData = ({data}: {data: ITableCollectionByClientMin[]}) => {

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((c, index:number) => (
            <CardCollection collection={c} key={index} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardCollection = ({collection }: 
  {collection:ITableCollectionByClientMin }) => {

  return(
    <div role="button"
      // key={collection.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ collection.user ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={collection.id} name={collection.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {collection.project}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: "MXN",
                  value: collection.pendingBilling
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: "MXN",
                  value: collection.total
                })}  
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: "MXN",
                  value: collection.pendingCollection
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CollectionClientDataToTableData(collectionsP: ICollectionByClientMin[]){
  const table: ITableCollectionByClientMin[] = [];
  collectionsP.map((col) => {
    table.push({
      pendingBilling: col?.pendingBilling?? 0,
      pendingCollection: col?.pendingPayment?? 0,
      project: col.project.title,
      status: col?.pendingTotal && col.pendingTotal > 0 ? false : true,
      total: col?.pendingTotal?? 0,
      user: col.project?.photo?? '/img/projects/default.jpg' // to be filled later
    })
  });

  return table;
}