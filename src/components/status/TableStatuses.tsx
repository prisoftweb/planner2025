'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import RemoveElement from "../RemoveElement";
import { StatusTable } from "@/interfaces/Status";
import { RemoveCatalog } from "@/app/api/routeCatalogs";
import { showToastMessageError } from "../Alert";
import { useListsStore } from "@/app/store/listStore";
import { useTableStates } from "@/app/store/tableStates";
import { useMemo, useState } from "react";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";
import { BsType } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";

export default function TableStatus({data, token, optFilter}:
  {data:StatusTable[], token:string, optFilter:number}) {
  
  const columnHelper = createColumnHelper<StatusTable>();

  const {listsStore, updateListsStore} = useListsStore();

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
          <div className="w-5 h-5 bg-blue-700"></div>
          <RemoveElement id={row.original.id} name={row.original.catalog} token={token} 
              remove={RemoveCatalog} removeElement={delReport} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('catalog', {
      header: 'Catalogo',
      id: 'catalogo',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.catalog}</p>
      )
    }),
    columnHelper.accessor('collection', {
      header: 'Coleccion',
      id: 'coleccion',
      cell: ({row}) => (
        <p className="">{row.original.collection}</p>
      ),
    }),
    columnHelper.accessor('statuses', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <div className="flex items-center gap-x-1 gap-y-1 flex-wrap">
          {row.original.statuses.arrStatuses.map((st, index:number) => (
            <div className="flex items-center gap-x-1" key={index}>
              <div className="w-2 h-2" style={{backgroundColor: row.original.statuses.arrColors[index]}}></div>
              <p>{st}</p>
            </div>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('categories', {
      header: 'Categorias',
      id: 'categorias',
      cell: ({row}) => (
        <p className="">{row.original.categories}</p>
      ),
    }),
    columnHelper.accessor('types', {
      header: 'Tipos',
      id: 'tipos',
      cell: ({row}) => (
        <p className="">{row.original.types}</p>
      ),
    }),
  ]
  
  return(
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar catalogo.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} delReport={delReport} optFilter={optFilter} />
      </div>
    </>
  )
}

const ListData = ({data, token, delReport, optFilter}: 
  {data: StatusTable[], token:string, delReport: (id: string) => Promise<void>, optFilter: number}) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();
  // const [category, setCategory]=useState<number>(1);

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     switch(optFilter){
  //       case 1: 
  //         const d = data.filter(item =>
  //           item.statuses.arrStatuses.some(tag =>
  //             tag.toLowerCase().includes(search)
  //           )
  //         );
  //         return d;
  //       case 2: 
  //         const c = data.filter(item =>
  //           item.categories.toLowerCase().includes(search)
  //         );
  //         return c;
  //       case 3:
  //         const b = data.filter(item =>
  //           item.types.toLowerCase().includes(search)
  //         );
  //         return b; 
  //     }
  //   }
  // }, [search]);

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item =>
        item.catalog.toLowerCase().includes(search.toLowerCase())
      );
      return d;
    }
  }, [search]);

  return(
    <div>
      {/* <div className="flex gap-x-3 items-center">
        <TooltipContainerIcon label="Estatus">
          <GrStatusInfo className="w-6 h-6 text-slate-600" onClick={() => setCategory(1)} />
        </TooltipContainerIcon>
        <TooltipContainerIcon label="Categorias">
          <MdCategory className="w-6 h-6 text-slate-600" onClick={() => setCategory(2)} />
        </TooltipContainerIcon>
        <TooltipContainerIcon label="Tipos">
          <BsType className="w-6 h-6 text-slate-600" onClick={() => setCategory(3)} />
        </TooltipContainerIcon>
      </div> */}
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-275px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData?.map((g) => (
            <CardStatus glossary={g} key={g.id} delReport={delReport} token={token} typeFilter={optFilter} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardStatus = ({glossary, token, delReport, typeFilter}: 
  {glossary:StatusTable, token:string, delReport: (id: string) => Promise<void>, typeFilter:number}) => {
  
  return(
    <div role="button"
      key={glossary.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ company.logo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          <div className="w-8 h-8" style={{backgroundColor: 'blue'}}></div>
          <RemoveElement id={glossary.id} name={glossary.catalog} token={token} 
              remove={RemoveCatalog} removeElement={delReport} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div className="w-full">
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {glossary.catalog}
              </h6>
              <p className="flex flex-wrap gap-x-3 w-full font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {typeFilter===2? glossary.categories: 
                  (typeFilter===3? glossary.types :
                      glossary.statuses.arrStatuses.map((st, index:number) => (
                        <div className="flex items-center gap-x-1" key={index}>
                          <div className="w-2 h-2" style={{backgroundColor: glossary.statuses.arrColors[index]}}></div>
                          <p>{st}</p>
                        </div>
                    ))
                  )
                }
              </p>
            </div>
            {/* <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}