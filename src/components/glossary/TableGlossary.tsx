'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { PencilIcon } from "@heroicons/react/24/solid";
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

  console.log('glossaries => ', glossaries);

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

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
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
    columnHelper.accessor(row => row.id, {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <div className="w-5 h-5" style={{backgroundColor: row.original.color}}></div>
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Modificar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            {/* <PencilIcon className="w-6 h-6 text-slate-500 hover:text-slate-400 cursor-pointer hover:bg-blue-100" 
              onClick={() => {setGlossEdit(row.original); setEditGloss(true);}}
            /> */}
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
      <Table columns={columns} data={table} placeH="Buscar glosario.." />
    </>
  )
}