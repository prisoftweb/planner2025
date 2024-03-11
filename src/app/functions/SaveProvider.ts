import { createProvider } from "../api/routeProviders";
import { providerValidation } from "@/schemas/provider.schema";
import { Provider } from "@/interfaces/Providers";

export default async function SaveProvider(data:Provider, token:string){
  
  if(data.suppliercredit && (!data.tradeline || Object.keys(data.tradeline).length <= 0)){
    return {status: false, message: 'No ha guardado datos en la linea de credito!!'}
  }
  
  const res = providerValidation.safeParse(data);
  if(res.success){
    try {
      const res = await createProvider(data, token);
      if(res===201){
        return {
          status: true,
          message: 'Proveedor agregado exitosamente!!'
        }
      }
      return {
        status: false,
        message: res
      }
    } catch (error) {
      return {
        status : false,
        message: 'Error al crear proveedor!!'
      }
    } 
  }else{
    return{
      message: res.error.issues[0].message,
      status: false
    }
  }
}