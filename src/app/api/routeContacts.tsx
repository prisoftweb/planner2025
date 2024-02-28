import axios from "axios";
//import { Contact } from "@/interfaces/Common";

export async function createContact(auth_token:string, data: Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===201) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al crear contacto!!';
  }
}