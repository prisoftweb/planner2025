import axios from "axios";

export async function getGlossaries(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/glossarys`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener glosarios!!';
  }  
}

export async function getGlossariesLV(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/glossarys`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener glosarios!!';
  }  
}

export async function CreateGlossary(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/glossarys`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al crear glosario!!';
  }
}

export async function RemoveGlossary(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/glossarys/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al eliminar glosario!!';
  }
}

export async function UpdateGlossary(auth_token:string, id:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/glossarys/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status=== 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar glosario!!';
  }
}