import axios from "axios";

export async function getCompanies(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al obtener compañias!!'
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Ocurrio un error al obtener compañias!!';
  }
}

export async function getCompaniesLV(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/getAllCompanysLV`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al obtener compañias!!'
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Ocurrio un error al obtener compañias!!';
  }
}

export async function RemoveCompany(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/${id}`;
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
      return error.response?.data.message || error.message;
    }
  }
}

export async function CreateCompany(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status === 201) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
  }
}

export async function CreateCompanyLogo(auth_token:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/companyWithLogo`;
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    // if(res.status === 201) return res.status
    if(res.status === 201) return res.data.data.data
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
  }
}

export async function CreateCompanyWithLogoAndIsologo(auth_token:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/companyWithLOGOS`;
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    // if(res.status === 201) return res.status
    if(res.status === 201) return res.data.data.data
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
  }
}

export async function getCompaniesByWorkSpace(auth_token:string, idWS:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces/getCompanysWorkspaceMIN/${idWS}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return 'Error al obtener compañias!!'
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Ocurrio un error al obtener compañias!!';
  }
}

export async function updateCompany(auth_token:string, data:Object, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status === 200) return res.status
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
  }
}

export async function getCompany(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return 'Error al obtener compañia!!'
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Ocurrio un error al obtener compañia!!';
  }
}

export async function updateLogoCompany(auth_token:string, data:FormData, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/updateMeLogo/${id}`;
  
  try {
    const res = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if(res.status === 200) return res.status
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
  }
}

export async function updateIsoLogoCompany(auth_token:string, data:FormData, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/updateMeIsologo/${id}`;
  
  try {
    const res = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if(res.status === 200) return res.status
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
  }
}

export async function updateCompanyWithSAT(auth_token:string, data:FormData, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/updateCompanyWithSAT/${id}`;
  try {
    const res = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    // console.log('res update files  => ', res);
    if(res.status === 200) return res.status
    return res.statusText;
  } catch (error) {
    // console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
  }
}