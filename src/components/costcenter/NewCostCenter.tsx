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
import AddConcept from "./AddConcept"

export default function NewCostCenter({showForm, token}: 
                    {showForm:Function, token:string}){

  const [heightPage, setHeightPage] = useState<number>(900);
  
  const [concepts, setConcepts] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState(0);
  const [addConcepts, setAddConcepts] = useState<JSX.Element[]>([]);

  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
  }, [])

  const pushConcept = (concept: string, account:string) => {
    setConcepts((oldConcepts) => [...oldConcepts, concept]);
    setAccounts((oldAccounts) => [...oldAccounts, account]);
  }
  
  const DeleteConcept = (index:number) => {
    setIndexDelete(index);
  }
  
  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    if((!bandDelete) || ((concepts.length === addConcepts.length))){
      setAddConcepts((oldArray) => [...oldArray, <AddConcept pushElement={pushConcept} 
        DeleteElement={DeleteConcept}  bandPlus={true} index={addConcepts.length} 
        key={addConcepts.length} updateCount={updateCount} />])
    }
    setBandDelete(false);
  }, [countFiles])

  useEffect(() => {
    if(indexDelete !== -1){
      if(addConcepts.length > 1){
        const arrConcepts = concepts;
        arrConcepts.splice(indexDelete, 1);
        setConcepts(arrConcepts);
        
        const arrAccounts = accounts;
        arrAccounts.splice(indexDelete, 1);
        setAccounts(arrAccounts);

        setBandDelete(true);
        
        const arrElements = addConcepts;
        arrElements.splice(indexDelete, 1);
        setAddConcepts(arrElements);
      }else{
        showToastMessageError("No puedes eliminar concepto si solo hay uno!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  const formik = useFormik({
    initialValues: {
      category: '',
      code: '',
    }, 
    validationSchema: Yup.object({
      category: Yup.string()
                  .required('La categoria es obligatoria!!'),
      code: Yup.string()
                  .required('El codigo es obligatorio!!'),
    }),

    onSubmit: async valores => {
      // try {
      //   const {address, email, name} = valores;
      //   const data = {
      //     address,
      //     email,
      //     name,
      //   }
      //   const res = await CreateCompany(token, data);
      //   if(res===201){
      //     showForm(false);
      //     showToastMessage('Compañia creada exitosamente!!!');
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 500);
      //   }else{
      //     showToastMessageError(res);
      //   }
      // } catch (error) {
      //   showToastMessageError('Error al crear Compañia!!');
      // }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/company.svg" subtitle="Ingresa nueva categoria y concepto" 
            title="Nuevo centro de costo"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <Input type="text" name="category" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.category}
            autoFocus
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.category}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="code"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Codigo</p></Label>
          <Input type="text" name="code" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.code}
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.code}</p>
            </div>
          ) : null}
        </div>
        <div>
          {/* <div className=" flex justify-around">
            <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Concepto</p></Label>
            <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cuenta</p></Label>
          </div> */}
          <div className="mt-1">
            {addConcepts.map((concept) => (
              concept
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}