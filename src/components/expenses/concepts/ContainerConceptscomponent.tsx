'use client'
import Label from "@/components/Label";
import { getDate } from "@/libs/dates";
import { Options } from '@/interfaces/Common';
import SelectMultipleReact from '@/components/SelectMultipleReact';
import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import { useState, useEffect, useMemo } from "react";
import { es } from "date-fns/locale"
import { getAllCostsMinByMANYCostCenters } from "@/app/api/routeCost";
import { Expense, ExpensesTable } from "@/interfaces/Expenses";
import { showToastMessageError } from "@/components/Alert";
import { createColumnHelper } from "@tanstack/react-table";
import Chip from "@/components/providers/Chip";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { useTableStates } from "@/app/store/tableStates";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import Table from "@/components/Table";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import { IoIosLink } from "react-icons/io";

export default function ContainerConceptscomponent({conceptsOptions, token}: 
  {conceptsOptions: Options[], token:string}) {

  const [concepts, setConcepts] = useState<string[]>([conceptsOptions[0]?.value || '']);
  const columnHelper = createColumnHelper<ExpensesTable>();
  const [expenses, setExpenses]=useState<Expense[]>([]);
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDate = async (dateS: string, dateE: string, con: string[]) => {
    const res=await getAllCostsMinByMANYCostCenters(token, con, dateS, dateE);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      console.log('expnseses => ', res);
      setExpenses(res);
    }
  }

  const handleConcepts = (value: string[]) => {
    setConcepts(value);
    if(rangeDate?.from && rangeDate.to){
      handleDate(getDate(rangeDate.from), getDate(rangeDate.to), value);
    }
  };

  useEffect(() => {
    const d=new Date();
    handleDate(getDate(new Date(d.getFullYear(), 0, 1)), getDate(d), [conceptsOptions[0]?.value || '']);
  }, []);

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
          {/* <RemoveElement id={row.original.id} name={row.original.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
          <div className="w-20 flex gap-x-1 items-center">
            {row.original.archivos.includes('xml') && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='XML' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <BsFiletypeXml className="w-6 h-6 text-green-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
            {row.original.archivos.includes('pdf') && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='PDF' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <BsFileEarmarkPdf className="w-6 h-6 text-green-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
            {row.original.archivos.includes('none') && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Sin archivo' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <IoAlert className="w-6 h-6 text-red-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
            {row.original.isCfdisRelations && (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='CFDI relacionado' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <IoIosLink className="w-6 h-6 text-green-500 hover:bg-blue-100" />
                </span>
              </Tooltip>
            )}
          </div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('Proyecto', {
      id: 'Proyecto',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?status=concept`)}
        >{row.original.Proyecto}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('Informe', {
      header: 'Informe',
      id: 'Informe',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?status=concept`)}
        >{row.original.Informe}</p>
      )
    }),
    columnHelper.accessor('costcenter', {
      header: 'Centro de costos',
      id: 'Centro de costos',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?status=concept`)}
        >{row.original.costcenter}</p>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        row.original.Descripcion && (
          <>
            {row.original.Descripcion.length < 100? (
              <p className="cursor-pointer" 
                onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?status=concept`)}
              >{row.original.Descripcion}</p>
            ): (
              <p className="cursor-pointer" 
                onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?status=concept`)}
              >{row.original.Descripcion.substring(0, 100)}</p>
            )}
          </>
        )
      ),
    }),
    columnHelper.accessor('Proveedor', {
      header: 'Proveedor',
      id: 'proveedor',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/expenses/${row.original.id}/profile?status=concept`)}
        >{row.original.Proveedor}</p>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          // onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
        >
            <Chip label={row.original.condition} color={row.original.color} darktext={row.original.darktext} />
        </div>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
        >
          {CurrencyFormatter({
            currency: 'USD',
            value: row.original.Importe
          })}
        </p>
      ),
    }),
    columnHelper.accessor('vat', {
      header: 'IVA',
      id: 'iva',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
        >
          {CurrencyFormatter({
            currency: 'USD',
            value: row.original.vat
          })}
        </p>
      ),
    }),
    columnHelper.accessor('discount', {
      header: 'Descuento',
      id: 'descuento',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
        >
          {CurrencyFormatter({
            currency: 'USD',
            value: row.original.discount
          })}
        </p>
      ),
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      id: 'total',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
        >
          {CurrencyFormatter({
            currency: "USD",
            value: row.original.total
          })}
        </p>
      ),
    }),
    columnHelper.accessor('taxFolio', {
      header: 'Folio fiscal',
      id: 'Folio fiscal',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/expenses/${row.original.id}/profile${queryParam}`)}
        >{row.original.taxFolio}</p>
      ),
    }),
  ]

  const dataExpenses=ExpenseDataToTableData(expenses);

  const initialVisibilityColumns: any = {
    seleccion: true,
    Responsable: true, 
    Proyecto: true, 
    Informe: true, 
    "Centro de costos": true, 
    descripcion: true, 
    proveedor: true, 
    estatus: true, 
    fecha: true, 
    importe: true,
    iva: false,
    descuento: false,
    total: false,
    "Folio fiscal": false,
  }

  return (
    <div>
      <div className='flex flex-wrap justify-end p-3 gap-x-5 gap-y-3 mt-2'>
        <div>
          <Label htmlFor='date'>Fecha</Label>
          <DateRangePicker 
            className='mt-2'
            placeholder='Seleccione un rango de fechas'
            onValueChange={(e) => {
              setRangeDate(e);
              if(e.from && e.to){
                // refHability.current = false;
                handleDate(getDate(e.from), getDate(e.to), concepts);
              }
            }}
            value={rangeDate}
            locale={es}
          />
        </div>
        <div className='w-full max-w-md'>
          <Label htmlFor='project'>Conceptos</Label>
          <SelectMultipleReact opts={conceptsOptions} setValue={handleConcepts} index={0} />
        </div>
      </div>

      <div className="hidden md:block w-full">
        <Table columns={columns} data={dataExpenses}
                        placeH="Buscar gasto.." typeTable='cost' initialColumns={initialVisibilityColumns} />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={dataExpenses} token={token} delCost={async (id:string) => {console.log(id)}} queryParam={''} />
      </div>
    </div>
  )
}


const ListData = ({data, token, delCost, queryParam}: 
  {data: ExpensesTable[], token:string, delCost: (id: string) => Promise<void>, queryParam:string}) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.Descripcion.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((e) => (
            <CardExpense expense={e} key={e.id} delCost={delCost} token={token} queryParam={queryParam} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardExpense = ({expense, token, delCost, queryParam}: 
  {expense:ExpensesTable, token:string, delCost: (id: string) => Promise<void>, queryParam:string}) => {
  
  return(
    <div role="button"
      key={expense.id}
      className={`flex flex-col w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
      onClick={() => window.location.replace(`/expenses/${expense.id}/profile?status=concept`)}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ expense.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            {/* <RemoveElement id={expense.id} name={expense.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {expense.Proyecto}
              </h6>
              {/* <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {expense.Descripcion}
              </p> */}
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: expense.Importe
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {expense.Informe}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
        {expense.Descripcion}
      </p>

    </div>
  )
}