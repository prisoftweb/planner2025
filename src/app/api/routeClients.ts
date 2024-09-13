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