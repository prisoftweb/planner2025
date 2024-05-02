'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { CreateCatalog, UpdateCatalog } from "@/app/api/routeCatalogs"
import { CatalogTable } from "@/interfaces/Catalogs"

export default function NewCatalog({showForm, token, catalog}: 
                    {showForm:Function, token:string, catalog:(CatalogTable | string)}){
  
  const formik = useFormik({
    initialValues: {
      name: (typeof(catalog)==='string')? '': catalog.name,
      collection: (typeof(catalog)==='string')? '': catalog.collection,
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      collection: Yup.string()
                  .required('La coleccion es obligatoria'),
    }),

    onSubmit: async valores => {
      try {
        if(typeof(catalog)==='string'){
          const res = await CreateCatalog(token, valores);
          if(typeof(res)==='string'){
            return showToastMessageError(res);
          }else{
            showToastMessage('Catalogo creado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }else {
          const res = await UpdateCatalog(token, catalog.id, valores);
          if(typeof(res)==='string'){
            return showToastMessageError(res);
          }else{
            showToastMessage('Catalogo actualizado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }
      } catch (error) {
        showToastMessageError('Error al crear catalogo!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/catalog.svg" subtitle="Agregar nuevo catalogo" 
            title="Agregar nuevo catalogo"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.name}
            autoFocus
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.name}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="collection"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Coleccion</p></Label>
          <Input type="text" name="collection" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.collection}
          />
          {formik.touched.collection && formik.errors.collection ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.collection}</p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}