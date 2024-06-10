import axios from "axios";

export async function getNodes(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/nodes`;
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
      return error.response?.data.message || 'Error al consultar nodes!!';
    }
    return 'Error al consultar nodes!!';
  }
}

export async function getNode(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/nodes/${id}`;
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
      return error.response?.data.message || 'Error al consultar nodo!!';
    }
    return 'Error al consultar nodo!!';
  }
}

export async function createNode(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/nodes`;
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
      return error.response?.data.message || 'Error al crear nodo!!';
    }
    return 'Error al crear nodo!!';
  }
}

export async function updateNode(auth_token:string, data:object, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/nodes/${id}`;
  try {
    console.log(url);
    console.log(JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log('res = ', res);
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar nodo!!';
    }
    return 'Error al crear nodo!!';
  }
}

export async function removeNode(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/nodes/${id}`;
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
      return error.response?.data.message || 'Error al eliminar nodo!!';
    }
    return 'Error al eliminar nodo!!';
  }
}