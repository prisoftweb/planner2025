import axios from "axios";

export async function getWorkSpaces(auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces`;
  try {
    const res = await axios.get(url, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al obtener espacios de trabajo';
    }
  }
}

export async function getWorkSpacesMin(auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces/getAllWorkspacesMIN`;
  try {
    const res = await axios.get(url, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200)
      return res.data.data.stats;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al obtener espacios de trabajo';
    }
  }
}

export async function createWorkSpace(data:Object) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces`;
  console.log('url ws => ', url);
  console.log('data => ', data);
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers:{
        'Content-Type': 'application/json'
      }
    });
    console.log('res => ', res.data.data);
    if(res.status===201)
      return res.data.data.data;
    return res.statusText
  } catch (error) {
    console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al crear espacio de trabajo';
    }
  }
}

export async function updateWorkSpace(data:Object, id:string, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    });
    console.log('res => ', res.data.data);
    if(res.status===200)
      return res.data.data.data;
    return res.statusText
  } catch (error) {
    console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al actualizar espacio de trabajo';
    }
  }
}

export async function updateWorkSpaceWithLogo(data:FormData, id:string, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces/updateMePicture/${id}`;
  try {
    const res = await axios.patch(url, data, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('res update ws con logo => ', res.data.data);
    if(res.status===200)
      return res.data.data.data;
    return res.statusText
  } catch (error) {
    console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al actualizar espacio de trabajo';
    }
  }
}

export async function findCODEVALIDATION(code:string, email:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cods/findCODByUserMIN/${code}/${email}`;
  try {
    const res = await axios.get(url, {
      headers:{
        'Content-Type': 'application/json'
      }
    });
    console.log('res => ', res.data.data);
    if(res.status===201)
      return res.data.data.data;
    // return res.statusText
    return res.status;
  } catch (error) {
    console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al verificar codigo, intente de nuevo...';
    }
  }
}

export async function insertCompanyInWorkSpace(auth_token:string, id:string, data:Object) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces/insertCompanyArrByID/${id}`;
  console.log('url ws insert company => ', url);
  console.log('data insert company => ', data);
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al insertar compañia en el espacio de trabajo';
    }
  }
}

export async function deleteCompanyInWorkSpace(auth_token:string, id:string, idComp:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces/eliminaCompanyArrByID/${id}/${idComp}`;
  console.log('url ws dlete company => ', url);
  // console.log('data delete company => ', data);
  try {
    const res = await axios.post(url, {}, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('res delete company ws => ', res);
    if(res.status===200 || res.status===201 || res.status===204)
      return 204;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al eliminar compañia en el espacio de trabajo';
    }
  }
}
