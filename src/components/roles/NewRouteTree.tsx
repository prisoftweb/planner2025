'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
import AddRoutes from "./AddElements"
import { useState, useEffect } from "react"
import { insertResourceTree } from "@/app/api/routeRoles"

export default function NewRouteTree({showForm, token, optResources, 
                                        optRoutes, descRoutes, idTree}: 
                              {showForm:Function, token:string, optResources:Options[], 
                                optRoutes:Options[], descRoutes: Options[], idTree:string}){

  const [routes, setRoutes] = useState<string[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState(0);
  const [selectRoutes, setSelectRoutes] = useState<JSX.Element[]>([]);
  const [resource, setResource] = useState<string>(optResources[0].value);
  const [resourceSel, setResourceSel] = useState(optResources[0]);

  const [heightPage, setHeightPage] = useState<number>(900);
  
  const handleResize = () => {
    setHeightPage(window.outerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    //console.log('useefect');
    //console.log(heightPage, '   ', window.outerHeight );
  }, []);

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
      setSelectRoutes((oldArray) => [...oldArray, <AddRoutes pushElement={pushRoute} 
        DeleteElement={DeleteRoute}  bandPlus={true} index={selectRoutes.length} 
        key={selectRoutes.length} updateCount={updateCount} descriptions={descRoutes} 
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

  const onclickSave = async () => {
    
    if(!routes || routes.length <= 0 || !resource || resource === ''){
      showToastMessageError('Todos los campos son obligatorios!!!');
    }else{
      try {        
        const arrRoutes: Object[] = [];
        routes.map((route) => {
          arrRoutes.push({
            route: route
          })
        })

        const data = {
          resources: {
            resource,
            routes: arrRoutes
          }
        }

        const res = await insertResourceTree(token, idTree, data);
        if(res === 200){
          showToastMessage('Recurso agregado a arbol exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al agregar recurso a arbol!!');
      }
    }
  }

  return(
    <>
      <div className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
      <div className="flex justify-between">
        <HeaderForm img="/img/tree.svg" subtitle="Crea un arbol inicial agregando rutas" 
          title="Agregar ruta a nuevo arbol"
        />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <div>
          <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Recurso</p></Label>
          <div className="mt-1">
            <Select options={optResources} value={resourceSel} onChange={(e:any) => {setResource(e.value); setResourceSel(e)}} />
          </div>
        </div>
        <div>
          <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Ruta</p></Label>        
          <div className="mt-1">
            {selectRoutes.map((elements) => (
              elements
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Button type="button" onClick={onclickSave}>Guardar</Button>
        </div>
      </div>
    </>
  )
}