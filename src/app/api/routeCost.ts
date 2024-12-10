import axios from 'axios'

export async function GetCosts(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    //console.log('res', res);
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('if catch ', error);
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    console.log('catch ', error);
    return 'Error al consultar costos!!';
  }
}

export async function GetCostsMIN(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    //console.log('res', res);
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('if catch ', error);
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    console.log('catch ', error);
    return 'Error al consultar costos!!';
  }
}

export async function getAllCostsByCondition(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsByConditionAGG/INGRESADO`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    //console.log('res', res);
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('if catch ', error);
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    console.log('catch ', error);
    return 'Error al consultar costos!!';
  }
}

export async function GetCostsLV(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsLV`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    //console.log('res', res);
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('if catch ', error);
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    console.log('catch ', error);
    return 'Error al consultar costos!!';
  }
}

export async function GetCostsLVByCond(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsLVbyCOND/661eaa4af642112488c85f56`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    //console.log('res', res);
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('if catch ', error);
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    console.log('catch ', error);
    return 'Error al consultar costos!!';
  }
}

export async function CreateCost(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;
  //console.log(url);
  //console.log(JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    //console.log(res);
    if(res.status === 201) return res.status;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al crear costo!!';
    }
    return 'Error al crear costo!!';
  }
}

export async function RemoveCost(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status === 204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al eliminar costo!!';
    }
    return 'Error al eliminar costo!!';
  }
}

export async function GetCost(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costo!!';
    }
    return 'Error al consultar informacion del costo costo!!';
  }
}

export async function GetCostMIN(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getCost/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.data[0];
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costo!!';
    }
    return 'Error al consultar informacion del costo costo!!';
  }
}

export async function UpdateCost(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/${id}`;
  try {
    //console.log(url);
    //console.log(JSON.stringify(data));
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    //console.log(res);
    if(res.status===200) return res.data.data.data;
    res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar costo!!';
  }
}

export async function CreateCostWithFiles(auth_token:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/costWithFILES`;
  // console.log(url);
  // console.log('files => ', data.getAll('files'));
  // console.log('types => ', data.getAll('types'));
  //console.log(JSON.stringify(data));
  console.log('formdata cost center => ', data.get('costocenter'));
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log('res costo => ', res);
    if(res.status === 201) return res.status;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al crear costo!!';
    }
    return 'Error al crear costo!!';
  }
}

export async function CloneCost(auth_token:string, id:string, user:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/cloneCost/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }, data: {
        glossary: '674643dd734d5ab78ab98ddb',
        user
      }
    });
    if(res.status === 201) return res.status;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al clonar costo!!';
    }
    return 'Error al clonar costo!!';
  }
}

export async function ADDNewFILE(auth_token:string, id:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/updateMeADDNewFILE/${id}`;
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    //console.log('add new file => ', res.data.data.slider);
    if(res.status === 200) return res.data.data.slider;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar archivo!!!';
    }
    return 'Error al actualizar archivo!!';
  }
}

export async function DeleteFILE(auth_token:string, id:string, idFile:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/deleteActualFILEByID/${id}/${idFile}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al eliminar el archivo anterior!!!';
    }
    return 'Error al eliminar el archivo anterior!!';
  }
}

export async function GetVats(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vats`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar ivas!!';
    }
    return 'Error al consultar ivas!!';
  }
}

export async function GetVatsLV(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vats/getAllVatsLV`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar ivas!!';
    }
    return 'Error al consultar ivas!!';
  }
}

export async function GetCostsGroupByProject(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByProject`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost => ', res.data.data.resok);
      return res.data.data.resok;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por proyecto!!';
    }
    return 'Error al consultar costos por proyecto!!';
  }
}

export async function GetCostsGroupByType(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByTYPE`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost => ', res.data.data.resok);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por tipo!!';
    }
    return 'Error al consultar costos por tipo!!';
  }
}

export async function GetCostsGroupByCostoCenterConcept(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTER-Concept`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost concept => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos!!';
    }
    return 'Error al consultar costos por centros de costos!!';
  }
}

export async function GetCostsGroupByCostoCenterCategory(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTER-Category`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos!!';
    }
    return 'Error al consultar costos por centros de costos!!';
  }
}

export async function GetAllCostsGroupByProjectOnly(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByProject-Only`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos!!';
    }
    return 'Error al consultar costos por centros de costos!!';
  }
}

export async function insertConditionInCost(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/insertConditionInCost`;
  //console.log(url);
  //console.log(JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    //console.log(res);
    if(res.status === 200) return res.status;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al insertar condicion en costo!!';
    }
    return 'Error al insertar condicion en costo!!';
  }
}

export async function GetAllCostsGroupByCOSTOCENTERCATEGORYONLY(auth_token:string, dateStart:string, dateEnd:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTERCATEGORYONLY/${dateStart}/${dateEnd}`;
  try {
    //console.log('url => ', url);
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos categoria!!';
    }
    return 'Error al consultar costos por centros de costos categoria!!';
  }
}

export async function GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTERCATEGORYONLY/${dateStart}/${dateEnd}/${project}`;
  try {
    //console.log('url => ', url);
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos categoria!!';
    }
    return 'Error al consultar costos por centros de costos categoria!!';
  }
}

export async function GetAllCostsGroupByCOSTOCENTERCONCEPTONLY(auth_token:string, dateStart:string, dateEnd:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTERONLY/${dateStart}/${dateEnd}`;
  console.log('que miras => ');
  console.log('url => ', url);
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos concepto!!';
    }
    return 'Error al consultar costos por centros de costos concepto!!';
  }
}

export async function GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTERONLY/${dateStart}/${dateEnd}/${project}`;
  try {
    const res = await axios.post(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos concepto!!';
    }
    return 'Error al consultar costos por centros de costos concepto!!';
  }
}

export async function GetAllCostsGroupByDAY(auth_token:string, dateStart:string, dateEnd:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByDAY/${dateStart}/${dateEnd}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por dia!!';
    }
    return 'Error al consultar costos por dia!!';
  }
}

export async function GetAllCostsGroupByDAYAndProject(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByDAY/${dateStart}/${dateEnd}/${project}`;
  try {
    const res = await axios.post(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por dia!!';
    }
    return 'Error al consultar costos por dia!!';
  }
}

export async function GetAllCostsGroupByRESUMEN(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByRESUMEN/${dateStart}/${dateEnd}/${project}`;
  //console.log('url => ', url);
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      //console.log(res.data.data.stats);
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por resumen!!';
    }
    return 'Error al consultar costos por resumen!!';
  }
}

export async function GetAllCostsGroupByTYPERESUMEN(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByRESUMENTYPE/${dateStart}/${dateEnd}/${project}`;
  console.log(url);
  try {
    const res = await axios.post(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) {
      console.log(res.data.data.stats);
      //console.log('res route cost category => ', res.data.data);
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    //console.log('error', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por resumen y tipo!!';
    }
    return 'Error al consultar costos por resumen y tipo!!';
  }
}