import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";

export default function DataBasic({token}: {token:string}){
  
  let nameI = '';
  let keyProjectI = '';
  let descriptionI = '';

  const formik = useFormik({
    initialValues: {
      name:nameI,
      keyProject: keyProjectI,
      description: descriptionI,
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
      // const {name, description, keyProject} = valores;
      // const data= {
      //   title: name, 
      //   description,
      //   code: keyProject,
      // }

      // dispatch({ type: 'SET_BASIC_DATA', data: data });
      // dispatch({type: 'INDEX_STEPPER', data: 1})
    },       
  });
  
  const onClickSave = async () => {
    const {name, description, keyProject} = formik.values;

    // if(state.extradata){
      
    //   let amount, dateExtra, category, type, client, company;

    //   amount = state.extradata.amount;
    //   dateExtra = state.extradata.date;
    //   category = state.extradata.category;
    //   type = state.extradata.type;
    //   client = state.extradata.client;
    //   company = state.extradata.company;

    //   let street = '';
    //   let community = '';
    //   let cp = '';
    //   let municipy = '';
    //   let stateA = '';
    //   let country = '';
    //   if(state.address){
    //     street = state.address.street;
    //     community = state.address.community;
    //     cp = state.address.cp;
    //     municipy = state.address.municipy;
    //     stateA = state.address.state;
    //     country = state.address.country;
    //   }
      
    //   let percentage, dateGuarantee;

    //   if(state.guarantee){
    //     percentage = state.guarantee.percentage;
    //     dateGuarantee = state.guarantee.date;
    //   }
      
    //   const data= {
    //     amount: parseFloat(amount),
    //     date: dateExtra,
    //     category,
    //     type,
    //     client,
    //     user,
    //     title: name,
    //     description,
    //     code: keyProject,
    //     company,
    //     location: {
    //       street,
    //       community,
    //       cp,
    //       municipy,
    //       state : stateA,
    //       country
    //     },
    //     guaranteefund: {
    //       porcentage: percentage,
    //       date: dateGuarantee,
    //     }
    //     // condition: [
    //     //   {glossary:"661964a1ca3bfa35200c1628", user}
    //     // ],
    //   }
    //   const res = await SaveProject(data, token);
    //   if(res.status){
    //     showToastMessage(res.message);
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 500);
    //   }else{
    //     showToastMessageError(res.message);
    //   }
    // }else{
    //   showToastMessageError('No hay informacion extra!!'); 
    // }
  }

  return(
    <div className="w-full">
      {/* <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      /> */}
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
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
        <div className="flex justify-end mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          
        </div>
      </form>  
    </div>
  )
}