'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Select from "../Select"
import UploadImage from "../UploadImage"
import { useState } from "react"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUserPhoto } from "@/app/api/routeUser"
import {showToastMessage, showToastMessageError} from "../Alert"
import { useRouter } from "next/navigation"

export default function NewUser({showForm, departments, token}: 
                    {showForm:Function, departments:any, token:string}){
  
  const [file, setFile] = useState<File>();
  const [department, setDepartment] = useState<string>(departments[0]._id);
  const [role, setRole] = useState<string>('admin');

  const router = useRouter();

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
      formdata.append('role', role);
      if(file){
        formdata.append('photo', file);
      }

      try {
        const res = await createUserPhoto(formdata, '');
        if(res===201){
          showForm(false);
          showToastMessage('Usuario creado exitosamente!!!');
          router.refresh();
          router.push('/users');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
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
        <Label htmlFor="role">Rol</Label>
        <Select name="role" value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value={'admin'}>Administrador</option>
          <option value="user">Usuario</option>
        </Select>
        <Label htmlFor="dept">Departamento</Label>
        <Select name="department" value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((department:any, index:number) => (
            <option value={department._id} key={index}>{department.name}</option>
          ))}
        </Select>
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
        <Label htmlFor="photo">Foto</Label>
        <div className="my-2 flex items-center">
          {file && <img src={URL.createObjectURL(file)} alt="" className="w-11 h-11" />}
          <UploadImage setFile={setFile} />
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}