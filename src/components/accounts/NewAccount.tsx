"use client"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert, { showToastMessageError, showToastMessage } from "@/components/Alert";
import { createUser, createUserPhoto } from "@/app/api/routeUser";
import { useState} from "react";
import { useRouter } from "next/navigation";
import Select from "../Select";
import Input from "../Input";
import Label from "../Label";

export default function FormNewAccount({token}: {token:string}){
  const [role, setRol] = useState<string>('admin');
  const [file, setFile] : any = useState();
  const [department, setDepartment] = useState<string>('dep1');

  const router = useRouter()

  const formikPass = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:'',
      passwordConfirm:'',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      email: Yup.string()
                  .required('El email es obligatorio'),
      password: Yup.string()
                  .required('La contraseña es obligatoria')
                  .min(6, 'Contraseña de almenos 6 caracteres'),
      passwordConfirm: Yup.string()
                  .required('La contraseña es obligatoria')
                  .min(6, 'Contraseña de almenos 6 caracteres'),
    }),
    
    onSubmit: async valores => {            
      const {email, name, password, passwordConfirm} = valores;
      
      const user = {
        name,
        email,
        password,
        passwordConfirm,
        role,
        //company,
        department,
        'photo': '/public/img/users/default.jpg'
      }
      
      if(file){
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('passwordConfirm', passwordConfirm);
        formData.append('role', role);
        //formData.append('company', company);
        formData.append('department', department);
        formData.append('photo', file);

        try {
          const res = await createUserPhoto(formData, token);
          if(res === 201) {
            showToastMessage(`Password de ${email} modificado exitosamente!`);
            router.push('/accounts');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            showToastMessageError(res.toString());
          }
        } catch (error) {
          showToastMessageError('Ocurrio un problema al crear usuario con foto!!')
        }
      }else{
        try {
          let res = await createUser(user, token);
          if(res == 201) {
            showToastMessage(`Password de ${email} modificado exitosamente!`);
            router.push('/accounts');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            showToastMessageError(res.toString());
          }
        } catch (error) {
          showToastMessageError('Ocurrio un problema al crear usuario!!')
        }
      }                           
    },       
  });
  
  const handleSelect = (event: any) => {
    const target = event.target as HTMLButtonElement;
    setRol(target.value);
  }

  const onFileChange = (e: any) => {

    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if(file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setFile(file);
      } else {
        showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
      }
    }
  }

  const onDepartmentChange = (value:string) => {
    setDepartment(value);
  }

  return(
    <>
      <Alert />
      <form className="bg-slate-100 rounded shadow-md px-1 sm:px-8 pt-6 pb-8" 
        onSubmit={formikPass.handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 px-1 sm:px-5">
            <div className="mb-4 text-gray-700">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name" type="text"
                placeholder="Nombre del usuario"
                value={formikPass.values.name}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}
              />
            </div>
            {formikPass.touched.name && formikPass.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.name}</p>
              </div>
            ) : null}
          </div>
          <div className="w-full sm:w-1/2 px-1 sm:px-5">
            <div className="mb-4 text-gray-700">
              <Label htmlFor="email">Correo</Label>
              <Input 
                id="email" type="email"
                placeholder="email@gmail.com"
                value={formikPass.values.email}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}
              />
            </div>
            {formikPass.touched.email && formikPass.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.email}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 px-1 sm:px-5">
            <div className="mb-4 text-gray-700">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" type="password"
                placeholder="****"
                value={formikPass.values.password}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}
              />
            </div>
            {formikPass.touched.password && formikPass.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.password}</p>
              </div>
            ) : null}
          </div>
          <div className="w-full sm:w-1/2 px-1 sm:px-5">
            <div className="mb-4 text-gray-700">
              <Label htmlFor="passwordConfirm" >Confirmar Contraseña</Label>
              <Input 
                id="passwordConfirm"
                type="password"
                placeholder="****"
                value={formikPass.values.passwordConfirm}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}
              />
            </div>
            {formikPass.touched.passwordConfirm && formikPass.errors.passwordConfirm ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.passwordConfirm}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 px-1 sm:px-5">
            <div className="mb-4 text-gray-700">
              <Label htmlFor="profile">Perfil</Label>
              <Select onChange={handleSelect}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </div>
          </div>
          <div className="w-full sm:w-1/2 px-1 sm:px-5">
            <div className="space-y-1 justify-center">
              <div className="shrink-0 self-center">
                  <Label htmlFor="department">Departamento</Label>
                  <div>
                    <Select name="department" onChange={(e) => onDepartmentChange(e.target.value)}>
                      <option value={'dep1'}>Departamento 1</option>
                      <option value={'dep2'}>Departamento 2</option>
                      <option value={'dep3'}>Departamento 3</option>
                    </Select>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="w-full sm:w-1/2 px-1 sm:px-5">
            <div className="space-y-1 justify-center">
              <div className="shrink-0 self-center">
                  <Label htmlFor="photo">Foto</Label>
                  <div className='flex'>
                    <div className='border rounded-md border-blue-400 relative p-4 w-full'>
                      <input 
                        type="file" 
                        id="photo" 
                        name="photo" 
                        onChange={onFileChange}
                        className="opacity-0 absolute inset-0	">                                            
                      </input>
                      <p className='text-center	'>Cambiar Foto</p>
                    </div>  
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}