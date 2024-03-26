import axios from "axios";
import { NewRole } from "@/interfaces/Roles";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  //auth: `Bearer `
})

export async function getRoles(auth_token:string) {
  try {
    const res = await axiosInstance.get('/roles', {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
      //return error.response?.data
    }
  }
}

export async function createRole(auth_token:string, data:NewRole) {
  try {
    const res = await axiosInstance.post('/roles', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": 'application/json'  
      }
    })
    if(res.status===201) return res.status;
    return 'Error al crear rol!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al crear rol!!';
  }
}

export async function createResource(auth_token:string, data:NewRole) {
  try {
    const res = await axiosInstance.post('/resources', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": 'application/json'  
      }
    })
    if(res.status===201) return res.status;
    return 'Error al crear ruta!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al crear ruta!!';
  }
}

export async function getResources(auth_token:string) {
  try {
    const res = await axiosInstance.get('/resources', {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al consultar recursos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al consultar recursos!!!';
  }  
}

export async function getRoutes(auth_token:string) {
  try {
    const res = await axiosInstance.get('/routes', {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al consultar rutas!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al consultar rutas!!!';
  }  
}

export async function createRoute(auth_token:string, data:NewRole) {
  try {
    const res = await axiosInstance.post('/routes', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": 'application/json'
      }
    })
    if(res.status===201) return res.status;
    return 'Error al crear ruta!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al crear ruta!!';
  }
}

export async function getComponents(auth_token:string) {
  try {
    const res = await axiosInstance.get('/components', {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al consultar componentes!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al consultar componentes!!!';
  }  
}

export async function createComponent(auth_token:string, data:NewRole) {
  try {
    const res = await axiosInstance.post('/components', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": 'application/json'
      }
    })
    if(res.status===201) return res.status;
    return 'Error al crear componente!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al crear componente!!';
  }
}