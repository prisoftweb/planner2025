import axios from "axios";

export const fiscalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FISCAL_API_URL,
  headers: {
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