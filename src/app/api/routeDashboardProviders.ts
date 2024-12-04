import axios from "axios";

export async function getAllProvidersWithTradeLine(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/getAllProvidersWithTradeLine`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar proveedores con linea de credito';
  }
}

export async function getAllCostsTOTALGroupByPROVIDERTRADELINE(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsTOTALGroupByPROVIDERTRADELINE`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }, data: {
        "conditionCost": ["PAGADO", "DIFERIDO"]
      }
    });
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar total de costos agrupados por proveedor con linea de credito';
  }
}

export async function getAllCostsGroupByPROVIDERWithoutTRADELINE(auth_token:string, tradeline:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsGroupByPROVIDERWithoutTRADELINE/${tradeline}`;
  console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    if(res.status===200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar costos agrupados por proveedor';
  }
}