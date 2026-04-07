import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import { OneProjectMin } from "@/interfaces/Projects";
import Chip from "@/components/providers/Chip";

import { getCollectionsByProjectMin, deleteCollection } from "@/app/api/routeCollections";
import { ICollectionMin, ITableCollection } from "@/interfaces/Collections";
import { CollectionDataToTableData } from "@/app/functions/CollectionsFunctions";
import DownloadCollectionsByProjectPDF from "@/components/collections/DownloadCollectionsByProject";
import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { propsTooltip } from "@/libs/animations";

export default function TableCollectionsComponent({token, project, pageQuery}:
  {token:string, project:OneProjectMin, pageQuery: string | undefined}) {

  const [collections, setCollections] = useState<ICollectionMin[]>([]);

  useEffect(() => {
    const fetch = async() => {
      const res = await getCollectionsByProjectMin(token, project._id);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setCollections(res);
      }
    }

    fetch();
  }, []);

  if(collections.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center">
          <p className="text-5xl mt-20 font-bold">Cobranza</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            >Gestiona las cuentas por cobrar,
            recuperacion de cobranza y mas
            desde Planner</p>
          <img src="/img/estimates/invoices.svg" alt="image" className="w-60 h-auto" />
        </div>
      </>
    )
  }

  const delCollection = (id:string) => {
    showToastMessage('Cobro eliminado satisfactoriamente!!!');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const columnHelper = createColumnHelper<ITableCollection>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {/* <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          /> */}
          <RemoveElement id={`${row.original.id}`} name={row.original.Referencia} remove={deleteCollection} 
                      removeElement={delCollection} token={token} />
        </div>
      ),
      size: 300,
      enableSorting:false,
      header: ({table}:any) => (
        // <input type="checkbox"
        //   checked={table.getIsAllRowsSelected()}
        //   onClick={()=> {
        //     table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
        //   }}
        // />
        <p>Accion</p>
      )
    }),
    columnHelper.accessor('Referencia', {
      header: 'Referencia',
      id: 'referencia',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/collections/${row.original.id}?page=projects`: `/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.Referencia}</p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/collections/${row.original.id}?page=projects`: `/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.Fecha.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('concept', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/collections/${row.original.id}?page=projects`: `/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.concept}</p>
      ),
    }),
    columnHelper.accessor('Facturas', {
      header: 'Facturas',
      id: 'facturas',
      cell: ({row}) => (
        <div>
          {row.original.Facturas.map((f) => (
            <Chip label={f.invoices.folio} color={'#466'} key={f._id}
              darktext={false} />
          ))}
        </div>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Chip label={row.original.status.name} color={row.original.status.color} darktext={row?.original?.status?.darktext} />
      ),
    }),
    columnHelper.accessor('Cuenta', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/collections/${row.original.id}?page=projects`: `/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{row.original.Cuenta}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe depositado',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/collections/${row.original.id}?page=projects`: `/projects/estimates/${project._id}/collections/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Importe
        })}</p>
      ),
    }),
  ]

  const data = CollectionDataToTableData(collections);

  return (
    <>
      <div className="flex w-full justify-end items-center p-3">
        <PDFDownloadLink document={<DownloadCollectionsByProjectPDF project={project} token={token} collections={collections} />} fileName={'Cobros - '+project.title} >
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
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="buscar cobro" />
      </div>
      <div className="block md:hidden w-full mt-3">
        <ListData data={data} token={token} delCollection={delCollection} pageQuery={pageQuery} project={project} />
      </div>
      
    </>
  )
}

const ListData = ({data, pageQuery, project, token, delCollection}: 
  {data:ITableCollection[], token:string, project:OneProjectMin, pageQuery: string | undefined, delCollection: (id: string) => void}) => {
  
  return (
    <div className="relative mt-5 flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border h-[calc(100vh-317px)]">
      <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-[calc(100vh-317px)]
          overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
        {data.map((col, index) => (
          <div role="button"
            key={index}
            className={`flex flex-col w-full p-3 leading-tight transition-all rounded-lg 
              outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
              focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
              active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
              bg-white`}
            onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/collections/${col.id}?page=projects`: `/projects/estimates/${project._id}/collections/${col.id}`)}
          >
            <div className="flex items-center w-full ">
              <div className="grid mr-4 place-items-center gap-x-1 gap-y-2">
                <div className="flex gap-x-1 items-end">
                  <img alt="responsable" src={ '/img/projects/default.svg'}
                    className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                  <RemoveElement id={`${col.id}`} name={col.Referencia} remove={deleteCollection} 
                    removeElement={delCollection} token={token} />
                </div>
                <Chip label={col.status.name} color={col.status.color} darktext={col?.status?.darktext?? false} />
              </div>
              <div className="w-full">
                <div className="flex gap-x-3 justify-between items-center">
                  <div>
                    <h6
                      className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                      {col.Referencia}
                    </h6>
                    <h6
                      className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-slate-600">
                      Factura #
                    </h6>
                  </div>
                  <div>
                    <h6
                      className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                      {CurrencyFormatter({
                        currency: 'MXN',
                        value: col.Importe?? 0
                      })}
                    </h6>
                    <h6
                      className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-slate-600">
                      {col.Fecha.substring(0, 10)}
                    </h6>
                  </div>
                </div>
                {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                  {col.concept}
                </p> */}
              </div>
            </div>

            <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
              {col.concept}
            </p>

          </div>
        ))}
      </nav>
    </div>
  )
}