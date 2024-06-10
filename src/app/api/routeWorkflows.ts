import axios from "axios";

export async function getWorkFlows(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/workflows`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status === 200) return res.data.data.data;
    return res.status;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar workflows!!';
    }
    return 'Error al consultar workflows!!';
  }
}

export async function createWorkFlow(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/workflows`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al crear workflow!!';
    }
    return 'Error al crear workflow!!';
  }
}

export async function updateWorkFlow(auth_token:string, data:object, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/workflows/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar workflow!!';
    }
    return 'Error al crear workflow!!';
  }
}

export async function removeWorkFlow(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/workflows/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status === 204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al eliminar workflow!!';
    }
    return 'Error al eliminar workflow!!';
  }
}