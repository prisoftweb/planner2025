import axios from "axios";

export async function getWorkSpaces(auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces`;
  try {
    const res = await axios.get(url, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error?.response?.data?.message || error.message;
    }else{
      return 'Error al obtener espacios de trabajo';
    }
  }
}