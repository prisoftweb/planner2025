import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useRef, useEffect } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { OneProjectMin, Project } from "@/interfaces/Projects";
import { UpdateProject, UpdateProjectPhoto, InsertConditionInProject } from "@/app/api/routeProjects";
import UploadImage from "../UploadImage";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useOneProjectsStore } from "@/app/store/projectsStore";
import { ParseProjectToOneProjectMin } from "@/app/functions/SaveProject";

export default function DataBasic({token, id, project, optConditions, user}: 
                                  {token:string, id:string, 
                                    project:OneProjectMin, optConditions:Options[],
                                    user:string}){
  
  const [file, setFile] = useState();
  const {oneProjectStore, updateOneProjectStore} = useOneProjectsStore();
  oneProjectStore?.category? 
            console.log('one cat => ', oneProjectStore.category._id): console.log('cat => ', project?.category?._id);
  const [condition, setCondition] = useState<string>(oneProjectStore?.category? 
                          oneProjectStore.category._id: project?.category?._id || optConditions[0].value );

  let indexCond = 0;
  //console.log('oneProjectStore.category._id => ', oneProjectStore?.category?._id);
  //console.log('project?.category?._id => ', project?.category?._id);
  //console.log('optConditions[0].value => ', optConditions[0].value);
  //const [showConditions, setShowConditions] = useState<JSX.Element>(<></>);
  const refRequest = useRef(true);

  const handleCondition = (value: string) => {
    setCondition(value);
  }

  //const idCat = oneProjectStore?.category._id || project.category._id
  console.log('condition => ', condition);
  optConditions.map((cond, index:number) => {
    //console.log('condicion ', cond.value, 'value ', project.condition[project.condition.length - 1].glossary._id);
    if(cond.value === condition){
      console.log('index => ', index);
      indexCond = index;
      //setCondition(cond.value);
    }
  });

  console.log('index cond => ', indexCond);
  const showConditions =(<div>
    <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
    <SelectReact index={indexCond} opts={optConditions} setValue={handleCondition} />
  </div>)

  // useEffect(() => {
  //   if(oneProjectStore?.category){
  //     const idCat = oneProjectStore?.category._id || project.category._id
  //     optConditions.map((cond, index:number) => {
  //       //console.log('condicion ', cond.value, 'value ', project.condition[project.condition.length - 1].glossary._id);
  //       if(cond.value === idCat){
  //         indexCond = index;
  //         setCondition(cond.value);
  //       }
  //     });
  //   }else{
  //     setCondition(optConditions[0].value);
  //   }
  //   setShowConditions(<div>
  //                       <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
  //                       <SelectReact index={indexCond} opts={optConditions} setValue={handleCondition} />
  //                     </div>)
  // }, []);


  //console.log('proyect data => ', project);
  const formik = useFormik({
    initialValues: {
      name: oneProjectStore?.title || project.title,
      keyProject: oneProjectStore?.code || project.code,
      description: oneProjectStore?.description || project.description,
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
      if(refRequest.current){
        refRequest.current = false;
        const {name, description, keyProject} = valores;
      
        if(oneProjectStore?.category._id !== condition){
          UpdateCondition();
        }
        if(!file){
          const data= {
            title: name, 
            description,
            code: keyProject,
          }
          try {
            const res = await UpdateProject(token, id, data);
            if(typeof(res)!=='string'){
              refRequest.current = true;
              console.log('cat res => ', res.condition);
              const r = ParseProjectToOneProjectMin(res);
              console.log('r cat => ', r.category);
              updateOneProjectStore(r);
              showToastMessage('El proyecto ha sido actulizado satisfactoriamente!!');
              // setTimeout(() => {
              //   window.location.reload();
              // }, 500);
            }else{
              refRequest.current = true;
              showToastMessageError(res);
            }
          } catch (error) {
            refRequest.current = true;
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
            if(typeof(res)!=='string'){
              refRequest.current = true;
              const r = ParseProjectToOneProjectMin(res);
              updateOneProjectStore(r);
              showToastMessage('El proyecto ha sido actulizado satisfactoriamente!!');
              // setTimeout(() => {
              //   window.location.reload();
              // }, 500);
            }else{
              refRequest.current = true;
              showToastMessageError(res);
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Ocurrio un problema al actualizar proyecto!!');
          }
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso..!!!');
      }
    },       
  });

  const UpdateCondition = async () => {
    //if(refRequest.current){
      //refRequest.current = false;
      const data = {
        condition: [
          {
            glossary: condition,
            user
          }
        ]
      }
      try {
        const res = await InsertConditionInProject(token, oneProjectStore?._id || project._id, data);
        if(res === 200){
          //refRequest.current = true;
          showToastMessage('Condicion del proyecto actualizada satisfactoriamente!!');
        }else{
          //refRequest.current = true;
          showToastMessageError(res);
        }
      } catch (error) {
        //refRequest.current = true;
        showToastMessageError('Error al actualizar condicion del proyecto!!!');
      }
    // }else{
    //   showToastMessageError('Ya hay una peticion en proceso..!!!');
    // }
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