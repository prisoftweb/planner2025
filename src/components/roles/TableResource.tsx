'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import { Resource, ResourceTable } from "@/interfaces/Roles";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState, useMemo } from "react";
import NewRoute from "./NewRoute";
import NewSubPath from "./NewSubPath";
import NewComponent from "./NewComponent";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";
import { useTableStates } from "@/app/store/tableStates";
import ContainerSideNav from "../ContainerSideNav";

export default function TableResource({data, token, option}:
  {data:ResourceTable[], token:string, option:number}){
 
  const columnHelper = createColumnHelper<ResourceTable>();
  const [dataResource, setDataResource] = useState<Resource>({__v: 0,
                           _id: '', description: '', id: '', name: '', title: ''});

  const updateResource = (row:ResourceTable) => {
    setDataResource({
      __v: 0,
      _id: row.id,
      description: row.description,
      id: row.id,
      name: row.name,
      title: row.title,
    })
    setOpenForm(true);
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
        <div className="flex">
          <TooltipContainerIcon label="Eliminar">
            <TrashIcon className="text-red-500 w-6 h-6 hover:bg-blue-100" />
          </TooltipContainerIcon>
          <TooltipContainerIcon label="Modificar">
            <PencilSquareIcon className="text-slate-500 w-6 h-6 cursor-pointer hover:bg-blue-100" 
              onClick={() => updateResource(row.original)}
            />
          </TooltipContainerIcon>
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
        <Link href={`#`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    columnHelper.accessor('title', {
      header: 'Titulo',
      id: 'titulo',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.title}</p>
        </Link>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.description}</p>
        </Link>
      )
    }),
  ]
  
  const [openForm, setOpenForm] = useState<boolean>(false);

  const view = (option === 1? 
                  <ContainerSideNav width="w-full max-w-md" open={openForm}>
                    <NewRoute showForm={setOpenForm} token={token} resource={dataResource} />
                  </ContainerSideNav>: 
                      (option === 2? <ContainerSideNav width="w-full max-w-md" open={openForm}>
                                        <NewSubPath showForm={setOpenForm} token={token} route={dataResource} />
                                      </ContainerSideNav> : 
                          (option === 3? <ContainerSideNav width="w-full max-w-md" open={openForm}>
                                            <NewComponent showForm={setOpenForm} token={token} component={dataResource} />
                                          </ContainerSideNav> :
                            <ContainerSideNav width="w-full max-w-md" open={openForm}>
                              <NewRoute showForm={setOpenForm} token={token} resource={dataResource} />
                            </ContainerSideNav>)) )

  return(
    <>
      {openForm && view}
      
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH={`${option=== 2? 'Buscar ruta..': 
                                                        (option===3? 'Buscar componente..': 
                                                          'Buscar recurso..')}`} />
      </div>
      <div className="block md:hidden">
        <ListData data={data} updateResource={updateResource} />
      </div>
    </>
  )
}

const ListData = ({data, updateResource}: {data: ResourceTable[], updateResource: (row: ResourceTable) => void}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((r) => (
            <CardResource resource={r} key={r.id} updateResource={updateResource} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardResource = ({resource, updateResource }: 
  {resource:ResourceTable, updateResource: (row: ResourceTable) => void }) => {

  return(
    <div role="button"
      key={resource.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        {/* <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ resource.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <DeleteElement id={resource.id} name={resource.name} remove={RemoveCompany} token={token} />
          <TooltipContainerIcon label="Eliminar">
            <TrashIcon className="text-red-500 w-6 h-6 hover:bg-blue-100 cursor-pointer" />
          </TooltipContainerIcon>
        </div> */}
        <TooltipContainerIcon label="Modificar">
          <PencilSquareIcon className="text-slate-500 w-6 h-6 cursor-pointer hover:bg-blue-100" 
            onClick={() => updateResource(resource)}
          />
        </TooltipContainerIcon>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            // onClick={() => window.location.replace(`/expenses/${resource.id}/profile?prov=${idProv}`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {resource.title}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {resource.description}
              </p>
            </div>
            <div className="text-right w-32">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {resource.name}
              </p>
              {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}