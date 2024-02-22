import axios from "axios";
import { Tradeline } from "@/interfaces/Providers";

export async function getProviders(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status===200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Error al obtener proveedores';
    }
  }
}

export async function getProvider(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message
    }else{
      console.log(error);
      return 'Ocurrio un problema al consultar proveedor';
    }
  }
}

export async function updateProvider(id:string, auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`;

  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });    
    if(res.status===200) return res.status;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      console.log(typeof(error));
      return 'Ocurrio un error al actualizar proveedor';
    }
  }
}