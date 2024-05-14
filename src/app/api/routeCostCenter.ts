import axios from "axios";

export async function getCostCenters(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costcenters`;
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
      return error.response?.data.message || 'Error al consultar los centros de costos!!';
    }
    return 'Error al consultar los centros de costos!!';
  }
}

export async function getCostCenter(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costcenters/${id}`;
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
      return error.response?.data.message || 'Error al consultar el centro de costos!!';
    }
    return 'Error al consultar el centro de costos!!';
  }
}

export async function CreateCostCenter(auth_token:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costcenters`;
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
      return error.response?.data.message || 'Error al crear centro de costos!!';
    }
    return 'Error al crear centro de costos!!';
  }
}

export async function RemoveCostCenter(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costcenters/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al eliminar centro de costos!!';
    }
    return 'Error al eliminar centro de costos!!';
  }
}

export async function UpdateCostCenter(auth_token:string, id:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costcenters/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization':`Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===200) return res.status
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar centro de costos!!';
    }
    return 'Error al actualizar centro de costos!!';
  }
}

export async function InsertCategoryInCostCenter(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costcenters/insertCategoryInCostCenter/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status===200) return res.status
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al insertar concepto en centro de costos!!';
    }
    return 'Error al insertar concepto en centro de costos!!';
  }
}

export async function DeleteCategoryInCostCenter(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costcenters/deleteCategoryInCostCenter/${id}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200) return 204
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al eliminar concepto en centro de costos!!';
    }
    return 'Error al eliminar concepto en centro de costos!!';
  }
}