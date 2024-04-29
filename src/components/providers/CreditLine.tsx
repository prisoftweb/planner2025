import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Provider } from "@/interfaces/Providers";
import { updateProvider } from "@/app/api/routeProviders";
import { showToastMessage, showToastMessageError } from "../Alert";

export default function CreditLine({provider, id, token}: 
        {provider:Provider, id:string, token:string}){
  const formik = useFormik({
    initialValues: {
      creditlimit:provider.tradeline.creditlimit?.toString(),
      creditdays:provider.tradeline.creditdays?.toString(),
      currentbalance: provider.tradeline.currentbalance?.toString(),
      percentoverduedebt: provider.tradeline.percentoverduedebt?.toString()
    },
    validationSchema: Yup.object({
      creditlimit: Yup.string()
                  .required('El limite de credito no puede ir vacio'),
      creditdays: Yup.string()
                  .required('El numero de dias es obligatorio'),
      currentbalance: Yup.string()
                  .required('El saldo actual es obligatorio'),
      percentoverduedebt: Yup.string()
                  .required('El porcentaje es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      const {creditdays, creditlimit, currentbalance, percentoverduedebt} = valores;
      try {
        const tradeline = {
          creditdays: parseInt(creditdays? creditdays: '0'), 
          creditlimit: parseInt(creditlimit? creditlimit: '0'),
          currentbalance: parseInt(currentbalance? currentbalance: '0'),
          percentoverduedebt: parseInt(percentoverduedebt? percentoverduedebt: '0')
        }
        const res = await updateProvider(id, token, {tradeline});
        if(res===200){
          showToastMessage('Los datos han sido actualizados!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Error al actualizar informacion!!');
        console.log(error);
      }
    },       
  });
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/provider.svg" subtitle="Linea de credito de proveedor" 
        title="Linea de credito"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4 border border-gray-200 rounded-lg shadow p-4 space-y-5">
        <div>
          <Label htmlFor="creditlimit">Limite de credito</Label>
          <Input type="text" name="creditlimit" autoFocus 
            value={formik.values.creditlimit}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.creditlimit && formik.errors.creditlimit ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.creditlimit}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="creditdays">Dias de credito</Label>
          <Input type="text" name="creditdays" 
            value={formik.values.creditdays}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.creditdays && formik.errors.creditdays ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.creditdays}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="currentmount">Saldo actual</Label>
          <Input type="text" name="currentbalance" 
            value={formik.values.currentbalance}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.currentbalance && formik.errors.currentbalance ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.currentbalance}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="account">Comision por deuda vencida</Label>
          <Input type="text" name="percentoverduedebt" 
            value={formik.values.percentoverduedebt}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.percentoverduedebt && formik.errors.percentoverduedebt ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.percentoverduedebt}</p>
              </div>
          ) : null}
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>  
    </div>
  )
}