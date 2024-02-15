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

export default function NewUser({showForm}: {showForm:Function}){
  
  const [file, setFile] = useState<File>();
  
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
      // const { email, password } = valores;
      alert('aquii');
    }
  });

  return(
    <>
      <form className="z-50 absolute top-0 bg-white p-3 right-0"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between">
          <HeaderForm img="/nuevoIcono.jpg" subtitle="Creacion de nueva cuenta de usuario" 
            title="Nueva cuenta"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <Label htmlFor="name">Nombre</Label>
        <Input type="text" name="name" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
        <Label htmlFor="email">Usuario/Email</Label>
        <Input type="email" name="email" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.email}</p>
          </div>
        ) : null}
        <Label htmlFor="role">Rol</Label>
        <Select name="role">
          <option value={'admin'}>Administrador</option>
          <option value="user">Usuario</option>
        </Select>
        <Label htmlFor="dept">Departamento</Label>
        <Select name="role">
          <option value={'rh'}>Recursos humanos</option>
          <option value="admin">Administracion</option>
        </Select>
        <Label htmlFor="password">Contraseña</Label>
        <Input name="password" type="password" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.password}</p>
          </div>
        ) : null}
        <Label htmlFor="confirmpassword">Confirmar contraseña</Label>
        <Input name="confirmpassword" type="password" 
          value={formik.values.confirmpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
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