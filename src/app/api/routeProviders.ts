import axios from "axios";

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

export async function getProvidersLV(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/getAllProvidersLV`;
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

export async function getProvidersSATLV(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/getAllProvidersSATLV`;
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
      return 'Error al obtener proveedores del sat';
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

export async function RemoveProvider(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
    if(res.status===204) return res.status;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      console.log(error);
      return 'Ocurrio un error al eliminar proveedor';
    }
  }
}

export async function createProvider(data:Object, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`;
  
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'Application/json',
      }
    })
    if(res.status===201) return res.status;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al crear proveedor!!';
    }
  }
}

export async function createNewProvider(data:Object, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`;
  
  console.log('new provider => ', url);
  console.log('data => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'Application/json',
      }
    })
    console.log('res => ', res);
    if(res.status===201) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al crear proveedor!!';
    }
  }
}

export async function updateContactProvider(data:Object, id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/insertContactOfProvider/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    console.log(typeof(error));
    console.log(error);
    return 'Ocurrio un error al actulizar contacto del proveedor!!';
  }
}