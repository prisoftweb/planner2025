'use client'

import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ITableCollectionByClientMin, ICollectionByClientMin } from "@/interfaces/Clients";
import { MoneyFormatter } from "@/app/functions/Globals";
import Table from "../Table";
import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { propsTooltip } from "@/libs/animations";
import DownloadCollectionByClientPDF from "./DownloadCollectionByClient";

type ClientCliProps = {
  collections: ICollectionByClientMin[],
  client:string,
  rfc:string
}

export default function ClientCollectionCli({collections, client, rfc}: ClientCliProps){

  const [opt, setOpt] = useState<number>(1);
  const handleOpt = (value: number) => {
    setOpt(value);
  }

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
        <PDFDownloadLink document={<DownloadCollectionByClientPDF collections={collections} client={client} rfc={rfc} />} fileName={`Cobranza ${client}`} >
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
      </div>
      <div >
        <Table columns={columns} data={data} placeH="buscar cobro" />
      </div>
    </>
  )
}

export function CollectionClientDataToTableData(collectionsP: ICollectionByClientMin[]){
  const table: ITableCollectionByClientMin[] = [];
  console.log('collection table => ', collectionsP);
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