'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
// import { useRouter } from "next/navigation"
// import Select from 'react-select'
// import NewSubPathComponent from "./NewSubPathComponent"
// import { useState, useEffect } from "react"
import { createRoute } from "@/app/api/routeRoles"

export default function NewSubPath({showForm, token}: 
                    {showForm:Function, token:string}){
  
  // const router = useRouter();

  // const optionsRoute= [
  //   {
  //     value: '/clients',
  //     label: '/clients',
  //   },
  //   {
  //     value: '/users',
  //     label: '/users',
  //   }
  // ]

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
    }),

    onSubmit: async valores => {
      try {
        const res = await createRoute(token, valores);
        if(res===201){
          showForm(false);
          showToastMessage('Ruta creada exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        showToastMessageError('Error al crear Ruta!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Agregar nueva ruta de hoja de segmento" 
            title="Agregar nueva subruta"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <Input type="text" name="name" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
        <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripci&oacute;n</p></Label>
        <Input type="description" name="description" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.description}</p>
          </div>
        ) : null}
        {/* <Label htmlFor="route"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Ruta</p></Label>
        <Select
          className='w-full max-w-md' 
          options={optionsRoute}
          maxMenuHeight={250}
          placeholder='Buscar ...'
          //onChange={(value:any) => onChange(value.value)}
        /> */}
        
        {/* <div className="flex">
          <Label htmlFor="route"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Subruta</p></Label>
          <Label htmlFor="route"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripci&oacute;n</p></Label>
        </div>
        {subPathComponents.map((Element) => (
          Element
        ))} */}
        
        <div className="flex justify-center mt-2">
          <Button type="submit" >Guardar</Button>
        </div>
      </form>
    </>
  )
}


/**
 * const deleteSubPath = (index: number) => {
    setIndexDelete(index);
  }

  const pushSubPath = (subpath: string, description:string) => {
    setSubPaths((oldPaths) => [...oldPaths, subpath]);
    setDescriptions((oldDescriptions) => [...oldDescriptions, description]);
  }

  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  const [subPaths, setSubPaths] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [subPathComponents, setSubPathComponents] = useState<JSX.Element[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState(0);

  useEffect(() => {
    if(indexDelete !== -1){
      if(subPathComponents.length > 1){
        const arrSubP = subPaths;
        arrSubP.splice(indexDelete, 1);
        setSubPaths(arrSubP);
        
        const arrDescs = descriptions;
        arrDescs.splice(indexDelete, 1);
        setDescriptions(arrDescs);

        setBandDelete(true);
        
        const arrElements = subPathComponents;
        arrElements.splice(indexDelete, 1);
        setSubPathComponents(arrElements);
      }else{
        showToastMessageError("No puedes eliminar subrutas si solo hay una!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  useEffect(() => {
    if((!bandDelete) || ((subPaths.length === subPathComponents.length))){
      setSubPathComponents((oldArray) => [...oldArray, <NewSubPathComponent 
                    deleteSubPath={deleteSubPath} pushSubPath={pushSubPath} 
                    bandPlus={true} index={subPathComponents.length} 
                    key={subPathComponents.length} updateCount={updateCount} />])
    }
    setBandDelete(false);
  }, [countFiles])
 */