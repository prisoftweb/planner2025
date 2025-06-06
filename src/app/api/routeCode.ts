import axios from 'axios';

export async function getCodes(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.data;
    }
    return 'Error: No se pudo obtener la información de las garantías';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener la información de las garantías';
    }
    return 'Error: No se pudo obtener la información de las garantías'; 
  }
}

export async function createCode(token: string, data: Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/codes`;
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      return response.data.data.data;
    }
    return 'Error: No se pudo crear el codigo';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo crear el codigo';
    }
    return 'Error: No se pudo crear el codigo'; 
  }
}

export async function removeCode(token: string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/codes/${id}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 204) {
      return response.status;
    }
    return 'Error: No se pudo eliminar el codigo';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo eliminar el codigo';
    }
    return 'Error: No se pudo eliminar el codigo'; 
  }
}