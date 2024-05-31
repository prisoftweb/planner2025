import axios from "axios";

export async function GetReports(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`;
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
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function CreateReport(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status === 201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un error al crear Reporte!!';
    }
    return 'Ocurrio un error al crear Reporte!!';
  }
}

export async function RemoveReport(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${id}`;
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
      return error.response?.data.message || 'Error al eliminar reporte';
    }
    return 'Error al eliminar reporte';
  }
}

export async function GetReport(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${id}`;
  try {
    const res = await axios.get(url, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar reporte!!';
    }
    return 'Error al consultar reporte!!';
  }
}

export async function updateReport(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${id}`;
  console.log(url);
  console.log(JSON.stringify(data));
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar reporte!!';
    }
    return 'Error al actualizar reporte!!';
  }
}