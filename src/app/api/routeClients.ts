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
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al consultar clientes!!';
  }
}