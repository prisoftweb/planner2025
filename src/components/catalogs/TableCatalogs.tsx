'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState, useMemo } from "react";
import { CatalogTable } from "@/interfaces/Catalogs";
import { RemoveCatalog } from "@/app/api/routeCatalogs";
import NewCatalog from "./NewCatalog";
import RemoveElement from "../RemoveElement";
import { useListsStore } from "@/app/store/listStore";
import { showToastMessageError } from "../Alert";
import {Tooltip} from "@nextui-org/react";
import ContainerSideNav from "../ContainerSideNav";
import { propsTooltip } from "@/libs/animations";
import { useTableStates } from "@/app/store/tableStates";

export default function TableCatalogs({data, token}: {data:CatalogTable[], token:string}){
  
  const columnHelper = createColumnHelper<CatalogTable>();

  const {listsStore, updateListsStore} = useListsStore();

  const [editCat, setEditCat] = useState<boolean>(false);
  const [catEdit, setCatEdit] = useState<CatalogTable>();

  const delReport = async(id: string) => {
    try {
      const arrLists = listsStore.filter(list => list._id !== id);
      updateListsStore(arrLists);
    } catch (error) {
      showToastMessageError('Error al quitar informe de la tabla!!');
    }
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
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
    columnHelper.accessor(row => row.id, {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Modificar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer hover:bg-blue-100" 
              onClick={() => {setCatEdit(row.original); setEditCat(true);}}
            />
          </Tooltip>
          <RemoveElement id={row.original.id} name={row.original.name} token={token} 
              remove={RemoveCatalog} removeElement={delReport} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Catalogo',
      id: 'catalogo',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('collection', {
      header: 'Coleccion',
      id: 'coleccion',
      cell: ({row}) => (
        <p className="">{row.original.collection}</p>
      ),
    }),
  ]
  
  return(
    <>
      {editCat && (
        <ContainerSideNav width="w-full max-w-xs">
          <NewCatalog token={token} catalog={catEdit || ''} showForm={setEditCat} />
        </ContainerSideNav>
      )}
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar catalogo.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} delReport={delReport} />
      </div>
    </>
  )
}

const ListData = ({data, token, delReport}: 
  {data: CatalogTable[], token:string, delReport: (id: string) => Promise<void>}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[450px]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((c) => (
            <CardCatalog company={c} key={c.id} token={token} delReport={delReport} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardCatalog = ({company, token, delReport}: 
  {company:CatalogTable, token:string, delReport: (id: string) => Promise<void>}) => {
  
  return(
    <div role="button"
      key={company.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ '/img/catalog.svg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <RemoveElement id={company.id} name={company.name} token={token} 
              remove={RemoveCatalog} removeElement={delReport} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {company.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {company.collection}
              </p>
            </div>
            {/* <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {company.email}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}