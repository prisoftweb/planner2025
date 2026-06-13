'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import IconText from "./IconText";
import { TableProvider } from "@/interfaces/Providers";
import NumberContacts from "./NumberContacts";
import { RemoveProvider } from "@/app/api/routeProviders";
import RemoveElement from "../RemoveElement";
import { useProviderStore } from "@/app/store/providerStore";
import { showToastMessageError } from "../Alert";
import { Badge } from "@mui/material";
import { useTableStates } from "@/app/store/tableStates";

export default function TableProviders({data, token}:
          {data:TableProvider[], token:string}){
  
  const columnHelper = createColumnHelper<TableProvider>();

  const {updateProviderStore, providerStore} = useProviderStore();

  const delProvider = async(id: string) => {
    try {
      const arrProvs = providerStore.filter(prov => prov._id !== id);
      updateProviderStore(arrProvs);
    } catch (error) {
      showToastMessageError('Error al quitar proveedor de la tabla!!');
    }
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      maxSize: 10,
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex items-center gap-x-2">
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
      ),
    }),
    columnHelper.accessor('suppliercredit', {
      header: 'Accion',
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center">
          <Badge color="info" badgeContent={row.original.contacts}>
            <IconText text={row.original.name} size="w-8 h-8" sizeText="" />
          </Badge>
          <div 
            className={`w-4 h-4 mr-3 ml-5 ${row.original.suppliercredit? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          <RemoveElement id={row.original.id} name={row.original.name} token={token} 
              remove={RemoveProvider} removeElement={delProvider} />
          {/* <Badge color="info" badgeContent={row.original.contacts}>
            <UserCircleIcon className="w-6 h-6 text-slate-500" />
          </Badge> */}
          {/* <NumberContacts numContacts={row.original.contacts} /> */}
          {/* <div className="flex text-slate-500 items-start">
            <UserCircleIcon className="w-6 h-6" />
            <p className="bg-purple-700 text-white rounded-full px-1 h-3"><sup>{row.original.contacts}</sup></p>
          </div> */}
        </div>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original.name}</p>
      )
    }),
    columnHelper.accessor('tradename', {
      header: 'Nombre comercial',
      id: 'nombre comercial',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original.tradename}</p>
      )
    }),
    columnHelper.accessor('rfc', {
      header: 'RFC',
      id: 'rfc',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original.rfc}</p>
      )
    }),
    // columnHelper.accessor('account', {
    //   header: 'Cuenta',
    //   id: 'cuenta',
    //   cell: ({row}) => (
    //     <p className="py-2 cursor-pointer"
    //       onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
    //     >{row.original.account}</p>
    //   )
    // }),
    columnHelper.accessor('type', {
      header: 'Tipo',
      id: 'tipo',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original.type}</p>
      )
    }),
    columnHelper.accessor('suppliercredit', {
      header: 'Linea de credito',
      id: 'credito',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original?.suppliercredit? 'Si': 'No'}</p>
      )
    }),
    columnHelper.accessor('bankdetails', {
      header: 'Datos bancarios',
      id: 'bancarios',
      cell: ({row}) => (
        <p className="py-2 cursor-pointer"
          onClick={() => window.location.replace(`/providers/${row.original.id}/profile`)}
        >{row.original?.bankdetails? 'Si':'No'}</p>
      )
    }),
    columnHelper.accessor('phone', {
      header: 'Telefono / Email',
      id: 'telefono',
      cell: ({row}) => (
        <>
          <p className="py-2 cursor-pointer">{row.original.phone}</p>
          <p className="py-2 cursor-pointer">{row.original.email}</p>
        </>
      )
    }),
  ]
  
  return(
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar proveedor.." /> 
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} delProvider={delProvider} token={token} />
      </div>
    </>
  )
}

const ListData = ({data, delProvider, token}: 
  {data: TableProvider[], token:string, delProvider: (id: string) => Promise<void>}) => {

  // const [dataReports, setDataReports] = useState(data);

  const {search} = useTableStates();

  let filterData; 
  
  if(search.trim() === ''){
    filterData=data;
  }else{
    const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    filterData=d;
  }

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-233px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((p) => (
            <CardProvider provider={p} key={p.id} delProvider={delProvider} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardProvider = ({provider, token, delProvider }: 
  {provider:TableProvider, token:string, delProvider: (id: string) => Promise<void> }) => {

  return(
    <div role="button"
      key={provider.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ provider.imgProject ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          {/* <DeleteElement id={provider.id} name={provider.name} remove={RemoveCompany} token={token} /> */}
          <Badge color="info" badgeContent={provider.contacts}>
            <IconText text={provider.name} size="w-8 h-8" sizeText="" />
          </Badge>
          <RemoveElement id={provider.id} name={provider.name} token={token} 
              remove={RemoveProvider} removeElement={delProvider} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            onClick={() => window.location.replace(`/providers/${provider.id}/profile`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {provider.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {provider.tradename}
              </p>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {provider.rfc}
              </p>
            </div>
            <div className="text-right w-24 sm:w-auto">
              {/* <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600 break-words">
                
              </p> */}
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {provider.account}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}