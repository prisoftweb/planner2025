import axios from "axios";

export async function createContact(auth_token:string, data: Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts`;
  console.log('createee');
  console.log(JSON.stringify(data));
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

export async function getContacts(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts`;
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
    console.log(typeof(error));
    console.log(error);
    return 'Error al obtener contactos';
  }
}