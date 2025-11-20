'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect } from "react"
import { HexColorPicker } from "react-colorful";
import { CreateGlossary, UpdateGlossary } from "@/app/api/routeGlossary"
import { GlossaryTable, Glossary } from "@/interfaces/Glossary"
import { useRef } from "react"
import { useGlossariesStore } from "@/app/store/glossaryStore"
import TooltipCloseIcon from "../tooltipIcons/TooltipCloseIcon"

type glossaryProps={
  showForm:Function, 
  token:string, 
  glossary: (GlossaryTable | string)
}

export default function NewGlossary({showForm, token, glossary}: glossaryProps ){
  
  const [color, setColor] = useState(typeof(glossary)==='string'? "#b32aa9": glossary.color);

  const [heightPage, setHeightPage] = useState<number>(900);
  const [darktext, setDarktext]=useState<boolean>(false);
  const refRequest = useRef(true);

  const {updateGlossariesStore, glossariesStore} = useGlossariesStore();
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  const formik = useFormik({
    initialValues: {
      name: (typeof(glossary)==='string')? '': glossary.name,
      description: (typeof(glossary)==='string')? '': glossary.description,
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      description: Yup.string()
                  .required('La descripcion es obligatoria'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        refRequest.current = false;
        try {
          const {description, name} = valores;
          const data = {
            description,
            name,
            color,
            darktext
          }
          if(typeof(glossary)==='string'){
            const res = await CreateGlossary(token, data);
            if(typeof(res)!== 'string'){
              refRequest.current = true;
              showToastMessage('Glosario agregado exitosamente!!');
              updateGlossariesStore([res, ...glossariesStore]);
              showForm(false);
            }else{
              refRequest.current = true;
              showToastMessageError(res);
            }
          }else{
            const res = await UpdateGlossary(token, glossary.id, data);
            if(typeof(res)!=='string'){
              refRequest.current = true;
              showToastMessage('Glosario actualizado exitosamente!!');
              const arrGlo: Glossary[] = [];
              glossariesStore.map((glos) => {
                if(glos._id !== glossary.id){
                  arrGlo.push(glos);
                }else{
                  arrGlo.push(res);
                }
              });
              updateGlossariesStore(arrGlo);
              showForm(false);
            }else{
              refRequest.current = true;
              showToastMessageError(res);
            }
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al crear glosario!!!');
        }
      }else{
        showToastMessageError('Ya hay una peticion en proceso..!!!');
      }
    }
  });

  const handleColor = (value: string) => {
    setColor(value);
  }

  return(
    <>
      {/* <div className="relative z-50 ml-auto h-full w-80 bg-white p-5 overflow-y-auto"> */}
        {/* <form */}
        <form className="z-50 absolute bg-white space-y-5 p-5 right-0 h-full min-h-screen"
          onSubmit={formik.handleSubmit}
          style={{height: `${heightPage}px`}}
        >
          <div className="flex justify-between">
            <HeaderForm img="/img/glossary.svg" subtitle="Agregar nuevos status, categorys, types" 
              title="Agregar nuevo glosario"
            />
            {/* <XMarkIcon className="w-6 h-6 text-slate-500
              hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} /> */}
            <TooltipCloseIcon handleClose={() => showForm(false)} />
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
            <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
            <textarea name="description" 
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                  focus:border-slate-700 outline-0 overflow-hidden resize-none"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.description}
              rows={4}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="color"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Color</p></Label>
            <div className="flex gap-x-1" >
              <HexColorPicker color={color} onChange={handleColor} />
              <div className="w-12 h-12" style={{backgroundColor:color}}></div>
            </div>
            <div className="flex justify-between items-center pr-2">
              <Label htmlFor="hex"><p className="after:content-['*'] after:ml-0.5 after:text-red-500 mt-2">Codigo</p></Label>
              <div className="inline-flex items-center">
                <Label>Texto obscuro?</Label>  
                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                  <input checked={darktext} 
                    onClick={() => setDarktext(!darktext)} id="darkText" type="checkbox"
                    // onChange={() => console.log('')}
                    className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                      appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                      peer-checked:border-green-500 peer-checked:before:bg-green-500
                      border border-slate-300" />
                  <label htmlFor="darkText"
                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                      data-ripple-dark="true"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-x-1" >
              <Input 
                value={color}
                onChange={e => handleColor(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      {/* </div> */}
    </>
  )
}