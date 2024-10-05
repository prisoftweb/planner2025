import axios from "axios";

export async function getProjects(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjects`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getActiveProjectsMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsMINAndNECondition/66e0a1a4c6d95ffb8aa0ff31`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsLV(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsLV`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function CreateProject(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  try {
    console.log(url);
    console.log(JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al crear proyecto!!';
  }
}

export async function RemoveProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al eliminar proyecto!!';
  }
}

export async function GetProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar proyecto!!';
  }
}

export async function GetProjectMin(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getProject/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar proyecto!!';
  }
}

export async function UpdateProject(auth_token:string, id:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  try {
    console.log(url);
    console.log(JSON.stringify(data))
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar proyecto!!'
  }
}

export async function UpdateProjectPhoto(auth_token:string, id:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/updateMeLogo/${id}`;
  try {
    const res = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar proyecto!!'
  }
}

export async function InsertConditionInProject(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/insertConditionInProject/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar condicion del proyecto!!';
    }
    return 'Error al actualizar condicion del proyecto!!';
  }
}

export async function InsertProgressInProject(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/insertAdvanceInProject/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar avance del proyecto!!';
    }
    return 'Error al actualizar avance del proyecto!!';
  }
}