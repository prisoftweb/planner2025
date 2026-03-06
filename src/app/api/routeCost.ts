import axios from 'axios'
import { getDate } from '@/libs/dates';
import { date } from 'zod';

export async function GetCosts(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;
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
      return error.response?.data.message || 'Error al consultar costos!!';
    }
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
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
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
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function getAllCostsByConditionAndUser(auth_token:string, user:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsByUserAndByConditionAGG/INGRESADO/${user}`;
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
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function GetCostsByUserMIN(auth_token:string, user:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostByUserMIN/${user}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.stats
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function getAllCostsByUserNormal(auth_token:string, user:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsByUserAndNEConditionMIN/FINALIZADO/${user}`;
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
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function getAllCostsByUserAdmin(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsAndNEConditionMIN/FINALIZADO`;
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
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function getAllCostsAndNE3ConditionsMIN(auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsAndNE3ConditionsMIN/FINALIZADO/PAGADOS/NO PAGADO`;
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
      return error.response?.data.message || 'Error al consultar costos!!';
    }
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
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
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
    if(res.status===200) return res.data.data.data
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function CreateCost(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('res new cost => ', res);
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
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
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
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
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
      return res.data.data.resok;
    }
    return res.statusText
  } catch (error) {
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
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
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
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
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
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos!!';
    }
    return 'Error al consultar costos por centros de costos!!';
  }
}

export async function getAllCostsGroupByCOSTOCENTERCategoryByDate(auth_token:string, dateStart:string, dateEnd:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTER-Category-ByDate/${dateStart}/${dateEnd}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
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
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos!!';
    }
    return 'Error al consultar costos por centros de costos!!';
  }
}

export async function getAllCostsGroupByProjectOnlyByDate(auth_token:string, dateStart:string, dateEnd:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByProject-OnlyByDate/${dateStart}/${dateEnd}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos!!';
    }
    return 'Error al consultar costos por centros de costos!!';
  }
}

export async function getAllCostsGroupByCOSTOCENTERConceptByDate(auth_token:string, dateStart:string, dateEnd:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTER-Concept-ByDate/${dateStart}/${dateEnd}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos!!';
    }
    return 'Error al consultar costos por centros de costos!!';
  }
}

export async function insertConditionInCost(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/insertConditionInCost`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
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
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos categoria!!';
    }
    return 'Error al consultar costos por centros de costos categoria!!';
  }
}

export async function GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTERCATEGORYONLY/${dateStart}/${dateEnd}/${project}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos categoria!!';
    }
    return 'Error al consultar costos por centros de costos categoria!!';
  }
}

export async function GetAllCostsGroupByCOSTOCENTERCONCEPTONLY(auth_token:string, dateStart:string, dateEnd:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTERONLY/${dateStart}/${dateEnd}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por centro de costos concepto!!';
    }
    return 'Error al consultar costos por centros de costos concepto!!';
  }
}

export async function GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-groupByCOSTOCENTERONLY/${getDate(new Date(dateStart))}/${getDate(new Date(dateEnd))}/${project}`;
  console.log('URL => ', url);
  console.log('auth_token => ', auth_token);
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    console.log('res => ', res);
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    console.log('Error => ', error);
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
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por dia!!';
    }
    return 'Error al consultar costos por dia!!';
  }
}

export async function GetAllCostsGroupByDAYAndProject(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByDAY/${dateStart}/${dateEnd}/${project}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por dia!!';
    }
    return 'Error al consultar costos por dia!!';
  }
}

export async function GetAllCostsGroupByRESUMEN(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByRESUMEN/${dateStart}/${dateEnd}/${project}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por resumen!!';
    }
    return 'Error al consultar costos por resumen!!';
  }
}

export async function GetAllCostsGroupByTYPERESUMEN(auth_token:string, dateStart:string, dateEnd:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByRESUMENTYPE/${dateStart}/${dateEnd}/${project}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) {
      return res.data.data.stats;
    }
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos por resumen y tipo!!';
    }
    return 'Error al consultar costos por resumen y tipo!!';
  }
}

export async function getTimeLineCost(auth_token:string, cost:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getConditionsByCostMIN/${cost}`;
  
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar linea de tiempo del costo!!';
  }
}

export async function findCostExistsInBD(auth_token:string, folio:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/findCostExistsInBD/${folio}`;
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
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar costos!!';
  }
}

export async function getAllCostsMINByDateANDProvider(token: string, dateStart:string, dateEnd:string, providers:string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsMINByDateANDProvider/${dateStart}/${dateEnd}/SIN ASIGNAR`;
  const data = {
    providers: providers
  }
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener la información de los codigos';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener la información de los gastos';
    }
    return 'Error: No se pudo obtener la información de los gastos'; 
  }
}

export async function getAllCostsByProviderNEConditionLV(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsByProviderNEConditionLV/${id}/661eade6f642112488c85fad/67318a51ceaf47ece0d3aa72`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos!!';
    }
    return 'Error al consultar informacion de los costos!!';
  }
}

export async function getAdvance(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getCost/${id}/?full=true`;
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
      return error.response?.data.message || 'Error al consultar anticipo!!';
    }
    return 'Error al consultar informacion del anticipo!!';
  }
}

export async function getAllCostsByAdvancesToSuppliersMIN(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsByAdvancesToSuppliersMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.arrStats;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar gastos relacionados del anticipo!!';
    }
    return 'Error al consultar gastos relacionados del anticipo!!';
  }
}

export async function getAllCostsByAdvancesToSuppliersMININVandAPP(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsByAdvancesToSuppliersMININVandAPP/${id}`;
  // console.log('URL:', url); // Agrega este log para verificar la URL
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    console.log('Response:', res); // Agrega este log para verificar la respuesta
    if(res.status===200) return res.data.data.arrStats;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar gastos relacionados del anticipo!!';
    }
    return 'Error al consultar gastos relacionados del anticipo!!';
  }
}


export async function insertAdvanceInvoicesCfdisInCost(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/insertAdvanceInvoicesCfdisInCost/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al insertar facturas en el anticipo!!!';
    }
    return 'Error al insertar facturas en el anticipo!!!';
  }
}

export async function getCostsAdvanceInvoicesCFDIs(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getCostsAdvanceInvoicesCFDIs/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.stats;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar gastos anticipo!!';
    }
    return 'Error al consultar gastos del anticipo!!';
  }
}

export async function getCostsAdvanceInvoicesCFDIsWithSTRUCT(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getCostsAdvanceInvoicesCFDIsWithSTRUCT/${id}`;
  // console.log('url cost pdf => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    // console.log('res => ', res);
    if(res.status===200) return res.data.data.stats;
    return res.statusText
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar gastos anticipo!!';
    }
    return 'Error al consultar gastos del anticipo!!';
  }
}

export async function getAllCostPROGByProviderMINWithoutPAY(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostPROGByProviderMINWithoutPAY/${id}`;
  const data={
    filter:["661eaa9ef642112488c85f5c","661eaa71f642112488c85f59", "661eaa4af642112488c85f56","67318dacceaf47ece0d3aabb","67378f77d846bbd16e1a8714"]
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    // console.log('res => ', res);
    // console.log('res json => ', JSON.stringify(res.data.stats));
    if(res.status===200) return res.data.data.stats;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al consultar pendientes de pago del proveedor';
    }
  }
}

export async function getAllTotalAccumResumeProgramingByProviderMINWithoutPAY(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllTotalAccumResumeProgramingByProviderMINWithoutPAY/${id}`;
  const data={
    filter:["661eaa9ef642112488c85f5c","661eaa71f642112488c85f59", "661eaa4af642112488c85f56","67318dacceaf47ece0d3aabb","67378f77d846bbd16e1a8714"]
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      'headers': {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    // console.log('res => ', res);
    // console.log('res json => ', JSON.stringify(res.data.data.stats));
    if(res.status===200) return res.data.data.stats;
      return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message;
    }else{
      return 'Ocurrio un error al consultar total acumulado pendiente de pago del proveedor';
    }
  }
}