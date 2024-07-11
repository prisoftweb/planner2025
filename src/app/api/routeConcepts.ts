import axios from "axios";
//import { Concept } from "@/interfaces/Concepts";

export async function CreateConcept(auth_token:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/concepts`;
  console.log('concept => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log('res concept => ', res);
    if(res.status === 201) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al crear concepto!!';
    }
    return 'Error al crear concepto!!';
  }
}