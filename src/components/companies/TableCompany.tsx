'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CompanyTable } from "@/interfaces/Companies";
import { RemoveCompany } from "@/app/api/routeCompany";
import DeleteElement from "../DeleteElement";
import { useTableStates } from "@/app/store/tableStates";
import { useMemo } from "react";

export default function TableCompany({data, token}: {data:CompanyTable[], token:string}){
  
  const columnHelper = createColumnHelper<CompanyTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <img src={row.original.logo} 
            className="w-12 h-auto rounded-full" 
            alt="logo" />
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
        <div className="flex text-slate-500 items-center">
          <div 
            className={`w-4 h-4 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
          </div>
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveCompany} token={token} />
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
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Telefono | Correo',
      id: 'telefono',
      cell: ({row}) => (
        <div className=" text-slate-500">
          <p className="">{row.original.phoneNumber}</p>
          <p className="">{row.original.email}</p>
        </div>
      ),
    }),
    columnHelper.accessor('address', {
      header: 'Direccion',
      id: 'direccion',
      cell: ({row}) => (
        <p className="py-2 text-center text-slate-500">{row.original.address}</p>
      )
    }),
  ]
  
  return(
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar compañia.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} />
      </div>
    </>
  )
}

const ListData = ({data, token}: {data: CompanyTable[], token:string}) => {

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
            <CardCompany company={c} key={c.id} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardCompany = ({company, token}: 
  {company:CompanyTable, token:string}) => {

  let phoneFormatted = '';
  if (company.phoneNumber){
    const cleaned = company.phoneNumber.toString().replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    phoneFormatted = match ? `(${match[1]}) ${match[2]}-${match[3]}` : company.phoneNumber.toString();
  }
  
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
          <img alt="responsable" src={ company.logo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <DeleteElement id={company.id} name={company.name} remove={RemoveCompany} token={token} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {company.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {company.address}
              </p>
            </div>
            <div className="text-right">
              {/* <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600"> */}
                <a className="text-blue-600" href={`tel:${String(phoneFormatted).replace(/\D/g, '')}`}>
                  {phoneFormatted}
                </a>
              {/* </p> */}
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {company.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}