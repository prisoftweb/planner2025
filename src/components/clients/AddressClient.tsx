import Button from "../Button";
import NavClientsStepper from "./NavClientsStepper";
import { useFormik } from "formik"
import * as Yup from 'yup';
import Label from "../Label";
import Input from "../Input";
//import SaveClient from "@/app/functions/SaveClient";
import { showToastMessage, showToastMessageError } from "../Alert";
import { ClientBack } from "@/interfaces/Clients";
import { updateClient } from "@/app/api/routeClients";

export default function AddressClient({token, client}:{token:string, client:ClientBack}){
  
  const formik = useFormik({
    initialValues: {
      stret:client.location.stret? client.location.stret: '' ,
      cp: client.location.cp? client.location.cp.toString(): '',
      municipy: client.location.municipy? client.location.municipy: '',
      country: client.location.country? client.location.country: '',
      community: client.location.community? client.location.community: '',
      stateS: client.location.state? client.location.state: '',
    }, 
    validationSchema: Yup.object({
      stret: Yup.string()
                  .required('La calle no puede ir vacia'),
      cp: Yup.string()
                  .required('El codigo postal es obligatorio'),
      municipy: Yup.string()
                  .required('El municipio no puede ir vacio'),
      country: Yup.string()
                  .required('El pais no puede ir vacio'),
      community: Yup.string()
                    .required('La colonia no puede ir vacia'),
      stateS: Yup.string()
                  .required('El estado no puede ir vacio'),
    }),
    onSubmit: async (valores) => {            
      const {country, cp, municipy, stret, community, stateS} = valores;
      
      const data = {
        location: {
          country,
          municipy,
          stret,
          cp: parseInt(cp),
          community, 
          state: stateS
        }
      }

      const newObj = Object.fromEntries(Object.entries(data).filter(value => value[1]))

      //console.log('update address');
      //console.log(JSON.stringify(newObj));
      try {
        const res = await updateClient(client._id, token, newObj);
        if(res === 200){
          showToastMessage('Cliente actualizado exitosamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Error al actualizar direccion del cliente!!');
      }
    },       
  });

  return(
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="mt-4 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="stret"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Calle y numero</p></Label>
            <Input type="text" name="stret" autoFocus 
              value={formik.values.stret}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.stret && formik.errors.stret ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.stret}</p>
              </div>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="community"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Colonia / Localidad</p></Label>
            <Input type="text" name="community"
              value={formik.values.community}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.community && formik.errors.community ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.community}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="cp"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Codigo postal</p></Label>
            <Input type="text" name="cp" 
              value={formik.values.cp}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.cp && formik.errors.cp ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.cp}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="municipy"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Municipio / Delegacion</p></Label>
            <Input type="text" name="municipy"
              value={formik.values.municipy}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.municipy && formik.errors.municipy ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.municipy}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="stateS"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estado</p></Label>
            <Input type="text" name="stateS"
              value={formik.values.stateS}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.stateS && formik.errors.stateS ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.stateS}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="country"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pais</p></Label>
            <Input type="text" name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.country && formik.errors.country ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.country}</p>
              </div>
            ) : null}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>  
    </div>
  )
}