import axios from 'axios'

export async function getEstimatesByProject(auth_token:string, project: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getAllEstimatesByProjectMIN/${project}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener estimaciones del proyecto!!';
  }
}

export async function getEstimate(auth_token:string, id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/${id}`;
  console.log('url estimate => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    console.log('res => ', res);
    if(res.status===200) return res.data.data.stats[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener estimacion!!';
  }
}

export async function createEstimate(auth_token:string, data: Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates`;
  console.log('url => ', url);
  console.log('data new estimate => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    // if(res.status===200) return res.data.data.data;
    if(res.status===201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al crear estimacion!!';
  }
}

export async function removeEstimate(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al crear estimacion!!';
  }
}

export async function getConeptsEstimate(auth_token:string, estimate: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conceptsestimates`;
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
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener conceptos de la estimacion!!';
  }
}

export async function getAllConceptsEstimateMin(auth_token:string, estimate: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getAllConceptsOfEstimateMIN/${estimate}`;
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
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener conceptos de la estimacion!!';
  }
}

export async function getAllConceptsDetailsByEstimateMin(auth_token:string, estimate: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getAllConceptsDetailsByEstimateMIN/${estimate}`;
  console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    console.log('res => ', res);
    if(res.status===200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener conceptos de la estimacion!!';
  }
}

export async function removeConceptEstimate(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conceptsestimates/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al crear estimacion!!';
  }
}

export async function createConceptEstimate(auth_token:string, data: Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conceptsestimates`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    // if(res.status===200) return res.data.data.data;
    if(res.status===201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al crear estimacion!!';
  }
}

export async function insertPriceInConceptEstimate(auth_token:string, data: Object, idC:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conceptsestimates/insertPricesInConcep/${idC}`;
  console.log('price => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    // if(res.status===200) return res.data.data.data;
    console.log('insert price => ', res);
    if(res.status===201 || res.status===200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al insertar precio en concepto!!';
  }
}

export async function insertConceptInEstimate(auth_token:string, data: Object, idE:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/insertConceptsInEstimates/${idE}`;
  console.log('url insert concept => ', url);
  console.log('concept => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    // if(res.status===200) return res.data.data.data;
    console.log('insert concept => ', res);
    if(res.status===201 || res.status===200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al insertar concepto en la estimacion!!';
  }
}

export async function deleteConceptInEstimate(idE:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/deleteConceptsInEstimates/${idE}`;
  console.log('url delete concept => ', url);
  try {
    const res = await axios.post(url, {
      totalEstimatedInConcept:0
    }, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    // if(res.status===200) return res.data.data.data;
    console.log('delete concept => ', res);
    if(res.status===204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al eliminar concepto en la estimacion!!';
  }
}

export async function deletePriceInConceptEstimate(idP:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conceptsestimates/deletePricesInConcep/${idP}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    // if(res.status===200) return res.data.data.data;
    if(res.status===204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al insertar precio en concepto!!';
  }
}

export async function getPricesConcept(auth_token:string, idConcept: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/conceptsestimates/getAllPricesOfConceptEstimateMIN/${idConcept}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener precios de concepto!!';
  }
}

export async function getTotalEstimatesByProjectMin(auth_token:string, project: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getTOTALEstimatesByProjectMIN/${project}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    // console.log('url => ', url);
    // console.log('res estimated => ', res);
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener total de estimaciones del proyecto!!';
  }
}

export async function getResumenEstimateProject(auth_token:string, project: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getAllTOTALEStimatesResumeByProjectMIN/${project}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener resumen de estimacion del proyecto!!';
  }
}

export async function getResumenEstimateByProjectAndEstimate(auth_token:string, project: string, estimate:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getAllTOTALEStimatesResumeByProjectMINAndByEstimate/${project}/${estimate}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener resumen de estimacion por proyecto y estimacion!!';
  }
}