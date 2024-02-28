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
    }, 
    validationSchema: Yup.object({
      tradename: Yup.string()
                  .required('El nombre comercial no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc no puede ir vacio'),
    }),
    onSubmit: async (valores) => {            
      const {name, tradename, rfc} = valores;
      const data= {
        name, 
        tradename,
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
        <div className="inline-flex items-center">
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={suppliercredit} onClick={() => setSuppliercredit(!suppliercredit)} id="switch-3" type="checkbox"
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 peer-checked:border-green-500 peer-checked:before:bg-green-500" />
            <label htmlFor="switch-3"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>  
    </div>
  )
}