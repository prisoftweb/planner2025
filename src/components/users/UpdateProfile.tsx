'use client'
import Label from "../Label"
import Input from "../Input"
import Button from "../Button"
import { useFormik } from "formik"
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "@/components/Alert";
import { useState, useEffect } from "react"
import HeaderForm from "../HeaderForm"
import { updateUser as updateApiUser } from "@/app/api/routeUser"
import { setCookie } from "cookies-next"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
import { UsrBack } from "@/interfaces/User"
import { useUserStore } from "@/app/store/userStore"
import { useRef } from "react"
import { updateWorkSpace, getWorkSpaces } from "@/app/api/routeWorkspace"
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces"

export default function UpdateProfile({user, departments, token, optsRoles}: 
  {user:UsrBack, departments:Options[], token:string, optsRoles:Options[]}){

  const {updateUser} = useUserStore();
  const [rolS, setRolS] = useState<string>(user.rol?._id ?? '');
  const [depto, setDepto] = useState<string>
                        (typeof(user.department)==='string'? user.department: user.department._id);
  const refRequest = useRef(true);
  const [workspaces, setWorkspaces] = useState<IWorkSpaceMin[]>([]);

  useEffect(() => {
    const fetchWorkSpaces = async () => {
      const res = await getWorkSpaces(token);
      if(Array.isArray(res)){
        setWorkspaces(res);
      }else{
        showToastMessageError('Error al obtener los workspaces');
      }
    }
    fetchWorkSpaces();
  }, []);

  let optRol = optsRoles[0];
  const opRol = optsRoles.find((opt) => opt.value===rolS);
  if(opRol) optRol = opRol; 

  let optDepto = departments[0];
  const opDep = departments.find((opt) => opt.value===depto);
  if(opDep) optDepto = opDep;

  const emailU:string = user.email;
  const nameU:string = user.name;
  const formik = useFormik({
    initialValues: {
      email:emailU,
      name:nameU,
    }, 
    validationSchema: Yup.object({
      // email: Yup.string()
      //             .email('El email no es valido')
      //             .required('El email no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      if(refRequest.current){
        refRequest.current = false;
        const {name} = valores;
      
        const data = {
          name, rol:rolS, department: depto
          // , email
        }

        try {
          const res = await updateApiUser(data, token, user._id);
          if(typeof(res) === 'string'){
            refRequest.current = true;
            showToastMessageError(res);
          }else{
            refRequest.current = true;
            showToastMessage(`Usuario ${name} modificado exitosamente!`);            
            setCookie('user', res);
            updateUser(res);

            const trimmedName = name.trim();
            const nameParts = trimmedName.split(/\s+/);

            let firstName = "";
            let lastName = "";

            if (nameParts.length >= 4) {
                // 4 o más palabras: los 2 primeros son nombre, lo demás apellido
                firstName = nameParts.slice(0, 2).join(' ');
                lastName = nameParts.slice(2).join(' ');
            } else if (nameParts.length === 3) {
                // 3 palabras: 1 nombre, 2 apellidos
                firstName = nameParts[0];
                lastName = nameParts.slice(1).join(' ');
            } else if (nameParts.length === 2) {
                // 2 palabras: 1 nombre, 1 apellido
                firstName = nameParts[0];
                lastName = nameParts[1];
            } else {
                // 1 palabra: solo nombre, sin apellido
                firstName = nameParts[0];
                lastName = "";
            }
            const wsToUpdate = workspaces.filter((ws) => ws.email === user.email);
            const dataws = {
              name: firstName,
              surname:lastName,
            }

            const resws = await updateWorkSpace(dataws, wsToUpdate[0]?._id?? '', token);
            if(typeof(resws)==='string'){
              refRequest.current = true;
              showToastMessageError(resws);
            }else{
              showToastMessage('Workspace actualizado satisfactoriamente!!!');
            }

          } 
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un error al modificar usuario..');
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
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
            <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Usuario/Email</p></Label>
            <Input type="email" name="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              disabled={true}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                    <p>{formik.errors.email}</p>
                </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="rol">Rol</Label>
            <Select 
              options={optsRoles}
              onChange={(e: any) => setRolS(e.value)}
              value={optRol}
            />
          </div>
          <div>
            <Label htmlFor="department">Departamento</Label>
            <Select 
              options={departments}
              onChange={(e:any) => setDepto(e.value)}
              value={optDepto}
            />
          </div>
          <div className="flex justify-center mt-4">
              <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </div>
    </>
  )
}