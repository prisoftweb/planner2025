'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../Button";
import { ExpensesTable } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { RemoveCost } from "@/app/api/routeCost";
import { useNewExpense } from "@/app/store/newExpense";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import { GetCosts } from "@/app/api/routeCost";
import { showToastMessage, showToastMessageError } from "../Alert";

export default function TableExpenses({data, token}:
                        {data:ExpensesTable[], token:string}){
  
  const columnHelper = createColumnHelper<ExpensesTable>();

  const [filtering, setFiltering] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [dataExpenses, setDataExpenses] = useState(data);

  const {refresh, updateRefresh} = useNewExpense();

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
    columnHelper.accessor('Responsable', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsable.photo} className="w-6 h-auto rounded-full" alt="user" />
          <DeleteElement id={row.original.id} name={row.original.Descripcion} remove={RemoveCost} token={token} />
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
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.Proyecto}</p>
        </Link>
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
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.Informe}</p>
        </Link>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Descripcion}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Proveedor', {
      header: 'Proveedor',
      id: 'proveedor',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Proveedor}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <Chip label={row.original.condition} />
        </Link>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Importe}</p>
        </Link>
      ),
    }),
  ]
  
  const [view, setView] = useState<JSX.Element>(<Table columns={columns} data={dataExpenses} placeH="Buscar gasto.." />);

  useEffect(() => {
    if(refresh){
      const aux = async () =>{
        try {
          const res = await GetCosts(token);
          //console.log('res');
          if(typeof(res) !== 'string'){
            const d = ExpenseDataToTableData(res);
            setDataExpenses(d);
            setView(<></>);
            setTimeout(() => {
              setView(<Table columns={columns} data={d} placeH="Buscar gasto.." />);
            }, 500);
          }else{
            showToastMessageError(res);
          }
        } catch (error) {
          showToastMessageError('Error al actualizar tabla!!');
        }
      }
      aux();
      updateRefresh(false);
    }
  }, [refresh]);

  return(
    <>
      <div className="flex justify-end mb-5">
        {/* <Button type="button" onClick={() => setFiltering(!filtering)}>Filtrar</Button>
        {filtering && <Filtering showForm={setFiltering} optCategories={optCategories} 
                          optTypes={optTypes} optConditions={optConditions} 
                          FilterData={filterData} filterCondition={filterCondition} 
                          filterType={filterType} filterCategory={filterCategory} 
                          maxAmount={maxAmount}  />} */}
      </div>
      {view}
    </>
  )
}