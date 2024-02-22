import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Provider } from "@/interfaces/Providers";
import { useState } from "react";
import { updateProvider } from "@/app/api/routeProviders";
import { showToastMessage, showToastMessageError } from "../Alert";

export default function DataBasic({id, token, provider}:{id:string, token:string, provider:Provider}){
  
  const [suppliercredit, setSuppliercredit] = useState<boolean>(provider.suppliercredit)

  const formik = useFormik({
    initialValues: {
      tradename:provider.tradename,
      name:provider.name,
      rfc: provider.rfc,
      account: provider.account
    }, 
    validationSchema: Yup.object({
      tradename: Yup.string()
                  .required('El nombre comercial no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc no puede ir vacio'),
      account: Yup.string()
                  .required('El numero de cuenta es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      const {name, tradename, account, rfc} = valores;
      const data= {
        name, 
        tradename,
        account,
        rfc,
        "suppliercredit": suppliercredit
      }

      try {
        const res = await updateProvider(id, token, data);
        if(res===200){
          showToastMessage('La informacion del proveedor ha sido actualizada!!');
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        console.log(typeof(error))
        showToastMessageError('Error al actualizar informacion del proveedor!!');
      }

    },       
  });
  
  return(
    <div className="w-full lg:w-3/4 xl:w-1/2">
      <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
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
        <Label htmlFor="email">Nombre comercial</Label>
        <Input type="text" name="tradename" 
          value={formik.values.tradename}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.tradename && formik.errors.tradename ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.tradename}</p>
            </div>
        ) : null}
        <Label htmlFor="name">RFC</Label>
        <Input type="text" name="rfc" 
          value={formik.values.rfc}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.rfc && formik.errors.rfc ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.rfc}</p>
          </div>
        ) : null}
        <Label htmlFor="account">Numero de cuenta</Label>
        <Input type="text" name="account" 
          value={formik.values.account}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.account && formik.errors.account ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.account}</p>
            </div>
        ) : null}
        <div className="flex justify-center mt-4">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>  
    </div>
  )
}