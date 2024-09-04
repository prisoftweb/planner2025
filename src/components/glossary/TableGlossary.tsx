'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
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

export default function TableLists({data, token, glossaries}:
                        {data:GlossaryTable[], token:string, glossaries: Glossary[]}){
  
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
          <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer" 
            onClick={() => {setGlossEdit(row.original); setEditGloss(true);}}
          />
          <RemoveElement id={row.original.id} name={row.original.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} />
          {/* <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveGlossary} token={token} /> */}
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

  // if(glossariesStore.length <= 0){
  //   return(
  //     <h1>En construccion!!</h1>
  //   )
  // }

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
      {editGloss && <NewGlossary token={token} glossary={glossEdit || ''} showForm={handleEditGloss} />}
      <Table columns={columns} data={table} placeH="Buscar glosario.." />
    </>
  )
}