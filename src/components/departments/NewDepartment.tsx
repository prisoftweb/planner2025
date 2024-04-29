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

  useEffect (() => {
    if(typeof(dept) !== 'string'){
      OptionsCompany.map((optC) => {
        if(optC.value === dept.company.id){
          setCompany(optC.value);
          setOptCompany(optC);
        }
      })
    }
  }, [])
  
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
              showForm(false);
              showToastMessage('Departamento creado exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              showToastMessageError(res);
            }
          }else{
            const res = await UpdateDepartment(token, dept.id, data);
            if(res===200){
              showForm(false);
              showToastMessage('Departamento actualizado exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              showToastMessageError(res);
            }
          }
        }else{
          showToastMessageError('La compañia es obligatoria!!');
        }
      } catch (error) {
        showToastMessageError('Error al crear Departamento!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Agregar nuevos departamentos de compañias" 
            title="Agregar nuevo departamento"
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