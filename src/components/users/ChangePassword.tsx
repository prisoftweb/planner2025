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

export default function ChangePassword({token, name, id}:{token:string, name:string, id:string}){

  const router = useRouter();

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
      const {currentPassword, newPassword, confirmNewPassword} = valores;
      
      const password = {
        currentPassword,
        newPassword,
        confirmNewPassword
      }
      console.log('password', password);
      //validar new password y confirmnewpassword sean iguales
      
      //let res = await updateMeUser(id, formData, token);
      //console.log('res =>', res)
      let res = await updateMePassword(id, currentPassword, newPassword, confirmNewPassword, token)
      if(typeof(res) === 'string'){
        showToastMessageError(res);
      }else{
        if(res === 200) {
          showToastMessage(`Usuario ${name} modificado exitosamente!`);            
          //router.refresh();
          setTimeout(() => {
            logOut();
          }, 600)
        } else {
          showToastMessageError('Error al modificar usuario..');
        }
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
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <Label htmlFor="password">Contraseña actual</Label>
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
          <Label htmlFor="newPassword">Nueva contraseña</Label>
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
          <Label htmlFor="newPassword">Confirmar nueva contraseña</Label>
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
          <div className="flex justify-center mt-4">
            <Button type="submit">Guardar contraseña</Button>
          </div>
        </form>
      </div>
    </>
  )
}