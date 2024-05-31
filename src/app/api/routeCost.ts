import axios from 'axios'

export async function GetCosts(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function CreateCost(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;
  console.log(url);
  console.log(JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(res);
    if(res.status === 201) return res.status;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al crear costo!!';
    }
    return 'Error al crear costo!!';
  }
}

export async function RemoveCost(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/${id}`;
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
      return error.response?.data.message || 'Error al eliminar costo!!';
    }
    return 'Error al eliminar costo!!';
  }
}

export async function GetCost(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costo!!';
    }
    return 'Error al consultar informacion del costo costo!!';
  }
}

export async function UpdateCost(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/${id}`;
  try {
    console.log(url);
    console.log(JSON.stringify(data));
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200) return res.status;
    res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar costo!!';
  }
}

export async function CreateCostWithFiles(auth_token:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/costWithFILES`;
  console.log(url);
  console.log('folio ', data.get('taxFolio'));
  // console.log('files => ', data.getAll('files'));
  // console.log('types => ', data.getAll('types'));
  //console.log(JSON.stringify(data));
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    if(res.status === 201) return res.status;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al crear costo!!';
    }
    return 'Error al crear costo!!';
  }
}

export async function ADDNewFILE(auth_token:string, id:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/updateMeADDNewFILE/${id}`;
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar archivo!!!';
    }
    return 'Error al actualizar archivo!!';
  }
}

export async function DeleteFILE(auth_token:string, id:string, idFile:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/deleteActualFILEByID/${id}/${idFile}`;
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
      return error.response?.data.message || 'Error al eliminar el archivo anterior!!!';
    }
    return 'Error al eliminar el archivo anterior!!';
  }
}