'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
import AddComponents from "./AddElements"
import { useState, useEffect } from "react"
import { insertComponentsTree } from "@/app/api/routeRoles"

export default function NewComponentTree({showForm, token, optResources, 
                          optRoutes, descComponents, optComponents, idTree, 
                          routesPerResource, descRoutes}: 
                        {showForm:Function, token:string, optResources:Options[], 
                        optRoutes:Options[], optComponents: Options[]
                        descComponents: Options[], idTree:string,
                        routesPerResource:Options[], descRoutes: Options[]}){
                          
  const [components, setComponents] = useState<string[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState(0);
  const [selectComponents, setSelectComponents] = useState<JSX.Element[]>([]);
  const [resource, setResource] = useState<string>(optResources[0]?.value? optResources[0].value: '');
  const [resourceSel, setResourceSel] = useState(optResources[0]);
  const [route, setRoute] = useState<string>(optRoutes[0]?.value? optRoutes[0].value: '');
  const [routeSel, setRouteSel] = useState(optResources[0]);
  const [routesFilter, setRoutesFilter] = useState<Options[]>([]);
  const [changeResource, setChangeResource] = useState<boolean>(false);
  const [descRoute, setDescRoute] = useState<string>('');

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

  const pushComponent = (route: string) => {
    setComponents((oldComponents) => [...oldComponents, route]);
  }
  
  const DeleteComponent = (index:number) => {
    setIndexDelete(index);
  }
  
  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    const res = routesPerResource.filter((routeRes) => routeRes.label === resource);
    const res2 = optRoutes.filter(optRou => res.some(value => optRou.value.includes(value.value)));
    setRoutesFilter(res2);
  }, [, changeResource])

  useEffect(() => {
    if((!bandDelete) || ((components.length === selectComponents.length))){
      setSelectComponents((oldArray) => [...oldArray, <AddComponents pushElement={pushComponent} 
        DeleteElement={DeleteComponent}  bandPlus={true} index={selectComponents.length} 
        key={selectComponents.length} updateCount={updateCount} descriptions={descComponents} 
        opts={optComponents}  />])
    }
    setBandDelete(false);
  }, [countFiles])

  useEffect(() => {
    if(indexDelete !== -1){
      if(selectComponents.length > 1){
        const arrRoutes = components;
        arrRoutes.splice(indexDelete, 1);
        setComponents(arrRoutes);
        
        setBandDelete(true);
        
        const arrElements = selectComponents;
        arrElements.splice(indexDelete, 1);
        setSelectComponents(arrElements);
      }else{
        showToastMessageError("No puedes eliminar telefono si solo hay uno!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  const onclickSave = async() => {
    if(!route || route === '' || !resource || resource === '' || !components || components.length <= 0){
      showToastMessageError('Todos los campos son obligatorios!!!');
    }else{
      try {        
        const arrComponents: Object[] = [];
        components.map((component) => {
          arrComponents.push({
            component
          })
        })

        const data = {
          components: arrComponents
        }

        const res = await insertComponentsTree(token, idTree, resource, route, data);
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

  useEffect(() => {
    descRoutes.map((desc) => {
      if(desc.value === route){
        setDescRoute(desc.label);
      }
    })
  }, [route]);

  return(
    <>
      <div className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
      <div className="flex justify-between">
        <HeaderForm img="/img/tree.svg" subtitle="Crea un arbol inicial agregando componentes" 
          title="Agregar componente a nuevo arbol"
        />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <div>
          <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Recurso</p></Label>
          <div className="mt-1">
            <Select options={optResources} value={resourceSel} onChange={(e:any) => {setResource(e.value); 
                                        setResourceSel(e); setChangeResource(!changeResource)}} />
          </div>
        </div>
        <div>
          <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Ruta</p></Label>
          <div className="mt-1">
            <Select options={routesFilter} value={routeSel} onChange={(e:any) => {setRoute(e.value); setRouteSel(e)}} />
            <p className="text-xs text-slate-400 m-0">{descRoute}</p>
          </div>
        </div>
        <div>
          <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Componente</p></Label>        
          <div className="mt-1">
            {selectComponents.map((elements) => (
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