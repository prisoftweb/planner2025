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
import { Options } from "@/interfaces/Common"
import SelectReact from "../SelectReact"
import { Report } from "@/interfaces/Reports"
import { updateReport } from "@/app/api/routeReports"

export default function UpdateReport({companies, departments, projects, token, report}:{
                          token:string, departments:Options[], companies:Options[], 
                          projects:Options[], report:Report}) {
  
  //const [heightPage, setHeightPage] = useState<number>(900);
  const [project, setProject] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(report.date.substring(0, 10));
  const [imprest, setImprest] = useState<boolean>(false);
  const [viewSelects, setViewSelects] = useState<JSX.Element>(<></>);
  const [viewProject, setViewProject] = useState<JSX.Element>(<></>);

  // const handleResize = () => {
  //   setHeightPage(document.body.offsetHeight);
  // }
  
  useEffect (() => {
    // window.addEventListener("resize", handleResize, false);
    // setHeightPage(document.body.offsetHeight - 70);
    
    const indexP = projects.findIndex((optProj) => optProj.value === report.project._id);
    const indexC = companies.findIndex((optComp) => optComp.value === report.company._id);
    const indexDept = departments.findIndex((optDept) => optDept.value === report.department._id);
    
    setViewSelects(<>
      <div>
          <Label htmlFor="company"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Empresa</p></Label>
          <SelectReact index={indexC===-1? 0: indexC} opts={companies} setValue={handleCompany} />
        </div>

        <div>
          <Label htmlFor="department"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Departamento</p></Label>
          <SelectReact index={indexDept===-1? 0:indexDept} opts={departments} setValue={handleDepartment} />
        </div>
    </>)

    setViewProject(<div>
      <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
      <SelectReact index={indexP===-1? 0: indexP} opts={projects} setValue={handleProject} />
    </div>)

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
      try {
        const {comment, name} = valores;
        const data = {
          name,
          comment,
          date: startDate,
          company,
          department,
          project,
          // moves: [{
          //   user,
          //   department,
          //   notes: comment,
          //   condition
          // }]
        }
        const res = await updateReport(token, report._id, data);
        if(res === 200){
          showToastMessage('Informe actualizado exitosamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Error al actualizar informe!!');
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
