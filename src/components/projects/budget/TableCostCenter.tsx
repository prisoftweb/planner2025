import { BudgetTableCostCenter } from "@/interfaces/Budget"
import { createColumnHelper } from "@tanstack/react-table";
import RemoveElement from "@/components/RemoveElement";
import Table from "@/components/Table";
import { useOneBudget } from "@/app/store/budgetProject";
import { DeleteNewBudgetInBudget, getBudget } from "@/app/api/routeBudget";
import { showToastMessageError } from "@/components/Alert";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import EditBudget from "./EditBudget";

export default function TableCostCenter({dataTable, token, id}: 
  {dataTable:BudgetTableCostCenter[], token: string, id:string}) {
  
  const columnHelper = createColumnHelper<BudgetTableCostCenter>();
  const {updateOneBudget} = useOneBudget();

  const [openEditBudget, setOpenEditBudget] = useState<boolean>(false);
  const [rowEditBudget, setRowEditBudget] = useState<BudgetTableCostCenter>();

  const handleEditBudget = (value: boolean) => {
    setOpenEditBudget(value);
  }

  const delBudget = async(id: string) => {
    const index = id.indexOf('/');
    const id_b = id.substring(0, index);
    try {
      const res = await getBudget(token, id_b);
      if(typeof(res)==='string'){
        showToastMessageError('Error al actualizar pantalla del presupuesto!!');
      }else{
        updateOneBudget(res);
      }
    } catch (error) {
      showToastMessageError('Error al actualizar pantalla del presupuesto!!');
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
    columnHelper.accessor('id', {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          {/* <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} /> */}
          <RemoveElement id={id+'/'+row.original.id} name={row.original.concept} remove={DeleteNewBudgetInBudget} 
              removeElement={delBudget} token={token} />
          {/* <PencilIcon className="text-slate-500 w-6 h-6 cursor-pointer hover:text-slate-300" 
            onClick={() => {
              handleEditBudget(true);
              setRowEditBudget(row.original);
            }}
          /> */}
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Accion</p>
      )
    }),
    columnHelper.accessor(row => row.percentage, {
      id: 'porcentaje',
      cell: ({row}) => (
        <div className="cursor-pointer" onClick={() => {
          handleEditBudget(true);
          setRowEditBudget(row.original);
        }}>
          <p>{row.original.percentage}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": row.original.percentage}}></div>
          </div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Porcentaje presupuesto</p>
      )
    }),
    columnHelper.accessor('category', {
      header: 'Categoria',
      id: 'categoria',
      cell: ({row}) => (
        <p className="cursor-pointer" onClick={() => {
          handleEditBudget(true);
          setRowEditBudget(row.original);
        }}>{row.original.category}</p>
      ),
    }),
    columnHelper.accessor('concept', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer" onClick={() => {
          handleEditBudget(true);
          setRowEditBudget(row.original);
        }}>{row.original.category}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'Monto',
      cell: ({row}) => (
        <p className="">{row.original.amount}</p>
      ),
    }),
  ]
  
  return (
    <div>
      <p>PRESUPUESTADO POR CENTRO DE COSTOS</p>
      <Table columns={columns} data={dataTable} placeH="Buscar costo.." />
      {openEditBudget && rowEditBudget && <EditBudget budget={rowEditBudget} showForm={handleEditBudget}
        token={token} />}
    </div>
  )
}
