import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import SaveProject from "@/app/functions/SaveProject";
import { showToastMessage, showToastMessageError } from "../Alert";
import NavProjectStepper from "./NavProjectStepper";
import { useNewProject } from "@/app/store/newProject";

export default function DataBasicStepper({token, user}: {token:string, user:string}){
  
  const [,dispatch] = useRegFormContext();

  const {updateBasicData, amount, code, community, country, cp, date, description, hasguaranteefund,
    municipy, stateA, street, title, category, client, type, haveAddress, 
    company, amountG, dateG, percentage} = useNewProject();

  // let nameI = '';
  // let keyProjectI = '';
  // let descriptionI = '';

  // if(state.databasic){
  //   nameI = state.databasic.name;
  //   keyProjectI = state.databasic.keyProject;
  //   descriptionI = state.databasic.description;
  // }

  const formik = useFormik({
    initialValues: {
      name:title,
      keyProject: code,
      description: description,
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
      // const data= {
      //   title: name, 
      //   description,
      //   code: keyProject,
      // }

      updateBasicData(name, keyProject, description);

      //dispatch({ type: 'SET_BASIC_DATA', data: data });
      dispatch({type: 'INDEX_STEPPER', data: 1})
    },       
  });
  
  const onClickSave = async () => {
    const {description, keyProject, name} = formik.values;
    updateBasicData(name, keyProject, description);
    
    const location = {
      community, country, cp, municipy, 
      state: stateA, 
      stret: street
    }
    let data;
    const guaranteeData = {
      amount:amountG,
      date: dateG,
      porcentage:percentage
    };

    if(haveAddress && hasguaranteefund){
      data = {
        amount, categorys:category, client, code, company, date, description, 
        hasguaranteefund, title, types:type, user,
        location,
        guaranteefund: guaranteeData
      }
    }else{
      if(haveAddress){
        data = {
          amount, categorys:category, client, code, company, date, description, 
          hasguaranteefund, title, types:type, user,
          location
        }
      }else{
        if(hasguaranteefund){
          data = {
            amount, categorys:category, client, code, company, date, description, 
            hasguaranteefund, title, types:type, user,
            guaranteefund: guaranteeData
          }
        }else{
          data = {
            amount, categorys:category, client, code, company, date, description, 
            hasguaranteefund, title, types:type, user,
          }
        }
      }
    }
    try {
      const res = await SaveProject(data, token);
      if(res.status){
        showToastMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res.message);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un problema al crear proyecto!!');
    }
  }

  return(
    <div className="w-full">
      <div className="my-5">
        <NavProjectStepper index={0} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-lg rounded-lg space-y-5">
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
        <div className="flex justify-center mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button>
        </div>
      </form>  
    </div>
  )
}