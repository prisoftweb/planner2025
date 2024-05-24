'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
import AddElements from "../roles/AddElements"

export default function NewStatus({showForm, token, catalogOptions, 
                                    descGlossaries, glosariesOptions, 
                                    insertFunction, opt}: 
                    {showForm:Function, token:string, 
                      catalogOptions:Options[], glosariesOptions:Options[], 
                      descGlossaries:Options[], insertFunction:Function, opt:number}){
  
  const [optCat, setOptCat] = useState<Options>(catalogOptions[0]);
  const [catalog, setCatalog] = useState<string>(catalogOptions[0].value);

  const [statuses, setStatuses] = useState<string[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countStatus, setCountStatus] = useState(0);
  const [selectStatus, setSelectStatus] = useState<JSX.Element[]>([]);

  const [heightPage, setHeightPage] = useState<number>(900);
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    // console.log('useefect');
    // console.log(heightPage, '   ', window.outerHeight );
  }, [])

  const pushStatus = (route: string) => {
    setStatuses((oldStatuses) => [...oldStatuses, route]);
  }
  
  const DeleteStatus = (index:number) => {
    setIndexDelete(index);
  }
  
  const updateStatus = () => {
    setCountStatus(countStatus + 1);
  }

  useEffect(() => {
    if((!bandDelete) || ((statuses.length === selectStatus.length))){
      setSelectStatus((oldArray) => [...oldArray, <AddElements pushElement={pushStatus} 
        DeleteElement={DeleteStatus}  bandPlus={true} index={selectStatus.length} 
        key={selectStatus.length} updateCount={updateStatus} 
        descriptions={descGlossaries} opts={glosariesOptions}
      />])
    }
    setBandDelete(false);
  }, [countStatus])

  useEffect(() => {
    if(indexDelete !== -1){
      if(selectStatus.length > 1){
        const arrStatuses = statuses;
        arrStatuses.splice(indexDelete, 1);
        setStatuses(arrStatuses);
        
        setBandDelete(true);
        
        const arrElements = selectStatus;
        arrElements.splice(indexDelete, 1);
        setSelectStatus(arrElements);
      }else{
        showToastMessageError("No puedes eliminar status si solo hay uno!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  const onclickSave = async() => {
    if( !statuses || statuses.length <= 0){
      showToastMessageError('Todos los campos son obligatorios!!!');
    }else{
      try {        
        const glossaries: Object[] = [];
        statuses.map((glossary) => {
          glossaries.push({
            glossary
          })
        })
        
        if(opt === 2){
          const data = {
            categorys: glossaries
          }
          const res = await insertFunction(token, catalog, data);
          if(res === 200){
            showToastMessage('Categorias agregadas exitosamente!!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        }else{
          if(opt === 3){
            const data = {
              condition: glossaries
            }
            const res = await insertFunction(token, catalog, data);
            if(res === 200){
              showToastMessage('Condicion agregada exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              showToastMessageError(res);
            } 
          }else{
            const data = {
              types: glossaries
            }
            const res = await insertFunction(token, catalog, data);
            if(res === 200){
              showToastMessage('Tipos agregados exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              showToastMessageError(res);
            } 
          }
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al agregar status!!');
      }
    }
  }  
  
  return(
    <>
      <div className="z-10 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/catalog.svg" subtitle="Agregar nuevos status, categorys, types" 
            title={`Agregar ${opt===2? 'nueva categoria': (opt===3? 'nuevo status' : 'nuevo tipo')}`}
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <div>
          <Label htmlFor="catalogs"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Catalogo</p></Label>
          <Select
            name="catalogs"
            options={catalogOptions}
            value={optCat}
            onChange={(e:any) => {setCatalog(e.value); setOptCat(e)}}
          />
        </div>

        <div>
          <Label htmlFor="catalogs"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Glosario</p></Label>
          <div className="mt-1">
            {selectStatus.map((elements) => (
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