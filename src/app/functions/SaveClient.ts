import { createClient } from "../api/routeClients";
import { clientValidation } from "@/schemas/client.schema";

export default async function SaveClient(data:Object, token:string){
  const newObj = Object.fromEntries(Object.entries(data).filter(value => value[1]))

  const res = clientValidation.safeParse(newObj);
  
  if(res.success){
    try {
      const res = await createClient(token, newObj);
      if(res===201){
        return {
          status: true,
          message: 'Cliente agregado exitosamente!!'
        }
      }
      return {
        status: false,
        message: res
      }
    } catch (error) {
      return {
        status : false,
        message: 'Error al crear cliente!!'
      }
    } 
  }else{
    return{
      message: res.error.issues[0].message,
      status: false
    }
  }
}