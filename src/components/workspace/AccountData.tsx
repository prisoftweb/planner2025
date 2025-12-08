import { useFormik } from "formik";
import * as Yup from 'yup';
import Label from "../Label";
import Input from "../Input";
import { useState, useRef } from "react";
import InputMask from 'react-input-mask';
import Button from "../Button";
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import HeaderForm from "../HeaderForm";
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";
import { updateWorkSpace } from "@/app/api/routeWorkspace";
import { showToastMessage, showToastMessageError } from "../Alert";

type AccountDataProps = {
  id:string, 
  token:string, 
  workspace: IWorkSpaceMin,
  fetchWorkSpace: () => Promise<void>
}

export default function AccountData({ id, token, workspace, fetchWorkSpace}: AccountDataProps){
  const refRequest = useRef(true);
  // const {updateProfileClient} = useClientProfileStore();
  const [phone, setPhone] = useState<string>( workspace.phoneNumber?? '');

  const formik = useFormik({
    initialValues: {
      lastname: workspace.surname,
      name:workspace.name,
      rfc: '',
      email: workspace.email,
    }, 
    validationSchema: Yup.object({
      lastname: Yup.string()
                  .required('El apellido no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      email: Yup.string(),
    }),
    onSubmit: async (valores) => {            
      if(refRequest.current){
        refRequest.current = false;

        const {email, lastname, name, rfc} = formik.values;

        let phoneformat = phone.trim();
        phoneformat = phoneformat.replace(/\s+/g, '');
        phoneformat = phoneformat.replace('(+52)', '');

        const data = {
          name,
          surname:lastname,
          email,
          phoneNumber: phoneformat,
        }
        const res = await updateWorkSpace(data, workspace._id, token);
        if(typeof(res)==='string'){
          refRequest.current = true;
          showToastMessageError(res);
        }else{
          refRequest.current = true;
          showToastMessage('Espacio de trabajo actualizado satisfactoriamente!!!');
          fetchWorkSpace();
        }
      }
    },
  });
  
  return(
    <>
      <HeaderForm title="Modificar datos de cuenta" img="/img/projects/default.jpg" subtitle="Modificar tu perfil o cuenta" />
      <form id="basicdata" onSubmit={formik.handleSubmit} className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-4">
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
          <div >
            <Label htmlFor="lastname"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Apellidos</p></Label>
            <Input type="text" name="lastname" 
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
                <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                    <p>{formik.errors.lastname}</p>
                </div>
            ) : null}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" 
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
        <Label htmlFor="phone"><p>Telefono</p></Label>
          <div className="flex items-center mt-2 flex-wrap gap-y-1">
            <div className="w-full flex  justify-start items-center relative">
              <InputMask mask='9999999999'
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 pl-9 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                type="phone"
                placeholder="444 429 7227"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <DevicePhoneMobileIcon className="h-6 w-6 text-amber-400 hover:text-amber-500 absolute ml-1" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}