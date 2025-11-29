import axios from "axios";

export async function getClients(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.data;
    return res.data?.message?? res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al consultar clientes!!';
  }
}

export async function getClientsLV(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/getAllClientsLV`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.data;
    return res.data?.message?? res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al consultar clientes!!';
  }
}

export async function getTags(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tags`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al consultar etiquetas!!';
  }
}

export async function createClient(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients`;
  try {
    // console.log('url => ', url);
    // console.log('data => ', JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    //console.log('res => ', res);
    if(res.status===201) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al crear cliente!!!';
  }  
}

export async function getClient(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error.message;
    }
  }
}

export async function updateClient(id:string, auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===200){
      return res.data.data.data;
    }
    return 'Error al actualizar cliente!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un error al actualizar cliente!!';
  }  
}

export async function removeClient(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===204) return res.status;
    return 'Error al eliminar cliente!!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al eliminar cliente!!';
  }
}

export async function updateContactClient(data:Object, id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/insertContactOfClient/${id}`;
  console.log(url);
  console.log(JSON.stringify(data));
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
    console.log(typeof(error));
    console.log(error);
    return 'Ocurrio un error al actulizar contacto del cliente!!';
  }
}

export async function createClientLogo(auth_token:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/clientWithLogo`;
  
  //console.log('location');
  //console.log(data.get('location'));

  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status===201) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al crear cliente!!!';
  }  
}

export async function removeContactClient(idc:string, id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/deleteContactOfClient/${idc}/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    console.log(typeof(error));
    console.log(error);
    return 'Ocurrio un problema al eliminar contacto!!';
  }
}

export async function updateClientLogo(data:FormData, auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/updateMeLogo/${id}`;
  
  try {
    const res = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status===200) return res.data.data.data;
    return 'Error al actualizar logo del cliente!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un error al actualizar logo cliente!!';
  }
}

export async function getProjectsByClient(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsByClient/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.resdata;
    return res.data?.message?? res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al consultar proyectos del cliente!!';
  }
}

export async function getAllTOTALsProjectsByCLIENT(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllTOTALsProjectsByCLIENT/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.stats[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
  }
}

export async function getAllTOTALAccountReceivablesOnlyByOneClientMINRESUME(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALAccountReceivablesOnlyByOneClientMINRESUME/${id}/PAGADA/CANCELADA`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.stats[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
  }
}

export async function getAllTOTALEstimatesPendingByOneClientMINRESUME(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALEstimatesPendingByOneClientMINRESUME/${id}`;
  // console.log('url pend bil => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    // console.log('res fact => ', res);
    if(res.status===200){
      if(res.data.data.arrStats.length>0){
        return res.data.data.arrStats[0];
      }else{
        const r={
          client: "",
          quantity: 0,
          c: "",
          type: "PENDIENTE DE FACTURAR",
          pendingEstimated: 0
        };
        return r;
      }
    } 
    return res.statusText;
  } catch (error) {
    console.log('error fact => ', error);
    if(axios.isAxiosError(error)){
      return error.message;
    }
  }
}

export async function getAllTOTALPENDINGPaymentsByCLIENTMIN(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPENDINGPaymentsByCLIENTMIN/${id}/678ed05cc5f08e8a0f36d5e1/678ecf6ec5f08e8a0f36d5dd`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
  }
}

export async function getAllTOTALPENDINGPaymentsOFClientANDBYProjectMIN(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPENDINGPaymentsOFClientANDBYProjectMIN/${id}/678ecf6ec5f08e8a0f36d5dd`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.arrStats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
  }
}

export async function getAllTOTALChargedByOneCLIENT(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collections/getAllTOTALChargedByOneCLIENT/${id}`;

  const data = {
    conditionCharged: [
      "678ed05cc5f08e8a0f36d5e1","67d20e2959865f640af92682"
    ]
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
  }
}