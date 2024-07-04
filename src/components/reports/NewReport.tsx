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
import { Options } from "@/interfaces/Common"
import SelectReact from "../SelectReact"
import { CreateReport } from "@/app/api/routeReports"

export default function NewReport({showForm, token, companies, 
                          departments, projects, user, condition}: 
                    {showForm:Function, token:string, 
                      departments:Options[], companies:Options[], 
                      projects:Options[], user:string, condition:string}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [project, setProject] = useState<string>(projects[0].value);
  const [company, setCompany] = useState<string>(companies[0].value);
  const [department, setDepartment] = useState<string>(departments[0].value);
  const [startDate, setStartDate] = useState<string>('');
  const [imprest, setImprest] = useState<boolean>(false);
  const refRequest = useRef(true);

  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    
    let year = new Date().getFullYear().toString();
    let month = (new Date().getMonth() + 1).toString();
    let day = new Date().getDate().toString();
    if(month.length ===1) month = '0'+month;
    if(day.length ===1) day = '0'+day;

    const d = year+'-'+month+'-'+day;
    setStartDate(d);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  const handleProject = (value:string) => {
    setProject(value);
  }

  const handleCompany = (value:string) => {
    setCompany(value);
  }

  const handleDepartment = (value:string) => {
    setDepartment(value);
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      comment: '',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      comment: Yup.string()
                  .required('La coleccion es obligatoria'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        refRequest.current = false;
        try {
          const {comment, name} = valores;
          const data = {
            name,
            comment,
            date: startDate,
            user,
            company,
            department,
            project,
            ispettycash: imprest,
            moves: [{
              user,
              department,
              notes: comment,
              condition
            }]
          }
          const res = await CreateReport(token, data);
          if(res === 201){
            refRequest.current = true;
            showToastMessage('Informe creado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al crear informe!!');
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    }
  });

  return(
    <>
      <form className="z-10 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/catalog.svg" subtitle="Crea un nuevo informe de gastos" 
            title="Nuevo informe"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div className="flex justify-end px-5">
          <div className="inline-flex items-center">
            {/* <p className="mr-3">Linea de credito</p> */}
            <Label>Es Fondo fijo? </Label>
            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
              <input checked={imprest} 
                //onClick={() => setSuppliercredit(!suppliercredit)} id="switch-3" type="checkbox"
                onChange={() => setImprest(!imprest)} id="switch-3" type="checkbox"
                className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                  appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                  peer-checked:border-green-500 peer-checked:before:bg-green-500
                  border border-slate-300" />
              <label htmlFor="switch-3"
                className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                  data-ripple-dark="true"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
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
            <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
            <Input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="company"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Empresa</p></Label>
            <SelectReact index={0} opts={companies} setValue={handleCompany} />
          </div>

          <div>
            <Label htmlFor="department"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Departamento</p></Label>
            <SelectReact index={0} opts={departments} setValue={handleDepartment} />
          </div>

        </div>

        <div>
          <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
          <SelectReact index={0} opts={projects} setValue={handleProject} />
        </div>

        <div>
          <Label htmlFor="comment"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Comentarios</p></Label>
          <textarea name="comment" 
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
            focus:border-slate-700 outline-0"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.comment}</p>
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