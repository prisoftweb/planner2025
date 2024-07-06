'use client'
import Label from "../Label"
import Input from "../Input"
import Button from "../Button"
import { useFormik } from "formik"
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "@/components/Alert";
import { useState } from "react"
import HeaderForm from "../HeaderForm"
import { updateUser as updateApiUser } from "@/app/api/routeUser"
import { setCookie } from "cookies-next"
import { Options } from "@/interfaces/Common"
import Select from 'react-select'
import { UsrBack } from "@/interfaces/User"
import { useUserStore } from "@/app/store/userStore"
import { useRef } from "react"

export default function UpdateProfile({user, departments, token, optsRoles}: 
                  {user:UsrBack, departments:Options[], token:string, optsRoles:Options[]}){


  // let optionsDepartments:Options[] = [];
  // departments.map((dept:any) => {
  //   optionsDepartments.push({
  //     label: dept.name,
  //     value: dept._id
  //   });
  // });

  // let indexRol: number = 0;
  // if(user.rol){
  //   optsRoles.map((optRol, index:number) => {
  //     if(user.rol._id === optRol.value){
  //       indexRol = index;
  //     }
  //   });
  // }

  // let indexDepto: number = 0;
  // optionsDepartments.map((dept, index:number) => {
  //   if(dept.value === user.department._id){
  //     indexDepto = index;
  //   }
  // });
  
  const {updateUser} = useUserStore();
  const [rolS, setRolS] = useState<string>(user.rol?._id ?? '');
  //const [optRole, setOptRole] = useState<Options>(optsRoles[indexRol]);
  const [depto, setDepto] = useState<string>
                        (typeof(user.department)==='string'? user.department: user.department._id);
  //const [optDepts, setOptDepts] = useState<Options>(optionsDepartments[indexDepto]);
  const refRequest = useRef(true);

  let optRol = optsRoles[0];
  const opRol = optsRoles.find((opt) => opt.value===rolS);
  if(opRol) optRol = opRol; 

  let optDepto = departments[0];
  const opDep = departments.find((opt) => opt.value===depto);
  if(opDep) optDepto = opDep;

  // const [rol, setRol] = useState<string>(optsRoles[0].value);
  // const [optRole, setOptRole] = useState<Options>(optsRoles[0]);
  // const [department, setDepartment] = useState<string>(departments[0]._id);
  // const [optDepts, setOptDepts] = useState<Options>(optionsDepartments[0]);

  // useEffect(() => {
  //   optsRoles.map((optRol) => {
  //     if(user.rol){
  //       if(user.rol._id === optRol.value){
  //         setOptRole(optRol);
  //         setRol(optRol.value);
  //       }
  //     }
  //   });

  //   optionsDepartments.map((dept) => {
  //     if(dept.value === user.department._id){
  //       setDepartment(dept.value);
  //       setOptDepts(dept);
  //     }
  //   });
  // }, []);

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
      if(refRequest.current){
        refRequest.current = false;
        const {email, name} = valores;
      
        const data = {
          name, email, rol:rolS, department: depto
        }

        try {
          //let res = await updateMeUser(user._id, formData, token);
          const res = await updateApiUser(data, token, user._id);
          if(typeof(res) === 'string'){
            refRequest.current = true;
            showToastMessageError(res);
          }else{
            refRequest.current = true;
            showToastMessage(`Usuario ${name} modificado exitosamente!`);            
            setCookie('user', res);
            updateUser(res);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
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