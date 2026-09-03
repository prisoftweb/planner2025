'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import { TreeTable } from "@/interfaces/Roles";
import { TrashIcon } from "@heroicons/react/24/solid";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";

export default function TableTree({data, token, idTree}:
  {data:TreeTable[], token:string, idTree:string}){
  
  const columnHelper = createColumnHelper<TreeTable>();

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
    columnHelper.accessor('status', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center">
          <div className={`w-6 h-6 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
          <TooltipContainerIcon label="Eliminar">
            <TrashIcon className="text-red-500 w-6 h-6 hover:bg-blue-100 cursor-pointer" />
          </TooltipContainerIcon>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('resource', {
      header: 'Recurso',
      id: 'recurso',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.resource}</p>
        </Link>
      )
    }),
    columnHelper.accessor('routes', {
      header: 'Rutas',
      id: 'rutas',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.routes}</p>
        </Link>
      )
    }),
    columnHelper.accessor('components', {
      header: 'Componentes',
      id: 'componentes',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.components}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar arbol.." />
      </div>
      <div className="block md:hidden">
        <ListData data={data} />
      </div>
    </>
  )
}

const ListData = ({data}: {data: TreeTable[]}) => {

  // const [dataReports, setDataReports] = useState(data);

  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((t) => (
            <CardTree tree={t} key={t.id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardTree = ({tree }: 
  {tree:TreeTable }) => {

  return(
    <div role="button"
      key={tree.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        {/* <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ tree.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <DeleteElement id={tree.id} name={tree.name} remove={RemoveCompany} token={token} />
          <TooltipContainerIcon label="Eliminar">
            <TrashIcon className="text-red-500 w-6 h-6 hover:bg-blue-100 cursor-pointer" />
          </TooltipContainerIcon>
        </div> */}
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            // onClick={() => window.location.replace(`/expenses/${tree.id}/profile?prov=${idProv}`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {tree.resource}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {tree.components}
              </p>
            </div>
            <div className="text-right w-32">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {tree.routes}
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