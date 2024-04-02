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

export async function getRole(auth_token:string, id:string) {
  try {
    const res = await axiosInstance.get(`/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      //console.log(error.response?.data);
      //return error.message;
      return error.response?.data.message? error.response?.data.message : error.message; 
    }
    return 'Error al obtener rol';
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

export async function getTrees(auth_token:string) {
  try {
    const res = await axiosInstance.get('/trees', {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al consultar arboles!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al consultar arboles!!!';
  }  
}

export async function getTree(auth_token:string, id:string) {
  try {
    const res = await axiosInstance.get(`/trees/${id}`, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al consultar arbol!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al consultar arbol!!!';
  }  
}

export async function updateResource(auth_token:string, id:string, data:Object) {
  try {
    const res = await axiosInstance.patch(`/resources/${id}`, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 200) return res.status;
    return 'Error al actualizar recurso!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al actualizar recurso!!';
  }
}

export async function updateRoute(auth_token:string, id:string, data:Object) {
  try {
    const res = await axiosInstance.patch(`/routes/${id}`, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 200) return res.status;
    return 'Error al actualizar ruta!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al actualizar ruta!!';
  }
}

export async function updateComponent(auth_token:string, id:string, data:Object) {
  try {
    const res = await axiosInstance.patch(`/components/${id}`, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 200) return res.status;
    return 'Error al actualizar componente!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      return error.message;
    }
    return 'Ocurrio un error al actualizar componente!!';
  }
}

export async function insertResourceTree(auth_token:string, id:string, data:Object) {
  try {
    const res = await axiosInstance.post(`/trees/insertResourceInTree/${id}`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": 'application/json'
      }
    })
    if(res.status===200) return res.status;
    return 'Error al agregar ruta!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message? error.response?.data.message : error.message;
    }
    return 'Ocurrio un error al agregar ruta!!';
  }
}

export async function insertComponentsTree(auth_token:string, idTree:string, 
            idResource:string, idRoute:string, data:Object){
  const url = `/trees/insertComponentInRouteInResourceInTreeArrTRIDIM/${idTree}/${idResource}/${idRoute}`
  console.log(url);
  console.log(idTree);
  console.log(idResource);
  console.log(idRoute);
  console.log(JSON.stringify(data));
  try {
    const res = await axiosInstance.post(url, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": `application/json`,
      }
    });
    if(res.status === 200) {console.log('res'); console.log(res); return res.status};
    return 'Error al actualizar componentes en el arbol!!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message? error.response?.data.message: error.message;
    }
    return 'Ocurrio un error al actualizar componentes en el arbol!!';
  }
}

export async function RemoveResourceTree(auth_token:string, idTree:string, idResource:string) {
  const url = `/trees/deleteResourceInTree/${idTree}/${idResource}`;
  try {
    const res = await axiosInstance.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 204) return res.status;
    return 'Error al elimar recurso del arbol!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message? error.response?.data.message : error.message;
    }
    return 'Ocurrion un error al eliminar recurso del arbol!!';
  }
}

export async function CreateTree(auth_token:string){
  try {
    const res = await axiosInstance.post('/trees', {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 201) return res.status;
    return 'Error al crear arbol!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message? error.response?.data.message : error.message;
    }
  }
}