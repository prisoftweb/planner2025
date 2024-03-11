import axios from "axios";
import { Contact, Phone } from "@/interfaces/Contacts";

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

export async function getContact(id:string, auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts/${id}`;
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
    return 'Error al consultar contacto';
  }
}

export async function updateContact(id:string, auth_token:string, data:Contact) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts/${id}`;
  console.log('updatecontact');
  console.log(id);
  console.log(url);
  console.log(JSON.stringify(data));
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    console.log(typeof(error));
    console.log(error);
    return 'Error al actualizar contacto!!'
  }  
}

export async function removeContactProvider(idp:string, id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/deleteContactOfProvider/${idp}/${id}`;
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
      return error.message;
    }
    console.log(typeof(error));
    console.log(error);
    return 'Ocurrio un problema al eliminar contacto!!';
  }
}

export async function removePhoneContact(auth_token:string, idp:string, idc:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts/deletePhoneOfContact/${idc}/${idp}`;
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
      return error.message;
    }
    return 'Ocurrio un problema al eliminar telefono!!';
  }
}

export async function insertPhoneContact(id:string, auth_token:string, data:Phone) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts/insertPhoneOfContact/${id}`;
  try {
    // console.log(url);
    // console.log(JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status===200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }
    return 'Ocurrio un problema al guardar telefono!!';
  }
}