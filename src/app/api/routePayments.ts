import axios from "axios";

export async function getPayments(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return 'Error al obtener los pagos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar los pagos!!';
  }
}

export async function getPaymentsProvider(auth_token:string, provider:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/getAllPaymentsByProviderMIN/${provider}`;
  console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    console.log('router payments prov => ', res);
    if(res.status===200)
      return res.data.data.resdata;
    return 'Error al obtener los pagos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar los pagos!!';
  }
}

export async function getPayment(auth_token:string, provider:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/${provider}`;
  try {
    console.log('url, => ', url);
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    if(res.status===200)
      return res.data.data.data;
    return 'Error al obtener el pago!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar el pago!!';
  }
}

export async function createPayments(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===201)
      return res.data.data.data;
    return 'Error al crear los pagos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al crear los pagos!!';
  }
}

export async function createPaymentsWithVoucher(auth_token:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/paymentWithVoucher`;
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    if(res.status===201)
      return res.data.data.data;
    return 'Error al crear los pagos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al crear los pagos!!';
  }
}

export async function getCostsPayment(auth_token:string, payment:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/getAllCostByPaymentMIN/${payment}`;
  console.log('url => ', url);
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    });
    console.log('router payments prov => ', res);
    if(res.status===200)
      return res.data.data.resdata;
    return 'Error al obtener los pagos!!';
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.message || error.response?.data.message;
    }
    return 'Error al consultar los costos del pago!!';
  }
}