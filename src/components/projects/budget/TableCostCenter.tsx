import { BudgetTableCostCenter } from "@/interfaces/Budget"
import { createColumnHelper } from "@tanstack/react-table";
import RemoveElement from "@/components/RemoveElement";
import Table from "@/components/Table";
import { useOneBudget } from "@/app/store/budgetProject";
import { getBudget, DeleteNewBudgetInBudget } from "@/app/api/routeBudget";
import { showToastMessageError } from "@/components/Alert";

export default function TableCostCenter({dataTable, token, id}: 
  {dataTable:BudgetTableCostCenter[], token: string, id:string}) {
  
  const columnHelper = createColumnHelper<BudgetTableCostCenter>();
  const {oneBudget, updateOneBudget} = useOneBudget();
  
  //const [filtering, setFiltering] = useState<boolean>(false);
  //const [filter, setFilter] = useState<boolean>(false);
 // const [dataProjects, setDataProjects] = useState(data);

  const delBudget = async(id: string) => {
    try {
      const res = await getBudget(token, id);
      if(typeof(res)==='string'){
        showToastMessageError('Error al actualizar pantalla del presupuesto!!');
      }else{
        updateOneBudget(res);
      }
    } catch (error) {
      showToastMessageError('Error al actualizar pantalla del presupuesto!!');
    }
  }

  // const {haveDeleteProject, haveNewProject, projectStore, updateHaveDeleteProject, 
  //   updateHaveNewProject, updateProjectStore} = useProjectsStore();

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
        <div className="">
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
        <p className="">{row.original.category}</p>
      ),
    }),
    columnHelper.accessor('concept', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="">{row.original.category}</p>
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
    </div>
  )
}
