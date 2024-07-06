import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import LabelRed from "../LabelRed";
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Provider } from "@/interfaces/Providers";
import { useState, useRef } from "react";
import { updateProvider } from "@/app/api/routeProviders";
import { showToastMessage, showToastMessageError } from "../Alert";
import CardContact from "./CardContact";

export default function DataBasic({id, token, provider}:{id:string, token:string, provider:Provider}){
  
  const [suppliercredit, setSuppliercredit] = useState<boolean>(provider.suppliercredit);
  const refRequest = useRef(true);

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
      if(refRequest.current){
        refRequest.current = false;
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
            refRequest.current = true;
            showToastMessage('La informacion del proveedor ha sido actualizada!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          console.log(typeof(error))
          showToastMessageError('Error al actualizar informacion del proveedor!!');
        }
      }else{
        showToastMessageError('Ya hay una solitud en proceso!!');
      }
    },       
  });
  
  let showContacts: JSX.Element[] =[];

  if(provider.contact){
    provider.contact.map((contact) => {
      showContacts.push(<CardContact contact={contact} idProv={provider._id} token={token} />)
    })
  }

  return(
    <div className="w-full">
      <HeaderForm img="/img/provider.svg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      />
      <div className="flex flex-wrap gap-x-3 gap-y-2 mt-3">
        {showContacts}
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 bg-white border border-gray-200 rounded-lg shadow p-4 space-y-5">
        <div className="">
          <LabelRed htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></LabelRed>
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
        <div className="">
          <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
          <Input type="text" name="tradename" 
            value={formik.values.tradename}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.tradename && formik.errors.tradename ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.tradename}</p>
              </div>
          ) : null}
        </div>
        <div className="">
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">RFC</p></Label>
          <Input type="text" name="rfc" 
            value={formik.values.rfc}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.rfc && formik.errors.rfc ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.rfc}</p>
            </div>
          ) : null}
        </div>
        <div className="inline-flex items-center">
        {/* <p className="mr-3 text-gray-500 text-sm">Linea de credito</p> */}

          <Label>Linea de credito</Label>
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