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

// export async function getCatalogCDFI(auth_token:string) {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices`;
//   try {
//     const res = await axios.get(url, {
//       headers: {
//         'Authorization': `Bearer ${auth_token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//     if(res.status===200) return res.data.data.data;
//     return res.statusText;
//   } catch (error) {
//     if(axios.isAxiosError(error)){
//       return error.response?.data.message || error.message;
//     }
//     return 'Error al obtener facturas!!';
//   }
// }