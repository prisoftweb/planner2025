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