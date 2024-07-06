'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import { Options } from "@/interfaces/Common"
import { createRelation } from "@/app/api/routeRelations"
import SelectReact from "../SelectReact"
import SelectReactWithDescription from "../SelectReactWithDescription"

export default function NewRelation({showForm, token, glossaries, 
                      nodes, descGlossaries}: 
                    {showForm:Function, token:string, 
                      glossaries:Options[], nodes:Options[], 
                      descGlossaries:Options[]}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [glossary, setGlossary] = useState<string>(glossaries[0].value);
  const [node, setNode] = useState<string>(nodes[0].value);
  const refRequest = useRef(true);
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }

  const handleGlossary = (value:string) => {
    setGlossary(value);
  }

  const handleNode = (value:string) => {
    setNode(value);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  const formik = useFormik({
    initialValues: {
      description: '',
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        refRequest.current = false;
        try {
          const {description} = valores;
          const data = {
            description,
            nextnodo: node,
            glossary,
          }
          const res = await createRelation(token, data);
          if(res === 201){
            refRequest.current = true;
            showToastMessage('Relacion creada satisfactoriamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al crear relacion!!!');
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    }
  });

  return(
    <>
      <form className="z-10 w-full max-w-md top-16 absolute bg-white space-y-5 p-3 right-0"
        onSubmit={formik.handleSubmit}
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/glossary.svg" subtitle="Agregar nueva relacion" 
            title="Agregar nueva relacion"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        {/* <div>
          <Label htmlFor="condicion"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
          <SelectReact index={0} opts={glossaries} setValue={handleGlossary} />
        </div> */}
        <div>
          <Label htmlFor="condicion"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
          <SelectReactWithDescription index={0} opts={glossaries} 
              setValue={handleGlossary} descriptions={descGlossaries} />
        </div>

        <div>
          <Label htmlFor="node"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nodo</p></Label>
          <SelectReact index={0} opts={nodes} setValue={handleNode} />
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
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}