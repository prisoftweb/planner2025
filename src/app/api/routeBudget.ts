import axios from "axios";

export async function getBudgets(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return 'Error al obtener los presupuestos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar los presupuestos!!';
  }
}

export async function getBudget(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return 'Error al obtener presupuesto!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar los presupuesto!!';
  }
}

export async function createBudget(auth_token:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'Application/json',
      }
    });
    if(res.status===201)
      return res.data.data.data;
    return 'Error al crear presupuesto!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al crear presupuesto!!';
  }
}

export async function updateBudget(auth_token:string, data:Object, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'Application/json',
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return 'Error al actualizar presupuesto!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al actualizar presupuesto!!';
  }
}

export async function getBudgetsMin(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets/getAllBudgets`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200)
      return res.data.data.resdata;
    return 'Error al obtener los presupuestos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar los presupuestos!!';
  }
}

export async function removeBudget(id:string, auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets/${id}`;
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
      return error.message || error.response?.data.message;
    }
    return 'Ocurrio un problema al eliminar presupuesto!!';
  }
}

export async function InsertNewBudgetInBudgetByID(id:string, auth_token:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets/insertNewBudgetInBudget/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200 ) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Ocurrio un problema al agregar centro de costos!!';
  }
}

export async function DeleteNewBudgetInBudget(id:string, auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets/deleteNewBudgetInBudget/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    console.log('res remove bud => ', res);
    if(res.status===204 || res.status===200 || res.status===201) return 204;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Ocurrio un problema al eliminar centro de costos del presupuesto!!';
  }
}