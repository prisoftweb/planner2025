import { createProvider } from "../api/routeProviders";
import { providerValidation } from "@/schemas/provider.schema";

export default async function SaveProvider(data:Object, token:string){
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