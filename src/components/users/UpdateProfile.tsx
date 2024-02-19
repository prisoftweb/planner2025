'use client'
import Label from "../Label"
import Input from "../Input"
import Select from "../Select"
import Button from "../Button"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Alert, {showToastMessage, showToastMessageError} from "@/components/Alert";
import { useState } from "react"
import HeaderForm from "../HeaderForm"

export default function UpdateProfile({emailU, nameU, rolU, departmentU}: 
                  {emailU:string, nameU:string, rolU:string, departmentU:string}){

  const [rol, setRol] = useState<string>(rolU);
  const [department, setDepartment] = useState<string>(departmentU);

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
      
      const profile = {
        name,
        email,
        rol,
        department
      }
      
      // let res = await updateMeUser(_id, formData, token);
      // //console.log('res =>', res)
      // if(typeof(res) === 'string'){
      //   showToastMessageError(res);
      // }else{
      //   if(res.status === 200) {
      //     showToastMessage(`Usuario ${name} modificado exitosamente!`);            
      //     //setCookie('user', res.data.data.user);
      //     setTimeout(() => {
      //       //setBandUpdate(true);
      //       router.refresh();
      //       router.push('/');
      //     }, 1000)
      //   } else {
      //     showToastMessageError('Error al modificar usuario..');
      //   }
      // }
    },       
  });

  return(
    <>
      <div className="w-full lg:w-3/4 xl:w-1/2">
        <Alert />
        <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos personales" 
          title="Información personal"
        />
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" name="name" autoFocus 
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formik.errors.name}</p>
            </div>
          ) : null}
          <Label htmlFor="email">Usuario/Email</Label>
          <Input type="email" name="email" 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{formik.errors.email}</p>
              </div>
          ) : null}
          <Label htmlFor="rol">Rol</Label>
          <Select name="rol" 
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
            <option value="other">Otro</option>
          </Select>
          <Label htmlFor="department">Departamento</Label>
          <Select name="department" 
            onChange={(e) => setDepartment(e.target.value)}
            value={department}  
          >
            <option value="rh">Recursos humanos</option>
            <option value="admin">Administración</option>
            <option value="count">Contabilidad</option>
          </Select>
          <div className="flex justify-center mt-4">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </div>
    </>
  )
}