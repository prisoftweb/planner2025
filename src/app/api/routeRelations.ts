import axios from "axios";

export async function getRelations(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/relations`;
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
      return error.response?.data.message || 'Error al consultar relaciones!!';
    }
    return 'Error al consultar relaciones!!';
  }
}

export async function createRelation(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/relations`;
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
      return error.response?.data.message || 'Error al crear relacion!!';
    }
    return 'Error al crear relacion!!';
  }
}

export async function updateRelation(auth_token:string, data:object, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/relations/${id}`;
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
      return error.response?.data.message || 'Error al actualizar relacion!!';
    }
    return 'Error al actualizar relacion!!';
  }
}

export async function removeRelation(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/relations/${id}`;
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
      return error.response?.data.message || 'Error al eliminar relacion!!';
    }
    return 'Error al eliminar relacion!!';
  }
}