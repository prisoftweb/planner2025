import axios from "axios";

export const fiscalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FISCAL_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY_DEV,
    "X-TENANT-KEY": process.env.NEXT_PUBLIC_TENANT_DEV,
  },
});

export async function getSatPaymentMethods() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatPaymentMethods");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Error al solicitar metodos de pago:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getSatCfdiUses() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatCfdiUses");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getSatInvoiceTypes() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatInvoiceTypes");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getSatPaymentForms() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatPaymentForms");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getCompanyTAXDATAFULL(id: string, token: string) {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/getCompanyTAXDATAFULL/${id}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Response:", res.data.data);
    // console.log("Response:", res.data);
    return res.data.data.stats;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener informacion de la compania";
  }
}

export async function getSatTaxRegimes() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatTaxRegimes");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function createFiscalApiInvoice(data:Object) {
  console.log("PAYLOAD:", JSON.stringify(data, null, 2));
  try {
    const res = await fiscalApi.post("/api/v4/invoices", data);
    console.log("Response:", res);
    console.log('json data => ', JSON.stringify(res.data.data));
    return res.data.data;
  } catch (error) {
    // console.log('Error => ', error);
    // return "Error al crear factura";
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("HEADERS:", error.response?.headers);
      return Array.isArray(error.response?.data.data)? error.response?.data.data[0]?.errorMessage : error.response?.data?.message || "Error al crear factura";
    } else {
      // console.log(error);
      return "Error al crear factura";
    }
  }
}

export async function cancelFiscalApiInvoice(data:Object) {
  console.log("PAYLOAD:", JSON.stringify(data, null, 2));
  try {
    const res = await fiscalApi.delete("/api/v4/invoices", {
                        data,
                        headers: {
                          "Content-Type": "application/json"
                      }});
    console.log("Response:", res);
    console.log('json data => ', JSON.stringify(res.data.data));
    return res.data.data;
  } catch (error) {
    // console.log('Error => ', error);
    // return "Error al crear factura";
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("HEADERS:", error.response?.headers);
      return Array.isArray(error.response?.data.data)? error.response?.data.data[0]?.errorMessage : error.response?.data?.message || "Error al crear factura";
    } else {
      // console.log(error);
      return "Error al cancelar factura";
    }
  }
}

export async function getSatUnitMeasurements() {
  try {
    const res = await fiscalApi.get("/api/v4/catalogs/SatUnitMeasurements");
    return res.data.data;
  } catch (error) {
    return "Error al obtener catálogo unidades del SAT";
  }
}

export async function getSatProductCodes() {
  try {
    const res = await fiscalApi.get("/api/v4/catalogs/SatProductCodes");
    console.log("Response:", res);
    return res.data.data;
  } catch (error) {
    return "Error al obtener catálogo productos del SAT";
  }
}

export async function getSatMotivosCancelacion() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatMotivosCancelacion");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getSatXML(id:string) {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get(`/api/v4/invoices/${id}/xml`);
    console.log('res xml => ', res);
    return res.data.data;
  } catch (error) {
    console.log('xml error => ', error);
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener xml de la factura";
  }
}

export async function getSatBanks() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatBanks");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}