'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
import AddRoutes from "./AddRoutes"
import { useState, useEffect } from "react"

export default function NewRouteTree({showForm, token, optResources, 
                                        optRoutes, descRoutes}: 
                              {showForm:Function, token:string, optResources:Options[], 
                                optRoutes:Options[], descRoutes: Options[]}){

  const [routes, setRoutes] = useState<string[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState(0);
  const [selectRoutes, setSelectRoutes] = useState<JSX.Element[]>([]);
  const [resource, setResource] = useState<string>(optResources[0].value);
  const [resourceSel, setResourceSel] = useState(optResources[0]);

  const pushRoute = (route: string) => {
    setRoutes((oldRoutes) => [...oldRoutes, route]);
  }
  
  const DeleteRoute = (index:number) => {
    setIndexDelete(index);
  }
  
  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    if((!bandDelete) || ((routes.length === selectRoutes.length))){
      setSelectRoutes((oldArray) => [...oldArray, <AddRoutes pushRoute={pushRoute} 
        DeleteRoute={DeleteRoute}  bandPlus={true} index={selectRoutes.length} 
        key={selectRoutes.length} updateCount={updateCount} descRoutes={descRoutes} 
        opts={optRoutes}  />])
    }
    setBandDelete(false);
  }, [countFiles])

  useEffect(() => {
    if(indexDelete !== -1){
      if(selectRoutes.length > 1){
        const arrRoutes = routes;
        arrRoutes.splice(indexDelete, 1);
        setRoutes(arrRoutes);
        
        setBandDelete(true);
        
        const arrElements = selectRoutes;
        arrElements.splice(indexDelete, 1);
        setSelectRoutes(arrElements);
      }else{
        showToastMessageError("No puedes eliminar telefono si solo hay uno!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  const onclickSave = () => {
    console.log('routesss');
    console.log(routes);
    console.log('resource', resource);
  }

  return(
    <>
      <div className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen">
      <div className="flex justify-between">
        <HeaderForm img="/nuevoIcono.jpg" subtitle="Crea un arbol inicial agregando rutas" 
          title="Agregar ruta a nuevo arbol"
        />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Recurso</p></Label>
        <Select options={optResources} value={resourceSel} onChange={(e:any) => {setResource(e.value); setResourceSel(e)}} />
        <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Ruta</p></Label>        
        {selectRoutes.map((elements) => (
          elements
        ))}
        <div className="flex justify-center mt-2">
          <Button type="button" onClick={onclickSave}>Guardar</Button>
        </div>
      </div>
    </>
  )
}