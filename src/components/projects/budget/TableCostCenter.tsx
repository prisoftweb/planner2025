import { BudgetTableCostCenter } from "@/interfaces/Budget"
import { createColumnHelper } from "@tanstack/react-table";
import RemoveElement from "@/components/RemoveElement";
import Table from "@/components/Table";
import { useOneBudget } from "@/app/store/budgetProject";
import { DeleteNewBudgetInBudget, getBudget } from "@/app/api/routeBudget";
import { showToastMessageError } from "@/components/Alert";
import { useState } from "react";
import EditBudget from "./EditBudget";
import { FullBudget } from "@/interfaces/BudgetProfile";

export default function TableCostCenter({dataTable, token, id, user}: 
  {dataTable:BudgetTableCostCenter[], token: string, id:string, user: string, budget:FullBudget}) {
  
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
          <RemoveElement id={id+'/'+row.original.id} name={row.original.concept.name} remove={DeleteNewBudgetInBudget} 
              removeElement={delBudget} token={token} isCostcenterBudget={true} progreesAverage={Number(row.original.percentage.replace(/[$, M, X, N,%]/g, ""))} totalAverage={Number(row.original.amount.replace(/[$, M, X, N,]/g, ""))} />
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
        }}>{row.original.category.name}</p>
      ),
    }),
    columnHelper.accessor('concept', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer" onClick={() => {
          handleEditBudget(true);
          setRowEditBudget(row.original);
        }}>{row.original.concept.name}</p>
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
      <div className="hidden md:block w-full">
        <Table columns={columns} data={dataTable} placeH="Buscar costo.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={dataTable} token={token} delBudget={delBudget} id={id} />
      </div>
      {openEditBudget && rowEditBudget && <EditBudget budget={rowEditBudget} showForm={handleEditBudget}
        token={token} idBudget={id} user={user} />}
    </div>
  )
}

const ListData = ({data, token, delBudget, id }: 
  {data: BudgetTableCostCenter[], token:string, delBudget:Function, id:string }) => {

  // const [dataReports, setDataReports] = useState(data);
  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.Titulo.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div className="mt-2">
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-229px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((q) => (
            <CardQuotations costcenter={q} key={q.id} token={token} delBudget={delBudget} id={id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardQuotations = ({costcenter, token, delBudget, id }: 
  {costcenter:BudgetTableCostCenter, token:string, delBudget:Function, id:string }) => {
  
  return(
    <div role="button"
      key={costcenter.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ costcenter.Detalle?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            <RemoveElement id={id+'/'+costcenter.id} name={costcenter.concept.name} remove={DeleteNewBudgetInBudget} 
              removeElement={delBudget} token={token} isCostcenterBudget={true} progreesAverage={Number(costcenter.percentage.replace(/[$, M, X, N,%]/g, ""))} totalAverage={Number(costcenter.amount.replace(/[$, M, X, N,]/g, ""))} />
            {/* <RemoveElement id={costcenter.id} name={costcenter.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
        </div>
        <div className="w-full"
          // onClick={() => window.location.replace(`/costcenter/${costcenter.id}`)}
        >
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {costcenter.category.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {costcenter.concept.name}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {costcenter.amount}
              </p>
              {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                <Chip label={costcenter.Estatus.name} color={costcenter.Estatus.color} darktext={costcenter?.Estatus?.darktext?? false} />
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}