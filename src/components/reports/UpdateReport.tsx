'use client'
//import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
//import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect, useRef } from "react"
import { Options } from "@/interfaces/Common"
import SelectReact from "../SelectReact"
import { Report } from "@/interfaces/Reports"
import { updateReport } from "@/app/api/routeReports"
import { getCompaniesLV } from "@/app/api/routeCompany";
import { getProjectsLV } from "@/app/api/routeProjects";
import { getDepartmentsLV } from "@/app/api/routeDepartments";

export default function UpdateReport({ token, report}:{
                          token:string, report:Report}) {
  
  const [project, setProject] = useState<string>(report.project._id);
  const [company, setCompany] = useState<string>(report.company._id);
  const [department, setDepartment] = useState<string>(report.department._id);
  const [startDate, setStartDate] = useState<string>(report.date.substring(0, 10));
  const [imprest, setImprest] = useState<boolean>(report.ispettycash);
  const refRequest = useRef(true);

  const [optCompanies, setOptCompanies] = useState<Options[]>([]);
  const [optDepartments, setOptDepartments] = useState<Options[]>([]);
  const [optProjects, setOptProjects] = useState<Options[]>([]);

  // const handleResize = () => {
  //   setHeightPage(document.body.offsetHeight);
  // }
  
  useEffect (() => {
    // window.addEventListener("resize", handleResize, false);
    // setHeightPage(document.body.offsetHeight - 70);
    const fetchOptions = async () => {
      let optComps: Options[] = [];
      try {
        optComps = await getCompaniesLV(token);
      } catch (error) {
        return <h1 className="text-center text-lg text-red">Error al consultar las compañias</h1>
      }

      let optDeps: Options[] = [];
      try {
        optDeps = await getDepartmentsLV(token);
      } catch (error) {
        return <h1 className="text-center text-lg text-red">Error al consultar los departamentos</h1>
      }

      let optProjs: Options[] = [];
      try {
        optProjs = await getProjectsLV(token);
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos</h1>
      }

      setOptCompanies(optComps);
      setOptDepartments(optDeps);
      setOptProjects(optProjs);
    }

    fetchOptions();
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
  
  const indexP = optProjects.findIndex((optProj) => optProj.value === report.project._id);
  const indexC = optCompanies.findIndex((optComp) => optComp.value === report.company._id);
  const indexDept = optDepartments.findIndex((optDept) => optDept.value === report.department._id);
  
  const viewSelects = (<>
    <div>
        <Label htmlFor="company"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Empresa</p></Label>
        {optCompanies.length>0? (
          <SelectReact index={indexC===-1? 0: indexC} opts={optCompanies} setValue={handleCompany} />
        ): <></>}
      </div>

      <div>
        <Label htmlFor="department"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Departamento</p></Label>
        {optDepartments.length>0? (
          <SelectReact index={indexDept===-1? 0:indexDept} opts={optDepartments} setValue={handleDepartment} />
        ): <></>}
      </div>
  </>)

  const viewProject = (<div>
    <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
    {optProjects.length > 0? (
      <SelectReact index={indexP===-1? 0: indexP} opts={optProjects} setValue={handleProject} />
    ): <></>}
  </div>)

  const formik = useFormik({
    initialValues: {
      name: report.name,
      comment: report.comment,
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      comment: Yup.string()
                  .required('La coleccion es obligatoria'),
    }),

    onSubmit: async valores => {
      if(refRequest.current){
        try {
          refRequest.current = false;
          const {comment, name} = valores;
          const data = {
            name,
            comment,
            date: startDate,
            company,
            department,
            project,
            ispettycash: imprest
          }
          const res = await updateReport(token, report._id, data);
          if(res === 200){
            refRequest.current = true;
            showToastMessage('Informe actualizado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al actualizar informe!!');
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    }
  });
  
  return (
    <form className="bg-white space-y-5 p-3 right-0 h-full"
      onSubmit={formik.handleSubmit}
      //style={{height: `${heightPage}px`}}
    >
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

        {viewSelects}

      </div>

      {viewProject}

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
  )
}
