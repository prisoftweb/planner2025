import { createClient, createClientLogo } from "../api/routeClients";
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

export async function SaveClientLogo(data:FormData, token:string, 
                location: any, tags:any, contacts:any, phone:any){
  const newObj = Object.fromEntries(data);

  newObj.location = location;
  newObj.tags = tags;
  newObj.contact = contacts;
  if(phone !== ''){
    newObj.phone = phone;
  }
  
  const res = clientValidation.safeParse(newObj);
  
  if(res.success){
    data.append('location', JSON.stringify(location));
    tags.map((tag:string) => {
      data.append('tags', tag);
    })
    contacts.map((contact:string) => {
      data.append('contact', contact);
    })
    if(phone!==''){
      data.append('phone', phone);
    }
    
    try {
      const res = await createClientLogo(token, data);
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