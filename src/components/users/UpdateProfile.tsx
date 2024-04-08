'use client'
import Label from "../Label"
import Input from "../Input"
//import Select from "../Select"
import Button from "../Button"
import { useFormik } from "formik"
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "@/components/Alert";
import { useState, useEffect } from "react"
import HeaderForm from "../HeaderForm"
import { updateMeUser } from "@/app/api/routeUser"
import { setCookie } from "cookies-next"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
//import { UserBack } from "@/interfaces/User"

export default function UpdateProfile({user, departments, token, optsRoles}: 
                  {user:any, departments:any, token:string, optsRoles:Options[]}){

  const [rol, setRol] = useState<string>(optsRoles[0].value);
  const [optRole, setOptRole] = useState<Options>(optsRoles[0]);
  const [department, setDepartment] = useState<string>(departments[0]._id);
  
  // useEffect(() => {
  //   optsRoles.map((opRole) => {
  //     if(opRole.value === user.rol){
  //       setRol(opRole.value);
  //       setOptRole(opRole);
  //     }
  //   })
  // })

  let optionsDepartments:Options[] = [];
  departments.map((dept:any) => (
    optionsDepartments.push({
      label: dept.name,
      value: dept._id
    })
  ))

  const [optDepts, setOptDepts] = useState<Options>(optionsDepartments[0]);

  const emailU:string = user.email;
  const nameU:string = user.name;
  const formik = useFormik({
    initialValues: {
      email:emailU,
      name:nameU,
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      const {email, name} = valores;
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('role', rol);
      formData.append('department', department);

      try {
        let res = await updateMeUser(user._id, formData, token);
        if(typeof(res) === 'string'){
          showToastMessageError(res);
        }else{
          if(res.status === 200) {
            showToastMessage(`Usuario ${name} modificado exitosamente!`);            
            setCookie('user', res.data.data.user);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            showToastMessageError('Error al modificar usuario..');
          }
        } 
      } catch (error) {
        showToastMessageError('Ocurrio un error al modificar usuario..');
      }
    },       
  });

  return(
    <>
      <div className="w-full">
        <HeaderForm img="/img/user.svg" subtitle="Datos personales" 
          title="Información personal"
        />
        <form onSubmit={formik.handleSubmit} className="mt-4 border border-gray-200 rounded-lg shadow p-4 space-y-5" >  
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
          <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Usuario/Email</p></Label>
          <Input type="email" name="email" 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.email}</p>
              </div>
          ) : null}
          <Label htmlFor="rol">Rol</Label>
          <Select 
            options={optsRoles}
            onChange={(e: any) => {setRol(e.value); setOptRole(e)}}
            value={optRole}
          />
          <Label htmlFor="department">Departamento</Label>
          <Select 
            options={optionsDepartments}
            onChange={(e:any) => {setDepartment(e.value); setOptDepts(e)}}
            value={optDepts}
          />
          <div className="flex justify-center mt-4">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </div>
    </>
  )
}