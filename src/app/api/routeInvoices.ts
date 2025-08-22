import axios from "axios";

export async function createInvoice(auth_token:string, data: Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices`;
  console.log('url => ', url);
  console.log('data new invoice => ', JSON.stringify(data));
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
    return 'Error al crear factura!!';
  }
}

export async function getInvoices(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener facturas!!';
  }
}

export async function getInvoicesMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllInvoicesMIN`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener facturas!!';
  }
}

export async function getInvoiceMin(auth_token:string, idi:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getInvoiceByIDMIN/${idi}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('res');
    if(res.status===200) return res.data.data.stats[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener factura!!';
  }
}

export async function getInvoiceMinFull(auth_token:string, idi:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getInvoiceByIDMINFULL/${idi}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('res');
    if(res.status===200) return res.data.data.stats[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener factura!!';
  }
}

export async function getInvoicesByProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllInvoicesByProjectMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener facturas!!';
  }
}

export async function getConceptsInvoice(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllConceptsOfInvoiceMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener coceptos de la factura!!';
  }
}

export async function getTotalInvoiceResumenByProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALInvoicesResumeByProjectMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener resumen de la factura!!';
  }
}

export async function removeInvoice(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/${id}`;
  console.log('url => ', url);
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('res => ', res);
    if(res.status===204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al eliminar facturas!!';
  }
}

export async function getTotalInvoicesByProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getTOTALInvoicesByProjectMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener total de facturas!!';
  }
}

export async function getCollectionsByInvoice(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllCollectionsDetailsByInvoiceMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener cobros de la factura!!';
  }
}

export async function getUnpaidInvoices(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllInvoicesNECondition/PAGADA`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al obtener facturas!!';
  }
}

export async function getAllTotalAmountInvoicePending(auth_token:string, dateI: string, dateF:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTAmountINVOICESIssuedPaymentAndPending/${dateI}/${dateF}`;
  console.log('ulr total amount => ', url);
  console.log('data => ', JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    });
    console.log('res => ', res);
    if(res.status===200)
      return res.data.data.resdata;
    return 'Error al obtener el total de las facturas!!';
  } catch (error) {
    console.log('error => ', error);
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar monto total de las facturas!!';
  }
}

export async function getAllInvoicesMINByDateAndCondition(auth_token:string, dateI: string, dateF:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllInvoicesMINByDate/${dateI}/${dateF}`;
  try {
    console.log('url => ', url);
    console.log('data => ', JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    });
    if(res.status===200)
      return res.data.data.stats;
    return 'Error al obtener las facturas!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar las facturas!!';
  }
}

export async function getTotalAccountReceivablesByProject(auth_token:string, dateI: string, dateF:string) {
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTotalAccountReceivablesByProjectMIN/PAGADA/CANCELADA`;
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALAccountReceivablesByProjectMIN/PAGADA/CANCELADA/${dateI}/${dateF}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPAYSMENTSByProjectMINRESUME/CANCELADA/${dateI}/${dateF}`;
  console.log('url => ', url);
  // try {
  //   const res = await axios.get(url, {
  //     headers: {
  //       'Authorization': `Bearer ${auth_token}`,
  //     },
  //   });
  //   console.log('res => ', res.data.data.stats);
  //   if(res.status===200)
  //     return res.data.data.stats;
  //   return 'Error al obtener total de las facturas por protecto!!';
  // } catch (error) {
  //   // console.log('error => ', error);
  //   if(axios.isAxiosError(error)){
  //     console.log('error => ', error);
  //     return error.message || error.response?.data.message;
  //   }
  //   return 'Error al consultar total de las facturas por protecto!!';
  // }
  return [];
}

export async function getTotalAccountReceivablesByClient(auth_token:string, dateI: string, dateF:string){
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTotalAccountReceivablesByClientMIN/PAGADA/CANCELADA`;
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALAccountReceivablesByClientMIN/PAGADA/CANCELADA/${dateI}/${dateF}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPAYSMENTSByClientMINRESUME/CANCELADA/${dateI}/${dateF}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      },
    });
    if(res.status===200)
      return res.data.data.stats;
    return 'Error al obtener total de las facturas por cliente!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de las facturas por cliente!!';
  }
}

export async function getTotalAccountReceivablesPaymentByDateAndStatus(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALAccountReceivablePAYMENTByDateAndStatus/${dateI}/${dateF}`;
  const data = JSON.stringify({conditions: ["PAGADA PARCIAL", "PAGADA"]});
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    });
    if(res.status===200)
      return res.data.data.stats;
    return 'Error al obtener total de pagos por fecha y estatus!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de pagos por fecha y estatus!!';
  }
}

export async function getTotalAccountReceivablesPendingByDateAndStatus(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALAccountReceivablePENDINGByDateAndStatus/${dateI}/${dateF}`;
  const data = JSON.stringify({conditions: ["EMITIDA", "PAGADA PARCIAL"]});
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    });
    if(res.status===200)
      return res.data.data.stats;
    return 'Error al obtener pendiente por fecha y estatus!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar pendiente por fecha y estatus!!';
  }
}

export async function getTotalAccountReceivablesByProjectResumen(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALAccountReceivablesByProjectMINRESUME/PAGADA/CANCELADA/${dateI}/${dateF}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      },
    });
    if(res.status===200)
      return res.data.data.stats;
    return 'Error al obtener total de las facturas por proyecto!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de las facturas por proyecto!!';
  }
}

export async function getTotalAccountReceivablesByClientResumen(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALAccountReceivablesByClientMINRESUME/PAGADA/CANCELADA/${dateI}/${dateF}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      },
    });
    if(res.status===200)
      return res.data.data.stats;
    return 'Error al obtener total de las facturas por cliente!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de las facturas por cliente!!';
  }
}

export async function getTotalEstimatesPendingByProject(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALEstimatesPendingByProjectMINRESUME/${dateI}/${dateF}/66e0a1a4c6d95ffb8aa0ff31`;
  console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      },
    });
    console.log('res => ', res.data.data.arrStatsOk);
    if(res.status===200)
      return res.data.data.arrStatsOk;
    return 'Error al obtener total de lo pendiente por estimar!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de lo pendiente por estimar!!';
  }
}

export async function getTotalEstimatesPendingByClient(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALEstimatesPendingByClientMINRESUME/${dateI}/${dateF}`;
  console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      },
    });
    console.log('res => ', res.data.data.arrStats);
    if(res.status===200)
      return res.data.data.arrStats;
    return 'Error al obtener total de lo pendiente por estimar!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de lo pendiente por estimar!!';
  }
}

export async function getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUME/66e0a1a4c6d95ffb8aa0ff31/${dateI}/${dateF}`;
  console.log('url => ', url);
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    });
    // console.log('res => ', res.data.data.arrStats);
    if(res.status===200)
      return res.data.data.resdata;
    return 'Error al obtener total de los proyectos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de los proyectos!!';
  }
}

export async function getAllTOTALPENDINGPAYMENTSByProjectMINRESUME(auth_token:string, dateI: string, dateF:string){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPENDINGPAYMENTSByProjectMINRESUME/CANCELADA/${dateI}/${dateF}`;
  console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      },
    });
    console.log('res => ', res.data.data.arrStats);
    if(res.status===200)
      return res.data.data.arrStats;
    return 'Error al obtener total de lo pendiente por proyecto!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log('error => ', error);
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de lo pendiente por proyecto!!';
  }
}