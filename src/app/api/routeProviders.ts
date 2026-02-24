import axios from "axios";

export async function getProviders(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status===200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Error al obtener proveedores';
    }
  }
}

export async function getProvidersLV(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/getAllProvidersLV`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status===200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Error al obtener proveedores';
    }
  }
}

export async function getProvidersSATLV(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/getAllProvidersSATLV`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status===200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Error al obtener proveedores del sat';
    }
  }
}

export async function getProvider(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message
    }else{
      return 'Ocurrio un problema al consultar proveedor';
    }
  }
}

export async function getProviderMin(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/getProviderMIN/${id}`;

  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.stats;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message
    }else{
      return 'Ocurrio un problema al consultar proveedor min';
    }
  }
}

export async function updateProvider(id:string, auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`;

  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });    
    if(res.status===200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al actualizar proveedor';
    }
  }
}

export async function RemoveProvider(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
    if(res.status===204) return res.status;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al eliminar proveedor';
    }
  }
}

export async function createProvider(data:Object, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`;
  console.log('url => ', url);
  console.log('data => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'Application/json',
      }
    })
    console.log('res => ', res);
    if(res.status===201) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al crear proveedor!!';
    }
  }
}

export async function createNewProvider(data:Object, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`;
  
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'Application/json',
      }
    })
    if(res.status===201) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al crear proveedor!!';
    }
  }
}

export async function updateContactProvider(data:Object, id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/insertContactOfProvider/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un error al actulizar contacto del proveedor!!';
  }
}

export async function GetCostsMIN(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostByProviderMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.stats
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function GetCostsProviderMINWithoutPay(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostByProviderMINWithoutPAY/${id}`;
  // console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'application-type': 'application/json',
      },
      data: {
        filter: "67318a51ceaf47ece0d3aa72"
      }
    });
    // console.log('res => ', res); 
    if(res.status===200) return res.data.data.stats;
    return res.statusText
  } catch (error) {
    // console.log('error => ', error); 
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos sin pago!!';
    }
    return 'Error al consultar costos sin pago!!';
  }
}

export async function getProviderByRFC(auth_token:string, prov: string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/getProviderByRFCMIN/${prov}`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status===200){
      if(res.data.data.stats.length > 0){
        return res.data.data.stats[0]._id;
      }else{
        return 'No se encontro el proveedor!!';
      }
    }
    return res.statusText;
  } catch (error) {
    return 'No se encontro el proveedor!!';
  }
}

export async function getCostTOTALPendingPAYGroupByPROVIDER(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getCostTOTALPendingPAYGroupByPROVIDER/${id}`;

  const data={
    conditionCost: ["PAGADO", "DIFERIDO", "NO PAGADO"]
  }

  try {
    const res = await axios.post(url, JSON.stringify(data), {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });    
    if(res.status===200) return res.data.data.stats[0];
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al obtener costos pendientes de pago por proveedor';
    }
  }
}

export async function getAllCostsAdvancesByProviderMIN(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsAdvancesByProviderMIN/${id}`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status===200) return res.data.data.stats;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error?.message?? 'Error al obtener anticipos del proveedor';
    }else{
      return 'Error al obtener anticipos del proveedor';
    }
  }
}

export async function insertConditionInProvider(id:string, auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/insertConditionInProvider/${id}`;

  try {
    const res = await axios.post(url, JSON.stringify(data), {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });    
    if(res.status===200) return res.data.data.data;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al actualizar condicion del proveedor';
    }
  }
}

export async function getAllPaymentsByProviderMIN(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/getAllPaymentsByProviderMIN/${id}`;
  try {
    const res = await axios.get(url, {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    // console.log('res => ', res);
    // console.log('res json => ', JSON.stringify(res.data.data));
    if(res.status===200) return res.data.data.resdata;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al obtener pagos del proveedor';
    }
  }
}