import axios from "axios";

export async function createInvoice(auth_token:string, data: Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices`;
  console.log('url => ', url);
  console.log('data new invoice => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    // if(res.status===200) return res.data.data.data;
    if(res.status===201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al crear factura!!';
  }
}

export async function getInvoices(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener facturas!!';
  }
}