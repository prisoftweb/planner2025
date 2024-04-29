'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import UploadImage from "../UploadImage"
import { useState } from "react"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUserPhoto } from "@/app/api/routeUser"
import {showToastMessage, showToastMessageError} from "../Alert"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'

export default function NewUser({showForm, departments, token, roles}: 
                    {showForm:Function, departments:any, token:string
                    roles:Options[]}){
  
  const [file, setFile] = useState<File>();
  const [department, setDepartment] = useState<string>(departments[0]._id);
  const [role, setRole] = useState<string>(roles[0].value);
  const [optsRoles, setOptsRoles] = useState<Options>(roles[0]);

  let optionsDepartments:Options[] = [];
  departments.map((dept:any) => (
    optionsDepartments.push({
      label: dept.name,
      value: dept._id
    })
  ))

  const [optDepts, setOptDepts] = useState<Options>(optionsDepartments[0]);

  const formik = useFormik({
    initialValues: {
      email:'',
      password:'', 
      name: '',
      confirmpassword: '',

    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                .email('El email no es valido')
                .required('El email no puede ir vacio'),
      password: Yup.string()
                  .required('La contraseña es obligatoria'),
      confirmpassword: Yup.string()
                  .required('La confirmacion de contraseña es obligatoria'),
      name: Yup.string()
                  .required('El nombre es obligatorio')
    }),

    onSubmit: async valores => {
      const { email, password, confirmpassword, name } = valores;
      
      const formdata = new FormData();
      formdata.append('name',name);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('confirmPassword', confirmpassword);
      formdata.append('department', department);
      formdata.append('rol', role);
      if(file){
        formdata.append('photo', file);
      }

      try {
        const res = await createUserPhoto(formdata, '');
        if(res===201){
          showForm(false);
          showToastMessage('Usuario creado exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        showToastMessageError('Error al crear usuario!!');
      }
    }
  });

  return(
    <>
      <form className="z-50 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Creacion de nueva cuenta de usuario" 
            title="Nueva cuenta"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.name}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Usuario/Email</p></Label>
          <Input type="email" name="email" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.email}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="role">Rol</Label>
          <div className="mt-1">
            <Select 
              options={roles}
              onChange={(e: any) => {setRole(e.value); setOptsRoles(e)}}
              value={optsRoles}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="dept">Departamento</Label>
          <div className="mt-1">
            <Select 
              options={optionsDepartments}
              onChange={(e:any) => {setDepartment(e.value); setOptDepts(e)}}
              value={optDepts}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="password"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Contraseña</p></Label>
          <Input name="password" type="password" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.password}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="confirmpassword"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Confirmar contraseña</p></Label>
          <Input name="confirmpassword" type="password" 
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.confirmpassword}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="photo">Foto</Label>
          <div className="my-2 flex items-center">
            {file && <img src={URL.createObjectURL(file)} alt="" className="w-11 h-11" />}
            <UploadImage setFile={setFile} />
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}