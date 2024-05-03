import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { Project } from "@/interfaces/Projects";
import { UpdateProject, UpdateProjectPhoto, InsertConditionInProject } from "@/app/api/routeProjects";
import UploadImage from "../UploadImage";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useEffect } from "react";

export default function DataBasic({token, id, project, optConditions, user}: 
                                  {token:string, id:string, 
                                    project:Project, optConditions:Options[],
                                    user:string}){
  
  const [file, setFile] = useState();
  const [condition, setCondition] = useState<string>();
  let indexCond = 0;
  const [showConditions, setShowConditions] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if(project.condition.length > 0){
      optConditions.map((cond, index:number) => {
        //console.log('condicion ', cond.value, 'value ', project.condition[project.condition.length - 1].glossary._id);
        if(cond.value === project.condition[project.condition.length - 1].glossary._id){
          indexCond = index;
          setCondition(cond.value);
        }
      });
    }else{
      setCondition(optConditions[0].value);
    }
    setShowConditions(<div>
                        <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
                        <SelectReact index={indexCond} opts={optConditions} setValue={setCondition} />
                      </div>)
  }, []);
  
  const formik = useFormik({
    initialValues: {
      name: project.title,
      keyProject: project.code,
      description: project.description,
    }, 
    validationSchema: Yup.object({
      description: Yup.string()
                  .required('La descripcion es obligatoria!!'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      keyProject: Yup.string()
                  .required('La clave es obligatoria'),
    }),
    onSubmit: async (valores) => {            
      const {name, description, keyProject} = valores;
      
      if(project.condition.length===0 || project.condition[project.condition.length -1].glossary._id !== condition){
        //showToastMessage('condicion con cambios');
        UpdateCondition();
      }
      // }else{
      //   showToastMessageError('Condicion sin cambios');
      // }
      
      if(!file){
        const data= {
          title: name, 
          description,
          code: keyProject,
        }
        try {
          const res = await UpdateProject(token, id, data);
          if(res===200){
            showToastMessage('El proyecto ha sido actulizado satisfactoriamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        } catch (error) {
          showToastMessageError('Ocurrio un problema al actualizar proyecto!!');
        }
      }else{
        const formdata = new FormData();
        formdata.append('title', name);
        formdata.append('description', description);
        formdata.append('code', keyProject);
        formdata.append('photo', file);

        try {
          const res = await UpdateProjectPhoto(token, id, formdata);
          if(res===200){
            showToastMessage('El proyecto ha sido actulizado satisfactoriamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        } catch (error) {
          showToastMessageError('Ocurrio un problema al actualizar proyecto!!');
        }
      }
    },       
  });

  const UpdateCondition = async () => {
    const data = {
      condition: [
        {
          glossary: condition,
          user
        }
      ]
    }
    try {
      const res = await InsertConditionInProject(token, project._id, data);
      if(res === 200){
        showToastMessage('Condicion del proyecto actualizada satisfactoriamente!!');
      }else{
        showToastMessageError(res);
      }
    } catch (error) {
      showToastMessageError('Error al actualizar condicion del proyecto!!!');
    }
  }

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Ingresa datos del proyecto" 
        title="Modificar proyecto"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name" autoFocus 
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.name}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="keyProject"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Clave</p></Label>
          <Input type="text" name="keyProject" 
            value={formik.values.keyProject}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.keyProject && formik.errors.keyProject ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.keyProject}</p>
              </div>
          ) : null}
        </div>
        {showConditions}
        <div>
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            focus:border-slate-700 outline-0 overflow-hidden resize-none"
            rows={4} 
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.description}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="photo">Foto</Label>
          <div className="mt-2">
            <UploadImage setFile={setFile} />
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>         
        </div>
      </form>  
    </div>
  )
}