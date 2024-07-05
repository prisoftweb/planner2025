import axios from "axios";

export async function getDepartments(auth_token:string) {
      
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/departments`;
  try {
    const departments = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(departments.status === 200) return departments.data.data.data;
    return departments.statusText;
  } catch (error) {
    return 'Ocurrio un problema al consultar datos del usuario..';
  }
}

export async function getDepartmentsLV(auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/departments/getAllDepartmentsLV`;
  try {
    const departments = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(departments.status === 200) return departments.data.data.data;
    return departments.statusText;
  } catch (error) {
    return 'Ocurrio un problema al consultar datos del usuario..';
  }
}

export async function RemoveDepartment(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/departments/${id}`;
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
      return error.response?.data.message || error.message;
    }
    return 'Error al eliminar Departamento!!';
  }
}

export async function CreateDepartment(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/departments`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return  error.response?.data.message || error.message;
    }
    return 'Error al crear departamento!!';
  }
}

export async function UpdateDepartment(auth_token:string, id:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/departments/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status===200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar departamento!!';
  }
}