'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
import { GlossaryTable } from "@/interfaces/Glossary";
import { RemoveGlossary } from "@/app/api/routeGlossary";
import NewGlossary from "./NewGlossary";
import { useGlossariesStore } from "@/app/store/glossaryStore";
import { Glossary } from "@/interfaces/Glossary";
import WithOut from "../WithOut";
import ButtonNew from "./ButtonNew";
import RemoveElement from "../RemoveElement";
import { showToastMessageError } from "../Alert";
import {Tooltip} from "@nextui-org/react";
import TooltipPencilIcon from "../tooltipIcons/TooltipPencilIcon";
import ContainerSideNav from "../ContainerSideNav";
import { propsTooltip } from "@/libs/animations";
import { useTableStates } from "@/app/store/tableStates";
import { useMemo } from "react";

type tableProps={
  data:GlossaryTable[], 
  token:string, 
  glossaries: Glossary[]
}

export default function TableLists({data, token, glossaries}: tableProps){
  
  const columnHelper = createColumnHelper<GlossaryTable>();
  const {glossariesStore, updateGlossariesStore} = useGlossariesStore();

  const [editGloss, setEditGloss] = useState<boolean>(false);
  const [glossEdit, setGlossEdit] = useState<GlossaryTable>();

  const delGlossary = async(id: string) => {
    try {
      const arrGloss = glossariesStore.filter(glo => glo._id !== id);
      updateGlossariesStore(arrGloss);
    } catch (error) {
      showToastMessageError('Error al quitar glosario de la tabla!!');
    }
  }

  const handleEditGloss = (value: boolean) => {
    setEditGloss(value);
  }

  const handleGlossToEdit = (value:GlossaryTable) => {
    setGlossEdit(value);
  }

  useEffect(() => {
    updateGlossariesStore(glossaries);
  }, []);

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
    columnHelper.accessor(row => row.id, {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <div className="w-5 h-5" style={{backgroundColor: row.original.color}}></div>
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Modificar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            <TooltipPencilIcon handleBooleanValue={handleEditGloss} handleElement={handleGlossToEdit} element={row.original} />
          </Tooltip>
          <RemoveElement id={row.original.id} name={row.original.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Glosario',
      id: 'glosario',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <p className="">{row.original.description}</p>
      ),
    }),
  ]

  if(!glossaries || glossaries.length <= 0){
    return (
      <>
        <WithOut img="/img/clientes.svg" subtitle="Glosarios"
            text="Aqui puedes agregar los glosarios"
            title="Glosarios">
                <ButtonNew token={token} glossary={''} />
          </WithOut>
      </>
    )
  }

  const table: GlossaryTable[] = [];

  glossariesStore.map((gloss) => {
    table.push({
      color: gloss.color || '#fff',
      description: gloss.description,
      id: gloss._id,
      name: gloss.name  
    })
  })
  
  return(
    <>
      {editGloss && (
        <ContainerSideNav width="w-full max-w-sm">
          <NewGlossary token={token} glossary={glossEdit || ''} showForm={handleEditGloss} />
        </ContainerSideNav>
      )}
      <div className="hidden md:block w-full">
        <Table columns={columns} data={table} placeH="Buscar glosario.." />
      </div>
      <div className="block md:hidden w-full">
        <ListData data={data} token={token} delGlossary={delGlossary} />
      </div>
    </>
  )
}

const ListData = ({data, token, delGlossary}: 
  {data: GlossaryTable[], token:string, delGlossary: (id: string) => Promise<void>}) => {

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
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((g) => (
            <CardGlosary glossary={g} key={g.id} delGlossary={delGlossary} token={token} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardGlosary = ({glossary, token, delGlossary}: 
  {glossary:GlossaryTable, token:string, delGlossary: (id: string) => Promise<void>}) => {
  
  return(
    <div role="button"
      key={glossary.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ company.logo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          <div className="w-8 h-8" style={{backgroundColor: glossary.color}}></div>
          <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {glossary.name}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {glossary.description}
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