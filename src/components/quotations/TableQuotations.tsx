'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { IQuotationTable } from "@/interfaces/Quotations";
import RemoveElement from "../RemoveElement";
import Chip from "../providers/Chip";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { removeQuotation } from "@/app/api/routeQuotations";
import RatingComponent from "./RatingComponent";
import { useMemo } from "react";
import { useTableStates } from "@/app/store/tableStates";

export default function TableQuotations({quotationsData, token, deleteQuatation}:
  {quotationsData: IQuotationTable[], token:string, deleteQuatation: Function}){
  
  const columnHelper = createColumnHelper<IQuotationTable>();

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
      size: 300,
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
    columnHelper.accessor('Detalle', {
      id: 'Detalle',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Detalle.photo} alt="foto" className="w-8 h-8" />
          <RemoveElement id={row.original.id} name={row.original.Titulo} remove={removeQuotation} 
              token={token} removeElement={deleteQuatation} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('Folio', {
      header: 'Folio',
      id: 'folio',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Folio}</p>
      )
    }),
    columnHelper.accessor('score', {
      header: 'Puntuacion',
      id: 'puntuacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        ><RatingComponent setValue={() => {}} 
            value={row.original.score} isDisabled={true} size="small" /></p>
      ),
    }),
    columnHelper.accessor('Titulo', {
      header: 'Titulo',
      id: 'titulo',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Titulo}</p>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        ><Chip label={row.original.Estatus.name} color={row.original.Estatus.color}
            darktext={row.original?.Estatus?.darktext?? false} /></p>
      ),
    }),
    columnHelper.accessor('Cliente', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Cliente.name}</p>
      ),
    }),
    columnHelper.accessor('Fechasol', {
      header: 'Fecha Sol',
      id: 'fechasol',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Fechasol?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Fechaenv', {
      header: 'Fecha Env',
      id: 'fechaenv',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Fechaenv?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Monto', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Monto
        })}</p>
      ),
    }),
  ];

  return(
    <>
      <div className="hidden md:block w-full">
        <Table columns={columns} data={quotationsData} placeH="Buscar cotizacions.." typeTable="quotations" />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={quotationsData} token={token} deleteQuatation={deleteQuatation} />
      </div>
    </>
  )
}

const ListData = ({data, token, deleteQuatation }: 
  {data: IQuotationTable[], token:string, deleteQuatation:Function }) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.Titulo.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div className="mt-2">
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-229px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((q) => (
            <CardQuotations quotations={q} key={q.id} token={token} deleteQuatation={deleteQuatation} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardQuotations = ({quotations, token, deleteQuatation }: 
  {quotations:IQuotationTable, token:string, deleteQuatation:Function }) => {
  
  return(
    <div role="button"
      key={quotations.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ quotations.Detalle?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            <RemoveElement id={quotations.id} name={quotations.Titulo} remove={removeQuotation} 
              token={token} removeElement={deleteQuatation} />
            {/* <RemoveElement id={quotations.id} name={quotations.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
        </div>
        <div className="w-full"
          onClick={() => window.location.replace(`/quotations/${quotations.id}`)}
        >
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {quotations.Titulo}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {quotations.Cliente.name}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: quotations.Monto
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                <Chip label={quotations.Estatus.name} color={quotations.Estatus.color} darktext={quotations?.Estatus?.darktext?? false} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}