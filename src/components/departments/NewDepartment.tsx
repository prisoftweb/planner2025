'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import { CreateDepartment, UpdateDepartment } from "@/app/api/routeDepartments"
import Select from 'react-select'
import { Options } from "@/interfaces/Common"
import { DepartmentTable } from "@/interfaces/Departments"

export default function NewDepartment({showForm, token, OptionsCompany, dept}: 
                    {showForm:Function, token:string, OptionsCompany:Options[],
                      dept: (DepartmentTable | string)
                    }){

  const [company, setCompany] = useState(OptionsCompany[0].value);
  const [optCompany, setOptCompany] = useState<Options>(OptionsCompany[0]);
  const refRequest = useRef(true);

  const [heightPage, setHeightPage] = useState<number>(900);
  
  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    // console.log('useefect');
    // console.log(heightPage, '   ', window.outerHeight );

    if(typeof(dept) !== 'string'){
      OptionsCompany.map((optC) => {
        if(optC.value === dept.company.id){
          setCompany(optC.value);
          setOptCompany(optC);
        }
      })
    }
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  // useEffect(() => {
  //   console.log('inner ', window.outerHeight)
  // }, [window.outerHeight]);

  const formik = useFormik({
    initialValues: {
      name: (typeof(dept)==='string')? '': dept.name,
      abbr: (typeof(dept)==='string')? '': dept.abbreviation,
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      abbr: Yup.string()
                  .required('La abreviacion es obligatoria'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        refRequest.current = false;
        try {
          if(company || company!==''){
            const {abbr, name} = valores;
            const data = {
              abbr,
              name,
              company
            }
            if(typeof(dept)==='string'){
              const res = await CreateDepartment(token, data);
              if(res===201){
                refRequest.current = true;
                showForm(false);
                showToastMessage('Departamento creado exitosamente!!!');
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }else{
                refRequest.current = true;
                showToastMessageError(res);
              }
            }else{
              const res = await UpdateDepartment(token, dept.id, data);
              if(res===200){
                refRequest.current = true;
                showForm(false);
                showToastMessage('Departamento actualizado exitosamente!!!');
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }else{
                refRequest.current = true;
                showToastMessageError(res);
              }
            }
          }else{
            refRequest.current = true;
            showToastMessageError('La compañia es obligatoria!!');
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al crear Departamento!!');
        }
      }else{
        showToastMessageError('Ya hay una peticion en proceso..!!!');
      }
    }
  });

  return(
    <>
      <form className={`z-10 top-16 absolute bg-white space-y-5 p-3 right-0`}
        style={{height: `${heightPage}px`}}
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/department.svg" subtitle="Agregar nuevos departamentos de compañias" 
            title="Agregar nuevo departamento"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
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
          <Label htmlFor="abbr"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Abreviacion</p></Label>
          <Input type="text" name="abbr" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.abbr}
          />
          {formik.touched.abbr && formik.errors.abbr ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.abbr}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="companies"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Compañias</p></Label>
          <Select
            name="companies"
            options={OptionsCompany}
            value={optCompany}
            onChange={(e:any) => {setCompany(e.value); setOptCompany(e)}}
          />
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}