'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Chip from "../providers/Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import Button from "../Button";
import { CostsPaymentTable } from "@/interfaces/Providers";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import NewPartialCost from "./NewPartialCost";

export default function TableListExpensesPaid({data, nextPage, updateCostPartial}:
  {data:CostsPaymentTable[], nextPage: Function, updateCostPartial: Function}){
  
  const columnHelper = createColumnHelper<CostsPaymentTable>();
  const [showNewpartial, setShowNewPartial] = useState<boolean>(false);
  const [costCurrent, setCostCurrent] = useState<CostsPaymentTable>();

  const handleShowPartial = (value: boolean) => {
    setShowNewPartial(value);
  }

  const update = (value: CostsPaymentTable) => {
    setShowNewPartial(false);
    updateCostPartial(value);
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2 justify-center">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-24 cursor-pointer"
          />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <div className="w-8">
          <input type="checkbox"
            className="w-24 cursor-pointer"
            checked={table.getIsAllRowsSelected()}
            onClick={()=> {
              table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
            }}
          />
        </div>
      )
    }),
    columnHelper.accessor('Responsable', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsable.photo} className="w-10 h-auto rounded-full" alt="user" />
          <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
            onClick={() => {
              setCostCurrent(row.original);
              setShowNewPartial(true);
            }} />
          <div className="w-20 flex gap-x-1 items-center">
            {row.original.archivos.includes('xml') && <BsFiletypeXml className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('pdf') && <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('none') && <IoAlert className="w-6 h-6 text-red-500" />}
          </div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('condition', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <div className="cursor-pointer">
            <Chip label={row.original.condition.name} color={row.original.condition.color}
                darktext={row.original?.condition?.darktext?? false} />
        </div>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Importe saldo anterior',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Total}</p>
      ),
    }),
    columnHelper.accessor('paid', {
      header: 'Importe saldo pagado',
      id: 'importe pagado',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.paid
        })}</p>
      ),
    }),
    columnHelper.accessor('pending', {
      header: 'Importe saldo insoluto',
      id: 'importe insoluto',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.pending
        })}</p>
      ),
    }),
  ]

  return(
    <>
      <div className="hidden lg:block w-full">
        <Table columns={columns} data={data} placeH="Buscar gasto.." />
      </div>
      <div className="block lg:hidden w-full">
        <ListData data={data} />
      </div>
      <div className="mt-2 flex justify-center">
        <Button onClick={() => nextPage(1)}>Siguiente</Button>
      </div>
      {showNewpartial && costCurrent && <NewPartialCost setShowForm={handleShowPartial} cost={costCurrent} updateCost={update} />}
    </>
  )
}

const ListData = ({data}: {data: CostsPaymentTable[]}) => {

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

          {data.map((e) => (
            <CardInvoices expense={e} key={e.id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardInvoices = ({expense }: 
  {expense:CostsPaymentTable }) => {

  return(
    <div role="button"
      key={expense.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ expense.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={expense.id} name={expense.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            // onClick={() => window.location.replace(`/expenses/${expense.id}/profile?prov=${idProv}`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {expense.Total}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: expense.paid
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: expense.pending
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                <Chip label={expense.condition.name} color={expense.condition.color}
                  darktext={expense?.condition?.darktext?? false} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}