import axios from "axios";

export async function GetReports(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function CreateReport(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status === 201) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un error al crear informe!!';
    }
    return 'Ocurrio un error al crear informe!!';
  }
}

export async function RemoveReport(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${id}`;
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
      return error.response?.data.message || 'Error al eliminar informe';
    }
    return 'Error al eliminar informe';
  }
}

export async function GetReport(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${id}`;
  try {
    const res = await axios.get(url, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar informe!!';
    }
    return 'Error al consultar informe!!';
  }
}

export async function GetReportMIN(auth_token:string, id:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getReport/${id}`;
  try {
    const res = await axios.get(url, {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar informe!!';
    }
    return 'Error al consultar informe!!';
  }
}

export async function updateReport(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${id}`;
  console.log(url);
  console.log(JSON.stringify(data));
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers:{
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar informe!!';
    }
    return 'Error al actualizar informe!!';
  }
}

export async function getCostByReport(id:string, auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostByReport/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos del informe!!';
    }
    return 'Error al consultar costos del informe!!';
  }
}

export async function getCostByReportMin(id:string, auth_token:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostByReportMIN/${id}`;
  try {
    //console.log('url => ', url);
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    //console.log('res => ', res);
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    //console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al consultar costos del informe!!';
    }
    return 'Error al consultar costos del informe!!';
  }
}

export async function getReportsByUser(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsByUser/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || "Error al consultar informes del usuario!!";
    }
    return "Error al consultar informes del usuario!!";
  }
}

export async function insertMovementsInReport(auth_token:string, id:string, data:object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/insertConditionInReport/${id}`;
  try {
    console.log(url);
    console.log(JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(res);
    if(res.status === 200) return res.status
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al realizar movimiento!!!';
    }
    return 'Error al realizar movimiento!!!';
  }
}

export async function GetReportsByUser(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsByUser/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetReportsByDept(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsByDepto/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetReportsMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsMIN`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    //console.log('res ack => ', res.data.data);
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetAllReportsMINAndNECondition(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsMINAndNECondition/6671e3ab02acae12837cbe71`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    //console.log('res ack => ', res.data.data);
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetReportsLastMovInDeptMIN(auth_token:string, idDept:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsWithLastMoveInDepartmentMIN/${idDept}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(auth_token:string, idDept:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsWithLastMoveInDepartmentAndNEConditionMIN/${idDept}/CERRADO`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetAllReportsWithUSERAndNEConditionMIN(auth_token:string, idUser:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsWithUSERAndNEConditionMIN/${idUser}/CERRADO`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}



export async function GetReportsByUserMin(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsByUserMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    //console.log('res ack => ', res.data.data);
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetReportsLV(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/getAllReportsLV`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    //console.log('res ack => ', res.data.data);
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener informes';
    }
    return 'Ocurrio un problema al obtener informes';
  }
}

export async function GetAllCostByReportWithDateMINAndMAX(auth_token:string, id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostByReportMINAndMAX/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Ocurrio un problema al obtener fechas de gastos del informe informe';
    }
    return 'Ocurrio un problema al obtener fechas de gastos del informe informe';
  }
}