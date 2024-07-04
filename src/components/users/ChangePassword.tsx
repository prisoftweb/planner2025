'use client'
import Label from "../Label"
import Input from "../Input"
import Button from "../Button"
import { useFormik } from "formik"
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "@/components/Alert";
import HeaderForm from "../HeaderForm"
import { updateMePassword } from "@/app/api/routeUser"
import { useRouter } from "next/navigation"
import RemoveCookies from "@/app/functions/RemoveCookies"
import { useRef } from "react"

export default function ChangePassword({token, name, id}:{token:string, name:string, id:string}){

  const router = useRouter();
  const refRequest = useRef(true);

  const formik = useFormik({
    initialValues: {
      currentPassword:'',
      newPassword:'',
      confirmNewPassword: '',
    }, 
    validationSchema: Yup.object({
      currentPassword: Yup.string()
                  .required('La contraseña es obligatoria'),
      newPassword: Yup.string()
                  .required('La nueva contraseña es obligatoria'),
      confirmNewPassword: Yup.string()
                  .required('La confirmacion de la nueva contraseña es obligatoria'),
    }),
    onSubmit: async (valores) => { 
      if(refRequest.current){
        const {currentPassword, newPassword, confirmNewPassword} = valores;
      
        if(newPassword !== confirmNewPassword){
          showToastMessageError("La nueva contraseña debe ser igual a su confirmacion!!")
        }else{
          refRequest.current = false;
          let res = await updateMePassword(id, currentPassword, newPassword, confirmNewPassword, token)
          if(typeof(res) === 'string'){
            refRequest.current = true;
            showToastMessageError(res);
          }else{
            refRequest.current = true;
            if(res === 200) {
              showToastMessage(`La contraseña ha sido modificada exitosamente!`);            
              setTimeout(() => {
                logOut();
              }, 500)
            } else {
              refRequest.current = true;
              showToastMessageError('Error al modificar contraseña..');
            }
          }
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
      }
    },       
  });

  function logOut(){
    RemoveCookies();
    router.push('/login');
  }

  return(
    <>
      <div className="w-full">
      <HeaderForm img="/img/user.svg" subtitle="Contraseña de acceso" 
        title="Cambiar contraseña"
      />
        {/* <form onSubmit={formik.handleSubmit} className="mt-4"> */}
        <form onSubmit={formik.handleSubmit} className="mt-4 border border-gray-200 rounded-lg shadow p-4 space-y-5">
          <div>
            <Label htmlFor="password"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Contraseña actual</p></Label>
            <Input type="password" name="currentPassword" autoFocus 
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.currentPassword}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="newPassword"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nueva contraseña</p></Label>
            <Input type="password" name="newPassword" 
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                    <p>{formik.errors.newPassword}</p>
                </div>
            ) : null}
          </div>
          <div>
            <Label htmlFor="newPassword"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Confirmar nueva contraseña</p></Label>
            <Input type="password" name="confirmNewPassword" 
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                    <p>{formik.errors.confirmNewPassword}</p>
                </div>
            ) : null}
          </div>
          <div className="flex justify-center mt-4">
            <Button type="submit">Guardar contraseña</Button>
          </div>
        </form>
      </div>
    </>
  )
}