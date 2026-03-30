'use client'
import { CostCenterTable } from "@/interfaces/CostCenter";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import DeleteElement from "../DeleteElement";
import { RemoveCostoCenter } from "@/app/api/routeCostCenter";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState, useMemo } from "react";
import NewCostCenter from "./NewCostCenter";
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import ContainerSideNav from "../ContainerSideNav";
import { useTableStates } from "@/app/store/tableStates";

export default function TableCostCenter({data, token}: {data:CostCenterTable[], token:string}){

  const columnHelper = createColumnHelper<CostCenterTable>();

  const [editCostCenter, setEditCostCenter] = useState<boolean>(false);
  const [costCenter, setCostCenter] = useState<CostCenterTable>();

  const handleCostCenter = (costCenter: CostCenterTable) => {
    setCostCenter(costCenter);
  }

  const handleEditCostCenter = (value: boolean) => {
    setEditCostCenter(value);
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
          <div 
            className={`rounded-md text-white bg-gray-600 text-center
            uppercase w-6 h-6 flex items-center justify-center`}>
            <p className={`text-xs uppercase `} >{row.original.code.toString()}</p>
          </div>
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
    columnHelper.accessor('code', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center gap-x-1">
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Modificar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            <PencilIcon className="w-6 h-6 text-slate-600 cursor-pointer hover:bg-slate-100" 
              onClick={() => {
                setCostCenter(row.original);
                setEditCostCenter(true);
              }} />
          </Tooltip>
          <DeleteElement remove={RemoveCostoCenter} id={row.original.id} 
              token={token} name={row.original.category} />
          <p className="text-base font-semibold">{row.original.code}</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Accion</p>
      )
    }),
    columnHelper.accessor('category', {
      id: 'Categoria',
      cell: ({row}) => (
        <p className=" font-semibold text-base">{row.original.category}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Categoria</p>
      )
    }),
    columnHelper.accessor('status', {
      id: 'Status',
      cell: ({row}) => (
        <div className={`w-6 h-6 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
      ),
      enableSorting:false,
      header: () => (
        <p>Status</p>
      )
    }),
    columnHelper.accessor('concept', {
      id: 'Concepto',
      cell: ({row}) => (
        <p className="text-slate-600 font-semibold">{row.original.concept}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Concepto</p>
      )
    }),
  ]

  return(
    <>
      {/* {editCostCenter && <NewCostCenter costCenter={costCenter || ''} showForm={setEditCostCenter} token={token} /> } */}
      {editCostCenter && (
        <ContainerSideNav width="w-full max-w-md">
          <NewCostCenter costCenter={costCenter || ''} showForm={setEditCostCenter} token={token} />
        </ContainerSideNav>
      ) }
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar centro de costo.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} handleCostCenter={handleCostCenter} handleEditCostCenter={handleEditCostCenter} />
      </div>
    </>
  )
}

const ListData = ({data, token, handleCostCenter, handleEditCostCenter }: 
  {data: CostCenterTable[], token:string, handleCostCenter: (costCenter: CostCenterTable) => void, 
    handleEditCostCenter: (value: boolean) => void }) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();

  const filterData = useMemo(() => {
    if(search.trim() === ''){
      return data;
    }else{
      const d = data.filter(item => item.category.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((c) => (
            <CardCostcenter costcenter={c} key={c.id} token={token} handleCostCenter={handleCostCenter} handleEditCostCenter={handleEditCostCenter} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardCostcenter = ({costcenter, token, handleCostCenter, handleEditCostCenter }: 
  {costcenter:CostCenterTable, token:string, handleCostCenter: (costCenter: CostCenterTable) => void, 
    handleEditCostCenter: (value: boolean) => void }) => {
  
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
        <div className="grid mr-4 place-items-center gap-y-1">
          {/* <img alt="responsable" src={ costcenter.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            <div 
              className={`rounded-md text-white bg-gray-600 text-center
              uppercase w-6 h-6 flex items-center justify-center`}>
              <p className={`text-xs uppercase `} >{costcenter.code.toString()}</p>
            </div>

            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Modificar' 
                placement="right" className="text-black bg-white rounded-md border border-slate-400">
              <PencilIcon className="w-6 h-6 text-slate-600 cursor-pointer hover:bg-slate-100" 
                onClick={() => {
                  handleCostCenter(costcenter);
                  handleEditCostCenter(true);
                }} />
            </Tooltip>

            <DeleteElement remove={RemoveCostoCenter} id={costcenter.id} 
              token={token} name={costcenter.category} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {costcenter.category}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {costcenter.concept}
              </p>
            </div>
            {/* <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}