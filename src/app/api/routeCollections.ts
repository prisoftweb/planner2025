import axios from "axios";

export async function getCollectionsMin(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collections/getAllCollectionsMIN`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return 'Error al obtener los cobros!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar los cobros!!';
  }
}

export async function getCollectionMin(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collections/getCollection/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200)
      return res.data.data.data[0];
    return 'Error al obtener cobro!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar cobro!!';
  }
}

export async function createCollection(auth_token:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collections`;
  console.log('url coboro => ', url);
  console.log('data => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('res cobor => ', res);
    if(res.status===201)
      return res.status;
    return 'Error al crear cobro!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al crear cobro!!';
  }
}

export async function deleteCollection(id:string, auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collections/${id}`;
  console.log('url => ', url);
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    console.log(' res => ', res);
    if(res.status===204)
      return res.status;
    return 'Error al eliminar cobro!!';
  } catch (error) {
    console.log('errror => ', error);
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al eliminar cobro!!';
  }
}