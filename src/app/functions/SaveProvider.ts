import { createProvider } from "../api/routeProviders";

export default async function SaveProvider(data:Object, token:string){
  try {
    const res = await createProvider(data, token);
    if(res===201){
      return 'El proveedor ha sido agregado exitosamente!!';
    }
    return res;
  } catch (error) {
    return 'Error al crear proveedor!!';
  }
}