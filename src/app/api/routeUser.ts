import axios from "axios";

export async function createUserPhoto(user:FormData, auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/userWithPhoto`;
  try {
    const res = await axios.post(url, user, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status === 201){
      return res.status;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un problema al crear usuario con foto';
  }
}

export async function createUser(user:any, auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/users`;
  try {
    const res = await axios.post(url, JSON.stringify(user), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 201){
      return res.status;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un error al crear usuario..'
  }
}

export async function getUser(id:string, auth_token:string) {
      
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
  try {
    const user = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(user.status === 200) return user.data.data.data;
    return user.statusText;
  } catch (error) {
    return 'Ocurrio un problema al consultar datos del usuario..';
  }
}

export async function updateMeUser(id:string, userData:FormData, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/updateMe/${id}`;
  console.log(url);
  //console.log(userData.get('photo'));
  try {
    const res = await axios.patch(url, userData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${auth_token}`
      },
    });
    console.log(res); 
    if(res.status === 200) return res;
      return res.statusText;
  } catch {
    return 'Ocurrio un problema al actualizar informacion del usuario..'
  }
}

export async function updateMePassword(id:string, passwordCurrent:string, password:string, passwordConfirm:string, auth_token:string) {
    
  const userData = {
    passwordCurrent,
    password,    
    passwordConfirm    
  };

  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/updatePassword/${id}`;
  try {
    const res = await axios.patch(url, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }});
      if(res.status===200) return res.status;
        return res.statusText;    
  } catch (error:any) {
    return error.response.data.message;
  }
}

export async function setLogin(email:string, password:string) {    
  
  const userData = {
    email,
    password
  };      
  const url=`${process.env.NEXT_PUBLIC_API_URL}/login`;
  try {
    const response = await axios.post(url, userData);
    return response.data;

  } catch (error:any) {
    
    const errorMsg : string = error.message;

    if(errorMsg.includes('401'))
      return "El usuario o contrasena son incorrectos";

    return error.message;
  }   
}

export async function forgotPassword(email:string) {
  
  const userData = {
    email,
  };
  const url=`${process.env.NEXT_PUBLIC_API_URL}/forgotPassword`;
  try {
    const res = await axios.post(url, userData);    
    return res.data;    
  } catch (error:any) {
    return error.response.data.message;
  }   
}

export async function resetPassword(id:string, data:any) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/resetPassword/${id}`;
  const config = {
    headers: { 
      'Content-Type': 'application/json',
    },
  };
  
  try {
    const res = await axios.patch(url, JSON.stringify(data), config);
    
    return res.status;    
  } catch (error:any) {
    return 'Error al cambiar la contraseña...';
  }
}

export async function getUsers(auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`;

  //console.log(auth_token);
  try{
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    })
    
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  }catch(e:any){
    //console.log(e.response.data.message);
    //return 'Ocurrio un problema al consultar usuarios!!';
    return e.response.data.message;
  }
}

export async function removeUser(id:string, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
  
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status=== 204) return 204;
    else return res.statusText;
  } catch (error) {
    return 'Ocurrio un error al eliminar usuario!';
  }
}

export async function updateUser(data:any, auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    console.log(res);
    if(res.status===200) return res.status;
      return res.statusText;
  } catch (error) {
    console.log(error);
    return 'Error al editar usuario'   
  }
}