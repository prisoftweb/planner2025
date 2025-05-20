import axios from 'axios';

export async function getGuarantees(token: string) {
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

export async function insertConditionInGuarantee(token: string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/guaranteefunds/insertConditionInGuaranteeFund/${id}`;
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.status;
    }
    return 'Error: No se pudo actualizar estado de la garantía';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo actualizar estado de la garantía';
    }
    return 'Error: No se pudo actualizar estado de la garantía'; 
  }
}