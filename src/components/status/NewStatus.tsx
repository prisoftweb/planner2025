'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState } from "react"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
import AddElements from "../roles/AddElements"

export default function NewStatus({showForm, token, catalogOptions}: 
                    {showForm:Function, token:string, catalogOptions:Options[]}){
  
  const [optCat, setOptCat] = useState<Options>(catalogOptions[0]);
  const [catalog, setCatalog] = useState<string>(catalogOptions[0].value);

  {/* <AddElements DeleteElement={} bandPlus={true} descriptions={} index={} opts={} pushElement={} updateCount={}/> */}
  
  return(
    <>
      <div className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Agregar nuevos status, categorys, types" 
            title="Agregar nuevo glosario"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <Label htmlFor="catalogs"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <Select
          name="catalogs"
          options={catalogOptions}
          value={optCat}
          onChange={(e:any) => {setCatalog(e.value); setOptCat(e)}}
        />

        <div className="flex justify-center mt-2">
          <Button type="button">Guardar</Button>
        </div>
      </div>
    </>
  )
}